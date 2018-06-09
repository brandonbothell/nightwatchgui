<template>
  <v-app id="inspire" dark>
    <navigationDrawer/>
    <v-content>
      <v-container fluid fill-height text-xs-center>
        <v-layout justify-center align-center row wrap>
          <chips></chips>
          <v-flex xs12>
            <v-btn large style="background-color:#8aa1fc" to="/users" id='usersButton'><v-icon>account_circle</v-icon> <span v-if="this.$store.state.site.desktop">View Users</span></v-btn>
            <v-btn large style="background-color:#8aa1fc" to="/guilds" id='guildsButton'><i class="fas fa-users"></i>&nbsp;<span v-if="this.$store.state.site.desktop">View Guilds</span></v-btn>
            <v-btn large style="background-color:#8aa1fc" to="/giveaways" id='giveawaysButton'><v-icon>card_giftcard</v-icon> <span v-if="this.$store.state.site.desktop">View Giveaways</span></v-btn>
            <v-btn large style="background-color:#8aa1fc" to="/referrals" id='referralsButton'><v-icon>arrow_forward</v-icon> <span v-if="this.$store.state.site.desktop">View Referrals</span></v-btn>
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
    <customFooter></customFooter>
  </v-app>
</template>

<script>
import DiscordAuth from './DiscordAuth.vue'
import NavigationDrawer from './NavigationDrawer.vue'
import Footer from './Footer.vue'
import Chips from './Chips.vue'
export default {
  components: {
    'discordAuth': DiscordAuth,
    'navigationDrawer': NavigationDrawer,
    'customFooter': Footer,
    'chips': Chips
  },
  data: () => ({
  }),
  created () {
    if (!window.location.toString().includes('www.') && !window.location.toString().includes('localhost')) {
      window.location = 'http://www.natsukigui.tk'
    }
    let x = window.innerWidth >= 1000
    this.$store.commit('setDesktop', x)
  }
}
</script>
