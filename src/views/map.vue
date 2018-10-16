<template>
  <div id = "map">
    <!--表头-->
    <div class="map-herder" :style="{height: heightData}">
      <div class="map_herders"><div class="images"></div></div>
      <!--按钮-->
      <div class="map-herder-but" @click="mapBut">▼</div>
    </div>
    <!--井盖监控功能-->
    <div class="WellCoverMonitoring" :style="{top:TopData}" v-if="TopDataIf">
      <ul>
        <li class="lis1" :style="{color:WellColor,flex:'1.1'}"><img src="../assets/images/pic_connected.png"> {{LinkState}}</li>
        <li style="flex:1.7" @click="Already">已安装：[ {{AlreadyInstalled}} ] 个</li>
        <li  style="flex:1.3">离线：[ {{OffLine}} ] 个</li>
        <li style="flex:2">施工打开超时：[ {{ConstructionOpensOvertime}} ] 个</li>
        <li style="flex: 1.4;">报警：[ {{CallThePolice}} ] 个</li>
        <li class="CloseWellCoverMonitoring" @click="CloseWellCoverMonitoring"><img src="../assets/images/pic_close.png"></li>
      </ul>
    </div>
    <!--左侧导航栏-->
    <div class="map-LeftNavigation" :style="{width: widthData}">
      <div class="map-LeftNavigation-but" @click="MapLeft">▶</div>
      <div class="map-LeftNavigation-top tb">▲</div>
      <ul class="map-LeftNavigation-ul">
        <li class="map-LeftNavigation-li" @click="Leftbut(index)" v-for="(lis,index) in LeftNav" :key="index">
          <div class="map-LeftNavigation-li-spant"><img :src='lis.img' alt=""></div>
          <div class="map-LeftNavigation-li-spanb">{{lis.test}}</div>
        </li>
      </ul>
      <div class="map-LeftNavigation-bottom tb">▼</div>
    </div>
    <!--下方导航条-->
    <div class="map-BottomNavigation">
      <!--左侧放大+提示-->
      <div class="map-BottomNavigation-left">
        <div class="map-BottomNavigation-left-img"> </div>
        <div class="map-BottomNavigation-left-content"> | 操作提示：请按照相关提示正确操作</div>
       <!--右侧坐标+比例尺-->
        <div class="map-BottomNavigation-right">
          <div class="map-BottomNavigation-right-coordinate"> | 坐标：{{coordinate1}},{{coordinate2}}</div>
          <div class="map-BottomNavigation-right-scale"> | 比例尺：{{scales}}</div>
        </div>
      </div>
    </div>
    <!--井盖详细列表-->
    <div class="DetailedListOfManholeCovers">
      <!--右侧按钮滚动条区域-->
      <div class="DetailedControl">
        <div class="DetailedContens">
          <template>
            <div class="block">
              <el-slider
                v-model="value10"
                vertical
                height="100px">
              </el-slider>
            </div>
          </template>
        </div>
      </div>
     <!--左侧表格区域-->
      <div class="DetailedLeft">
        <!--已安装设备-->
        <div class="InstalledEquipment ipm">
          <p style="width: 100%;height: 30px">已安装设备列表</p>
          <div class="InstalledForm">
            <p>选择某一行，地图上自动定位到数据</p>
          </div>
        </div>
        <!--报警设备-->
        <div class="AlarmEquipment ipm"></div>
      </div>
    </div>
    <!--地图-->
    <div id="allmap" ref="allmap"></div>


  </div>
</template>
<script>
  export default {
    name: '',
    data () {
      return {
        heightData:'80px',
        widthData:'78px',
        TopData:'83px',
        isTop:true,
        isLeft:true,
        TopDataIf:false,
        LinkState:'已连接',     /*链接状态*/
        AlreadyInstalled:'3424',   /*已安装的个数*/
        OffLine:'0',    /*离线*/
        ConstructionOpensOvertime:'0',   /*施工打开超时*/
        WellColor:'#22a36b',
        CallThePolice:'2',    /*警报*/
        coordinate1:'1238474.3837372',
        coordinate2:'1238474.3837444',
        scales:'1:8000',
        value10:0,
        LeftNav:[
            {test:"视图操作",img:require("../assets/images/pic_but1.png")},
            {test:"查询定位",img:require("../assets/images/pic_but3.png")},
            {test:"井盖监控",img:require("../assets/images/pic_but2.png")},
            {test:"车辆GPS监控",img:require("../assets/images/pic_but4.png")},
            {test:"巡检监控",img:require("../assets/images/pic_but5.png")},
            {test:"案件管理",img:require("../assets/images/pic_but6.png")},
            {test:"信息维护",img:require("../assets/images/pic_but7.png")},
            {test:"打印出图",img:require("../assets/images/pic_but8.png")},
            {test:"关于系统",img:require("../assets/images/pic_but9.png")}
          ]
      }
    },

    methods: {
      map(){
        let map =new BMap.Map(this.$refs.allmap); // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.504, 40.020), 14);// 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl({//添加地图类型控件
          mapTypes:[          BMAP_NORMAL_MAP,          BMAP_HYBRID_MAP        ]}));
        map.setCurrentCity("北京");// 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        map.addControl(new BMap.NavigationControl());
        let point = new BMap.Point(116.504, 40.000);
        let marker = new BMap.Marker(point);
        map.addOverlay(marker);
      },
      mapBut(){
        if(this.isTop){
          this.heightData = 0+'px';
          this.TopData = 0+'px';
          this.isTop = false;
        }
        else{
          this.isTop = true;
          this.heightData = 80+'px';
          this.TopData = 83+'px';
        }
      },
      MapLeft(){
        if(this.isLeft){
          this.widthData = 0+'px';
          this.isLeft = false;
        }
        else{
          this.isLeft = true;
          this.widthData = 78+'px';
        }
      },
      Leftbut(index){
        if(index === 2){
          this.TopDataIf = true;
        }
      },
      CloseWellCoverMonitoring(){
        this.TopDataIf = false;
      },
      Already(){

      }

    },
    mounted(){
      this.map();
    }

  }
</script>

<style lang="less" scoped>
  #map {
    width: 100%;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;  color: #2c3e50;

  }
  #allmap{  height: 100%;
    overflow: hidden;
  }
  .map-herder{
    height: 80px;
    width: 100%;
    background: #48628b;
    opacity: 0.85;
    position: absolute;
    top:0;
    z-index: 9999;
    box-shadow: 0 3px 0px #b4d3fc;
  }
  .map_herders{
    height: 50%;
    width: 80%;
    background: #e4e4e4;
    border-radius:0 0 50px 0 ;
    position: relative;
  }
  .images{
    width: 31.6%;
    height: 117%;
    position: absolute;
    top: 16px;
    left: 3px;
    background-image: url('../assets/images/pic_logo3.png');
    background-repeat: repeat-y;
  }
  .map-herder-but{
    width: 72px;
    height: 8px;
    background: #b4d3fc;
    font-size: 2px;
    position: absolute;
    bottom: -8px;
    left: 47%;
    line-height: 8px;
    border-radius: 0 0 20px 20px;
    cursor: pointer;
    box-shadow: -2px 3px 11px #9E9E9E;
  }
  .map-herder-but:hover{
     background: #fdd974;
   }
  .map-LeftNavigation{
    width: 78px;
    height: 78%;
    background: #5d81b5;
    position: absolute;
    top: 110px;
    z-index: 9998;
    border-bottom: 2px solid #86b1f7;
    border-top: 2px solid #86b1f7;
    border-right: 2px solid #86b1f7;
    border-radius: 0 10px 10px 0;
    /*overflow:hidden;*/
  }
    .map-LeftNavigation-ul{
    width: 100% ;
    height: 100%;
    margin: 0;
    padding: 0;
      list-style: none;
    padding-top:17px ;
    overflow: hidden;
  }
  .map-LeftNavigation-li{
    width: 100%;
    height: 68px;
    border-bottom: 1px solid #000;
    cursor: pointer;
  }
  .map-LeftNavigation-li :hover{
    img{
      width: 50%;
      height: 70%;
    }
  }
.tb{
  height: 17px;
  width: 100%;
  background: #2f558a;
  position: absolute;
  cursor: pointer;
}
  .map-LeftNavigation-top{
    top:0;
    border-radius: 0 10px 0 0;
  }
  .map-LeftNavigation-bottom{
    bottom:0;
    border-radius: 0 0 10px 0;
  }
  .map-LeftNavigation-but{
    width: 12px;
    height: 65px;
    background: #b4d3fc;
    position: absolute;
    right: -12px;
    left: 103%;
    top: 45%;
    border-radius: 0 20px 20px 0;
    line-height: 70px;
    cursor: pointer;
    font-size: 18px;
    box-shadow: -3px 0 5px #333;
  }
  .map-LeftNavigation-but:hover{
    background: #fdd974;
  }
  .map-LeftNavigation-li-spant{
    width: 100%;
    height: 70%;
  }
  .map-LeftNavigation-li-spant img{
    margin-top: 6px;
  }
  .map-LeftNavigation-li-spanb{
    width: 100%;
    height: 30%;
    font-size: 13px;
    color: #fff;
    line-height: 21px;
  }
  .map-BottomNavigation{
    width: 100%;
    height: 27px;
    background: #2b4d77;
    position: fixed;
    bottom:0;
    z-index: 9999;
  }
  .map-BottomNavigation-left{
    width: 20%;
    height: 61%;
    margin-left: 4px;
    margin-top: 6px;
  }
  .map-BottomNavigation-left-img{
    width: 16px;
    height: 15px;
    background-image: url('../assets/images/pic_sobig.png');
    float: left;
    cursor: pointer;
  }
  .map-BottomNavigation-left-content{
    color:#fff;
    font-size: 12px;
    text-indent: -90px;
    line-height: 16px;
  }
  .map-BottomNavigation-right{
    width: 35%;
    height: 100%;
    position: absolute;
    right: 15px;
    top: 7px;
    font-size:12px;
    color:#fff;
  }
  .map-BottomNavigation-right-coordinate{
    float: left;
    margin-left: 20%;
  }
  .map-BottomNavigation-right-scale{
    float: left;
    margin-left: 7%;
  }
  .WellCoverMonitoring{
    width: 613px;
    height: 38px;
    background: #e4e4e4;
    position: absolute;
    top: 83px;
    left: 30%;
    z-index: 9998;
    -webkit-box-shadow: 0 0 13px 3px;
    box-shadow: 0 0 19px 1px;
    border-radius: 0px 0px 10px 10px;
    ul{
      width: 100%;
      height: 100%;
      display: flex;
      padding: 0;
      margin: 0;
      justify-content: center;
      align-items: center;
      li{
        flex:1;
        font-size: 12px;
        list-style: none;
        color:#2c4586;
        cursor: pointer;
      }

    }
  }
  .CloseWellCoverMonitoring{
    cursor: pointer;
    border-left: 1px solid #5e5e5e;
  }
  .lis1{
    border-right: 1px solid #5e5e5e;
    line-height: 26px;
    img{
      float: left;
      margin-left: 5px;
    }
  }
  .DetailedListOfManholeCovers{
    width: 27.5%;
    height: 86%;
    position: absolute;
    right: 1px;
    top: 10.6%;
    z-index: 9999;
    overflow: hidden;
  }
  .DetailedControl{
    height: 100%;
    width: 27px;
    float: right;
    .DetailedContens{
      height: 310px;
      width: 100%;
      background: #1d4173;
      border-radius: 6px 0 0 6px;
      box-sizing: border-box;
      border-left: 1px solid #b4d3fc;
    }
  }
  .DetailedLeft{
    width: 92%;
    height: auto;
  }
  .ipm{
    width: 402px;
    height: 402px;
    background: #31588d;
    border-radius:5px;
    border:1px solid #b4d3fc;
    margin-bottom: 10px;
    overflow: hidden;
  }
  .InstalledEquipment{
    p{
      margin: 0;
      font-size: 15px;
      color:#fff;
      font-weight: bold;
      text-align: left;
      text-indent: 20px;
      line-height: 30px;
    }
    .InstalledForm{
      width: 96%;
      height: 91%;
      background: #eee;
      margin-left: 2%;
      p{
        width: 100%;
        height: 33px;
        background: #dfdfdf;
        font-weight: normal;
        text-align: left;
        text-indent: 14px;
        color: #000;
        font-size: 12px;
        line-height: 33px;
        border-bottom: 1px solid #bbb;
      }
    }
  }
</style>
