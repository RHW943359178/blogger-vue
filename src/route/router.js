import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import My from '../views/My'
import ArticleEditor from '../views/ArticleEditor'
import ArticleDetail from '../views/ArticleDetail'

Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/blogger', name: 'home', component: Home},
    {path: '/blogger/articleEditor', name: 'articleEditor', component: ArticleEditor},
    {path: '/blogger/my', name: 'my', component: My},
    {path: '/blogger/article', name: 'articleDetail', component: ArticleDetail},
  ]
})

export default router
