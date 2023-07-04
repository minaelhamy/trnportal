<template>
<nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-primaryz">
  <a>
    <router-link :to="{name: 'all_candidates'}" class="navbar-brand trn-logo-nav">
      <img src="../../../src/assets/images/ninja.svg" width="30" height="30" alt="profile-photo">
    </router-link>
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a><router-link :to="{ name: 'all_candidates' }" class="nav-link icons"><i class="fas fa-home"></i></router-link></a>
      </li>
      <li class="nav-item">
        <a><router-link :to="{ name: 'create_candidate' }" class="nav-link icons"><i class="fas fa-user-plus"></i></router-link></a>
      </li>
    </ul>
    <span class="navbar-text">
      <ul class="navbar-nav" v-if="user.authenticated">
        <a class="navbar-brand" href="#">
          <img v-bind:src="avatar" alt="profile-photo" class="profile-photo">
        </a>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ profile.userProfile.username }}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <h6 class="dropdown-header">Member #{{ profile.userProfile.id }}</h6>
            <h6 class="dropdown-header"><i class="fa fa-user"></i> {{ profile.userProfile.username }}</h6>
            <h6 class="dropdown-header pads"><i class="fas fa-at"></i> {{ profile.userProfile.email }}</h6>
            <a class="dropdown-item pointer" @click="logout()"><i class="fas fa-sign-out-alt"></i> Logout</a>
          </div>
        </li>
      </ul>
    </span>
  </div>
</nav>
</template>

<script>
import jwtDecode from 'jwt-decode'
import auth from '../../lib/auth'
import * as utils from '../../lib/utils'

export default {
  name: 'navigation',
  data () {
    return {
      user: {
        authenticated: false
      },
      profile: {},
      avatar: ''
    }
  },

  created: function() {
    this.grabProfile()
  },
      
  methods: {
    grabProfile() {
      let id_token = localStorage.getItem('id_token')
      if (id_token) {
        const decodedToken = jwtDecode(id_token)
        this.$store.dispatch('STORE_AUTHENTICATED', decodedToken)
      }
      this.profile = this.$store.state.member
      this.user.authenticated = this.profile.authStatus
      this.avatar = utils.getGravatarUrl(this.profile.userProfile.email, true)
    },

    logout() {
      auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
.icons {
  font-size: 1.5rem;
}

.nav-link, .navbar-text {
  color: rgba(255, 255, 255, .9) !important;

  &:hover {
    color: #000 !important;
  }
}

.navbar-text {
  a {
    color: #000;

    &:hover {
      color: #000;
    }
  }
}

.dropdown-item {
  &:hover {
    color: #fff !important;
    background-color: #6C55FB;
  }
}

.dropdown-menu {
  left: -120px;
  right: 22px;
}

.navbar-brand {
  padding: 0;
  margin: 0;
}

.nav-item:first-child {
  padding-left: 10px;
}
</style>