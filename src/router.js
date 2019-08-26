import Vue from 'vue'
import Router from 'vue-router'

import store from './store' 
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

const requireAuth = (path) => (from, to, next) => {
    const isAuthenticated = store.getters.getIsAuth
    if (isAuthenticated) return next()
    next('/login?returnPath=' + path)
}


export default new Router({
  mode: 'history',
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
      component: { template: '<router-view></router-view>' },
      children: [
        { path: '/',
            component: { template: '<div>Comics List<router-link to="comics/episode_list/1">to</router-link></div>' }
        },
        { path: 'episode_list/:id',
            component: { template: '<div>Episode List<br/>id:{{this.$route.params.id}}</div>' }
        }
      ]
    }
  ]
})
