<template lang="html">
  <v-layout align-center justify-end wrap id="login">
    <v-flex shrink id="address">
      <v-btn flat disabled small>{{ address }}</v-btn>
    </v-flex>
    <v-flex shrink id="connect">
      <v-btn small v-on:click="login">Login</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    address() {
      return this.$store.getters.address;
    },
  },
  methods: {
    login() {
      console.log("Should create a pop up for users to import mnemonic or create new account");
    }
  }
}
</script>

<style lang="css" scoped>
</style>
