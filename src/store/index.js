import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import loginState from './login'
import toastState from './toast'
import userState from './user'

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loginState,
    toastState,
    userState
  }
})
