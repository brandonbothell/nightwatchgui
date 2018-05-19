<template>
  <div id="discordAuth">
    <button type="button" v-on:click="login()" v-if="!authenticated">Log in with Discord</button>
    <p v-if="user">Hello there, {{user.username}}!</p>
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
