import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage'
import AboutPage from '@/pages/AboutPage'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'MainPage',
      component: MainPage,
      meta: {
        keepAlive: true,
        title: "fabulous"
      }
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage,
      meta: {
        keepAlive: true,
        title: "关于"
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
