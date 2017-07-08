import {router} from '../index'
import Vue from 'vue'

const API_URL = 'http://localhost:3001/'
const LOGIN_URL = API_URL + 'sessions/create/'
const SIGNUP_URL = API_URL + 'users/'

export default {

  user: {
    authenticated: false
  },

  login(context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds)
      .then(data => {
        if (!data.id_token) {
          data = data.body;
        }

        localStorage.setItem('id_token', data.id_token)
        localStorage.setItem('access_token', data.access_token)
        
        this.user.authenticated = true

        if(redirect) {
          router.push(redirect)        
        }

    }, err => {
        context.error = err.body
    })
  },

  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds)
      .then(data => {
        if (!data.id_token) {
          data = data.body;
        }

        localStorage.setItem('id_token', data.id_token)
        localStorage.setItem('access_token', data.access_token)

        this.user.authenticated = true

        if(redirect) {
          router.push(redirect)        
        }

    }, err => {
        context.error = err.body
    })
  },

  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    
    if(jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false      
    }
  },


  getAuthHeader() {
    return {
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}
