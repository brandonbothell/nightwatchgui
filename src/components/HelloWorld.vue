<template>
  <div class="hello">
    <h1>Welcome to the Natsuki GUI</h1>
    <br>
    <discordAuth></discordAuth>
    <br>
    <div id="currentUser"></div>
    <br>
    <span>
      Welcome to the unnoffical Natsuki GUI! This website is mostly for people that cannot/don't
      want to read the JSON on the official <a href="https://natsuki.tk/api/users" target="_blank">Natsuki API</a>.
    </span>
    <br>
    <guilds></guilds>
    <hr>
    <users></users>
    <hr>
    <giveaways></giveaways>
    <hr>
    <referrals></referrals>
    <br>
    <credits></credits>
  </div>
</template>

<script>
import Guilds from './Guilds.vue'
import Users from './Users.vue'
import Giveaways from './Giveaways.vue'
import Referrals from './Referrals.vue'
import DiscordAuth from './DiscordAuth.vue'
import Credits from './Credits.vue'
export default {
  components: {
    'guilds': Guilds,
    'users': Users,
    'giveaways': Giveaways,
    'referrals': Referrals,
    'discordAuth': DiscordAuth,
    'credits': Credits
  },
  name: 'HelloWorld',
  created () {
    document.title = 'Natsuki GUI'

    let link = document.querySelector("link[rel*='icon']") || document.createElement('link')
    link.type = 'image/x-icon'
    link.rel = 'shortcut icon'
    link.href = 'http://www.iconj.com/ico/6/x/6xos2lmpgp.ico'
    document.getElementsByTagName('head')[0].appendChild(link)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}

#menubar li {
  display: inline;
}
#menubar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
body {
  background-color: #303030;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
hr {
  border-color: #212121;
}
a {
  color: #42b983;
}
</style>
