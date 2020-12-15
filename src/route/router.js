import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import My from '../views/My'
import ArticleEditor from '../views/ArticleEditor'
import ArticleDetail from '../views/ArticleDetail'
import signIn from '../views/SignIn'
import signUp from '../views/SignUp'
import authorHome from '../views/AuthorHome'
import errorPage from '../views/ErrorPage.vue'

Vue.use(Router)

const router = new Router({
  // mode: 'hash',
  routes: [
    { // 主页
      path: '/blogger',
      name: 'home', 
      component: Home,
      meta: {
        isLogin: false
      }
    },
    { //  投稿
      path: '/blogger/articleEditor', 
      name: 'articleEditor', 
      component: ArticleEditor,
      meta: {
        isLogin: true
      }
    },
    { //  我的
      path: '/blogger/my', 
      name: 'my', 
      component: My,
      meta: {
        isLogin: true
      }
    },
    { //  文章详情
      path: '/blogger/article', 
      name: 'articleDetail', 
      component: ArticleDetail,
      meta: {
        isLogin: false
      }
    },
    { //  注册
      path: '/blogger/signIn',
      name: 'articleDetail', 
      component: signIn,
      meta: {
        isLogin: false
      }
    },
    { //  登录
      path: '/blogger/signUp', 
      name: 'articleDetail', 
      component: signUp,
      meta: {
        isLogin: false
      }
    },{
      path: '/blogger/authorHome',
      name: 'authorHome',
      component: authorHome,
    },
    { //  统一的错误页面
      path: '/blogger/404', 
      name: 'errorPage', 
      component: errorPage,
      meta: {
        isLogin: false
      }
    },
    {
      path: '*', 
      redirect: '/blogger/404',
    }
  ]
})

export default router
