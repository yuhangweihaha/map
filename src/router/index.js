import Vue from 'vue'
import Router from 'vue-router'
import logins from '@/views/logins'
import login from '@/views/login'
import home from '@/views/home'
import trafficmanagement from '@/views/trafficmanagement'
/*import Future from '@/components/Future'*/

Vue.use(Router);
export default new Router({
routes: [
  {
    path:'/home',
    name:'home',
    component:home,
    children:[
        {
          path: '/logins',
          name: 'logins',
          component: logins
        },
        {
          path: '/login',
          name: 'login',
          component: login
        },
      {
        path: '/trafficmanagement',
        name: 'trafficmanagement',
        component: trafficmanagement
      },
]
  },
  {
    path:'/',
    redirect:'/logins',
  }
  ]
})
