<template>
  <div id = "map">
    <!--表头-->
    <div class="map-herder" :style="{height: heightData}">
      <div class="map_herders"><div class="images"></div></div>
      <!--按钮-->
      <div class="map-herder-but" @click="mapBut">▼</div>
    </div>
    <!--左侧导航栏-->
    <div class="map-LeftNavigation" :style="{width: widthData}">
      <div class="map-LeftNavigation-but" @click="MapLeft">▶</div>
      <div class="map-LeftNavigation-top tb">▲</div>
      <ul class="map-LeftNavigation-ul">
        <li class="map-LeftNavigation-li">
          <div class="map-LeftNavigation-li-spant"><img src="../assets/images/pic_but1.png" alt=""></div>
          <div class="map-LeftNavigation-li-spanb">视图操作</div>
        </li>
        <li class="map-LeftNavigation-li">
          <div class="map-LeftNavigation-li-spant"><img src="../assets/images/pic_but1.png" alt=""></div>
          <div class="map-LeftNavigation-li-spanb">视图操作</div>
        </li>
        <li class="map-LeftNavigation-li">
          <div class="map-LeftNavigation-li-spant"><img src="../assets/images/pic_but2.png" alt=""></div>
          <div class="map-LeftNavigation-li-spanb">井盖监控</div>
        </li>
        <li class="map-LeftNavigation-li">
          <div class="map-LeftNavigation-li-spant"><img src="../assets/images/pic_but1.png" alt=""></div>
          <div class="map-LeftNavigation-li-spanb">视图操作</div>
        </li>
        <li class="map-LeftNavigation-li">
          <div class="map-LeftNavigation-li-spant"><img src="../assets/images/pic_but1.png" alt=""></div>
          <div class="map-LeftNavigation-li-spanb">视图操作</div>
        </li>
        <li class="map-LeftNavigation-li">
          <div class="map-LeftNavigation-li-spant"><img src="../assets/images/pic_but1.png" alt=""></div>
          <div class="map-LeftNavigation-li-spanb">视图操作</div>
        </li>
        <li class="map-LeftNavigation-li">
          <div class="map-LeftNavigation-li-spant"><img src="../assets/images/pic_but1.png" alt=""></div>
          <div class="map-LeftNavigation-li-spanb">视图操作</div>
        </li>
        <li class="map-LeftNavigation-li">
          <div class="map-LeftNavigation-li-spant"><img src="../assets/images/pic_but1.png" alt=""></div>
          <div class="map-LeftNavigation-li-spanb">视图操作</div>
        </li>
        <li class="map-LeftNavigation-li">
          <div class="map-LeftNavigation-li-spant"><img src="../assets/images/pic_but1.png" alt=""></div>
          <div class="map-LeftNavigation-li-spanb">视图操作</div>
        </li>
      </ul>
      <div class="map-LeftNavigation-bottom tb">▼</div>
    </div>
    <!--下方导航条-->
    <div class="map-BottomNavigation"></div>
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
        isLeft:true
      }
    },

    methods: {
      map(){
        let map =new BMap.Map(this.$refs.allmap); // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.504, 40.000), 14);// 初始化地图,设置中心点坐标和地图级别
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
    width: 35.6%;
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
    padding-top:17px ;
    overflow: hidden;
  }
  .map-LeftNavigation-li{
    width: 100%;
    height: 68px;
    border-bottom: 1px solid #000;
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
  }
</style>
