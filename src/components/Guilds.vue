<template>
  <div class='guilds'>
      <h2>{{ msg }}</h2>
      <button type="button" id="visibilityButton" v-on:click="changeVisibility()">Show Guilds</button>
      <div id='guildsList' style="display:none">
        <h4 v-for="guild in guilds" :key="JSON.stringify(guild.id)" style="font-weight:normal">
          <a style="cursor:pointer" v-on:click="loadGuildInfo(guild.id)">{{ guild.name }}</a>
          <div :id="guild.id" style="display:block"></div>
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
        document.getElementById(id).setAttribute('style', 'display:block')
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
      let button = document.getElementById('visibilityButton')
      let div = document.getElementById('guildsList')
      var x = div.offsetParent
      if (x === null) {
        div.setAttribute('style', 'display:block')
        button.textContent = 'Hide Guilds'
      } else {
        div.setAttribute('style', 'display:none')
        button.textContent = 'Show Guilds'
      }
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
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}
</style>
