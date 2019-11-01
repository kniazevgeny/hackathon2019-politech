<template lang="pug">
  .v-container.pa-4
    // Main content
    v-layout(column
    justify-center
    align-center).text-center
      v-flex(xs12 md10)
        .headline.pb-4
          span(v-html='$t("home.info")')
        p {{$t('home.rules.register')}}
        p {{$t('home.rules.money')}}
        p {{$t('home.rules.success')}}
        v-text-field(
          label="API base"
          outlined
          rows="1"
          row-height="15"
          v-model="$store.state.apiuri"
          filled
          @keyup.enter="onTmpRequest('s')"
      )
        v-btn(@click='onTmpRequest("s")')
            span {{$t('home.req')}}
      


        v-flex.pt-4
          vueTelegramLogin(mode='callback'
          telegram-login='politexbot'
          @callback='onTelegramAuth(user)'
          radius='17'
          :userpic='true')

</template>
      // - v-flex.pt-4
      // -   .caption
      // -     router-link(to='/privacy') {{ //$t('home.privacy') }}
<script src="https://unpkg.com/vue-telegram-login"></script>
<script async src="https://telegram.org/js/telegram-widget.js?7" data-telegram-login="politexbot" data-size="large" data-radius="17" data-onauth="onTelegramAuth(user)" data-request-access="write"></script>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { loginFacebook, loginTelegram, loginGoogle, tmprequest } from "../utils/api";
import * as store from "../plugins/store";
import Component from "vue-class-component";
import { i18n } from "../plugins/i18n";
//import * as tg from "../plugins/telegram-widget.js";
//const vueTelegramLogin = require("vue-telegram-login");
const vueTelegramLogin = () => require("vue-telegram-login");
// FB object is global, declaring here for TS
declare const FB: any;


@Component({
  components: {
    vueTelegramLogin
  }
})
export default class Home extends Vue {
  data () {
    return {
      apiuri: ""
    }
  }
  async onTelegramAuth(loginInfo: any) {
    try {
      loginInfo = {id: "thisisuserid", first_name: "first_name", last_name: "last_name", username: "username",
      photo_url: "photo_url", auth_date: "auth_date", hash: "hash"};
      const user = await tmprequest(loginInfo);
      store.setUser(user);
      //this.$router.replace("cabinet");
    } catch (err) {
      console.log(err);
      store.setSnackbar({
        message: err.message,
        color: "error",
        active: true
        //<!-- --------- - -->
      });
    };
  }
  async onTmpRequest(loginInfo: any) {
    try {
      loginInfo = {id: "thisisuserid", first_name: "first_name", last_name: "last_name", username: "username",
      photo_url: "photo_url", auth_date: "auth_date", hash: "hash"};
      const user = await tmprequest(loginInfo);
      store.setUser(user);
      console.log(user);
      store.setSnackbar({
        message: user.uniqueid,
        color: "error",
        active: true
      });
      //this.$router.replace("cabinet");
    } catch (err) {
      console.log(err);
      store.setSnackbar({
        message: err.message,
        color: "error",
        active: true
      });
    };
  };
}
</script>

<style>
.fb-signin-button {
  cursor: pointer;
  display: block;
  padding: 10px 46px;
  border-radius: 3px;
  background-color: #647daf;
  color: #fff;
  margin: 10px;
}
.g-signin-button {
  margin: 10px;
  cursor: pointer;
  display: block;
  padding: 10px 46px;
  border-radius: 3px;
  background-color: #ce5658;
  color: #fff;
}
</style>
