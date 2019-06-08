// jshint esversion:8
import Vue from 'vue'
import Vuex from 'vuex'
import bsv from 'bsv'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    address: "Not Connected",
    mnemonic: ""
  },
  getters: {
    address: state => { return state.address; },
    mnemonic: state => { return state.mnemonic; }
  },
  mutations: {
    setAddress(state, address) {
      state.address = address;
    },
    setMnemonic(state, mnemonic) {
      state.mneominc = mnemonic;
    }
  },
  actions: {
    setAddress(context, newAddress) {
      context.commit('setAddress', newAddress);
    },
    setMnemonic(context, mnemonicKey) {
      context.commit('setMnemonic', mnemonicKey);
    },
    createNew(context) {
      let privateKey = bsv.PrivateKey.fromRandom('testnet');
      console.log(privateKey.toWIF());
    }
  }
})
