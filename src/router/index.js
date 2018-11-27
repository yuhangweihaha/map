import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import map from '@/views/map'
import devicemanagement from '@/views/devicemanagement/devicemanagement' //设备管理
import alarmmanagement from '@/views/alarmmanagement/alarmmanagement' //告警管理
import simulationdeduction from '@/views/simulationdeduction/simulationdeduction' // 模拟推演
import stateoverview from '@/views/stateoverview/stateoverview'  //状态总览
import statisticalanalysis from '@/views/statisticalanalysis/statisticalanalysis'  //统计分析
import systemsetup from '@/views/systemsetup/systemsetup'   //系统设置
import trafficmanagement from '@/views/trafficmanagement/trafficmanagement'   //流量管理
import dataquery from '@/views/dataquery/dataquery' //数据查询
import home from '@/views/home/home'
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
    path:'/home/map',
    redirect:'/home/map'
  },
  {
    path: '/home',
    name: '/home',
    component: home,
    children:[
      {
        path: '/map',
        name: 'map',
        component: map
      },
      {
        path: '/devicemanagement',
        name: 'devicemanagement',
        component: devicemanagement
      },
      {
        path: '/dataquery',
        name: 'dataquery',
        component: dataquery
      },
      {
        path: '/trafficmanagement',
        name: 'trafficmanagement',
        component: trafficmanagement
      }, {
        path: '/systemsetup',
        name: 'systemsetup',
        component: systemsetup
      }, {
        path: '/statisticalanalysis',
        name: 'statisticalanalysis',
        component: statisticalanalysis
      }, {
        path: '/simulationdeduction',
        name: 'simulationdeduction',
        component: simulationdeduction
      }, {
        path: '/alarmmanagement',
        name: 'alarmmanagement',
        component: alarmmanagement
      },  {
        path: '/stateoverview',
        name: 'stateoverview',
        component: stateoverview
      },
      {
        path: '/WellCoverModule',
        name: 'WellCoverModule',
        component: WellCoverModule
      },

    ]
  },
  {
    path: '/dataquery',
    name: '/dataquery',
    component: dataquery
  },
  {
    path: '/trafficmanagement',
    name: '/trafficmanagement',
    component: trafficmanagement
  }, {
    path: '/systemsetup',
    name: '/systemsetup',
    component: systemsetup
  }, {
    path: '/statisticalanalysis',
    name: '/statisticalanalysis',
    component: statisticalanalysis
  }, {
    path: '/simulationdeduction',
    name: '/simulationdeduction',
    component: simulationdeduction
  }, {
    path: '/alarmmanagement',
    name: '/alarmmanagement',
    component: alarmmanagement
  },  {
    path: '/stateoverview',
    name: '/stateoverview',
    component: stateoverview
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
