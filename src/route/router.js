import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import My from '../views/My'
import ArticleEditor from '../views/ArticleEditor.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/articleEditor', name: 'articleEditor', component: ArticleEditor},
    {path: '/my', name: 'my', component: My},
  ]
})

export default router
