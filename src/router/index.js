import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
/*import Future from '@/components/Future'*/

Vue.use(Router)
export default new Router({
routes: [
  {
    path:'/login',
    name:'login',
    component:login
  },
  {
    path:'/',
    redirect:'/login'
  }
  ]
})
