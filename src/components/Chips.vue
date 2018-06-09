<template>
  <div id='chips'>
    <v-avatar
      :tile="false"
      size="70"
      color="grey lighten-4"
      v-if="this.$store.state.auth.user && this.$store.state.auth.user.avatar"
    >
      <img :src="'https://cdn.discordapp.com/avatars/' + this.$store.state.auth.user.id + '/' + this.$store.state.auth.user.avatar + '.png'" />
    </v-avatar>
    <p v-if="!this.$store.state.site.desktop">Welcome to the unnoffical Natsuki GUI! This website is mostly for people that cannot/don't want to read the JSON on the official&nbsp;<a href="https://natsuki.tk/api/users">Natsuki API</a>.</p>
    <p v-if="!this.$store.state.site.desktop && !apiStatus()">The Natsuki API seems to be down, currently. How sad, nothing will work.</p>
    <v-container grid-list-xl>
    <v-flex>
      <v-chip label outline color="green" v-if="this.$store.state.site.desktop">Welcome to the unnoffical Natsuki GUI! This website is mostly for people that cannot/don't want to read the JSON on the official&nbsp;<a href="https://natsuki.tk/api/users">Natsuki API</a>.</v-chip>
    </v-flex>
    <v-flex>
      <v-chip label outline color="red" v-if="this.$store.state.site.desktop && !apiStatus()">The Natsuki API seems to be down, currently. How sad, nothing will work.</v-chip>
    </v-flex>
  </v-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    apiStatus () {
      try {
        axios.get('https://natsuki.tk/api/guilds').then(response => {
          return true
        })
      } catch (err) {
        return false
      }
    }
  }
}
</script>
