import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    member: {}
  },

  actions: {
    STORE_AUTHENTICATED: function({ commit }, new_info) {
      let set_new = {
        authStatus: true,
        userProfile: new_info
      }
      commit('STORE_AUTHENTICATED_MUTATION', set_new)
    },

    DELETE_AUTHENTICATED: function({ commit }, info) {
      commit('DELETE_AUTHENTICATED_MUTATION', info)
    }
  },

  mutations: {
    STORE_AUTHENTICATED_MUTATION: function(state, new_info) {
      state.member = new_info
    },
    DELETE_AUTHENTICATED: function(state, info) {
      state.member.authStatus = info 
    }
  }
})

export default store