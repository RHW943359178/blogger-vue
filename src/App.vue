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
      return this.$route.path === '/blogger/signIn' || this.$route.path === '/blogger/signUp' || this.$route.path === '/blogger/404'
    }
  },
  mounted() {
  }
}
</script>

<style>
  body {
    margin: 0;
  }
</style>
