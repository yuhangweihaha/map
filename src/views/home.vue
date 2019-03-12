<template>
  <div id="login">
    <header>
      <div class="loginleft">
        <div class="loginleftone" @click="trafficmanagement">交通监管</div>
        <a href="http://172.30.80.22/dp/CommandCenter/indexNew.htm"><div class="loginlefttwo">城市监控</div></a>
        <div class="loginlefthree">市政监控</div>
      </div>
      <span class="logincontent" @click="jiaotong"></span>
      <div class="loginright">
        <div class="loginrightone" @click="huanbao">环保监控</div>
        <div class="loginrighttwo">水利监控</div>
        <div class="loginrighthree">气象监控</div>
      </div>
    </header>
    <div class="yiqunshabi">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

      <!---->
    </div>
  </div>

</template>

<script>
  import echarts from 'echarts';
  import 'echarts/map/js/china.js' // 引入中国地图数据
  import icons from '@/icon/kaimr.png';
  // import { initOption as ioption } from 'liquidfillOptions.js'
  export default {
    name: '',
    data() {
      return {}
    },
    methods: {
      /*   bigdataclick:['交通监管','城市监控','市政监控'],
         bigdataclicks:['环保监控','水利监控','气象监控'],*/
      jiaotong() {
        this.$router.push({path: '/logins'})
      },
      huanbao() {
        this.$router.push({path: '/login'})
      },
      trafficmanagement(){
        this.$router.push({path: '/trafficmanagement'})
      },
    },
    created() {
      /*localStorage.setItem('token', '170976fa8ab247472ff');
      localStorage.setItem('userName', 'root')*/
    },
    mounted() {

    }

  }

</script>

<style lang="less" scoped>
  #login {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url('../icon/pic_map.png');
    background-repeat: repeat-y;
    background-size: 100%;
    z-index:1000;
    img {
      width: 100%;
      height: 100%;
    }
  }
 .logincontent{
   width: 30%;
   height: 100%;
   margin: 0 auto;
   display: inline-block;
   cursor: pointer;
 }
  header {
    width: 100%;
    height: 82px;
    background-image: url('../icon/pic_header.png');
    background-repeat: repeat-y;
    background-size: 101% 100%;
    color: #fff;
    z-index:1000;
    font-size: 41px;
    text-align: center;
    line-height: 80px;
    position: absolute;
    /*font-weight: 700;*/
    /*position: absolut*/
    /*background: darkcyan;*/;
    .headersize {
      width: 30%;
      height: 64%;
      padding-top: 12px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .loginleft {
      width: 34%;
      height: 61%;
      float: left;
      opacity: 0.5;
      margin-top: 1%;

      div {
        width: 27%;
        height: 57px;
        float: left;
        font-size: 23px;
        color: #97B1F2;
        text-align: center;
        line-height: 66px;
        margin-left: 5%;
        cursor: pointer;
        margin-top: 1%;
        background-image: url('../icon/pic_img.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .loginright {
      width: 34%;
      height: 61%;
      float: right;
      opacity: 0.5;
      margin-top: 1%;
      div {
        width: 27%;
        height: 57px;
        float: left;
        font-size: 23px;
        color: #97B1F2;
        text-align: center;
        line-height: 66px;
        margin-left: 5%;
        cursor: pointer;
        margin-top: 1%;
        background-image: url('../icon/pic_img.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .yiqunshabi {
    width: 100%;
    height: 100%;
    margin-top: 5%;
  }

</style>
