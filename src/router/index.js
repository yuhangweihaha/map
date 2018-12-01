import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import map from '@/views/map'
import devicemanagement from '@/views/devicemanagement/devicemanagement' //设备列表
import selectivecollector from '@/views/devicemanagement/selectivecollector' //选择集控器
import alarmmanagement from '@/views/alarmmanagement/alarmmanagement' //告警总览
import historicalwarning from '@/views/alarmmanagement/historicalwarning' //历史告警
import simulationdeduction from '@/views/simulationdeduction/simulationdeduction' // 模拟推演
import stateoverview from '@/views/stateoverview/stateoverview'  //状态总览
import statisticalanalysis from '@/views/statisticalanalysis/statisticalanalysis'  //电量统计
import signalstatistics from '@/views/statisticalanalysis/signalstatistics'
import systemsetup from '@/views/systemsetup/mapsettings'   //地图设置
import companysetup from '@/views/systemsetup/companysetup'   //公司设置
import userdefineditems from '@/views/systemsetup/userdefineditems'   //自定义项
import trafficmanagement from '@/views/trafficmanagement/trafficmanagement'   //流量管理
import dataquery from '@/views/dataquery/dataquery' //数据查询
import historicaldata from '@/views/dataquery/historicaldata' //历史查询
import offlinedata from '@/views/dataquery/offlinedata' //离线查询
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
        path: '/historicaldata',
        name: 'historicaldata',
        component: historicaldata
      },
      {
        path: '/offlinedata',
        name: 'offlinedata',
        component: offlinedata
      },
      {
        path: '/dataquery',
        name: 'dataquery',
        component: dataquery
      },
      // 历史告警
      {
        path: '/historicalwarning',
        name: 'historicalwarning',
        component: historicalwarning
      },
      //选择集控器
      {
        path: '/selectivecollector',
        name: 'selectivecollector',
        component: selectivecollector
      },
      //公司设置
      {
        path: '/companysetup',
        name: 'companysetup',
        component: companysetup
      },
      //自定义项
      {
        path: '/userdefineditems',
        name: 'userdefineditems',
        component: userdefineditems
      },
      {
        path: '/trafficmanagement',
        name: 'trafficmanagement',
        component: trafficmanagement
      }, {
        path: '/systemsetup',
        name: 'systemsetup',
        component: systemsetup
      },
      //电量统计
      {
        path: '/statisticalanalysis',
        name: 'statisticalanalysis',
        component: statisticalanalysis
      },
      // 信号统计
      {
        path: '/signalstatistics',
        name: 'signalstatistics',
        component: signalstatistics
      },
      {
        path: '/simulationdeduction',
        name: 'simulationdeduction',
        component: simulationdeduction
      }, {
        path: '/alarmmanagement',
        name: 'alarmmanagement',
        component: alarmmanagement
      },
      // 状态总览
      {
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
