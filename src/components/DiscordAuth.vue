<template>
  <div id="discordAuth">
    <v-btn style="background-color:#8aa1fc" v-if="!this.$store.state.auth.authenticated" @click="login()"><i class="fab fa-discord"/>&nbsp;<span v-if="this.$store.state.site.desktop">Log in with Discord</span></v-btn>
    <span v-if="this.$store.state.auth.user && this.$store.state.site.desktop">Hello there, {{this.$store.state.auth.user.username}}!</span>
    <v-btn style="background-color:#8aa1fc" to="/profile" v-if="this.$store.state.auth.user" id="selfButton"><v-icon>person</v-icon> <span v-if="this.$store.state.site.desktop">Profile</span></v-btn>
    <v-btn style="background-color:#8aa1fc" v-on:click="logout()" v-if="this.$store.state.auth.authenticated"><i class="fas fa-sign-out-alt"/>&nbsp;<span v-if="this.$store.state.site.desktop">Logout</span></v-btn>
  </div>
</template>

<script>
import axios from 'axios'
const CLIENT_ID = '399794061059424257'
var redirect
if (window.location.toString().includes('natsukigui')) {
  redirect = encodeURIComponent('http://www.natsukigui.tk/')
} else if (window.location.toString().includes('localhost')) {
  redirect = encodeURIComponent('http://localhost:8080/')
}

export default {
  data: () => ({
  }),
  created () {
    const token = window.localStorage.getItem('token')
    const user = window.localStorage.getItem('user')
    if (token && user) {
      this.$store.commit('setToken', token)
      this.$store.commit('setUser', JSON.parse(user))
      this.$store.commit('setAuthenticated', true)
    } else if (token) {
      this.fetchUser()
    } else if (!this.$store.state.auth.accessToken && !this.$store.state.auth.user && this.$route.query.code) {
      this.$store.commit('setCode', this.$route.query.code)
      this.fetchToken()
    }
  },
  methods: {
    login () {
      window.location = `https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`
    },
    logout () {
      window.localStorage.clear()
      this.$store.commit('setAuthenticated', false)
      this.$store.commit('setCode', null)
      this.$store.commit('setToken', null)
      this.$store.commit('setUser', null)
    },
    async fetchToken () {
      const response = await axios.get(`http://192.243.102.112:8000/discordauth?code=${this.$store.state.auth.code}&redirect=${redirect}`)
      const json = response.data
      this.$store.commit('setToken', json.access_token)
      this.$store.commit('setAuthenticated', true)
      window.localStorage.setItem('token', this.$store.state.auth.accessToken)
      this.fetchUser()
    },
    async fetchUser () {
      const response = await axios.get('https://discordapp.com/api/users/@me', {headers: {Authorization: `Bearer ${this.$store.state.auth.accessToken}`}})
      const json = response.data
      this.$store.commit('setUser', json)
      window.localStorage.setItem('user', JSON.stringify(this.$store.state.auth.user))
      if (window.location.toString().includes('natsukigui')) {
        window.location = 'http://www.natsukigui.tk'
      } else if (window.location.toString().includes('localhost')) {
        window.location = 'http://localhost:8080'
      }
    },
    loadUserInfo (id) {
      document.getElementById(id).setAttribute('style', 'display:initial')
      if (this.$store.state.opened.usersOpen.includes(id)) {
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
        let div = document.getElementById(response.data.id)
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
    }
  }
}
</script>

<style>
</style>
