<template>
  <div class="container">
    <div class="video-area">
      <app-video
        v-for="video in videos"
        :key="video.index"
        :stream="video"
      ></app-video>
    </div>
  </div>
</template>

<script>
import Video from "./Video";
export default {
  data() {
    return {
      peers: [],
      stream: "",
      videos: [],
    };
  },
  components: {
    appVideo: Video,
  },
  sockets: {
    userConnected(userId) {
      console.log("UserConnected" + " " + userId);
      this.connectToNewUser(userId, this.stream);
    },
    userDisconnected(userId) {
      console.log(userId);
      if (this.peers[userId]) this.peers[userId].close();
    },
  },
  methods: {
    async connectToNewUser(userId, stream) {
      const call = this.$peer.call(userId, stream);

      call.on("stream", (userVideoStream) => {
        console.log("Burada stream");
        this.addVideoStream(userVideoStream);
      });
      call.on("close", () => {
        let index = this.videos.findIndex((item) => item == stream);
        console.log(index + " close");
        this.videos.splice(index, 1);
      });

      this.peers[userId] = call;
    },

    async addVideoStream(stream) {
      let c = 0;
      this.$forceUpdate();
      this.videos.forEach((st) => {
        if (stream.id == st.id) {
          c = 1;
        }
      });
      if (c == 0) {
        return this.videos.push(stream);
      }
    },
  },

  async beforeMount() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        this.stream = stream;
        this.addVideoStream(stream);
        this.$peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (userVideoStream) => {
            this.addVideoStream(userVideoStream);
          });
        });
      });
  },
  created() {
    console.log(this.videos);
    // this.$peer.on("open", (id) => {
    //   console.log("Burada");
    //   this.$socket.emit("join-room", id);
    // });
    // console.log(this.peers);
    if (this.$peer.open) {
      console.log("Buradaaaa");

      this.$socket.emit("join-room", this.$peer.id);
    }
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 90%;
  margin: auto;
}
.video-area {
  justify-content: center;
  //align-items: center;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}
</style>