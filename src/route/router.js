import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import My from '../views/My'
import Article from '../views/Article'

Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/article', name: 'article', component: Article},
    {path: '/my', name: 'my', component: My},
  ]
})

export default router
