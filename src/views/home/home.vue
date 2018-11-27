<template>
  <div id="box">
    <div class="map-herder">
        <div class="images"></div>
      <div class="lis">
        <ul>
           <router-link to="/map" tag="li">首页</router-link>
          <el-dropdown>
            <router-link to="/dataquery" tag="li">数据查询</router-link>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>实时数据</el-dropdown-item>
              <el-dropdown-item>离线数据</el-dropdown-item>
              <el-dropdown-item>历史数据</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

           <router-link to="/alarmmanagement" tag="li">告警管理</router-link>
          <router-link to="/devicemanagement" tag="li">设备管理</router-link>
          <router-link to="/statisticalanalysis" tag="li">统计分析</router-link>
          <router-link to="/simulationdeduction" tag="li">模拟推演</router-link>
          <router-link to="/trafficmanagement" tag="li">流量管理</router-link>
          <router-link to="/systemsetup" tag="li">系统设置</router-link>
          <router-link to="/stateoverview" tag="li">状态总览</router-link>
        </ul>
      </div>
      <input type="button" name="" id="map-herder-button" value="退出登录">
      </div>
    <div style="width: 100%;height: 100%;z-index: 1">
      <router-view></router-view>
    </div>

    <div class="map-BottomNavigation">
      <!--左侧放大+提示-->
      <!--<div class="map-BottomNavigation-left">
        <div @click="Fullscreen" class="map-BottomNavigation-left-img"></div>
        <div class="map-BottomNavigation-left-content"> | 操作提示：请按照相关提示正确操作</div>

        &lt;!&ndash;右侧坐标+比例尺&ndash;&gt;

        <div class="map-BottomNavigation-right">
          <div class="map-BottomNavigation-right-coordinate"><span style="line-height: 15px">| 坐标：</span>
            <span style="display:inline-block;width: 140px">{{coordinate1}} , {{coordinate2}}</span>
          </div>
          <div class="map-BottomNavigation-right-scale"><span style="line-height: 15px;">| 比例尺：</span> <span
            style="display:inline-block;width: 60px;">{{scales}}</span></div>
          <div class="Traffic" @click="Traffics"> 点击查看路况</div>
        </div>
      </div>-->
		</div>
	</div>

</template>
<script>
	export default {
		name: '',
		data() {
			return {

			}
		},

		methods: {

		},
		mounted() {

		}
	}
</script>

<style lang="less" scoped>
	#box {
		width: 100%;
		height: 100%;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		padding-top: 75px;
	}
	
	.content {
		width: 100%;
		height: calc(100% - 117px);
	}
	
	.map-herder {
		height: 75px;
		width: 100%;
		background: #48628b;
		opacity: 0.85;
		z-index: 1000;
		box-shadow: 0px 3px 9px #617583;
		position: fixed;
		top: 0;
	}
	
	.map_herders {
		height: 50%;
		width: 80%;
		background: #e4e4e4;
		border-radius: 0 0 50px 0;
		position: relative;
	}
	
	.images {
		width: 31.6%;
		height: 63%;
		position: absolute;
		top: 15px;
		left: 65px;
		/*background-image: url(@//static/img/pic_logo3.cbb9f00.png);*/
		background-repeat: repeat-y;
	}
	
	.map-herder-but:hover {
		background: #fdd974;
	}
	
	.map-BottomNavigation {
		width: 100%;
		height: 42px;
		background: #2b4d77;
		position: fixed;
		bottom: 0;
		z-index: 2000;
	}
	
	.map-BottomNavigation-left {
		width: 20%;
		height: 61%;
		margin-left: 20px;
		margin-top: 6px;
	}
	
	.map-BottomNavigation-left-img {
		width: 16px;
		height: 15px;
		background-image: url('../../assets/images/pic_sobig.png');
		float: left;
		cursor: pointer;
	}
	
	.map-BottomNavigation-left-content {
		color: #fff;
		font-size: 12px;
		text-indent: -90px;
		line-height: 16px;
	}
	
	.map-BottomNavigation-right {
		width: 35%;
		height: 100%;
		position: absolute;
		right: -58px;
		top: 7px;
		font-size: 12px;
		color: #fff;
	}
	
	.map-BottomNavigation-right-coordinate {
		width: 230px;
		position: absolute;
		right: 50%;
		display: flex;
		top: 1px;
		/*span {
    width: 20%;
    height: 100%;
    line-height: 16px;
  }
  div {
    width: 70%;
    height: 100%;
  }*/
	}
	
	.lis {
		width: 805px;
		height: 75px;
		position: absolute;
		right: 21%;
		ul {
			width: 100%;
			height: 100%;
			padding: 0;
			margin: 0;
			li {
				width: 88px;
				height: 100%;
				list-style: none;
				float: left;
				line-height: 75px;
				font-size: 15px;
				color: #fff;
				cursor: pointer;
			}
			li:hover {
				color: #000;
				background: #fff;
			}
		}
	}
	
	#map-herder-button {
		position: absolute;
		right: 7%;
		width: 127px;
		height: 40px;
		border: 1px solid #fff;
		border-radius: 3px;
		background: none;
		color: #fff;
		font-size: 16px;
		cursor: pointer;
		top: 20px;
	}
</style>
