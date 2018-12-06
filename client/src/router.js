import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Home from './views/Home'
import Me from './views/Me'
import FundList from './views/FundList'
import Register from './views/Register'
import Login from './views/Login'
import NotFound from './views/404'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {path: '',component: Home},
        {path: '/home',name: 'home',component: Home},
        {path: '/me',name: 'me',component: Me},
        {path: '/fundlist',name: 'fundlist',component: FundList}
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '/404',
      component: NotFound
    }
  ]
})

//路由守卫
router.beforeEach((to,from,next) => {
  const isLogin = localStorage.eleToken ? true : false
  //登录和注册页面随时可以进去
  if(to.path == '/login' || to.path == '/register') {
    next()
  } else {
    //token不存在时不能进入主页面，去登录页面
    isLogin ? next() : next('/login')
  }
})


export default router;
