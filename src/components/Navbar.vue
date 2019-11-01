<template lang="vue">
<v-navigation-drawer permanent app
    dark
    floating
    persistent>
    <v-card flat style="height: 10em"></v-card>
    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        color='white'
        :to="item.to"
        style="text-decoration: none"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{$t(item.title)}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-menu offset-y>
        <template v-slot:activator='{ on }'>
          <v-btn text icon color='grey' v-on='on'>{{currentLocale.icon}}</v-btn>
        </template>
        <v-list>
          <v-list-item v-for='locale in locales' @click='changeLanguage(locale.code)' :key="locale.code">
            <v-list-item-title>{{locale.icon}}</v-list-item-title>
          </v-list-item>
        </v-list>  
      </v-menu>
      <v-btn text color='gray' @click='toggleMode'><v-icon small>brightness_2</v-icon></v-btn>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as store from "../plugins/store";
import { i18n } from "../plugins/i18n";
import * as api from "../utils/api"

@Component
export default class Navbar extends Vue {
  data () {
    return {
      items: [
        { title: 'navbar.profile', to: '/profile', icon: 'account_circle'},
        { title: 'navbar.search', to: '/search', icon: 'search'},
        { title: 'navbar.foryou', to: '/', icon: 'face'},
        { title: 'navbar.settings', to: '/settings', icon: 'settings_applications'}
      ],
      right: null,
    }
  }
  get locales() {
    return [{ icon: "🇺🇸", code: "en" }, { icon: "🇷🇺", code: "ru" }];
  }
  get currentLocale() {
    for (const locale of this.locales) {
      if (locale.code === i18n.locale) {
        return locale;
      }
    }
  }

  toggleMode() {
    store.setDark(!store.dark());
    (this.$vuetify.theme as any).dark = store.dark();
  }
  changeLanguage(locale: string) {
    i18n.locale = locale;
    store.setLanguage(locale);
    document.title = i18n.t("strippedTitle") as string;
  }
}
</script>

<style>
nav a:link {
  text-decoration: none;
}

nav a:visited {
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

nav a:active {
  text-decoration: underline;
}
.v-list-item{
  margin-bottom: 1em;
}
.v-list-item__title{
  font-family: 'UniSans' !important;

}
</style>

