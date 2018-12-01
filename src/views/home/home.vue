<template>
	<div id="box">
		<div class="map-herder">
			<div class="images">
				<div class="images-logo"><img src="@/assets/images/pic_zy.png" alt=""></div>
				<div class="images-name">传感器大数据监控平台</div>
			</div>
			<div class="lis">
				<ul>
					<template v-for="item in tabData">
						<li v-if="item.children.length === 0" @click="toLink(item)">{{item.name}}</li>
						<el-dropdown v-else>
							<li>{{item.name}}</li>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item v-for="item_c in item.children">
									<li @click="toLink(item_c)">{{item_c.name}}</li>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</ul>
			</div>
			<input type="button" name="" id="map-herder-button" value="退出登录">
		</div>
		<div style="width: 100%;height: 100%;z-index: 1">
			<router-view></router-view>
		</div>

		<div v-if="mapbottom" class="map-BottomNavigation">
			<!--<span style="color: #ffffff;">{{tabName}}</span>-->
			<!--左侧放大+提示-->
			<div class="map-BottomNavigation-left">
        <div class="map-BottomNavigation-left-img"></div>
        <div class="map-BottomNavigation-left-content"> | 操作提示：请按照相关提示正确操作</div>

        <!--右侧坐标+比例尺-->

      <!--  <div class="map-BottomNavigation-right">
          <div class="map-BottomNavigation-right-coordinate"><span style="line-height: 15px">| 坐标：</span>
            <span style="display:inline-block;width: 140px">{{coordinate1}} , {{coordinate2}}</span>
          </div>
          <div class="map-BottomNavigation-right-scale"><span style="line-height: 15px;">| 比例尺：</span> <span
            style="display:inline-block;width: 60px;">{{scales}}</span></div>
          <div class="Traffic" @click="Traffics"> 点击查看路况</div>
        </div>-->
      </div>
		</div>
	</div>

</template>
<script>
	import { mapGetters } from 'vuex';
	export default {
		name: '',
		data() {
			return {
				Licalss: '',
        mapbottom:true
			}
		},
		methods: {
			toLink(data){
			  /*if(data.name !== '首页'){
			    this.mapbottom = true;
        }else{
          this.mapbottom = false;
        }*/
				this.$store.commit('updatetabName', data.name);
				this.$router.push({ path:'/' + data.url});
			}
		},
    created(){

    },
		mounted() {
      // this.mapbottom = true;
		},
		computed: {
			...mapGetters(['tabData', 'tabName'])
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
		width: 365px;
		height: 51px;
		position: absolute;
		top: 15px;
		left: 89px;
		display: flex;
		/* background-image: url(@//static/img/pic_logo3.cbb9f00.png); */
		background-repeat: repeat-y;
	}
	
	.images-logo {
		width: 51px;
		height: 51px
	}
	
	.images-name {
		width: 314px;
		height: 51px;
		color: #fff;
		font-size: 30px;
		text-indent: 5px;
		font-family: cursive;
		line-height: 48px;
		font-weight: 800;
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
    margin-left: 62px;
    margin-top: 13px;
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
		font-size: 13px;
		text-indent: -77px;
		line-height: 16px;
	}
  @media (min-width: 1366px) {

    .map-BottomNavigation-left-content{
      text-indent: -83px;
    }
  }
  @media (min-width: 1920px) {
    .map-BottomNavigation-left-content{
      text-indent: -145px;
    }
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
		width: 860px;
		height: 75px;
		position: absolute;
		right: 18%;
		ul {
			width: 100%;
			height: 100%;
			padding: 0;
			margin: 0;
			li {
				width: 88px;
				height: 100%;
				list-style: none;
				/*float: left;*/
				line-height: 75px;
				font-size: 15px;
				color: #fff;
				cursor: pointer;
				display: inline-block;
			}
			li:hover {
				color: #000;
				background: #fff;
			}
		}
	}
  @media (min-width: 1600px) {
    .lis {
      right: 18%;
  }
  }
  @media (min-width: 1680px) {
    right: 20%;
  }
  @media (min-width: 1920px) {
    .lis {
      right: 21%;
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
		font-family: cursive;
	}
</style>
