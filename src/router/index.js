/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Home from '@/components/Home'
import store from '../store'
import Users from '@/components/Users'

Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
