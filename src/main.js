import Vue from 'vue'
import VueRouter from 'vue-router'
import infiniteScroll from 'vue-infinite-scroll'
import routes from './router'
import App from './App'

Vue.use(VueRouter)
Vue.use(infiniteScroll)

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
