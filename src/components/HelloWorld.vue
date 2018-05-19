<template>
  <div class="hello">
    <h1>Welcome to the Natsuki GUI</h1>
    <br>
    <discordAuth></discordAuth>
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
  name: 'HelloWorld'
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
