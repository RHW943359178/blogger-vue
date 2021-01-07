import Vue from 'vue'
import App from './App.vue'
import router from './route/router.js'
import ElementUI from 'element-ui'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' //样式文件
import * as socketApi from './utils/socket'
import './utils/directives.js'
//  引入全局inco
import '@/icons'

Vue.config.productionTip = false

Vue.prototype.socketApi = socketApi
Vue.use(ElementUI)
Vue.use(mavonEditor)

//  路由校验
router.beforeEach((to, from, next) => {
  //  获取用户登录成功后储存的登录状态
  let getFlag = localStorage.getItem("flag")
  if (getFlag === "isLogin") {
    //  设置vuex登录状态为已登录
    store.state.isLogin = true
    next()
    //  如果已经登录，还想进入登录主页页面，则定向回首页
    // if (!to.meta.isLogin) {
    //   ElementUI.Message({type: 'warning', message: '请先退出登录', duration: 3000})
    //   next({
    //     path: '/blogger'
    //   })
    // }
  } else {
    //  用户想进入需要登录的页面，则定向回登录页面
    if(to.meta.isLogin) {
      next({
        path: '/blogger/signUp'
      })
      ElementUI.Message({type: 'warning', message: '请先登录', duration: 3000})
    } else {
      next()
    }
  }
})

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})

new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
}).$mount('#app')
