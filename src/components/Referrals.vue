<template>
  <div class='referrals'>
      <p style="font-size:20px">{{ msg }}</p>
      <v-tooltip right>
        <v-btn slot="activator" @click="changeVisibility()" icon large>
          <v-icon large id="referralsArrow">arrow_drop_down</v-icon>
        </v-btn>
        <span id="viewReferrals">Show Users</span>
      </v-tooltip>
      <div id='referralsList' style="display:none">
        <h4 v-for="referral in referrals" :key="JSON.stringify(referral.id)" style="font-weight:normal">
          <a style="cursor:pointer" v-on:click="loadReferralInfo(referral.id)">{{ referral.name }}</a>
          <div :id="referral.id" style="display:initial"></div>
        </h4>
      </div>
  </div>
</template>

<script>
// import io from 'socket.io-client'
import axios from 'axios'
export default {
  name: 'Referrals',
  data () {
    return {
      msg: 'Hey, look! Referrals!',
      referrals: null,
      referralsOpen: [],
      opened: []
      // socket: io.connect('http://51.15.224.123:5000/', {transports: ['websocket']})
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
    this.loadReferrals()
  },
  methods: {
    loadReferrals: function () {
      axios.get('https://natsuki.tk/api/referrals').then(response => {
        this.referrals = response.data
      })
    },
    loadReferralInfo: function (id) {
      if (this.referralsOpen.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:none')
        this.referralsOpen.splice(this.referralsOpen.indexOf(id), 1)
        return true
      }
      if (this.opened.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:block')
        this.referralsOpen.push(id)
        return true
      }
      this.referralsOpen.push(id)
      this.opened.push(id)
      axios.get(`https://natsuki.tk/api/referrals/${id}`).then(response => {
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
      let button = document.getElementById('viewReferrals')
      let div = document.getElementById('referralsList')
      var x = div.offsetParent
      if (x === null) {
        div.setAttribute('style', 'display:initial')
        button.textContent = 'Hide Referrals'
        document.getElementById('referralsArrow').textContent = 'arrow_drop_up'
      } else {
        div.setAttribute('style', 'display:none')
        button.textContent = 'Show Referrals'
        document.getElementById('referralsArrow').textContent = 'arrow_drop_down'
      }
    }
  }
}
</script>

<style>
</style>
