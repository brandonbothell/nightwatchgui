<template>
  <div class='giveaways'>
      <p style="font-size:20px">{{ msg }}</p>
      <v-tooltip right>
        <v-btn slot="activator" @click="changeVisibility()" icon large>
          <v-icon large id="giveawaysArrow">arrow_drop_down</v-icon>
        </v-btn>
        <span id="viewGiveaways">Show Giveaways</span>
      </v-tooltip>
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
      giveaways: null
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
      if (this.$store.state.opened.giveawaysOpen.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:none')
        this.$store.commit('removeGiveawaysOpen', id)
        return true
      }
      if (this.$store.state.opened.giveawaysOpened.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:initial')
        this.$store.commit('addUsersOpen', id)
        return true
      }
      this.$store.commit('addGiveawaysOpen', id)
      this.$store.commit('addGiveawaysOpened', id)
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
      let button = document.getElementById('viewGiveaways')
      let div = document.getElementById('giveawaysList')
      var x = div.offsetParent
      if (x === null) {
        div.setAttribute('style', 'display:initial')
        button.textContent = 'Hide Giveaways'
        document.getElementById('giveawaysArrow').textContent = 'arrow_drop_up'
      } else {
        div.setAttribute('style', 'display:none')
        button.textContent = 'Show Giveaways'
        document.getElementById('giveawaysArrow').textContent = 'arrow_drop_down'
      }
    }
  }
}
</script>

<style>
</style>
