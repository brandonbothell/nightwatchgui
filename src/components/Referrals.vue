<template>
  <div class='referrals'>
      <h2>{{ msg }}</h2>
      <button type="button" id="visibilityButton3" v-on:click="changeVisibility()">Show Referrals</button>
      <div id='referralsList' style="display:none">
        <h4 v-for="referral in referrals" :key="JSON.stringify(referral.id)" style="font-weight:normal">
          <a style="cursor:pointer" v-on:click="loadReferralInfo(referral.id)">{{ referral.name }}</a>
          <div :id="referral.id" style="display:block"></div>
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
      let button = document.getElementById('visibilityButton3')
      let div = document.getElementById('referralsList')
      var x = div.offsetParent
      if (x === null) {
        div.setAttribute('style', 'display:block')
        button.textContent = 'Hide Referrals'
      } else {
        div.setAttribute('style', 'display:none')
        button.textContent = 'Show Referrals'
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
