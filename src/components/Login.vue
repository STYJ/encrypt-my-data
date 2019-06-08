<template lang="html">
  <v-layout align-center justify-end wrap id="login">
    <v-flex shrink id="address">
      <!-- <v-textarea
        readonly
        auto-grow
        rows=1
        single-line
        v-model="address"
      /> -->
      <v-btn flat disabled small>{{ address }}</v-btn>
    </v-flex>
    <ConnectButton />
  </v-layout>
</template>

<script>
import ConnectButton from '@/components/ConnectButton.vue';

export default {
  components: {
    ConnectButton
  },
  computed: {
    address() {
      return this.$store.getters.address;
    },
  },
}
</script>

<style lang="css" scoped>
</style>
