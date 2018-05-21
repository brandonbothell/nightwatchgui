<template>
  <div id="discordAuth">
    <v-btn style="background-color:#8aa1fc" v-if="!authenticated" @click="login()"><i class="fab fa-discord"/>&nbsp;Log in with Discord</v-btn>
    <span v-if="user">Hello there, {{user.username}}!</span>
    <v-btn style="background-color:#8aa1fc" v-on:click="showSelf()" v-if="user">My User</v-btn>
    <v-btn style="background-color:#8aa1fc" v-on:click="logout()" v-if="authenticated">Logout</v-btn>
  </div>
</template>

<script>
import axios from 'axios'
const CLIENT_ID = '399794061059424257'
const redirect = encodeURIComponent('http://natsukigui.tk/')

export default {
  data: () => ({
    authenticated: false,
    code: null,
    accessToken: null,
    user: null
  }),
  created () {
    const token = window.localStorage.getItem('token')
    const user = window.localStorage.getItem('user')
    if (token && user) {
      this.accessToken = token
      this.user = JSON.parse(user)
      this.authenticated = true
    } else if (token) {
      this.fetchUser()
    } else if (!this.accessToken && !this.user && this.$route.query.code) {
      this.code = this.$route.query.code
      this.fetchToken()
    }
  },
  methods: {
    login () {
      window.location = `https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`
    },
    logout () {
      window.localStorage.clear()
      this.authenticated = false
      this.user = null
      this.accessToken = null
      this.code = null
    },
    async fetchToken () {
      const response = await axios.get(`http://localhost:5001/api/auth/token/discord?code=${this.code}&redirect=${redirect}`)
      const json = response.data
      this.accessToken = json.access_token
      this.authenticated = true
      window.localStorage.setItem('token', this.accessToken)
      this.fetchUser()
    },
    async fetchUser () {
      const response = await axios.get('https://discordapp.com/api/users/@me', {headers: {Authorization: `Bearer ${this.accessToken}`}})
      const json = response.data
      this.user = json
      window.localStorage.setItem('user', JSON.stringify(this.user))
      window.location = 'http://natsukigui.tk'
    },
    showSelf () {
      let usersDoc = document.getElementById('usersData')
      let users = document.getElementById('usersList')
      if (usersDoc.offsetParent === null) {
        usersDoc.setAttribute('style', 'display:initial')
      }
      if (users.offsetParent === null) {
        users.setAttribute('style', 'display:initial')
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
      let user = document.getElementById(this.user.id)
      if (user) {
        this.loadUserInfo(this.user.id)
        user.scrollIntoView()
      }
      document.getElementById('usersArrow').textContent = 'arrow_drop_up'
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
