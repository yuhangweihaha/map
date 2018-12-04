const state = {
	tabName: '',
	tabData: [{
		name: '首页',
		url: 'map',
		children: []
	}, {
		name: '数据查询',
		url: '',
		children: [{
			name: '实时数据',
			url: 'dataquery'
		}, {
			name: '离线数据',
			url: 'offlinedata'
		}]
	}, {
		name: '告警管理',
		url: '',
		children: [{
			name: '告警总览',
			url: 'alarmmanagement'
		}, {
			name: '历史告警',
			url: 'historicalwarning'
		}]
	}, {
		name: '设备管理',
		url: '',
		children: [{
			name: '设备列表',
			url: 'devicemanagement'
		}, {
			name: '选择集控器',
			url: 'selectivecollector'
		}]
	}, {
		name: '统计分析',
		url: '',
		children: [{
			name: '电量统计',
			url: 'statisticalanalysis'
		}, {
			name: '信号统计',
			url: 'signalstatistics'
		}]
	}, {
		name: '模拟推演',
		url: 'simulationdeduction',
		children: []
	}, {
		name: '流量管理',
		url: 'trafficmanagement',
		children: []
	}, {
		name: '系统设置',
		url: 'systemsetup',
    children: []
	/*	children: [{
			name: '地图设置',
			url: 'systemsetup'
		}, {
			name: '公司设置',
			url: 'companysetup'
		}, {
			name: '自定义项',
			url: 'userdefineditems'
		}]*/
	}, {
		name: '状态总览',
		url: 'stateoverview',
		children: []
	}],
}

const activeRouter = function() {
	var rou = location.href.split('/')[location.href.split('/').length - 1];
	var name = '';
	state.tabData.forEach(function(value, i) {　　
		if(value['url'] === rou) {
			name = value['name'];
			return false;
		} else {
			value['children'].forEach(function(value_c, i) {　　
				if(value_c['url'] === rou) {
					name = value['name'];
					return false;
				}
			})
		}
	})
	return name;
}
// getters
const getters = {
	tabName: state => state.tabName ? state.tabName : activeRouter(),
	tabData: state => state.tabData
}

// actions
const actions = {

}

// mutations
const mutations = {
	updatetabName(state, data) {
		state.tabName = data;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
