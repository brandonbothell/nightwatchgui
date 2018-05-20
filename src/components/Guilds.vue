<template>
  <div class='guilds'>
      <p style="font-size:20px">{{ msg }}</p>
      <v-tooltip right>
        <v-btn slot="activator" @click="changeVisibility()" icon large>
          <v-icon large id="guildsArrow">arrow_drop_down</v-icon>
        </v-btn>
        <span id="viewGuilds">Show Guilds</span>
      </v-tooltip>
      <div id='guildsList' style="display:none">
        <h4 v-for="guild in guilds" :key="JSON.stringify(guild.id)" style="font-weight:normal">
          <a style="cursor:pointer" v-on:click="loadGuildInfo(guild.id)">{{ guild.name }}</a>
          <div :id="guild.id" style="display:initial"></div>
        </h4>
      </div>
  </div>
</template>

<script>
// import io from 'socket.io-client'
import axios from 'axios'
export default {
  name: 'Guilds',
  data () {
    return {
      msg: 'Hey, look! Guilds!',
      guilds: null,
      guildsOpen: [],
      opened: []
      // socket: io.connect('http://51.15.224.123:5000/')
    }
  },
  /* mounted () {
    this.socket.on('connect', (data) => {
      console.log('Connected')
      this.socket.emit('join', 'Hello server')
    })

    this.socket.on('info', (data) => {
      console.log('====================================')
      console.log(`Info message from the API: ${data}`)
      console.log('====================================')
    })

    this.socket.on('userLevelUpdated', (data) => {
      console.log('====================================')
      console.log('User Level Updated')
      console.log('====================================')
      console.log(data)
    })

    this.socket.on('userProfileUpdated', (data) => {
      console.log('====================================')
      console.log('User Profile Updated')
      console.log('====================================')
      console.log(data)
    })
  }, */
  created: function () {
    this.loadGuilds()
  },
  methods: {
    loadGuilds: function () {
      if (this.guilds) {
        return true
      }
      axios.get('https://natsuki.tk/api/guilds').then(response => {
        this.guilds = response.data
      })
    },
    loadGuildInfo: function (id) {
      if (this.guildsOpen.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:none')
        this.guildsOpen.splice(this.guildsOpen.indexOf(id), 1)
        return true
      }
      if (this.opened.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:initial')
        this.guildsOpen.push(id)
        return true
      }
      this.guildsOpen.push(id)
      this.opened.push(id)
      axios.get(`https://natsuki.tk/api/guilds/${id}`).then(response => {
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
        <tr>
          <td>Support tickets</td>
          <td>${response.data.supportTickets}</td>
        </tr>
        <tr>
          <td>Suggestions</td>
          <td>${response.data.suggestions}</td>
        </tr>
      </table>
      <hr>
        `
      })
    },
    changeVisibility: function () {
      let button = document.getElementById('viewGuilds')
      let div = document.getElementById('guildsList')
      var x = div.offsetParent
      if (x === null) {
        div.setAttribute('style', 'display:initial')
        button.textContent = 'Hide Guilds'
        document.getElementById('guildsArrow').textContent = 'arrow_drop_up'
      } else {
        div.setAttribute('style', 'display:none')
        button.textContent = 'Show Guilds'
        document.getElementById('guildsArrow').textContent = 'arrow_drop_down'
      }
    }
  }
}
</script>

<style>
</style>
