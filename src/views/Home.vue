<template>
  <v-app>
    <v-container fluid fill-height id="home">
      <v-layout column>
        <Header />
        <Body />
        <Footer />
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Body from '@/components/Body.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Header,
    Body,
    Footer,
  },
};
</script>

<style lang="css" scoped></style>
