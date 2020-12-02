import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    home,
    user
  }
})

export default store