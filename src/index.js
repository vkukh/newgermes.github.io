import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import SecretQuote from './components/SecretQuote.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)
import auth from './auth'
import AUTH0_VARIABLES from './auth/AUTH0_VARIABLES'
import Auth0Lock from 'auth0-lock'

Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

// Check the user's auth status when the app starts
auth.checkAuth()

let auth0_variables = new AUTH0_VARIABLES;
let lock = new Auth0Lock(auth0_variables.client_id, auth0_variables.domain)

let routes = [
      {path: '/home', component: Home},
      {path: '/secretquote', component: SecretQuote},
      {path: '/login', component: Login},
      {path: '/signup', component: Signup},
      {path: '*', redirect: '/home' }
    ]

let router = new VueRouter({
    mode: 'history',
    routes
})
  
const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export {router, lock};
