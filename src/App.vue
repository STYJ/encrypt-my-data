<template>
  <v-app>
    <v-container fluid fill-height id="app">
      <v-layout column>
        <Header />
        <router-view />
        <Footer />
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="css" scoped></style>
