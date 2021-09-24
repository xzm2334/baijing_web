import Vue from 'vue'

import Router from 'vue-router'
import Login from '../views/login.vue'
import Home from '../components/Home.vue'
import category from '../views/category.vue'
import banner from '../views/banner.vue'
import project from '../views/project.vue'
import linkman from '../views/linkman.vue'
Vue.use(Router)

export const routes=[
  {path:'/',redirect:'/login'},
  {path:'/login',component:Login,name:'login'},
  {path:'/home',component:Home,
  name:'home',
  children:[
    {path:'/category',component:category},
    {path:'/banner',component:banner},
    {path:'/project',component:project},
    {path:'/linkman',component:linkman},
  ]
},
]

const router = new Router({
  routes:routes
})


router.beforeEach((to, from, next) =>{
if(to.path === '/login'){
  next();
}else{
  let token = localStorage.getItem("access_token");
  if(token === null || token === ''){
    next('/login')
  }else{
    next();
  }
}
});
export default router