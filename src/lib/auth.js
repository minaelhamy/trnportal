import request from 'superagent'
import jwtDecode from 'jwt-decode'
import config from '../../config'

// URL and endpoint constants
const API_URL = process.env.NODE_ENV === 'development' ? config.dev.serviceUrl : config.build.serviceUrl
const LOGIN_URL = API_URL + '/sessions/create/'
const SIGNUP_URL = API_URL + '/users/'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  async login(creds, redirect, cb) {
    request.post(LOGIN_URL)
      .send({ payload: creds })
      .then((res) => {
        if (res.statusCode === 201) {
          localStorage.setItem('id_token', res.body.id_token)
          localStorage.setItem('access_token', res.body.access_token)
          if (cb) cb(true)
          this.user.authenticated = true
        }
      })
      .catch((err) => {
        console.log('Error logging user', err)
        if (cb) cb(false)
      })
  },

  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)
      localStorage.setItem('access_token', data.access_token)
      this.user.authenticated = true
    })
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    this.user.authenticated = false
    window.location = '/?signout=true'
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}