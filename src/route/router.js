import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import My from '../views/My'
import ArticleEditor from '../views/ArticleEditor'
import ArticleDetail from '../views/ArticleDetail'
import signIn from '../views/SignIn'
import signUp from '../views/SignUp'
import errorPage from '../views/ErrorPage.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/blogger', name: 'home', component: Home},
    {path: '/blogger/articleEditor', name: 'articleEditor', component: ArticleEditor},
    {path: '/blogger/my', name: 'my', component: My},
    {path: '/blogger/article', name: 'articleDetail', component: ArticleDetail},
    {path: '/blogger/signIn', name: 'articleDetail', component: signIn},
    {path: '/blogger/signUp', name: 'articleDetail', component: signUp},
    {path: '/blogger/404', name: 'errorPage', component: errorPage},
    {path: '*', redirect: '/blogger/404',}
  ]
})

export default router
