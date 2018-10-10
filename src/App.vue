<template>
  <div id="app">
    <div id="allmap" ref="allmap"></div>
    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
      return{

      }
  },
  methods:{
      map(){

        let map =new BMap.Map(this.$refs.allmap); // 创建Map实例
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);// 初始化地图,设置中心点坐标和地图级别
            map.addControl(new BMap.MapTypeControl({//添加地图类型控件
                mapTypes:[          BMAP_NORMAL_MAP,          BMAP_HYBRID_MAP        ]}));
            map.setCurrentCity("北京");// 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

      }
  },
  mounted(){
    this.map();
  }
}


</script>

<style>
#app {
  width: 100%;
  height: 100%;
  /*background: lightgoldenrodyellow;*/
  /*box-shadow: 0px 1px 15px rgba(238, 133, 0, 0.98) inset;*/
}
#app {  font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;  color: #2c3e50;
        margin-top: 60px;
}
#allmap{  height: 500px;
          overflow: hidden;
}
</style>
