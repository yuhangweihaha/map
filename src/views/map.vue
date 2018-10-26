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
        <li style="flex: 1.4;color:#9b2929" @click="police">报警：<span></span> [ {{CallThePolice}} ] 个</li>
        <li class="CloseWellCoverMonitoring" @click="CloseWellCoverMonitoring"><img src="../assets/images/pic_close.png"></li>
      </ul>
    </div>
    <!--左侧导航栏-->
    <div class="map-LeftNavigation" :style="{width: widthData}">
      <LaftNavigation v-for="(lis,index) in LeftNav" :index='index' :test="lis.test" :imgs="lis.img" @Leftbut="Leftbut(index)" @MapLeft="MapLeft"></LaftNavigation>
    </div>
    <!--下方导航条-->
    <div class="map-BottomNavigation">
      <!--左侧放大+提示-->
      <div class="map-BottomNavigation-left">
        <div class="map-BottomNavigation-left-img"> </div>
        <div class="map-BottomNavigation-left-content"> | 操作提示：请按照相关提示正确操作</div>
       <!--右侧坐标+比例尺-->
        <div class="map-BottomNavigation-right">
          <div class="map-BottomNavigation-right-coordinate"><span >| 坐标：</span> <div>{{coordinate1}} , {{coordinate2}}</div></div>
          <div class="map-BottomNavigation-right-scale"> | 比例尺：{{scales}}</div>
        </div>
      </div>
    </div>
    <!--井盖详细列表-->
    <div class="DetailedListOfManholeCovers"  v-show="Detail" ref="jgDetail">
      <!--右侧按钮滚动条区域-->
      <div class="DetailedControl"  v-show="sliderIsShow">
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
      <div class="DetailedLeft" ref="ledLeft">
        <modalTable v-for="item in tableData" :title="item.title" :tableData="item.data" :ref="item.name" @closeAll="closeAll"></modalTable>
      </div>
    </div>
    <!--地图-->
    <div id="allmap" ref="allmap"></div>

  </div>
</template>

<script>
  import modalTable from '@/common/modalTable';
  import LaftNavigation from '@/common/LaftNavigation';
  import iconCar from '@/assets/images/pic_img1.gif';
  import api from '../../axios/api.js'
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
        sosuo:'',
        didian:'',
        xia:false,
        LinkState:'已连接',     /*链接状态*/
        AlreadyInstalled:'3424',   /*已安装的个数*/
        OffLine:'0',    /*离线*/
        ConstructionOpensOvertime:'0',   /*施工打开超时*/
        WellColor:'#22a36b',
        CallThePolice:'2',    /*警报*/
        coordinate1: 116.500004,
        coordinate2: 40.000002,
        one:'116.504000',
        two:'40.020000',
        scales:'1:8000',
        value10:100,     /*向下滑动*/
        Detail:false,  /*井盖详细列表显示隐藏*/
        Call:false,   /*报警设备显示因隐藏*/
        already:true,   /*已安装设备列表显示隐藏 */
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
          ],
        tableData: [
          {
            name: 'modalTable1',
            title: '已安装设备列表',
            data: []
          },
          {
            name: "modalTable2",
            title: '报警设备列表',
            data:  []
          }
        ],
        currentPage1:1,   /*分页*/
        pagesize:10,
        restaurants: [], /*模糊查询*/
        state1: '',
        sliderIsShow: false,
        modalTableDivHeight: 0,
        modalTableAllHeight: 0,
        contentone:'0001234',
        newsListShow:[],
        ListShow:[],
        map:''
      }
    },
    methods: {
      // 百度地图
      initMap(){
        let _this = this;
        this.map =new BMap.Map(this.$refs.allmap); // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(this.one, this.two), 14);// 初始化地图,设置中心点坐标和地图级别
        this.map.addControl(new BMap.MapTypeControl({//添加地图类型控件
          mapTypes:[          BMAP_NORMAL_MAP,          BMAP_HYBRID_MAP        ]}));
        this.map.setCurrentCity("北京");// 设置地图显示的城市 此项是必须设置的
        this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        this.map.addControl(new BMap.ScaleControl());//比例尺控件
        _this.map.addEventListener("mousemove",function(e){
          _this.coordinate1= e.point.lng;
          _this.coordinate2= e.point.lat;
        });
      },
      auto(){
        //设置标注的图标
        for(let i=0;i<2;i++){
          let icon = new BMap.Icon(iconCar,new BMap.Size(100, 100));
          //设置标注的经纬度
          this.map.centerAndZoom(new BMap.Point(this.coordinate1, this.coordinate2), 14);
          let marker = new BMap.Marker(new BMap.Point(this.coordinate1 + i * 0.01, this.coordinate2),{icon:icon});
          //把标注添加到地图上
          this.map.addOverlay(marker);
          let content = "<table style='font-size: 12px;width: 383px;height: 278px;overflow-y: auto'>";
          content = content + "<tr><td>设备编号：00 <input type='text' v-model='contentone'></tr></td>";
          content = content + "<tr><td> 地点：北京正元地理信息</td></tr>";
          content = content + "<tr><td> 时间：2018-1-3</td></tr>";
          content = content + "<tr><td>设备编号：00 <input type='text' name='' id=''></tr></td>";
          content = content + "<tr><td> 地点：北京正元地理信息</td></tr>";
          content = content + "<tr><td> 时间：2018-1-3</td></tr>";
          content = content + "<tr><td>设备编号：00 <input type='text' name='' id=''></tr></td>";
          content = content + "<tr><td> 地点：北京正元地理信息</td></tr>";
          content = content + "<tr><td> 时间：2018-1-3</td></tr>";
          content = content + "<tr><td>设备编号：00 <input type='text' name='' id=''></tr></td>";
          content = content + "<tr><td> 地点：北京正元地理信息</td></tr>";
          content = content + "<tr><td> 时间：2018-1-3</td></tr>";
          content += "</table>";
          let infowindow = new BMap.InfoWindow(content);
          console.log(infowindow,7666);
           marker.addEventListener("click",function(){
            this.openInfoWindow(infowindow);
          });
        }
      },

      mapBut(){
        if(this.isTop){
          this.heightData = 0+'px';
          this.TopData = 0+'px';
          this.isTop = false;
          this.$refs.jgDetail.style.top = 0.6 + '%';
          // this.$refs.jgDetail.style.height = 'calc'+ '(' + 100 + '%' + '-' + 33 + 'px' + ')';
          this.$refs.jgDetail.style.height = 96 + '%';
        }
        else{
          this.isTop = true;
          this.heightData = 80+'px';
          this.TopData = 83+'px';
          this.$refs.jgDetail.style.top = 10.6 + '%';
          // this.$refs.jgDetail.style.height = 'calc'+ '(' + 100 + '%' + '-' + 33 + 'px' + ')';
          this.$refs.jgDetail.style.height = 85.7 + '%';
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
          this.auto();
        }
        else if(index === 1){
          this.xia = true;
        }
        else if(index === 3){

        }
      },

      CloseWellCoverMonitoring(){
        this.TopDataIf = false;
        this.initMap();
      },
      showSlider: function(){
        this.modalTableDivHeight = this.$refs.ledLeft.getElementsByClassName('ipm').length * 415- this.$refs.jgDetail.offsetHeight;
        if(this.modalTableDivHeight > 0) {
          this.value10 = 100;
          this.sliderIsShow = true;
        }
      },
      hideSlider:function(){
        this.modalTableDivHeight = this.$refs.ledLeft.getElementsByClassName('ipm').length * 415 - this.$refs.jgDetail.offsetHeight;
        this.value10 = 100;
        if(this.modalTableDivHeight <= 0) {
          this.sliderIsShow = false;
        }
      },
      // 已安装设备列表页
      Already(){
       this.$refs.modalTable1[0].hideOrShow(true);
       let _this = this;
       setTimeout(function(){
         _this.showSlider();
       }, 100);
       this.Detail = true;
      },
      // 打开警报详细列表页
      police(){
        let _this = this;
        setTimeout(function(){
          _this.showSlider();
        }, 100);
        this.$refs.modalTable2[0].hideOrShow(true);
        this.Detail = true;
      },
      closeAll(){
          this.hideSlider();
          if(this.$refs.ledLeft.innerHTML === '<!----><!---->'){
            this.Detail = false;
          }
      },
         // 分页
      handleCurrentChange1: function(currentPage) {//页码切换
        this.currentPage1 = currentPage;
        console.log(this.currentPage1);
      },
      // 获取moke数据(列表数据)
      setNewsApi: function() {
        api.post('/news/index')
          .then(res => {
            this.$refs.modalTable1[0].changeData(res.articles);
            this.$refs.modalTable2[0].changeData(res.aiu);
          });
      }
    },
    computed: {
      // 模糊搜索
      tables () {
        const search = this.state1;
        if (search) {

          return this.tableData3.filter(name => {
            return Object.keys(name).some(key => {
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(name[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.tableData3
      }
    },
    components: {
      modalTable,
      LaftNavigation
    },
    watch: {
      value10:function(d1, d2){
        console.log(d1,111);
        var top = this.modalTableDivHeight / 100 * (100 - d1) ;
        this.$refs.ledLeft.style.marginTop = top === 0 ? 0 : '-' +  top + 'px';
      }
    },
    mounted(){
      // 引入地图
      this.initMap();
      /*let websocket  = new WebSocket("ws://localhost:8081/websocket");
      console.log(websocket)*/
      // window.addEventListener('scroll', this.handleScroll);
      let scrollTop = window.pageYOffset;
      console.log(scrollTop)
    },
    created(){
      this.setNewsApi();
      console.log(this.tableData,8765432);
    },
    filters: {
      toLowCase: function (str) {
        if (str == '0') {
          str = '否'
        } else if (str == '1') {
          str = '是'
        }
        return str
      },
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
    overflow: hidden;
      /*overflow-y: scroll;*/
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
    width: 230px;
    position: absolute;
    right: 40%;
    display: flex;
    span{
      width: 20%;
      height: 100%;
      line-height: 16px;
    }
    div{
      width: 70%;
      height: 100%;
    }
  }
  .map-BottomNavigation-right-scale{
    position: absolute;
    right: 15%;
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
        span{
          position: absolute;
          right: 80px;
          width: 88px;
          height: 20px;
          top: 8px;
          /* background: salmon; */
          border: 1px solid #eecdcd;
          border-radius: 5px;
        }
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
    height: calc(100% - 113px);
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
      .InstalledFormInput{
        width: 100%;
        height: 31px;
        text-align: left;
        font-size: 12px;
        line-height: 31px;
        text-indent: 14px;
        input{
          width: 241px;
          height: 19px;
          border:1px solid #a4a4a4;
          border-radius: 2px;
          margin-left: 2px;
        }
        .InstalledFormBut{
          /* width: 53px; */
          height: 20px;
          border: 1px solid #abc6dd;
          color: #042271;
          font-size: 12px;
          cursor: pointer;
          margin-right: 19px;
          border-radius: 2px;
          margin-top: 6px;
          /* display: inline-block; */
          float: right;
        }
      }
    }
  }
  .InstalledEquipment{
  }
  .AlarmClos{
    width: 21px;
    height: 21px;
    background: green;
    background-image: url('../assets/images/pic_close.png');
    float: right;
    margin-right: 5px;
    border-radius: 4px;
    cursor: pointer;
  }
  .InstallClos{
    width: 21px;
    height: 21px;
    background: seagreen;
    background-image: url('../assets/images/pic_close.png');
    float: right;
    margin-right: 5px;
    border-radius: 4px;
    cursor: pointer;
  }
  .xiacaozuo{
    z-index: 9999;
    position: absolute;
    top:30%;
    height: 40px;
    width: 30%;
  }

</style>
<style>
   .el-pagination{
    width: 50%;
     height: 20px ;
     margin-left: 48%;
     font-size: 10px;
  }
  .inps{
    width: 100%;
    height: 29px;
    border-top: 1px solid #a1adb8;
  }
  .el-pagination .btn-next{
    background: none;
  }
   .el-pagination .btn-prev{
     background: none;
   }
  .el-pagination button:disabled{
    background: none;
  }
   .el-pagination__editor.el-input .el-input__inner {
     height: 23px;
   }
 .InstalledFormInput .el-input__inner{
    height: 21px;
    margin-left: -26px;
    width: 133%;
    margin-top: 5px;
  }
   .InstalledFormInput.el-input{
     display: inline-block;
     width: 57%;
   }
  .DetailedControl .el-slider.is-vertical{
    position: relative;
    top: 195px;
    right: 5px;
    z-index: 9999;
  }
   .el-slider.is-vertical .el-slider__button-wrapper{
     z-index: 9999;
   }
   .el-slider__bar{
     background-color: #ffffff;
   }
</style>
