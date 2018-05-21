<template>
  <v-app id="inspire" dark>
    <navigationDrawer/>
    <v-content>
      <v-container fluid fill-height text-xs-center>
        <v-layout justify-center align-center row wrap>
          <v-chip label outline color="green">Welcome to the unnoffical Natsuki GUI! This website is mostly for people that cannot/don't want to read the JSON on the official&nbsp;<a href="https://natsuki.tk/api/users">Natsuki API</a>.</v-chip>
          <v-flex xs12>
            <v-btn large style="background-color:#8aa1fc" @click="showUsers()" id=usersButton>View Users</v-btn>
            <users style="display:none" id='usersData'/>
            <guilds style="display:none" id='guildsData'/>
            <giveaways style="display:none" id='giveawaysData'/>
            <referrals style="display:none" id='referralsData'/>
          </v-flex>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn slot="activator" href="https://github.com/jasonhaxstuff/natsukigui" icon large target="_blank">
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2018 JasonHaxStuff | Thanks to Tanner Goins for allowing me to use code from his Discord bot, <a href="https://github.com/NatsukiBot" target="_blank">Natsuki</a>'s API.</span>
    </v-footer>
  </v-app>
</template>

<script>
import Guilds from './Guilds.vue'
import Users from './Users.vue'
import Giveaways from './Giveaways.vue'
import Referrals from './Referrals.vue'
import DiscordAuth from './DiscordAuth.vue'
import NavigationDrawer from './NavigationDrawer.vue'
export default {
  components: {
    'guilds': Guilds,
    'users': Users,
    'giveaways': Giveaways,
    'referrals': Referrals,
    'discordAuth': DiscordAuth,
    'navigationDrawer': NavigationDrawer
  },
  data: () => ({
  }),
  created () {
    document.title = 'Natsuki GUI'
  },
  methods: {
    showUsers () {
      let users = document.getElementById('usersData')
      if (users) {
        if (!users.offsetParent) {
          this.dashboard()
          users.setAttribute('style', 'display:initial')
          document.getElementById('usersButton').setAttribute('style', 'background-color:#8aa1fc;display:initial')
        }
        document.getElementById('usersButton').setAttribute('style', 'background-color:#8aa1fc;display:none')
        this.drawer = false
      }
    },
    dashboard () {
      if (document.getElementById('usersData').offsetParent !== null) {
        document.getElementById('usersData').setAttribute('style', 'display:none')
      }
      if (document.getElementById('guildsData').offsetParent !== null) {
        document.getElementById('guildsData').setAttribute('style', 'display:none')
      }
      if (document.getElementById('giveawaysData').offsetParent !== null) {
        document.getElementById('giveawaysData').setAttribute('style', 'display:none')
      }
      if (document.getElementById('referralsData').offsetParent !== null) {
        document.getElementById('referralsData').setAttribute('style', 'display:none')
      }
      this.drawer = false
    }
  }
}
</script>
