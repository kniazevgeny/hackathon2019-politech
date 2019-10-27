// Dependencies
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Searche from '../views/Search.vue'
import { store } from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/i',
      name: 'home',
      component: Home,
    },
    {
      path: '*',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/search',
      name: 'search',
      component: Searche,
    },
  ],
})

router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const user = store.state.user

  if (requiresAuth && !user) {
    next('/')
  } else {
    if (to.path === '/' && user) {
      next('/profile')
    } else {
      next()
    }
  }
})

export default router
