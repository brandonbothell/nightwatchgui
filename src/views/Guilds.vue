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
            <div class='guilds'>
              <p style="font-size:20px">{{ msg }}</p>
              <v-tooltip right>
                <v-btn slot="activator" @click="changeVisibility()" icon large>
                  <v-icon large id="guildsArrow">arrow_drop_down</v-icon>
                </v-btn>
                <span id="viewGuilds">Show Guilds</span>
              </v-tooltip>
              <div id='guildsList' style="display:none">
                <table style="margin:auto" class="centered">
                <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody v-for="guild in guilds" :key="JSON.stringify(guild.id)" style="font-weight:normal">
                  <tr style="cursor:pointer" @click="loadGuildInfo(guild.id)">
                    <td>
                      {{ guild.name }}
                      <div :id="guild.id"></div>
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
import * as io from 'socket.io-client'
import axios from 'axios'
import Footer from '@/components/Footer.vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import Chips from '@/components/Chips.vue'
import Vue from 'vue'
import { apiUrl } from '@/config';

export default Vue.extend({
  name: 'Guilds',
  components: {
    customFooter: Footer,
    navigationDrawer: NavigationDrawer,
    chips: Chips
  },
  data () {
    return {
      msg: 'Hey, look! Guilds!',
      guilds: null,
      api: apiUrl,
      socket: io.connect(apiUrl)
    }
  },
  mounted () {
    this.socket.on('connect', (data: any) => {
      console.log('Connected')
      this.socket.emit('join', 'Hello server')
    })

    this.socket.on('info', (data: any) => {
      console.log('====================================')
      console.log(`Info message from the API: ${data}`)
      console.log('====================================')
    })

    this.socket.on('userLevelUpdated', (data: any) => {
      console.log('====================================')
      console.log('User Level Updated')
      console.log('====================================')
      console.log(data)
    })

    this.socket.on('userProfileUpdated', (data: any) => {
      console.log('====================================')
      console.log('User Profile Updated')
      console.log('====================================')
      console.log(data)
    })
  },
  created () {
    const x = window.innerWidth >= 1000

    this.$store.commit('setDesktop', x)
    this.loadGuilds()
  },
  methods: {
    loadGuilds () {
      if (this.guilds) {
        return true
      }
      axios.get(`${this.api}/guilds`).then(response => {
        this.guilds = response.data
      })
    },
    loadGuildInfo (id: string) {
      if (this.$store.state.opened.guildsOpen.includes(id)) {
        const guild = document.getElementById(id)

        if (!guild) {
          return false
        }

        guild.setAttribute('style', 'display:none')
        this.$store.commit('removeGuildsOpen', id)
        return true
      }
      if (this.$store.state.opened.guildsOpened.includes(id)) {
        const guild = document.getElementById(id)

        if (!guild) {
          return false
        }

        guild.setAttribute('style', 'display:initial')
        this.$store.commit('addGuildsOpen', id)
        return true
      }
      this.$store.commit('addGuildsOpen', id)
      this.$store.commit('addGuildsOpened', id)
      axios.get(`${this.api}/guilds/${id}`).then(response => {
        const div = document.getElementById(response.data.id)

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
          <td>${response.data.dateCreated}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>${response.data.id}</td>
        </tr>
        <tr>
          <td>Levels enabled</td>
          <td>${response.data.settings.levelsEnabled}</td>
        </tr>
        <tr>
        <td>DMs enabled</td>
        <td>${response.data.settings.directMessagesEnabled}</td>
        </tr>
        <tr>
          <td>DB ID</td>
          <td>${response.data.settings.id}</td>
        </tr>
        <tr>
          <td>Support tickets</td>
          <td>${response.data.supportTickets}</td>
        </tr>
        <tr>
          <td>Suggestions</td>
          <td>${response.data.suggestions}</td>
        </tr>
        </tbody>
      </table>
      <hr>
        `
      })
    },
    changeVisibility () {
      const button = document.getElementById('viewGuilds')
      const div = document.getElementById('guildsList')
      const guildsArrow = document.getElementById('guildsArrow')

      if (!div || !guildsArrow || !button) {
        return false
      }

      const x = div.offsetParent

      if (x === null) {
        div.setAttribute('style', 'display:initial')
        button.textContent = 'Hide Guilds'
        guildsArrow.textContent = 'arrow_drop_up'
      } else {
        div.setAttribute('style', 'display:none')
        button.textContent = 'Show Guilds'
        guildsArrow.textContent = 'arrow_drop_down'
      }
    }
  }
})
</script>

<style>
</style>
