import { createStore } from 'vuex'
import {getToken, removeToken, setToken} from "@/utils/auth";
import {getInfo, login, logout} from "@/api/user";

export default createStore({
  state: {
    user: {},
    token: getToken()
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
  },
  actions: {
    Login({commit}, user) {
      login(user).then(resp => {
        setToken(resp.data.token)
        commit('SET_TOKEN', resp.data.token)
        commit('SET_USER', resp.data.user)
      }).catch(e => {
        logOut(commit)
      })
    },

    GetInfo({commit}) {
      getInfo().then(resp => {
        commit('SET_USER', resp.data.user)
      }).catch(e => {
        logOut(commit)
      })
    },
    LogOut({commit}) {
      logout().then(resp => {
        commit('SET_TOKEN', '')
        commit('SET_USER', null)
        removeToken()
      }).catch(e => {
        logOut(commit)
      })
    }
  },
  modules: {
  }
})

export const logOut = (commit) => {
  commit('SET_TOKEN', '')
  commit('SET_USER', null)
  removeToken()
}
