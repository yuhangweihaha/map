<template>
  <div id = "map">
    <!--表头-->
    <div class="map-herder" :style="{height: heightData}">
      <div class="map_herders"><div class="images"></div></div>
      <!--按钮-->
      <div class="map-herder-but" @click="mapBut">▼</div>
    </div>
    <div style="width: 40%;height:30px;background: red"></div>
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
          <div class="map-BottomNavigation-right-coordinate"> | 坐标：{{coordinate1}}{{coordinate2}}</div>

        </div>
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
        image1:'../assets/images/pic_login.jpg',
        heightData:'80px',
        widthData:'78px',
        isTop:true,
        isLeft:true,

        // laoyu:require("../assets/images/pic_but1.png"),
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
          this.isTop = false;
        }
        else{
          this.isTop = true;
          this.heightData = 80+'px';
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
        if(index ===2){
          alert('没错就是我')
        }
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
    height: 12px;
    background: #b4d3fc;
    font-size: 4px;
    position: absolute;
    bottom: -12px;
    left: 47%;
    border-radius: 0 0 20px 20px;
    cursor: pointer;
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
      width: 60%;
      height: 80%;
    }
  }
 /* .map-LeftNavigation-li:nth-child(6){
  background: #305184;
  }
  .map-LeftNavigation-li:nth-child(7){
    background: #305184;
  }
  .map-LeftNavigation-li:nth-child(8){
    background: #305184;
  }
  .map-LeftNavigation-li:nth-child(9){
    background: #305184;
  }*/
  /*.map-LeftNavigation-li:nth-child(){*/
    /*background: #305184;*/
  /*}*/
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
    background: salmon;
    position: absolute;
    right: 15px;
    top: 2px;
  }
</style>
