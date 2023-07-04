<template>
<div class="home login-root" style="margin: 0px; padding: 0px; height: 100%; min-height: 100vh;">
  <div class="col-sm-3 col-sm-offset-4" style="margin: 0 auto; padding: 100px 10px; padding-bottom: 0;">
    <div class="brand">
      <img src="../../src/assets/images/ninja.svg" class="login-logo" alt="login-logo">
      <h4 class="login-header">TechRecruit Ninja</h4>
      <span>Tech it and use it!</span>
    </div>
    <hr class="style-six">
    <h2>Log In</h2>
    <p>Log in to gain access to the system.</p>
    <div class="alert alert-danger" v-if="error">
      <p style="font-size:17px;">Invalid username and password entered! <i class="far fa-frown"></i> Try again.</p>
    </div>
    <form v-on:submit.prevent="submit">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Username or email address" v-model="credentials.username" required>
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Password" v-model="credentials.password" required>
      </div>
      <button class="btn btn-primary">Sign in</button>
      </form>
  </div>
</div>
</template>

<script>
import auth from '../lib/auth'
  export default {
    data() {
      return {
        // We need to initialize the component with any
        // properties that will be used in it
        credentials: {
          username: '',
          password: ''
        },
        error: false
      }
    },
    methods: {
      submit() {
        let credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }
        auth.login(credentials, 'home', authedIn => {
          if (!authedIn) { // If not authenticated, throw an error
            this.error = true
          } else {
            window.location = '/home'
          }
        })
      }
    }

  }
</script>