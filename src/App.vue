<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/public/Header'
export default {
  components: {
    Header
  }
}
</script>

<style>
  body {
    margin: 0;
  }
</style>
