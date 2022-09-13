import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import App from './App'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
