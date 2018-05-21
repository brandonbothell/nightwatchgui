<template>
<div id="navigationDrawer">
  <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="dashboard()">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="users()">
          <v-list-tile-action>
            <v-icon>account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Users</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="guilds()">
          <v-list-tile-action>
            <v-icon>people</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Guilds</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="giveaways()">
          <v-list-tile-action>
            <v-icon>card_giftcard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Giveaways</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="referrals()">
          <v-list-tile-action>
            <v-icon>arrow_forward</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Referrals</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Natsuki GUI</v-toolbar-title>
      <v-spacer></v-spacer>
      <discordAuth/>
    <!-- TODO: Move hello username and login and logout here -->
    </v-toolbar>
</div>
</template>

<script>
import DiscordAuth from './DiscordAuth.vue'
export default {
  components: {
    'discordAuth': DiscordAuth
  },
  data: () => ({
    drawer: true
  }),
  methods: {
    dashboard () {
      if (document.getElementById('usersData').offsetParent !== null) {
        document.getElementById('usersData').setAttribute('style', 'display:none')
      }
      if (document.getElementById('guildsData').offsetParent !== null) {
        document.getElementById('guildsData').setAttribute('style', 'display:none')
      }
      if (document.getElementById('giveawaysData').offsetParent !== null) {
        document.getElementById('giveawaysData').setAttribute('style', 'display:none')
      }
      if (document.getElementById('referralsData').offsetParent !== null) {
        document.getElementById('referralsData').setAttribute('style', 'display:none')
      }
      document.getElementById('usersButton').setAttribute('style', 'background-color:#8aa1fc;display:initial')
      this.drawer = false
    },
    users () {
      let users = document.getElementById('usersData')
      if (users) {
        if (!users.offsetParent) {
          this.dashboard()
          users.setAttribute('style', 'display:initial')
        }
        document.getElementById('usersButton').setAttribute('style', 'background-color:#8aa1fc;display:none')
        this.drawer = false
      }
    },
    guilds () {
      let guilds = document.getElementById('guildsData')
      if (guilds) {
        if (!guilds.offsetParent) {
          this.dashboard()
          guilds.setAttribute('style', 'display:initial')
        }
        this.drawer = false
      }
    },
    giveaways () {
      let giveaways = document.getElementById('giveawaysData')
      if (giveaways) {
        if (!giveaways.offsetParent) {
          this.dashboard()
          giveaways.setAttribute('style', 'display:initial')
        }
        this.drawer = false
      }
    },
    referrals () {
      let referrals = document.getElementById('referralsData')
      if (referrals) {
        if (!referrals.offsetParent) {
          this.dashboard()
          referrals.setAttribute('style', 'display:initial')
        }
        this.drawer = false
      }
    }
  }
}
</script>

<style>

</style>
