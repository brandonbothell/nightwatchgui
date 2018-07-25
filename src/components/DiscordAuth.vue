<template>
  <div id="discordAuth">
    <v-btn style="background-color:#4286f4" v-if="!this.$store.state.auth.authenticated" @click="login()"><i class="fab fa-discord"/>&nbsp;<span v-if="this.$store.state.site.desktop">Log in with Discord</span></v-btn>
    <span v-if="this.$store.state.auth.user && this.$store.state.site.desktop">Hello there, {{this.$store.state.auth.user.username}}!</span>
    <v-btn style="background-color:#4286f4" to="/profile" v-if="this.$store.state.auth.user" id="selfButton"><v-icon>person</v-icon> <span v-if="this.$store.state.site.desktop">Profile</span></v-btn>
    <v-btn style="background-color:#4286f4" v-on:click="logout()" v-if="this.$store.state.auth.authenticated"><i class="fas fa-sign-out-alt"/>&nbsp;<span v-if="this.$store.state.site.desktop">Logout</span></v-btn>
  </div>
</template>

<script lang='ts'>
import axios from 'axios'
import Vue from 'vue'
import { stripIndents } from 'common-tags'

const CLIENT_ID = '399794061059424257'
let redirect: string

if (window.location.toString().includes('nightwatch')) {
  redirect = encodeURIComponent('http://www.nightwatch.ga/')
} else if (window.location.toString().includes('localhost')) {
  redirect = encodeURIComponent('http://localhost:8080/')
}

export default Vue.extend({
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
      window.location.href = `https://discordapp.com/oauth2/authorize?client_id=${
        CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`
    },
    logout () {
      window.localStorage.clear()
      this.$store.commit('setAuthenticated', false)
      this.$store.commit('setCode', null)
      this.$store.commit('setToken', null)
      this.$store.commit('setUser', null)
    },
    async fetchToken () {
      const response = await axios.get(`http://192.243.102.112:8000/discordauth?code=${
        this.$store.state.auth.code}&redirect=${redirect}`)
      const json = response.data
      this.$store.commit('setToken', json[0].access_token)
      this.$store.commit('setAuthenticated', true)
      window.localStorage.setItem('token', this.$store.state.auth.accessToken)
      this.fetchUser()
    },
    async fetchUser () {
      const { data: user } = await axios.get('https://discordapp.com/api/users/@me', {
        headers: { Authorization: `Bearer ${this.$store.state.auth.accessToken}` }
      })

      this.$store.commit('setUser', user)
      window.localStorage.setItem('user', JSON.stringify(this.$store.state.auth.user))

      if (window.location.toString().includes('nightwatch')) {
        window.location.href = 'http://www.nightwatch.ga'
      } else if (window.location.toString().includes('localhost')) {
        window.location.href = 'http://localhost:8080'
      }
    }
  }
})
</script>
