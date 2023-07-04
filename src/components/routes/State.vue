<template>
<div></div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
 
  name: 'state',
  data () {
    return {
    }
  },

  created() {
    this.setState()
  },

  methods: {
    setState() {
      let id_token = localStorage.getItem('id_token')
      if (id_token) {
        const decodedToken = jwtDecode(id_token)
        this.$store.dispatch('STORE_AUTHENTICATED', decodedToken)
        this.$router.push({name: 'all_candidates'})

      } else {
        this.$store.dispatch('DELETE_AUTHENTICATED', 'false')
        this.$router.push({name: 'root'})
      }
    }
  }
}

</script>