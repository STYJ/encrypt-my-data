// jshint esversion:8
import Vue from 'vue';
import Vuex from 'vuex';
import Mnemonic from 'bsv/mnemonic';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mnemonic: "Not Connected",
    hdPrivateKey: "Not Connected",
    // publicKey: "Not Connected",
    address: "Not Connected",
  },
  getters: {
    mnemonic: state => { return state.mnemonic; },
    hdPrivateKey: state => { return state.hdPrivateKey; },
    // publicKey: state => { return state.publicKey; },
    address: state => { return state.address; },
  },
  mutations: {
    setMnemonic(state, mnemonic) {
      state.mnemonic = mnemonic;
    },
    setHdPrivateKey(state, hdPrivateKey) {
      state.hdPrivateKey = hdPrivateKey;
    },
    // setPublicKey(state, publicKey) {
    //   state.publicKey = publicKey;
    // },
    setAddress(state, address) {
      state.address = address;
    },
  },
  actions: {
    setMnemonic(context, mnemonicKey) {
      context.commit('setMnemonic', mnemonicKey);
    },
    setAddress(context, newAddress) {
      context.commit('setAddress', newAddress);
    },

    createNew(context) {
      // Generate random mnemonic
      let mnemonic = Mnemonic.fromRandom();

      // Generate hd private key from mnemonic seed
      let hdPrivateKey = mnemonic.toHDPrivateKey();

      // Generate private key from hd private key
      // var privateKey = hdPrivateKey.privateKey.toString();

      // Generate public key from hd private key
      // var publicKey = hdPrivateKey.publicKey.toString();

      // Generate address from hd private key
      let address = hdPrivateKey.privateKey.toAddress().toString();

      context.commit('setMnemonic', mnemonic);
      context.commit('setHdPrivateKey', hdPrivateKey);
      context.commit('setAddress', address);
    },
    importMnemonic(context, importedMnemonic) {
      let mnemonic;

      try {
        mnemonic = Mnemonic.fromString(importedMnemonic);
      } catch(e) {
        throw(e);
      }

      let hdPrivateKey = mnemonic.toHDPrivateKey();

      let address = hdPrivateKey.privateKey.toAddress().toString();

      context.commit('setMnemonic', mnemonic);
      context.commit('setHdPrivateKey', hdPrivateKey);
      context.commit('setAddress', address);

    },
  }
})
