<template>
  <div v-bind:class="{ 'container-fluid noMarginLr': ['login'].indexOf($route.name) >= 0, 'container': ['login'].indexOf($route.name) < 0  }">
      <navigation v-if="['login', 'register', 'root'].indexOf($route.name) < 0"></navigation>
      <div id="page">
        <transition name="fade">     
          <router-view></router-view>
        </transition>    
      </div>
      <footers v-if="['login', 'register', 'root'].indexOf($route.name) < 0"></footers>
  </div>
</template>

<style lang="scss">
    .fade-enter-active, .fade-leave-active {
      transition: opacity .3s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
</style>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>
