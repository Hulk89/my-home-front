import Vue from 'vue'
import Router from 'vue-router'

import store from './store' 

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Comics from './views/Comics.vue'
import ComicsList from './views/ComicsList.vue'
import EpisodeList from './views/EpisodeList.vue'
import Episode from './views/Episode.vue'

Vue.use(Router)

const requireAuth = (path) => (from, to, next) => {
    const isAuthenticated = store.getters.getIsAuth
    if (isAuthenticated) return next()
    console.log(from)
    next('/login?returnPath=' + from.fullPath)
}


export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: requireAuth('/')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      beforeEnter: requireAuth('/about')
    },
    {
      path: '/comics',
      name: 'comics',
      component: Comics,
      children: [
        { path: '/',
          component: ComicsList,
          beforeEnter: requireAuth('/comics')
        },
        { path: 'episode_list',
          component: EpisodeList,
          beforeEnter: requireAuth('/comics'),
          props(route) {
            return route.query || {}
          }
        },
        { path: 'episode',
          component: Episode,
          beforeEnter: requireAuth('/comics'),
          props(route) {
            return route.query || {}
          }
        }
      ]
    }
  ]
})
