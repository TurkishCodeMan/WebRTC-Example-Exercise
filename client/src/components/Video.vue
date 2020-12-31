<template>
  <!-- <div class="video-grid" ref="videoGrid"></div> -->
  <video width="640" height="480" autoplay ref="video" class="video"> </video>
</template>

<script>
export default {
  data() {
    return {
      video: {},
      //stream: "",
      peers: [],
    };
  },
  props:["stream"],
  mounted(){
    console.log(this.stream)
    this.$refs.video.srcObject=this.stream

  }
  // sockets: {
  //   userConnected(userId) {
  //     console.log("UserConnected"+" "+userId);
  //     this.connectToNewUser(userId, this.stream);
  //   },
  //   userDisconnected(userId) {
  //     console.log(userId);
  //     if (this.peers[userId]) this.peers[userId].close();

  //     this.$forceUpdate();
  //   },
  // },

  // methods: {
  //   async connectToNewUser(userId, stream) {
  //     const call = this.$peer.call(userId, stream);
  //     const video = document.createElement("video");
  //     call.on("stream", (userVideoStream) => {
  //       this.addVideoStream(video, userVideoStream);
  //     });
  //     call.on("close", () => {
  //       video.remove();
  //     });

  //     this.peers[userId] = call;
  //   },

  //   async addVideoStream(video, stream) {
  //     video.srcObject = stream;
  //     video.addEventListener("loadedmetadata", () => {
  //       video.play();
  //     });
  //     this.$refs.videoGrid.append(video);
  //   },
  // },

  // async beforeMount() {
  //   const myVideo = document.createElement("video");
  //   myVideo.classList.add("video");
  //   navigator.mediaDevices
  //     .getUserMedia({
  //       video: true,
  //       audio: true,
  //     })
  //     .then((stream) => {
  //       this.stream = stream;
  //       this.addVideoStream(myVideo, stream);
  //       this.$peer.on("call", (call) => {
  //         call.answer(stream);
  //         const video = document.createElement("video");
  //         video.classList.add("video");
  //         call.on("stream", (userVideoStream) => {
  //           this.addVideoStream(video, userVideoStream);
  //         });
  //       });
  //     });
  // },
  // created() {
  //   this.$peer.on("open", (id) => {
  //     console.log("Burada");
  //     this.$socket.emit("join-room", id);
  //   });
  //   console.log(this.peers)
  //   if (this.$peer.open) {
  //     console.log("Buradaaaa");

  //     this.$socket.emit("join-room", this.$peer.id);
  //   }
  // },
};
</script>

<style lang="scss" scoped>
.video {
  margin-right: 1rem;
  //   -webkit-transform: scaleX(-1);
  // transform: scaleX(-1);
}
</style>>
