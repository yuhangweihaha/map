<template>
  <div id="map">
    <!--表头-->
    <div class="map-herder" :style="{height: heightData}">
      <div class="map_herders">
        <div class="images"></div>
      </div>
      <!--按钮-->
      <div class="map-herder-but" @click="mapBut">▼</div>
    </div>
    <!--遮罩层-->
    <div class="mask" v-show='Cmask'>
      <img src="../assets/images/5.gif" alt="">
    </div>
    <!--井盖监控功能-->
    <div class="WellCoverMonitoring" :style="{top:TopData}" v-if="TopDataIf">
      <ul>
        <li class="lis1" :style="{color:WellColor,flex:'1.1'}"><img src="../assets/images/pic_connected.png">
          {{LinkState}}
        </li>
        <li style="flex:1.7" @click="Already">已安装：[ {{AlreadyInstalled}} ] 个</li>
        <li style="flex:1.3" @click="lines">离线：[ {{OffLine}} ] 个</li>
        <li style="flex:2" @click="overtimes">施工打开超时：[ {{ConstructionOpensOvertime}} ] 个</li>
        <li style="flex: 1.4;color:#9b2929" @click="police">报警：<span></span> [ {{CallThePolice}} ] 个</li>
        <li class="CloseWellCoverMonitoring"><img @click="CloseWellCoverMonitoring"
                                                  src="../assets/images/pic_close.png"></li>
      </ul>
    </div>
    <!--左侧导航栏-->
    <div class="map-LeftNavigation" :style="{width: widthData}">
      <LaftNavigation v-for="(lis,index) in LeftNav" :index='index' :test="lis.test" :imgs="lis.img"
                      @Leftbut="Leftbut(index)" @MapLeft="MapLeft"></LaftNavigation>
    </div>
    <div class="map-BottomNavigation">
      <!--左侧放大+提示-->
      <div class="map-BottomNavigation-left">
        <div @click="Fullscreen" class="map-BottomNavigation-left-img"></div>
        <div class="map-BottomNavigation-left-content"> | 操作提示：请按照相关提示正确操作</div>
        <!--右侧坐标+比例尺-->
        <div class="map-BottomNavigation-right">
          <div class="map-BottomNavigation-right-coordinate"><span style="line-height: 15px">| 坐标：</span>
            <span style="display:inline-block;width: 140px">{{coordinate1}} , {{coordinate2}}</span>
          </div>
          <div class="map-BottomNavigation-right-scale"><span style="line-height: 15px;">| 比例尺：</span> <span
            style="display:inline-block;width: 60px;">{{scales}}</span></div>
        </div>
      </div>
    </div>
    <!--井盖详细列表-->
    <div class="DetailedListOfManholeCovers" v-show="Detail" ref="jgDetail">
      <!--右侧按钮滚动条区域-->
      <div class="DetailedControl" v-show="sliderIsShow">
        <div class="DetailedContens">
          <button class="DetailedControlTop Dp" @click="Topclick">☝</button>
          <button class="DetailedControlBottom Dp" @click="Bottomclick">☟</button>
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
        <modalTable v-for="item in tableData" :title="item.title" :tableData="item.data" :ref="item.name"
                    @closeAll="closeAll" @listenToChildEvent="showMsgFromChild"></modalTable>
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
  import icons from '@/assets/images/pic_img2.gif';
  import icon1 from '@/assets/images/pic_icon1.jpg';
  import icon2 from '@/assets/images/pic_icon2.jpg';
  import api from '../../axios/api.js'

  export default {
    name: '',
    data() {
      return {
        heightData: '80px',
        widthData: '78px',
        TopData: '83px',
        isTop: true,
        isLeft: true,
        TopDataIf: false,
        sosuo: '',
        didian: '',
        Cmask: false, //遮罩层
        xia: false,
        LinkState: '已连接', /*链接状态*/
        AlreadyInstalled: '3424', /*已安装的个数*/
        OffLine: '0', /*离线*/
        ConstructionOpensOvertime: '0', /*施工打开超时*/
        WellColor: '#22a36b',
        CallThePolice: '2', /*警报*/
        coordinate1: 116.500004,
        coordinate2: 40.000002,
        one: '116.504000',
        two: '40.020000',
        scales: '1公里',
        value10: 100, /*向下滑动*/
        haha: 0,    //点击
        Detail: false, /*井盖详细列表显示隐藏*/
        Call: false, /*报警设备显示因隐藏*/
        already: true, /*已安装设备列表显示隐藏 */
        LeftNav: [
          {test: "视图操作", img: require("../assets/images/pic_but1.png")},
          {test: "查询定位", img: require("../assets/images/pic_but3.png")},
          {test: "井盖监控", img: require("../assets/images/pic_but2.png")},
          {test: "车辆GPS监控", img: require("../assets/images/pic_but4.png")},
          {test: "巡检监控", img: require("../assets/images/pic_but5.png")},
          {test: "案件管理", img: require("../assets/images/pic_but6.png")},
          {test: "信息维护", img: require("../assets/images/pic_but7.png")},
          {test: "打印出图", img: require("../assets/images/pic_but8.png")},
          {test: "关于系统", img: require("../assets/images/pic_but9.png")}
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
            data: []
          },
          {
            name: 'modalTable3',
            title: '离线装设备列表',
            data: []
          },
          {
            name: 'modalTable4',
            title: '施工打开超时设备列表',
            data: []
          }
        ],
        currentPage1: 1, /*分页*/
        pagesize: 10,
        restaurants: [], /*模糊查询*/
        state1: '',
        sliderIsShow: false,
        modalTableDivHeight: 0,
        modalTableAllHeight: 0,
        contentone: '0001234',
        newsListShow: [],
        ListShow: [],
        map: '',
        AlarmDetails: [],   //接收报警列表
        alreadyInstalled: [],   //接收已安装列表
        Timeoutlist: [],                 //超时列表
        Offlinelist: [],           //离线列表
        mapIcon: '',
        markerMap: {},
        blc: ''
      }
    },
    methods: {
      // 百度地图
      initMap() {
        let _this = this;
        this.map = new BMap.Map(this.$refs.allmap); // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(this.one, this.two), 14);// 初始化地图,设置中心点坐标和地图级别
        // this.map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP] }));//添加地图类型控件
        this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        this.blc = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
        this.map.addControl(this.blc);  //比例尺控件
        _this.map.addEventListener("mousemove", function (e) { // 获取坐标
          _this.coordinate1 = e.point.lng;
          _this.coordinate2 = e.point.lat;
        });
        _this.map.addEventListener("zoomend", function (evt) {  //获取比例尺值
          setTimeout(function () {
            _this.scales = _this.blc.B.getElementsByClassName("BMap_scaleTxt")[0].innerText;
            console.log(_this.scales, ' _this.scales');
          }, 100);
        });
      },
      //警告列表坐标
      Wellcoveralarm() {
        //设置标注的图标
        let tails = this.AlarmDetails;
        for (let i = 0; i < tails.length; i++) {
          let arr = tails[i];
          this.mapIcon = new BMap.Icon(iconCar, new BMap.Size(100, 100)); //图标
          //设置标注的经纬度
          this.map.centerAndZoom(new BMap.Point(arr.coordinateX, arr.coordinateY + 0.017), 14); //
          let marker = new BMap.Marker(new BMap.Point(arr.coordinateX, arr.coordinateY), {icon: this.mapIcon});
          //把标注添加到地图上
          this.map.addOverlay(marker);
          let content = "<table style='font-size: 12px;display:block;width: 280px;height: 320px;overflow:scroll;'>";
          content += "<tr style='height: 50px;margin-left: 20px'><td>设备编号：<input type='text' value = " + arr.date + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>井盖编号：<input type='text' value =" + arr.names + " ></td></tr>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>管理单位：<input type='text' value = " + arr.ManagementUnit + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>生产厂家：<input type='text' value = " + arr.Manufacturer + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>安装单位：<input type='text' value =" + arr.Installation + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>安装日期：<input type='text' value =" + arr.installDate + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>使用寿命：<input type='text' value =" + arr.ServiceLife + '年' + "  ></tr></td>";
          content += "<tr style='height: 50px;margin-bottom: 40px'><td>井盖坐标：<input type='text' value =" + 'X:' + arr.coordinateX + 'Y:' + arr.coordinateY + "></tr></td>";
          content += "</table>";
          content += "<div style='position: absolute;bottom: -3px;background:#fff;height: 37px;width: 100%;'><button class='reduction' style='padding: 3px 15px;float: left;margin-left: 35px;margin-top: 3px'>井盖复位</button><button class='close' style='padding: 3px 15px;float: right;margin-right: 15px;margin-top: 3px'>关闭</button><button class='yudad' style='padding: 3px 15px;float: right;margin-right: 10px;margin-top: 3px'>分派</button></div>";
          let infowindow = new BMap.InfoWindow(content);
          // 人员分派点击事件
          marker.addEventListener("click", function () {
            this.openInfoWindow(infowindow);
            setTimeout(function () {
              document.getElementsByClassName('yudad')[0].onclick = function () {
                alert(0);
              };
              document.getElementsByClassName('close')[0].onclick = function () {
                document.querySelector('.BMap_pop').style.display = "none";
                document.querySelector('.BMap_shadow').style.display = "none";
              };
              document.getElementsByClassName('reduction')[0].onclick = function () {
                alert(2);
              };
            }, 100)
          });
          this.markerMap[arr.coordinateX + "_" + arr.coordinateY] = marker;
        }
        this.Cmask = false;
      },
      //已安装设备列表
      auto() {
        let Alar = this.alreadyInstalled;
        for (let i = 0; i < Alar.length; i++) {
          let arr = Alar[i];
          if (arr.name === '报警') {
            this.mapIcon = new BMap.Icon(iconCar, new BMap.Size(100, 100)); //图标
          } else if (arr.name === '正常') {
            this.mapIcon = new BMap.Icon(icons, new BMap.Size(100, 80)); //图标
          } else if (arr.name === '离线') {
            this.mapIcon = new BMap.Icon(icon1, new BMap.Size(100, 100)); //图标
          } else if (arr.name === '超时') {
            this.mapIcon = new BMap.Icon(icon2, new BMap.Size(88, 88)); //图标
          }
          //设置标注的经纬度
          this.map.centerAndZoom(new BMap.Point(arr.coordinateX, arr.coordinateY + 0.017), 14); //
          let marker = new BMap.Marker(new BMap.Point(arr.coordinateX, arr.coordinateY), {icon: this.mapIcon});
          //把标注添加到地图上
          this.map.addOverlay(marker);
          let content = "<table style='font-size: 12px;display:block;width: 280px;height: 320px;overflow:scroll;'>";
          content += "<tr style='height: 50px;margin-left: 20px'><td>设备编号：<input type='text' value = " + arr.date + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>井盖编号：<input type='text' value =" + arr.names + " ></td></tr>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>管理单位：<input type='text' value = " + arr.ManagementUnit + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>生产厂家：<input type='text' value = " + arr.Manufacturer + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>安装单位：<input type='text' value =" + arr.Installation + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>安装日期：<input type='text' value =" + arr.installDate + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>使用寿命：<input type='text' value =" + arr.ServiceLife + '年' + "  ></tr></td>";
          content += "<tr style='height: 50px;margin-bottom: 40px'><td>井盖坐标：<input type='text' value =" + 'X:' + arr.coordinateX + 'Y:' + arr.coordinateY + "></tr></td>";
          content += "<div style='position: absolute;bottom: -3px;background:#fff;height: 37px;width: 100%;'><button class='reduction' style='padding: 3px 15px;float: left;margin-left: 35px;margin-top: 3px'>井盖复位</button><button class='close' style='padding: 3px 15px;float: right;margin-right: 15px;margin-top: 3px'>关闭</button><button class='yudad' style='padding: 3px 15px;float: right;margin-right: 10px;margin-top: 3px'>分派</button></div>";
          content += "</table>";
          let infowindow = new BMap.InfoWindow(content);
          marker.addEventListener("click", function () {
            this.openInfoWindow(infowindow);
            setTimeout(function () {
              document.getElementsByClassName('yudad')[0].onclick = function () {
                alert(0);
              };
              document.getElementsByClassName('close')[0].onclick = function () {
                document.querySelector('.BMap_pop').style.display = "none";
                document.querySelector('.BMap_shadow').style.display = "none";
              };
              document.getElementsByClassName('reduction')[0].onclick = function () {
                alert(2);
              };
            }, 100)
          });
          this.markerMap[arr.coordinateX + "_" + arr.coordinateY] = marker;
        }
        this.Cmask = false;
      },
      // 施工超时设备列表
      Constructiontimeout() {
        let Alar = this.Timeoutlist;
        for (let i = 0; i < Alar.length; i++) {
          let arr = Alar[i];
          this.mapIcon = new BMap.Icon(icon2, new BMap.Size(88, 88)); //图标
          //设置标注的经纬度
          this.map.centerAndZoom(new BMap.Point(arr.coordinateX, arr.coordinateY + 0.017), 14); //
          let marker = new BMap.Marker(new BMap.Point(arr.coordinateX, arr.coordinateY), {icon: this.mapIcon});
          //把标注添加到地图上
          this.map.addOverlay(marker);
          let content = "<table style='font-size: 12px;display:block;width: 280px;height: 320px;overflow:scroll;'>";
          content += "<tr style='height: 50px;margin-left: 20px'><td>设备编号：<input type='text' value = " + arr.date + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>井盖编号：<input type='text' value =" + arr.names + " ></td></tr>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>管理单位：<input type='text' value = " + arr.ManagementUnit + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>生产厂家：<input type='text' value = " + arr.Manufacturer + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>安装单位：<input type='text' value =" + arr.Installation + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>安装日期：<input type='text' value =" + arr.installDate + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>使用寿命：<input type='text' value =" + arr.ServiceLife + '年' + "  ></tr></td>";
          content += "<tr style='height: 50px;margin-bottom: 40px'><td>井盖坐标：<input type='text' value =" + 'X:' + arr.coordinateX + 'Y:' + arr.coordinateY + "></tr></td>";
          content += "<div style='position: absolute;bottom: -3px;background:#fff;height: 37px;width: 100%;'><button class='reduction' style='padding: 3px 15px;float: left;margin-left: 35px;margin-top: 3px'>井盖复位</button><button class='close' style='padding: 3px 15px;float: right;margin-right: 15px;margin-top: 3px'>关闭</button><button class='yudad' style='padding: 3px 15px;float: right;margin-right: 10px;margin-top: 3px'>分派</button></div>";
          content += "</table>";
          let infowindow = new BMap.InfoWindow(content);
          marker.addEventListener("click", function () {
            this.openInfoWindow(infowindow);
            setTimeout(function () {
              document.getElementsByClassName('yudad')[0].onclick = function () {
                alert(0);
              };
              document.getElementsByClassName('close')[0].onclick = function () {
                document.querySelector('.BMap_pop').style.display = "none";
                document.querySelector('.BMap_shadow').style.display = "none";
              };
              document.getElementsByClassName('reduction')[0].onclick = function () {
                alert(2);
              };
            }, 100)
          });
          this.markerMap[arr.coordinateX + "_" + arr.coordinateY] = marker;
        }
        this.Cmask = false;
      },
      //离线设备列表
      offlineequipment() {
        let Alar = this.Offlinelist;
        for (let i = 0; i < Alar.length; i++) {
          let arr = Alar[i];
          this.mapIcon = new BMap.Icon(icon1, new BMap.Size(100, 100)); //图标
          //设置标注的经纬度
          this.map.centerAndZoom(new BMap.Point(arr.coordinateX, arr.coordinateY + 0.017), 14); //
          let marker = new BMap.Marker(new BMap.Point(arr.coordinateX, arr.coordinateY), {icon: this.mapIcon});
          //把标注添加到地图上
          this.map.addOverlay(marker);
          let content = "<table style='font-size: 12px;display:block;width: 280px;height: 320px;overflow:scroll;'>";
          content += "<tr style='height: 50px;margin-left: 20px'><td>设备编号：<input type='text' value = " + arr.date + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>井盖编号：<input type='text' value =" + arr.names + " ></td></tr>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>管理单位：<input type='text' value = " + arr.ManagementUnit + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>生产厂家：<input type='text' value = " + arr.Manufacturer + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>安装单位：<input type='text' value =" + arr.Installation + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>安装日期：<input type='text' value =" + arr.installDate + "></tr></td>";
          content += "<tr style='height: 50px;margin-top: 20px'><td>使用寿命：<input type='text' value =" + arr.ServiceLife + '年' + "  ></tr></td>";
          content += "<tr style='height: 50px;margin-bottom: 40px'><td>井盖坐标：<input type='text' value =" + 'X:' + arr.coordinateX + 'Y:' + arr.coordinateY + "></tr></td>";
          content += "<div style='position: absolute;bottom: -3px;background:#fff;height: 37px;width: 100%;'><button class='reduction' style='padding: 3px 15px;float: left;margin-left: 35px;margin-top: 3px'>井盖复位</button><button class='close' style='padding: 3px 15px;float: right;margin-right: 15px;margin-top: 3px'>关闭</button><button class='yudad' style='padding: 3px 15px;float: right;margin-right: 10px;margin-top: 3px'>分派</button></div>";
          content += "</table>";
          let infowindow = new BMap.InfoWindow(content);
          marker.addEventListener("click", function () {
            this.openInfoWindow(infowindow);
            setTimeout(function () {
              document.getElementsByClassName('yudad')[0].onclick = function () {
                alert(0);
              };
              document.getElementsByClassName('close')[0].onclick = function () {
                document.querySelector('.BMap_pop').style.visibility = "hidden";
                document.querySelector('.BMap_shadow').style.visibility = "hidden";
              };
              document.getElementsByClassName('reduction')[0].onclick = function () {
                alert(2);
              };
            }, 100)
          });
          this.markerMap[arr.coordinateX + "_" + arr.coordinateY] = marker;
        }
        this.Cmask = false;
      },
      mapBut() {
        if (this.isTop) {
          this.heightData = 0 + 'px';
          this.TopData = 0 + 'px';
          this.isTop = false;
          this.$refs.jgDetail.style.top = 0.6 + '%';
          // this.$refs.jgDetail.style.height = 'calc'+ '(' + 100 + '%' + '-' + 33 + 'px' + ')';
          this.$refs.jgDetail.style.height = 96 + '%';
        }
        else {
          this.isTop = true;
          this.heightData = 80 + 'px';
          this.TopData = 83 + 'px';
          this.$refs.jgDetail.style.top = 10.6 + '%';
          // this.$refs.jgDetail.style.height = 'calc'+ '(' + 100 + '%' + '-' + 33 + 'px' + ')';
          this.$refs.jgDetail.style.height = 85.7 + '%';
        }
      },
      // 加载动画
      openFullScreen() {
        this.loading = this.$loading({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      // 关闭加载
      closeLoading() {
        this.loading.close();
      },
      Topclick() {
        if (this.value10 < 100) {
          this.value10 = this.value10 + 10;
        }
      },
      Bottomclick() {
        if (this.value10 > 0) {
          this.value10 = this.value10 - 10;
        }
      },
      MapLeft() {
        if (this.isLeft) {
          this.widthData = 0 + 'px';
          this.isLeft = false;
        }
        else {
          this.isLeft = true;
          this.widthData = 78 + 'px';
        }
      },
      Leftbut(index) {
        if (index === 2) {
          let _this = this;
          this.Cmask = true;
          this.TopDataIf = true;
          setTimeout(function () {
            _this.Wellcoveralarm();
          }, 100);
        }
        else if (index === 1) {
          this.xia = true;
        }
        else if (index === 3) {
        }
      },
      //全屏
      Fullscreen() {
        let docElm = document.getElementById('map');//要被全屏的元素
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        }
        //FireFox
        else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        }
        //Chrome等
        else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        }
        //IE11
        else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      },
      CloseWellCoverMonitoring() {
        this.TopDataIf = false;
        this.initMap();
        this.Detail = false;
        this.$refs.modalTable1[0].hideOrShow(false);
        this.$refs.modalTable2[0].hideOrShow(false);
        this.$refs.modalTable3[0].hideOrShow(false);
        this.$refs.modalTable4[0].hideOrShow(false);
      },
      // 判断是否出来滚动条
      showSlider: function () {
        this.modalTableDivHeight = this.$refs.ledLeft.getElementsByClassName('ipm').length * 415 - this.$refs.jgDetail.offsetHeight;
        console.log(this.modalTableDivHeight, '8756555');
        console.log(this.$refs.jgDetail.offsetHeight);
        if (this.modalTableDivHeight > 0) {
          this.value10 = 100;
          this.sliderIsShow = true;
        }
      },
      // 判断是否出来滚动条
      hideSlider: function () {
        this.modalTableDivHeight = this.$refs.ledLeft.getElementsByClassName('ipm').length * 415 - this.$refs.jgDetail.offsetHeight;
        this.value10 = 100;
        if (this.modalTableDivHeight <= 0) {
          this.sliderIsShow = false;
        }
      },

      // 已安装设备列表页
      Already() {
        let _this = this;
        this.Cmask = true;
        setTimeout(function () {
          _this.auto();
          _this.showSlider();
        }, 100);
        _this.Detail = true;
        _this.$refs.modalTable1[0].hideOrShow(true);
      },
      //离线设备列表
      lines() {

        if (this.Offlinelist.length === 0) {
          this.$message.warning('没有离线设备');
        } else {
          let _this = this;
          this.Cmask = true;

          setTimeout(function () {
            _this.showSlider();
            _this.offlineequipment();
          }, 100);
          _this.Detail = true;
          _this.$refs.modalTable3[0].hideOrShow(true);

        }
      },
      //超时设备列表
      overtimes() {

        if (this.Timeoutlist.length === 0) {
          this.$message.warning('没有超时设备');
        } else {
          let _this = this;
          this.Cmask = true;

          setTimeout(function () {
            _this.Constructiontimeout();
            _this.showSlider();
          }, 100);
          _this.Detail = true;
          _this.$refs.modalTable4[0].hideOrShow(true);
        }

      },
      // 打开警报详细列表页
      police() {

        if (this.AlarmDetails.length === 0) {
          this.$message.warning('没有报警设备');
        } else {
          let _this = this;
          this.Cmask = true;

          setTimeout(function () {
            _this.showSlider();
            _this.Wellcoveralarm();
          }, 100);
          _this.Detail = true;
          _this.$refs.modalTable2[0].hideOrShow(true);

        }
      },
      // 点击关闭详情页
      closeAll() {
        this.hideSlider();
        if (this.$refs.ledLeft.innerHTML === '<!----><!---->') {
          this.Detail = false;
        }
      },
      // 点击详情页完成跳转与展示
      showMsgFromChild(point) {
        this.map.centerAndZoom(new BMap.Point(point[0], point[1] + 0.02), 14);// 初始化地图,设置中心点坐标和地图级别
        this.markerMap[point[0] + "_" + point[1]].V.click();
      },
      // 分页
      handleCurrentChange1: function (currentPage) {//页码切换
        this.currentPage1 = currentPage;
        console.log(this.currentPage1);
      },
      // 获取moke数据(列表数据)
      setNewsApi: function () {

        api.post('/news/index')
          .then(res => {
            console.log(res, 'res');
            this.$refs.modalTable1[0].changeData(res.articles);  //所有设备
            this.$refs.modalTable2[0].changeData(res.aiu);   //报警
            this.$refs.modalTable3[0].changeData(res.Offline);  //离线
            this.$refs.modalTable4[0].changeData(res.overtime);  //超时
            this.AlarmDetails = res.aiu;
            this.alreadyInstalled = res.articles;
            this.Timeoutlist = res.overtime;
            this.Offlinelist = res.Offline;
            this.CallThePolice = this.AlarmDetails.length;
            this.AlreadyInstalled = this.alreadyInstalled.length;
            this.OffLine = this.Offlinelist.length;
            this.ConstructionOpensOvertime = this.Timeoutlist.length;
          });
      },

      //mock井盖基本信息
      /*Secondcover: function() {
        api.post('/news/api')
          .then(res => {
            this.AlarmDetails = res;
            console.log(this.AlarmDetails,8888)
          });
      }*/
    },
    computed: {
      // 模糊搜索
      tables() {
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
      value10: function (d1, d2) {
        console.log(d1, 1000);
        let top = this.modalTableDivHeight / 100 * (100 - d1);
        console.log(top, 'top');
        this.$refs.ledLeft.style.marginTop = top === 0 ? 0 : '-' + top + 'px';
      }
    },
    mounted() {
      // 引入地图
      this.initMap();
      /*let websocket  = new WebSocket("ws://localhost:8081/websocket");
      console.log(websocket)*/
      // window.addEventListener('scroll', this.handleScroll);
      let scrollTop = window.pageYOffset;
      console.log(scrollTop);
    },
    created() {
      this.setNewsApi();
      // this.Secondcover();
      console.log(this.tableData, 8765432);
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
    text-align: center;
    color: #2c3e50;

  }

  #allmap {
    height: 100%;
    overflow: hidden;
  }

  .mask {
    position: fixed;
    left: 0;
    top: 0;
    opacity: .5;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 10000;
    /*pointer-events: none; //不能操作*/
    img {
      position: absolute;
      left: 47%;
      top: 47%;
      transform: translate(-50% -50%);
    }
  }

  .map-herder {
    height: 80px;
    width: 100%;
    background: #48628b;
    opacity: 0.85;
    position: absolute;
    top: 0;
    z-index: 1000;
    box-shadow: 0 3px 0px #b4d3fc;
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
    height: 117%;
    position: absolute;
    top: 16px;
    left: 3px;
    background-image: url('../assets/images/pic_logo3.png');
    background-repeat: repeat-y;
  }

  .map-herder-but {
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

  .map-herder-but:hover {
    background: #fdd974;
  }

  .map-LeftNavigation {
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

  .map-LeftNavigation-ul {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    /*overflow-y: scroll;*/
  }

  .map-LeftNavigation-li {
    width: 100%;
    height: 68px;
    border-bottom: 1px solid #000;
    cursor: pointer;
  }

  .map-LeftNavigation-li :hover {
    img {
      width: 50%;
      height: 70%;
    }
  }

  .tb {
    height: 17px;
    width: 100%;
    background: #2f558a;
    position: absolute;
    cursor: pointer;
  }

  .map-LeftNavigation-top {
    top: 0;
    border-radius: 0 10px 0 0;
  }

  .map-LeftNavigation-bottom {
    bottom: 0;
    border-radius: 0 0 10px 0;
  }

  .map-LeftNavigation-but {
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

  .map-LeftNavigation-but:hover {
    background: #fdd974;
  }

  .map-LeftNavigation-li-spant {
    width: 100%;
    height: 70%;
  }

  .map-LeftNavigation-li-spant img {
    margin-top: 6px;
  }

  .map-LeftNavigation-li-spanb {
    width: 100%;
    height: 30%;
    font-size: 13px;
    color: #fff;
    line-height: 21px;
  }

  .map-BottomNavigation {
    width: 100%;
    height: 27px;
    background: #2b4d77;
    position: fixed;
    bottom: 0;
    z-index: 9999;
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
    background-image: url('../assets/images/pic_sobig.png');
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
    right: 40%;
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

  .BMap_pop {
    background: red;
  }

  .BMap_top {
    box-sizing: content-box;
    overflow: hidden;
    z-index: 999;
    position: absolute;
    left: 1px;
    top: 0px;
    width: 310px;
    height: 25px;
    background: red;
  }

  .map-BottomNavigation-right-scale {
    position: absolute;
    right: 22%;
    top: -1px;
  }

  .WellCoverMonitoring {
    width: 613px;
    height: 38px;
    background: #e4e4e4;
    position: absolute;
    top: 83px;
    left: 30%;
    z-index: 999;
    -webkit-box-shadow: 0 0 13px 3px;
    box-shadow: 0 0 19px 1px;
    border-radius: 0px 0px 10px 10px;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      padding: 0;
      margin: 0;
      justify-content: center;
      align-items: center;
      li {
        flex: 1;
        font-size: 12px;
        list-style: none;
        color: #2c4586;
        cursor: pointer;
        span {
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

  .CloseWellCoverMonitoring {
    cursor: pointer;
    border-left: 1px solid #5e5e5e;
  }

  .lis1 {
    border-right: 1px solid #5e5e5e;
    line-height: 26px;
    img {
      float: left;
      margin-left: 5px;
    }
  }

  .DetailedListOfManholeCovers {
    width: 28.5%;
    height: calc(100% - 113px);
    position: absolute;
    right: 1px;
    top: 10.6%;
    z-index: 9999;
    overflow: hidden;
  }

  .DetailedControl {
    height: 100%;
    width: 35px;
    float: right;
    display: inline-block;
    .DetailedContens {
      height: 310px;
      width: 100%;
      background: #1d4173;
      border-radius: 6px 0 0 6px;
      box-sizing: border-box;
      border-left: 1px solid #b4d3fc;
      position: relative;
      .DetailedControlBottom {
        top: 32%;
      }
      .DetailedControlTop {
        top: 5%;
      }
      .Dp {
        position: absolute;
        color: #fff;
        font-size: 50px;
        z-index: 10001;
        left: 0%;
        cursor: pointer;
        background: none;
        border: 0;
        outline: 0 none !important;
      }
    }
  }

  .DetailedLeft {
    width: 92%;
    height: auto;
  }

  .ipm {
    width: 402px;
    height: 402px;
    background: #31588d;
    border-radius: 5px;
    border: 1px solid #b4d3fc;
    margin-bottom: 10px;
    overflow: hidden;
    p {
      margin: 0;
      font-size: 15px;
      color: #fff;
      font-weight: bold;
      text-align: left;
      text-indent: 20px;
      line-height: 30px;
    }
    .InstalledForm {
      width: 96%;
      height: 91%;
      background: #eee;
      margin-left: 2%;
      p {
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
      .InstalledFormInput {
        width: 100%;
        height: 31px;
        text-align: left;
        font-size: 12px;
        line-height: 31px;
        text-indent: 14px;
        input {
          width: 241px;
          height: 19px;
          border: 1px solid #a4a4a4;
          border-radius: 2px;
          margin-left: 2px;
        }
        .InstalledFormBut {
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
      #BMap_pop {
        background: red;
      }
    }
  }

  .InstalledEquipment {
  }

  .AlarmClos {
    width: 21px;
    height: 21px;
    background: green;
    background-image: url('../assets/images/pic_close.png');
    float: right;
    margin-right: 5px;
    border-radius: 4px;
    cursor: pointer;
  }

  .InstallClos {
    width: 21px;
    height: 21px;
    background: seagreen;
    background-image: url('../assets/images/pic_close.png');
    float: right;
    margin-right: 5px;
    border-radius: 4px;
    cursor: pointer;
  }

  .xiacaozuo {
    z-index: 9999;
    position: absolute;
    top: 30%;
    height: 40px;
    width: 30%;
  }

  #allmap .BMap_scaleCtrl {
    height: 0;
    display: none;
  }
</style>
<style>
  .BMap_pop img {
    display: none;
  }

  .el-pagination {
    width: 50%;
    height: 20px;
    margin-left: 48%;
    font-size: 10px;
  }

  .inps {
    width: 100%;
    height: 29px;
    border-top: 1px solid #a1adb8;
  }

  .el-pagination .btn-next {
    background: none;
  }

  .el-pagination .btn-prev {
    background: none;
  }

  .el-pagination button:disabled {
    background: none;
  }

  .el-pagination__editor.el-input .el-input__inner {
    height: 23px;
  }

  .InstalledFormInput .el-input__inner {
    height: 21px;
    margin-left: -26px;
    width: 133%;
    margin-top: 5px;
  }

  .InstalledFormInput.el-input {
    display: inline-block;
    width: 57%;
  }

  .DetailedControl .el-slider.is-vertical {
    position: relative;
    top: 195px;
    right: 1px;
    z-index: 9;
  }

  .el-slider.is-vertical .el-slider__button-wrapper {
    z-index: 9999;
  }

  .el-slider__bar {
    background-color: #ffffff;
  }
</style>
