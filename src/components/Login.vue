<template lang="html">
  <v-layout align-center justify-end wrap id="login">
    <v-flex  xs4 >
      <v-card flat color="transparent">
        <v-card-text>
          <p class="text-xs-right">
            {{ address }}
          </p>
        </v-card-text>
      </v-card>
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
