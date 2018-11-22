import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import map from '@/views/map'
import WellCoverModule from '@/views/WellCoverModule'
/*import Future from '@/components/Future'*/

Vue.use(Router)
export default new Router({
routes: [
  {
    path:'/login',
    name:'login',
    component:login,

  },
  {
    path: '/map',
    name: '/map',
    component: map
  },
  {
    path: '/WellCoverModule',
    name: '/WellCoverModule',
    component: WellCoverModule
  },
  {
    path:'/',
    redirect:'/login',

  }
  ]
})
