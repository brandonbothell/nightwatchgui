<template>
  <div class='giveaways'>
      <h2>{{ msg }}</h2>
      <button type="button" id="visibilityButton2" v-on:click="changeVisibility()">Show Giveaways</button>
      <div id='giveawaysList' style="display:none">
        <h4 v-for="giveaway in giveaways" :key="JSON.stringify(giveaway.id)" style="font-weight:normal">
          <a style="cursor:pointer" v-on:click="loadGiveawayInfo(giveaway.id)">{{ giveaway.name }}</a>
          <div :id="giveaway.id" style="display:block"></div>
        </h4>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Giveaways',
  data () {
    return {
      msg: 'Hey, look! Giveaways!',
      giveaways: null,
      giveawaysOpen: [],
      opened: []
    }
  },
  created: function () {
    this.loadGiveaways()
  },
  methods: {
    loadGiveaways: function () {
      axios.get('https://natsuki.tk/api/giveaways').then(response => {
        this.giveaways = response.data
      })
    },
    loadGiveawayInfo: function (id) {
      if (this.giveawaysOpen.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:none')
        this.giveawaysOpen.splice(this.giveawaysOpen.indexOf(id), 1)
        return true
      }
      if (this.opened.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:block')
        this.giveawaysOpen.push(id)
        return true
      }
      this.giveawaysOpen.push(id)
      this.opened.push(id)
      axios.get(`https://natsuki.tk/api/giveaways/${id}`).then(response => {
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
      let button = document.getElementById('visibilityButton2')
      let div = document.getElementById('giveawaysList')
      var x = div.offsetParent
      if (x === null) {
        div.setAttribute('style', 'display:block')
        button.textContent = 'Hide Giveaways'
      } else {
        div.setAttribute('style', 'display:none')
        button.textContent = 'Show Giveaways'
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
