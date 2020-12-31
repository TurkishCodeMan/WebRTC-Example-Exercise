import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from "vue-socket.io";
import io from "socket.io-client"
import VuePeerJS from "vue-peerjs"
import Peer from 'peerjs';

import {store} from "./store/store"
import {router} from "./router/router"

Vue.use(new VueSocketIO({
  connection: io("http://localhost:3000", { transports: ['websocket'] })
}))

Vue.use(VuePeerJS, new Peer(undefined, {

}));



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
