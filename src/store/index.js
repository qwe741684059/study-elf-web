import { createStore } from 'vuex'
import {getToken, removeToken, setToken} from "@/utils/auth";
import {getInfo, login, logout} from "@/api/user";


export default createStore({
  state: {
    user: {},
    token: getToken(),
    alive:false,
    model: null
  },
  getters: {
    user: state => state.user,
    model: state => state.model
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ALIVE: (state, alive) => {
      state.alive = alive
    },
    SET_MODEL: (state, model) => {
      state.model = model
    }
  },
  actions: {
    async Login({commit}, user) {
      await login(user).then(resp => {
        setToken(resp.data.token)
        commit('SET_TOKEN', resp.data.token)
        commit('SET_USER', resp.data.user)
        commit('SET_ALIVE', true)
      }).catch(e => {
        logOut(commit)
      })
    },

    setAlive({commit}) {
      commit('SET_ALIVE', true)
    },

    setModel({commit}, model) {
      commit('SET_MODEL', model)
    },

    async GetInfo({commit}) {
      await getInfo().then(resp => {
        commit('SET_USER', resp.data.user)
      }).catch(e => {
        logOut(commit)
      })
    },
    async LogOut({commit}) {
      await logout().then(resp => {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
        commit('SET_ALIVE', false)
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
  commit('SET_TOKEN', null)
  commit('SET_USER', null)
  commit('SET_ALIVE', false)
  removeToken()
}
