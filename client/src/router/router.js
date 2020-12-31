import VueRouter from "vue-router"
import Vue from "vue";

import Login from "../components/Login"
import Home from "../components/Home"


Vue.use(VueRouter)
const routes = [
    { path: "/", component: Login, name: "login" },
    {
        path: "/home", component: Home, name: "home", afterEnter: (to, from, next) => {
            /*
             todo check if to === from
             Warning!: location.reload()  completely destroy all vuejs stored states
             */
            location.reload();
            return next()
        }
    }
]



export const router = new VueRouter({
    routes
})