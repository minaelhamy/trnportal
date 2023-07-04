<template>
<div class="home" id="404page">
  <h1>Oops, 404 Not Found!</h1>
  <p>Redirecting you shortly!</p>
</div>
</template>

<script>
  export default {
    data() {
      return {
        }
      },
      
      created: function() {
        this.redirectUser()
      },

      methods: {
        redirectUser: function() {
          setTimeout(() => {
           this.$router.push({name: 'all_candidates'})
          }, 3200)
        }
      }
    }
</script>