<template lang="pug">
  v-app(:dark='$store.state.dark' :class='$store.state.dark ? "grey darken-6" : "grey lighten-6"')
    cookie-law(theme='blood-orange'
    :buttonText='$t("cookieButton")'
    :message='$t("cookieMessage")')
    v-content
      Navbar
      router-view
    Snackbar
</template>

<script lang="ts">
import Navbar from "./components/Navbar.vue";
import Snackbar from "./components/Snackbar.vue";
import * as store from "./plugins/store";
const CookieLaw = require("vue-cookie-law");

export default {
  components: { Navbar, Snackbar, CookieLaw }
};
</script>
<style>
@font-face {
  font-family: 'UniSans';
  src:  url('/static/unisans-medium.otf')
}

@font-face {
  font-family: 'UniSans';
  src:  url('/static/unisans-bold.otf')
}

</style>
  