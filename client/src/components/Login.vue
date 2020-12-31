<template>
  <div class="container">
    <div class="header">
      <h6>Zoom Clone Project</h6>
    </div>
    <div class="login-form">
      <button class="btn btn-login" @click="loginApp">
        Login with Google+
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  methods: {
    ...mapActions(["login"]),
    ...mapMutations(["setUser"]),

    async loginApp() {
      window.open(
        "/api/login",
        "mywindow",
        "location=1,status=1,scrollbars=1, width=800,height=800"
      );
      window.addEventListener("message", this.myCallBack);
    },

    myCallBack(message) {
      if (message.data.user) {
        this.setUser(message.data.user);
        window.removeEventListener("message", this.myCallBack);
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  margin-top: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  flex-direction: column;

  .btn {
    border-radius: 15px;
    padding: 1rem;
    cursor: pointer;
  }
  .btn-login {
    background: rgb(228, 70, 70);
    color: #fff;
    border: none;
    transition: all 0.6s;

    &:hover {
      padding: 1.3rem;
      font-size: 1rem;
    }
  }
}
</style>