import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import user from './modules/user';
import articleDetail from './modules/articleDetail';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    home,
    user,
    articleDetail
  }
});

export default store;
