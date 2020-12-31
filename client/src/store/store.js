import Vuex from "vuex"
import Vue from "vue"
import AuthService from "../services/AuthService";


Vue.use(Vuex)

export const store=new Vuex.Store({
    state:{
        user:{},
        users:[]
    },
    mutations:{
        setUser(state,value){
            state.user=value;
        },
        setUsers(state,value){
            state.users=value
        }
    },
    actions:{
        async login({commit}){
            let response=await AuthService.getLogin();
            commit("setUser",{})
            console.log(response)
        }
    }
})