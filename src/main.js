import Vue from 'vue'
import App from './App.vue'
import router from './route/router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//  请求超时时间
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
