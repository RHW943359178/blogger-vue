import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import My from '../views/My'
import ArticleEditor from '../views/ArticleEditor.vue'
import ArticleDetail from '../views/ArticleDetail.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/blogger', name: 'home', component: Home},
    {path: '/blogger/article:id', name: 'articleDetail', component: ArticleDetail},
    {path: '/blogger/articleEditor', name: 'articleEditor', component: ArticleEditor},
    {path: '/blogger/my', name: 'my', component: My},
  ]
})

export default router
