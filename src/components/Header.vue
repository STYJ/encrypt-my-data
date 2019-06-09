<template lang="html">
  <v-layout shrink class="header">
    <v-btn icon @click="moveToHome">
      <v-icon medium>
        home
      </v-icon>
    </v-btn>
    <Login />
  </v-layout>
</template>

<script>
import Login from '@/components/Login.vue';
export default {
  components: {
    Login
  },
  methods: {
    moveToHome() {
      this.$router.push("/");
    }
  }
}
</script>

<style lang="css" scoped>

</style>
