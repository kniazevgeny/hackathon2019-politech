<template lang="vue">
  <v-layout wrap xs8>
    <v-text-field
          label="One row"
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
      v-for="(event, i) in events"
      :key="i"
       hide-actions
       
    >
      <v-expansion-panel-header>{{event.title}}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-layout slot="header" row style="align-items: center">
          <v-flex xs1></v-flex>
          <v-flex xs3><a class="date">{{event.date}}</a></v-flex>
        </v-layout>
        <v-card>
          <v-layout wrap>
            <v-flex xs12>{{event.about}}</v-flex>
            <br>
            <div style="justify-content: center">
              <v-btn class="go" color="#2196F3" dark</v-btn>
              <v-btn class="notgo" color="#FF5252" dark</v-btn>
            </div>
          </v-layout>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    <v-expansion-panel expand style="box-shadow: none">
      <v-expansion-panel-content v-for="(event, i) in events" :key="i" hide-actions>
        <v-layout slot="header" row style="align-items: center">
          <v-flex xs8>
            <span style="font-weight: bold;">{{event.Name}}</span>
            <span style="font-weight: bold;">{{event.Rating}}</span>
            </v-flex>
          <v-flex xs1></v-flex>
          <v-flex xs3><a class="date">{{event.Id}}</a></v-flex>
        </v-layout>
        <v-card>
          <v-layout wrap>
            <div v-for="(sk, j) in event.Skills" :key="j" hide-actions>
              <v-flex xs12>{{sk.About}}</v-flex>
            </div>
            <br>
            <div style="justify-content: center">
              <v-btn class="go" color="#2196F3" dark</v-btn>
              <v-btn class="notgo" color="#FF5252" dark</v-btn>
            </div>
          </v-layout>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    {{events}}
  </v-layout>
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
        eventsready: false,
        i: 0,
        events: [
          {title: 's', date:'w', about: 'ww', id: 0},
          {title: 'q', date:'d', about: 'ww', id: 1},
          {title: 's', date:'f', about: 'ww', id: 2},
          {title: 'd', date:'f', about: 'ww', id: 3}
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
          this.events = srr.data.users;
          this.eventsready = true;
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
