<template lang="vue">
<v-container class="pa-8">
  <v-layout wrap xs8>
    <v-text-field
          :label="$t('search.sTitle')"
          outlined
          rows="1"
          row-height="15"
          @keyup.enter="search(sr)"
          v-model="sr"
          filled
        >
    </v-text-field>
    <v-expansion-panels multiple style="box-shadow: none">
      <v-expansion-panel
        v-for="(user, i) in users"
        :key="i"
        hide-actions
        
      >
        <v-expansion-panel-header>
          <span style="font-weight: bold;">{{user.Name}}</span>
          <br>
          <span style="text-align: right; margin-right: 2em">
            <span v-for="n in user.Rating">
              <v-icon style="color: gold">star</v-icon>
            </span>
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <h4>{{$t('search.competences')}}:</h4>
          <ul v-for="(sk, j) in user.Skills" :key="j">
            <li>{{sk}}</li>
          </ul>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    {{users[0].Name}}
    {{users}}
  </v-layout>
</v-container>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import * as store from "../plugins/store";
import { i18n } from "../plugins/i18n";
import * as api from "../utils/api";
import { getContainer } from 'vuetify/src/services/goto/util';
import { state } from 'vuex';

export default {
    name: "poll",
    data() {
      return {
        usersready: false,
        i: 0,
        users: [
          {Id: '1', Uniqueid:'wtf', Name: 'yoy', Rating: 4, Skills: ["go", "c++"], Favourites: "[2]", Ignored: "[4]", Busy: false},
          {Id: '2', Uniqueid:'this', Name: 'jeka', Rating: 5, Skills: ["vue", "python"], Favourites: "[3]", Ignored: "[4]", Busy: false},
          {Id: '3', Uniqueid:'is', Name: 'necromant', Rating: 3, Skills: ["go", "c++"], Favourites: "[4]", Ignored: "[4]", Busy: false},
          {Id: '4', Uniqueid:'BS', Name: 'lox', Rating: 4, Skills: ["java", "c"], Favourites: "[5]", Ignored: "[4]", Busy: false}
        ],
        sr: ""
      }
    },
    methods: {
      async search(sr){
        try {
          var arr = sr.split(' ');
          // store.setSnackbar({
          //   message: store.state.user.uniqueid,
          //   color: "error",
          //   active: true
          // });
          const srInfo = {skills: arr, uniqueid: this.$store.state.user.uniqueid};
          const srr = await api.ssearch(srInfo);
          this.users = srr.data.users;
          this.usersready = true;
          //this.$router.replace("cabinet");
        } catch (err) {
          store.setSnackbar({
            message: err.message,
            color: "error",
            active: true
          });
      };
  }
    },
    
}

</script>

<style scoped>
    .date {
        color: white;
        background-color: #ffb533;
        border-radius: 7px;
        padding: 3px;
        clear: right;
    }

    li {
        border-radius: 4px;
    }

    ul {
        border-radius: 4px;
    }

    .v-card {
        border-radius: 10px !important;
    }

    .v-window {
        border-radius: 10px !important;
    }

    .v-expansion-panel__body .v-card {
        border-radius: 1em
    }

    .v-expansion-panel__body,
    .v-expansion-panel__body .v-card .v-card__text,
    .v-card {
        border-radius: 1em;
        width: 90%;
        margin-left: 5%;
    }

    .v-expansion-panel__container--active,
    .v-expansion-panel__container--active {
        margin: 0;
    }

    .v-expansion-panel__container {
        box-shadow: none;
        padding-bottom: 3px;
        border-radius: 1em;
    }

    @media screen and (min-width: 600px) {
        .v-expansion-panel__container:hover {
            box-shadow: none;
            cursor: pointer;
        }
    }

    .go {
        font-size: medium;
    }

    .notgo {
        font-size: medium;
    }
    .v-input__control{
      margin: 50px
    }
</style>
