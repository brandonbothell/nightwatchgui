<template>
  <div id="discordAuth">
    <button type="button" v-on:click="login()" v-if="!authenticated">Log in with Discord</button>
    <p v-if="user">Hello there, {{user.username}}!</p>
    <button type="button" v-on:click="showSelf()" v-if="user">My User</button>
    <button type="button" v-on:click="logout()" v-if="authenticated">Logout</button>
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
      let usersDoc = document.getElementById('usersList')
      if (usersDoc.offsetParent === null) {
        usersDoc.setAttribute('style', 'display:block')
      }
      let user = document.getElementById(this.user.id)
      this.loadUserInfo(this.user.id)
      user.scrollIntoView()
    },
    loadUserInfo (id) {
      document.getElementById(id).setAttribute('style', 'display:block')
      axios.get(`https://natsuki.tk/api/users/${id}`).then(response => {
        let div = document.getElementById(response.data.id)
        div.innerHTML = `
        <table style="width:40%;margin:auto">
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
          <th>Level info</th>
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
          <th>Balance info</th>
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
          <th>Profile info</th>
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
          <th>Settings</th>
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
        </table>
        <hr>
        `
      })
    }
  }
}
</script>

<style scoped>
button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  cursor: pointer;
}
button {
  background-color: #8aa1fc; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
