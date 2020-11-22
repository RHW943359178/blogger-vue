import Vue from 'vue'
import App from './App.vue'
import router from './route/router.js'
import ElementUI from 'element-ui'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

//  请求超时时间
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
}).$mount('#app')
