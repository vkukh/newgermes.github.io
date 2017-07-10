<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li><router-link to="'home'">Home</router-link></li>
          <li v-if="user.authenticated"><router-link to="/secretquote">Secret Quote</router-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li v-if="!user.authenticated"><router-link to="/signup" class="glyphicon glyphicon-user">Sign Up</router-link></li>
          <li v-if="!user.authenticated"><router-link to="/login" class="glyphicon glyphicon-log-in">Login</router-link></li>

          <p v-if="user.authenticated" class="navbar-text glyphicon glyphicon-user">{{ username }}</p>
          <li v-if="user.authenticated"><router-link to="/login" @click.native="logout()" class="glyphicon glyphicon-log-out">Logout</router-link></li>
          
        </ul>
      </div>    
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import auth from '../auth'
export default {
  data() {
    return {
      user: auth.user,
      username: auth.getUserName()
    }
  },
  methods: {
    logout() {
      auth.logout()
    }
  },
  watch: {
    '$route' () {
      this.username = auth.getUserName()
    }
  }
}
</script>