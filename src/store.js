// jshint esversion:8
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    address: "Not Connected"
  },
  getters: {
    address: state => { return state.address; }
  },
  mutations: {
    setAddress(state, payload) {
      state.address = payload.address;
    }
  },
  actions: {
    setAddress(context, newAddress) {
      context.commit('setAddress', newAddress);
    }
  }
})
