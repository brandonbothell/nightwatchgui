<template>
  <v-app id="inspire" dark>
    <navigationDrawer/>
    <v-content>
      <v-container fluid fill-height text-xs-center>
        <v-layout justify-center align-center row wrap>
          <v-avatar
          :tile="false"
          size="70"
          color="grey lighten-4"
          v-if="this.$store.state.auth.user && this.$store.state.auth.user.avatar"
          >
            <img :src="'https://cdn.discordapp.com/avatars/' + this.$store.state.auth.user.id + '/' + this.$store.state.auth.user.avatar + '.png'" />
          </v-avatar>
          <p v-if="!this.$store.state.site.desktop">Welcome to the unnoffical Natsuki GUI! This website is mostly for people that cannot/don't want to read the JSON on the official&nbsp;<a href="https://natsuki.tk/api/users">Natsuki API</a>.</p>
          <v-chip label outline color="green" v-if="this.$store.state.site.desktop">Welcome to the unnoffical Natsuki GUI! This website is mostly for people that cannot/don't want to read the JSON on the official&nbsp;<a href="https://natsuki.tk/api/users">Natsuki API</a>.</v-chip>
          <v-flex xs12>
            <v-btn large style="background-color:#8aa1fc" to="/users" id='usersButton'><v-icon>account_circle</v-icon> <span v-if="this.$store.state.site.desktop">View Users</span></v-btn>
            <v-btn large style="background-color:#8aa1fc" to="/guilds" id='guildsButton'><i class="fas fa-users"></i>&nbsp;<span v-if="this.$store.state.site.desktop">View Guilds</span></v-btn>
            <v-btn large style="background-color:#8aa1fc" to="/giveaways" id='giveawaysButton'><v-icon>card_giftcard</v-icon> <span v-if="this.$store.state.site.desktop">View Giveaways</span></v-btn>
            <v-btn large style="background-color:#8aa1fc" to="/referrals" id='referralsButton'><v-icon>arrow_forward</v-icon> <span v-if="this.$store.state.site.desktop">View Referrals</span></v-btn>
            <div id='usersData'>
              <p style="font-size:20px">{{ msg }}</p>
              <v-tooltip right>
                <v-btn slot="activator" @click="loadUsers();changeVisibility()" icon large>
                  <v-icon large id="usersArrow">arrow_drop_down</v-icon>
                </v-btn>
                <span id="viewUsers">Show Users</span>
              </v-tooltip>
              <div id='usersList' style="display:none">
                <table style="margin:auto" class="centered">
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody v-for="user in users" :key="JSON.stringify(user.id)" style="font-weight:normal">
                    <tr style="cursor:pointer" @click="loadUserInfo(user.id)">
                      <td>
                        {{ user.name }}
                        <div :id="user.id"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </v-flex>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn slot="activator" href="https://github.com/jasonhaxstuff/natsukigui" icon large target="_blank">
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

<script>
import axios from 'axios'
import Footer from './Footer.vue'
import NavigationDrawer from './NavigationDrawer.vue'
export default {
  name: 'Users',
  components: {
    'customFooter': Footer,
    'navigationDrawer': NavigationDrawer
  },
  data () {
    return {
      msg: 'Hey, look! Users!',
      users: null,
      headers: [
        {
          text: 'Property',
          align: 'center',
          sortable: false,
          value: 'property'
        },
        { text: 'Value', value: 'setting', align: 'center' }
      ]
    }
  },
  created: function () {
    let x = window.innerWidth >= 1000
    this.$store.commit('setDesktop', x)
  },
  methods: {
    loadUsers: function () {
      if (this.users) {
        return true
      }
      axios.get('https://natsuki.tk/api/users').then(response => {
        this.users = response.data
      })
    },
    loadUserInfo: function (id) {
      if (this.$store.state.opened.usersOpen.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:none')
        this.$store.commit('removeUsersOpen', id)
        return true
      }
      if (this.$store.state.opened.usersOpened.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:initial')
        this.$store.commit('addUsersOpen', id)
        return true
      }
      this.$store.commit('addUsersOpen', id)
      this.$store.commit('addUsersOpened', id)
      axios.get(`https://natsuki.tk/api/users/${id}`).then(response => {
        let div = document.getElementById(id)
        div.innerHTML = `
        <hr>
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
          <td>Avatar</td>
          <td><img src="${response.data.avatarUrl}" height="64" width="64"></td>
        </tr>
        <tr>
          <td>Banned</td>
          <td>${response.data.banned}</td>
        </tr>
        <tr>
          <td>Date of last message</td>
          <td>${response.data.dateLastMessage}</td>
        </tr>
        <tr>
          <td>XP</td>
          <td>${response.data.level.xp}</td>
        </tr>
        <tr>
          <td>Level</td>
          <td>${response.data.level.level}</td>
        </tr>
        <tr>
          <td>Last level up</td>
          <td>${response.data.level.timestamp}</td>
        </tr>
        <tr>
          <td>Balance</td>
          <td>${response.data.balance.balance}</td>
        </tr>
        <tr>
          <td>Net worth</td>
          <td>${response.data.balance.netWorth}</td>
        </tr>
        <tr>
          <td>Last claimed dailies</td>
          <td>${response.data.balance.dateLastClaimedDailies}</td>
        </tr>
        <tr>
          <td>Title</td>
          <td>${response.data.profile.title}</td>
        </tr>
        <tr>
          <td>Bio</td>
          <td>${response.data.profile.bio}</td>
        </tr>
        <tr>
          <td>Background</td>
          <td>${response.data.profile.background}</td>
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
        </tbody>
        </table>
        <hr>
        `
      })
    },
    changeVisibility: function () {
      let button = document.getElementById('viewUsers')
      let arrow = document.getElementById('usersArrow')
      let div = document.getElementById('usersList')
      var x = div.offsetParent
      if (x === null) {
        div.setAttribute('style', 'display:initial')
        button.textContent = 'Hide Users'
        arrow.textContent = 'arrow_drop_up'
      } else {
        div.setAttribute('style', 'display:none')
        button.textContent = 'Show Users'
        arrow.textContent = 'arrow_drop_down'
      }
    }
  }
}
</script>

<style>
</style>
