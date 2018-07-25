<template>
  <v-app id="inspire" dark>
    <navigationDrawer/>
    <v-content>
      <v-container fluid fill-height text-xs-center>
        <v-layout justify-center align-center row wrap>
          <chips />
          <v-flex xs12>
            <v-btn large style="background-color:#4286f4" to="/users" id='usersButton'><v-icon>account_circle</v-icon> <span v-if="this.$store.state.site.desktop">View Users</span></v-btn>
            <v-btn large style="background-color:#4286f4" to="/guilds" id='guildsButton'><i class="fas fa-users"></i>&nbsp;<span v-if="this.$store.state.site.desktop">View Guilds</span></v-btn>
            <v-btn large style="background-color:#4286f4" to="/giveaways" id='giveawaysButton'><v-icon>card_giftcard</v-icon> <span v-if="this.$store.state.site.desktop">View Giveaways</span></v-btn>
            <v-btn large style="background-color:#4286f4" to="/referrals" id='referralsButton'><v-icon>arrow_forward</v-icon> <span v-if="this.$store.state.site.desktop">View Referrals</span></v-btn>
              <div class='giveaways'>
                <p style="font-size:20px">{{ msg }}</p>
                <v-tooltip right>
                  <v-btn slot="activator" @click="changeVisibility()" icon large>
                    <v-icon large id="giveawaysArrow">arrow_drop_down</v-icon>
                  </v-btn>
                  <span id="viewGiveaways">Show Giveaways</span>
                </v-tooltip>
                <div id='giveawaysList' style="display:none">
                  <table style="margin:auto" class="centered">
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody v-for="giveaway in giveaways" :key="JSON.stringify(giveaway.id)" style="font-weight:normal">
                    <tr style="cursor:pointer" @click="loadGiveawayInfo(giveaway.id)">
                      <td>
                        {{ giveaway.name }}
                        <div :id="giveaway.id"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </v-flex>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn slot="activator" href="https://github.com/jasonhaxstuff/nightwatchgui" icon large target="_blank">
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <customFooter></customFooter>
  </v-app>
</template>

<script lang='ts'>
import axios from 'axios'
import Footer from '@/components/Footer.vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import Chips from '@/components/Chips.vue'
import Vue from 'vue'
import { apiUrl } from '@/config';

export default Vue.extend({
  components: {
    customFooter: Footer,
    navigationDrawer: NavigationDrawer,
    chips: Chips
  },
  name: 'Giveaways',
  data () {
    return {
      msg: 'Hey, look! Giveaways!',
      giveaways: null,
      api: apiUrl
    }
  },
  created: function created () {
    const x = window.innerWidth >= 1000

    this.$store.commit('setDesktop', x)
    this.loadGiveaways()
  },
  methods: {
    async loadGiveaways () {
      const { data: giveaways } = await axios.get(`${this.api}/giveaways`)
      this.giveaways = giveaways
    },
    async loadGiveawayInfo (id: string) {
      if (this.$store.state.opened.giveawaysOpen.includes(id)) {
        const giveaway = document.getElementById(id)

        if (!giveaway) {
          return false
        }

        giveaway.setAttribute('style', 'display:none')
        this.$store.commit('removeGiveawaysOpen', id)

        return true
      }

      if (this.$store.state.opened.giveawaysOpened.includes(id)) {
        const giveaway = document.getElementById(id)

        if (!giveaway) {
          return false
        }

        giveaway.setAttribute('style', 'display:initial')
        this.$store.commit('addGiveawaysOpen', id)

        return true
      }

      this.$store.commit('addGiveawaysOpen', id)
      this.$store.commit('addGiveawaysOpened', id)

      const { data: giveaway } = await axios.get(`${this.api}/giveaways/${id}`)

      const div = document.getElementById(giveaway.id)

      if (!div) {
        return false
      }

      div.innerHTML = `
        <table style="margin:auto" class="highlight centered">
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>Date created</td>
          <td>${giveaway.dateCreated}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>${giveaway.id}</td>
        </tr>
        <tr>
          <td>Levels enabled</td>
          <td>${giveaway.settings.levelsEnabled}</td>
        </tr>
        <tr>
        <td>DMs enabled</td>
        <td>${giveaway.settings.directMessagesEnabled}</td>
        </tr>
        <tr>
          <td>DB ID</td>
          <td>${giveaway.settings.id}</td>
        </tr>
        <tr>
          <td>Support tickets</td>
          <td>${giveaway.supportTickets}</td>
        </tr>
        <tr>
          <td>Suggestions</td>
          <td>${giveaway.suggestions}</td>
        </tr>
        </tbody>
      </table>
      <hr>
        `
    },
    changeVisibility () {
      const button = document.getElementById('viewGiveaways')
      const div = document.getElementById('giveawaysList')
      const giveawaysArrow = document.getElementById('giveawaysArrow')

      if (!div || !button || !giveawaysArrow) {
        return false
      }

      const x = div.offsetParent

      if (x === null) {
        div.setAttribute('style', 'display:initial')
        button.textContent = 'Hide Giveaways'
        giveawaysArrow.textContent = 'arrow_drop_up'
        return
      }

      div.setAttribute('style', 'display:none')
      button.textContent = 'Show Giveaways'
      giveawaysArrow.textContent = 'arrow_drop_down'
    }
  }
})
</script>

<style>
</style>
