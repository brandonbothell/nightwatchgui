<template>
  <div class='users'>
      <h2>{{ msg }}</h2>
      <button type="button" id="visibilityButton1" v-on:click="changeVisibility()">Show Users</button>
      <div id='usersList' style="display:none">
        <h4 v-for="user in users" :key="JSON.stringify(user.id)" style="font-weight:normal">
          <a style="cursor:pointer" v-on:click="loadUserInfo(user.id)">{{ user.name }}</a>
          <div :id="user.id"></div>
        </h4>
      </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'Users',
  data () {
    return {
      msg: 'Hey, look! Users!',
      users: null,
      usersOpen: [],
      opened: []
    }
  },
  created: function () {
    this.loadUsers()
  },
  methods: {
    loadUsers: function () {
      axios.get('https://natsuki.tk/api/users').then(response => {
        this.users = response.data
      })
    },
    loadUserInfo: function (id) {
      if (this.usersOpen.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:none')
        this.usersOpen.splice(this.usersOpen.indexOf(id), 1)
        return true
      }
      if (this.opened.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:block')
        this.usersOpen.push(id)
        return true
      }
      this.usersOpen.push(id)
      this.opened.push(id)
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
    },
    changeVisibility: function () {
      let button = document.getElementById('visibilityButton1')
      let div = document.getElementById('usersList')
      var x = div.offsetParent
      if (x === null) {
        div.setAttribute('style', 'display:block')
        button.textContent = 'Hide Users'
      } else {
        div.setAttribute('style', 'display:none')
        button.textContent = 'Show Users'
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
