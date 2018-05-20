import Vue from 'vue'
import Router from 'vue-router'
// import Main from '@/components/Main'
import Vuetify from 'vuetify'
import Theme from '@/components/Theme'

Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Theme',
      component: Theme
    }
  ]
})
