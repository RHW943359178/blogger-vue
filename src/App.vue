<template>
  <div id="app">
    <Header v-show="!currentPath" />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/public/Header'
export default {
  components: {
    Header
  },
  computed: {
    currentPath() {
      return this.$route.path === '/blogger/signIn' || this.$route.path === '/blogger/signUp'
    }
  }
}
</script>

<style>
  body {
    margin: 0;
  }
</style>
