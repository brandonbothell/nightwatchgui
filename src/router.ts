import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Guilds from './views/Guilds.vue'
import Users from './views/Users.vue'
import Giveaways from './views/Giveaways.vue'
import Referrals from './views/Referrals.vue'
import Profile from './views/Profile.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/guilds',
      name: 'Guilds',
      component: Guilds
    },
    {
      path: '/giveaways',
      name: 'Giveaways',
      component: Giveaways
    },
    {
      path: '/referrals',
      name: 'Referrals',
      component: Referrals
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
});
