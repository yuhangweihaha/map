<template>
  <div id="map">
    <!--表头-->
    <!--<div class="map-herder" :style="{height: heightData}">
      <div class="map_herders">
        <div class="images"></div>
      </div>
      &lt;!&ndash;按钮&ndash;&gt;
      <div class="map-herder-but" @click="mapBut">▼</div>
    </div>-->
    <!--遮罩层-->
    <div class="mask" v-show='Cmask'>
      <img src="../assets/images/5.gif" alt="">
    </div>
    <!--井盖监控功能-->
    <div class="WellCoverMonitoring" :style="{top:TopData}" v-if="TopDataIf">
      <audio v-if="mapbottomaudio" style="position: absolute;top:-40px" :src="audios" loop="loop" autoplay="autoplay">
        您的浏览器不支持 audio 标签。
      </audio>
      <ul>
        <li class="lis1" :style="{color:WellColor,flex:'1.1'}" :class='Closed'><img
          src="../assets/images/pic_connected.png">
          {{LinkState}}
        </li>
        <li style="flex:1.7" @click="Already">已安装：[ {{AlreadyInstalled}} ] 个</li>
        <li style="flex:1.3" @click="lines">离线：[ {{OffLine}} ] 个</li>
        <li style="flex:2" @click="overtimes">施工打开超时：[ {{ConstructionOpensOvertime}} ] 个</li>
        <li ref="aseddsad" style="flex: 1.4;color:#9b2929" @click="police">报警：<span v-if="policespan"></span> [
          {{CallThePolice}} ] 个
        </li>
        <li style="flex: 0.5;padding-right: 5px" @click="SoundEetting">设置</li>
        <li class="CloseWellCoverMonitoring"><img @click="CloseWellCoverMonitoring"
                                                  src="../assets/images/pic_close.png"></li>
      </ul>
    </div>
    <!--左侧导航栏-->
    <div class="Lall" @mousewheel.native="MapLefts(e)">
      <div class="map-LeftNavigation-but" @click="MapLeft">▶</div>
      <div class="map-LeftNavigation" :style="{width: widthData}">
        <div class="map-LeftNavigation-top tb" @click="LeftTop">▲</div>
        <div class="map-LeftNavigation-bottom tb" @click="LeftBot">▼</div>
        <div class="leftNavAll" ref="leftNavAlls">
          <LaftNavigation v-for="(lis,index) in LeftNav" :index='index' :test="lis.test" :imgs="lis.img" :key="index"
                          @Leftbut="Leftbut(index)"></LaftNavigation>
        </div>
      </div>
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
          <div class="Traffic" @click="Traffics"> 点击查看路况</div>
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
                :show-tooltip="false"
                vertical
                height="100px">
              </el-slider>
            </div>
          </template>
        </div>
      </div>
      <!--左侧表格区域-->
      <div class="DetailedLeft" ref="ledLeft">
        <modalTable v-for="(item,index) in tableData" :key="index" :title="item.title" :tableData="item.data"
                    :ref="item.name"
                    @closeAll="closeAll" @listenToChildEvent="showMsgFromChild"></modalTable>
      </div>
    </div>
    <!--地图-->
    <div id="allmap" ref="allmap"></div>
    <!--树形控件分配人员-->
    <el-dialog title="人员分配" :visible.sync="Assignment">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        :data="data2"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        show-checkbox
        check-strictly
        node-key="id"
        :default-expanded-keys="[5, 2]"
        ref="tree2">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Assignment = false">取 消</el-button>
        <el-button type="primary" @click="DetermineAssignment">确 定</el-button>
      </span>
    </el-dialog>
    <!--设置-->
    <el-dialog title="设置" :visible.sync="SetUp">
      <el-checkbox :disabled="disabled" v-model="checked">是否关闭报警声</el-checkbox>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SetUp = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--圆域\方域范围内井盖信息-->
    <el-dialog title="范围内井盖数量" :visible.sync="Range">
      <el-table
        :data="this.ScopeInformation"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="sensorNo"
          label="设备编号"
          width="220">
        </el-table-column>
        <el-table-column
          prop="range"
          label="设备名称"
          width="220">
        </el-table-column>
        <el-table-column
          label="设备坐标">
          <template slot-scope="scope">
            <span>{{ scope.row.latitude }}、{{ scope.row.longitude }}</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Range = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import modalTable from '@/common/modalTable';
  import LaftNavigation from '@/common/LaftNavigation';
  import iconCar from '@/assets/images/pic_img1.gif';
  import icons from '@/assets/images/pic_img2.gif';
  import icon1 from '@/assets/images/pic_icon1.jpg';
  import icon2 from '@/assets/images/pic_icon2.jpg';
  /*import icon3 from '@/assets/images/111.png';
  import icon4 from '@/assets/images/222.png';*/

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
        Range:false,
        xia: false,
        Closed: 'Closed',
        disabled: false,
        LinkState: '已连接', /*链接状态*/
        AlreadyInstalled: '3424', /*已安装的个数*/
        OffLine: '0', /*离线*/
        ConstructionOpensOvertime: 0, /*施工打开超时*/
        WellColor: '#22a36b',
        CallThePolice: 0, /*警报*/
        coordinate1: 116.500004,
        coordinate2: 40.059596,
        policespan: true,
        one: '116.645291',
        two: '40.059399',
        scales: '1公里',
        sha: '',
        zi: '',
        mapbottomaudio: false, //报警音乐开启
        checked: false,  //点击多选框关闭报警音乐
        audios: require("../assets/audio/5320.mp3"),
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
            name: 'modalTable2',
            title: '离线装设备列表',
            data: []
          },
          {
            name: 'modalTable3',
            title: '施工打开超时设备列表',
            data: []
          },
          {
            name: "modalTable4",
            title: '报警设备列表',
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
        blc: '',
        ctrl: '',        //显示路况
        Assignment: false,  //人员分派
        SetUp: false,    //声音设置
        filterText: '',
        data2: [{    //树形控件人员分配
          id: 1,
          label: '研发中心1',
          children: [{
            id: 2,
            label: '张三'
          }, {
            id: 3,
            label: '李四'
          }]
        }, {
          id: 4,
          label: '研发中心2',
          children: [{
            id: 5,
            label: '王五'
          }, {
            id: 6,
            label: '赵六',
          }]
        }, {
          id: 113,
          label: '研发中心3',
          children: [{
            id: 7,
            label: '潘七'
          }, {
            id: 8,
            label: '六八'
          }]
        },
          {
            id: 9,
            label: '研发中心3',
            children: [{
              id: 10,
              label: '潘七'
            }, {
              id: 11,
              label: '六八',
            }]
          },
          {
            id: 12,
            label: '研发中心3',
            children: [{
              id: 13,
              label: '潘七'
            }, {
              id: 14,
              label: '六八'
            }]
          }, {
            id: 15,
            label: '研发中心3',
            children: [{
              id: 16,
              label: '潘七',
            }, {
              id: 17,
              label: '六八'
            }]
          }


        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        nowData: '',
        jgtype: 0,
        notify: null,
        LeftA: 0,
        ScopeInformation:'',
        CenterLongitude:[],   //中心点经度
        CenterLatitude:[],   //中心点维度
        ThePeak:[],          //最高点
        radius:[],             //半径
        longitudeLeft:[],  //左下经度
        latitudeLeft:[],  //左下纬度
        longitude1Right:[], //右上经度
        latitude1Right:[]  //右上纬度

      };
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
        // 路况显示
        this.ctrl = new BMapLib.TrafficControl({

          // showPanel: false //是否显示路况提示面板`
        });

      },

      //已安装设备列表
      auto(type, type2) {
        let _this = this;
        let Alar = this.alreadyInstalled;
        let nowArray = [];
        let x = Alar[0].coordinateX;
        let y = Alar[0].coordinateY;
        for (let i = 0; i < Alar.length; i++) {
          let arr = Alar[i];
          if (type === 0 || type === arr.name) {
            nowArray.push(JSON.parse(JSON.stringify(arr)));
            if (arr.name === 0) {
              this.mapIcon = new BMap.Icon(icons, new BMap.Size(100, 80)); //图标
            } else if (arr.name === 1) {
              this.mapIcon = new BMap.Icon(icon1, new BMap.Size(100, 100)); //图标
            } else if (arr.name === 2) {
              this.mapIcon = new BMap.Icon(icon2, new BMap.Size(88, 88)); //图标
            } else if (arr.name === 3) {
              this.mapIcon = new BMap.Icon(iconCar, new BMap.Size(100, 100)); //图标
            }
            x = arr.coordinateX;
            y = arr.coordinateY;
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
            content += "<tr style='height: 50px;margin-bottom: 40px'><td>井盖坐标：<input type='text' value =" + arr.coordinateX + '、' + arr.coordinateY + "></tr></td>";
            content += "<div style='position: absolute;bottom: -3px;background:#fff;height: 37px;width: 100%;'><button class='reduction' style='padding: 3px 15px;float: left;margin-left: 35px;margin-top: 3px'>井盖复位</button><button class='close' style='padding: 3px 15px;float: right;margin-right: 15px;margin-top: 3px'>关闭</button><button class='yudad' id='yd' + i +  style='padding: 3px 15px;float: right;margin-right: 10px;margin-top: 3px'>分派</button></div>";
            content += "</table>";
            let infowindow = new BMap.InfoWindow(content);
            marker.addEventListener("click", function () {
              this.openInfoWindow(infowindow);
              setTimeout(function () {
                //人员分派
                document.getElementsByClassName('yudad')[0].onclick = function () {
                  _this.Assignment = true;
                  _this.nowData = arr;
                  //点击值存入
                  _this.$refs['tree2'].setCheckedKeys(_this.nowData.selectPerson)
                };
                document.getElementsByClassName('close')[0].onclick = function () {
                  document.querySelector('.BMap_pop').style.display = "none";
                  document.querySelector('.BMap_shadow').style.display = "none";
                };
                //井盖复位
                document.getElementsByClassName('reduction')[0].onclick = function () {
                  //接口
                  _this.nowData = arr;
                  _this.inquiry(arr.name);
                  this.jgtype = type;
                };
              }, 100)
            });
            this.markerMap[arr.coordinateX + "_" + arr.coordinateY] = marker;
          }
        }
        let table = null,
          mes = '';
        switch (type) {
          case 0:
            mes = '没有设备';
            table = this.$refs.modalTable1[0];
            break;
          case 1:
            mes = '没有离线设备';
            table = this.$refs.modalTable2[0];
            break;
          case 2:
            mes = '没有超时设备';
            table = this.$refs.modalTable3[0];
            break;
          case 3:
            mes = '没有报警设备';
            table = this.$refs.modalTable4[0];
            break;
        }
        if (nowArray.length === 0) {
          this.$message.warning(mes);
        } else {
          table.changeData(nowArray);
          table.hideOrShow(true);
          //设置标注的经纬度
          this.map.centerAndZoom(new BMap.Point(x, y), type === 0 ? 13 : 14); //
        }
        this.Cmask = false;
        if (type2 && type2 !== 0) {
          this.auto(type2);
        }
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
      // 显示路况
      Traffics() {
        this.map.addControl(this.ctrl);
        this.ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);
        const BTN2 = document.getElementById('tcBtn');
        BTN2.click();
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
      //井盖复位
      inquiry(arr) {
        let _this = this;
        this.$confirm('是否确定复位', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          arr = '正常';
          _this.Cmask = true;
          //_this.setNewsApi();
          _this.nowData['name'] = 0;
          if (this.jgtype !== 0) {
            this.auto(0, this.jgtype);
          }
          _this.Cmask = false;
          this.$message({
            type: 'success',
            message: '井盖复位成功!',
          });
        })
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
      MapLefts(e) {
        console.log(e, 999);
      },
      Leftbut(index) {
        let _this = this;
        if (index === 2) {
          if (this.CallThePolice === 0) {
            this.mapbottomaudio = false;
            this.policespan = false;
            this.disabled = true;
            _this.Already();
          } else {
            //这里加
            if (!this.checked) {
              this.mapbottomaudio = true;
            }
            if (this.notify !== null) {
              this.notify.close();
            }
            this.notify = this.$notify.info({
              title: '提示',
              message: '可在设置里关闭提示音'
            });
          }
          this.Cmask = true;
          this.TopDataIf = true;
          this.police();
          setTimeout(function () {
            _this.showSlider();
          }, 100);
        }
        else if (index === 0) {
           let _this = this;
           let overlays = [];
           let overlaycomplete = function(e){
              if(e.drawingMode == 'circle'){
                _this.ThePeak = e.overlay.Ou.Vd;
                _this.CenterLongitude = e.overlay.point.lng;         //中心经度
                _this.CenterLatitude = e.overlay.point.lat;          //中心维度
                _this.radius = _this.ThePeak - _this.CenterLatitude;   //半径
                _this.CircularDomain(1);
              }else{
                console.log(e.overlay);
                _this.longitudeLeft = e.overlay.Ou.He; //左下经度
                _this.latitudeLeft = e.overlay.Ou.Le;  //左下纬度
                _this.longitude1Right = e.overlay.Ou.Le;  //右上经度
                _this.latitude1Right = e.overlay.Ou.Le;  //右上纬度
                _this.CircularDomain(2);
                console.log(e.overlay,'e.overlay');
              }
             _this.Cmask = true;  //遮罩动画

             // 画第二个的时候删除上一个
             overlays.push(e.overlay);
             for(let i = 0; i < overlays.length; i++){
               _this.map.removeOverlay(overlays[i-1]);
             }

          };
          let styleOptions = {
            strokeColor:"red",    //边线颜色。
            fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
            fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
          };
          let drawingManager = new BMapLib.DrawingManager(this.map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: true, //是否显示工具栏
            drawingToolOptions: {
              anchor: BMAP_ANCHOR_TOP_LEFT, //位置
              offset: new BMap.Size(150, 150), //偏离值
              drawingModes:[
                BMAP_DRAWING_CIRCLE,
                BMAP_DRAWING_RECTANGLE
              ]
            },
            circleOptions: styleOptions, //圆的样式
            rectangleOptions: styleOptions //矩形的样式
          });
          drawingManager.addEventListener('overlaycomplete', overlaycomplete);
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
          docElm.mozReque
          stFullScreen();
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
        this.mapbottomaudio = false;
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
      LeftBot() {
        if (this.LeftA != 0) {
          this.LeftA += 20;
          console.log(this.LeftA)
        }

      },
      LeftTop() {
        if (this.LeftA != -140) {
          this.LeftA -= 20;
          console.log(this.LeftA)
        }

      },
      // 已安装设备列表页
      Already() {
        let _this = this;
        _this.auto(0);
        setTimeout(function () {
          _this.showSlider();
        }, 100);
        _this.Detail = true;
      },
      //离线设备列表
      lines() {
        this.auto(1);
        let _this = this;
        setTimeout(function () {
          _this.showSlider();
        }, 100);
        _this.Detail = true;

      },
      //超时设备列表
      overtimes() {
        this.auto(2);
        let _this = this;
        setTimeout(function () {
          _this.showSlider();
        }, 100);
        _this.Detail = true;
      },
      // 打开报警详细列表页
      police() {
        this.auto(3);
        let _this = this;
        setTimeout(function () {
          _this.showSlider();
        }, 100);
        _this.Detail = true;
      },
      // 点击关闭详情页
      closeAll() {
        this.hideSlider();
        if (this.$refs.ledLeft.innerHTML === '<!----><!----><!----><!---->') {
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
      },
      // 获取moke数据(列表数据)
      setNewsApi() {
        this.$http.get('/wei/index')
          .then(res => {
            console.log(res.articles);
            this.alreadyInstalled = res.articles;
            let c = [],
              d = [],
              e = [];
            for (let i = 0; i < this.alreadyInstalled.length; i++) {
              let b = this.alreadyInstalled[i];
              if (b.name === 3) {
                c.push(b.name);
                this.CallThePolice = c.length;
              } else if (b.name === 1) {
                d.push(b.name);
                this.OffLine = d.length;
              } else if (b.name === 2) {
                e.push(b.name);
                this.ConstructionOpensOvertime = e.length;
              }
            }
            // this.Timeoutlist = res.articles;
            // this.Offlinelist = res.articles;
            this.AlreadyInstalled = this.alreadyInstalled.length;
          });
      },
      // 详细列表接口
      NewsApi() {
        this.$http.get('/holecoverServer/list')
          .then(success =>{
            if(success.status === 200 || success.status === "200"){
              console.log(success,'yusyhduysudyusydu')
            }

           /* for(let i = 0 ; i < res.length ; i ++){
              console.log(res[i]);
              console.log(res[i].city);
            }*/
        })
        /*debugger
        let mp = new Thrift.Multiplexer();
        console.log(mp.createClient,'mpmp');
        let transport = new Thrift.Transport("http://192.168.2.118:9898");
        console.log(transport,'transport');
        let protocol = new Thrift.TJSONProtocol(transport);
        console.log(protocol,'protocol')*/
        // let client = mp.createClient('Audio', AudioClient, transport);
       /* fetch('http://192.168.2.118:9898/', {
          method: 'POST',
          mode: 'cors',
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.list = data.content
          })*/
      },
      CircularDomain(type){
        console.log(type,'type');
       let _this = this;
       if(type ==1){
         this.$http.get('/holecoverServer/circle',{
           // circle:[l:40.42808,l1:117.71842]
          /* 'longitude': 40.42808,  //中心点经度
           'latitude': 11.88989,  //中心点维度
           'radius': 10           //半径*/
           'longitude': _this.CenterLongitude,  //中心点经度
           'latitude': _this.CenterLatitude,  //中心点维度
           'radius': _this.radius         //半径
         })
           .then(
             success =>{
               if(success.status === 200 || success.status === "200"){
                 console.log(success.data,'successssssssss');
                 this.Cmask = false;
                 this.ScopeInformation = success.data.rows;
                 this.Range = true;
               }

               /* for(let i = 0 ; i < res.length ; i ++){
                  console.log(res[i]);
                  console.log(res[i].city);
                }*/
             })
       }else{
         this.$http.get('/holecoverServer/square',{
             'longitudeLeft':_this.longitudeLeft,
             'latitudeLeft':_this.latitudeLeft,
             'longitude1Right':_this.longitude1Right,
             'latitude1Right':_this.latitude1Right
         })
           .then(
             success =>{
               if(success.status === 200 || success.status === "200"){
                 console.log(success.data,'successssssssss');
                 this.Cmask = false;
                 this.ScopeInformation = success.data.rows;
                 this.Range = true;
               }
             })
       }

      },
      //打开设置
      SoundEetting() {
        this.SetUp = true;
      },
      closed() {
        this.LinkState = '已关闭';
        this.WellColor = 'red';
      },
      //树形控件人员分配
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      //确定分派
      DetermineAssignment() {
        //掉接口向后台发送成功后执行下步
        this.nowData['selectPerson'] = this.$refs.tree2.getCheckedKeys();
        console.log(this.sha);
        this.tankuang('是否确定分派人员?', '人员分配成功!');
      },
      tankuang(yu, ha) {
        let _this = this;
        this.$confirm(yu, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setTimeout(function () {
            _this.Assignment = false
          }, 1400);
          this.$message({
            type: 'success',
            message: ha,
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      initWebSocket() {
        let Socket = new WebSocket("ws://localhost:8081/websocket");
        console.log(Socket.readyState, 'Socket.readyState');
        this.Closed = '#fff';
        Socket.onopen = function () {
          // Web Socket 已连接上，使用 send() 方法发送数据
          Socket.send("发送数据");
          alert("数据发送中...");
        };

        Socket.onmessage = function (evt) {
          var received_msg = evt.data;
          alert("数据已接收...");
        };

        Socket.onclose = function () {
          // this.closed();
          // 关闭 websocket
          alert('连接已中断');
        };
      }

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
        let top = this.modalTableDivHeight / 100 * (100 - d1);
        this.$refs.ledLeft.style.marginTop = top === 0 ? 0 : '-' + top + 'px';
      },
      //查询树形控件人员分配
      filterText(val) {
        this.$refs.tree2.filter(val);
      },
      checked() {
        if (this.checked == true) {
          this.mapbottomaudio = false;
        } else {
          this.mapbottomaudio = true;
        }
      },
      LeftA: function (c1) {
        console.log(c1, 'c1c1c1');
        this.$refs.leftNavAlls.style.marginTop = c1 + 'px';
      }
    },
    mounted() {
      // 引入地图
      this.initMap();
      this.NewsApi();
    },
    created() {
      // this.initWebSocket();  //开启wensocket
      this.setNewsApi();
      // this.Secondcover();
    },
    /*   destroyed: function() {
         //页面销毁时关闭长连接
         this.websocketclose();
       },*/
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
    z-index: 1;
  }
  .Ranges{
    width: 500px;
    height: 400px;
    background: sandybrown;
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
    z-index: 2000;
    border-bottom: 2px solid #86b1f7;
    border-top: 2px solid #86b1f7;
    border-right: 2px solid #86b1f7;
    border-radius: 0 10px 10px 0;
    overflow: hidden;
  }

  .leftNavAll {
    width: 100%;
    height: 100%;
    /*overflow: hidden;*/
    /*overflow:auto;*/

    padding-top: 18px;
    padding-bottom: 20px;
    div {
      width: 100%;
      height: 13%;
    }
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

  .Lall {

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

  .Traffic {
    position: absolute;
    top: -2px;
    right: 20%;
    color: #fff;
    font-size: 13px;
    cursor: pointer;
  }

  .map-BottomNavigation {
    width: 100%;
    height: 42px;
    background: #2b4d77;
    position: fixed;
    bottom: 0;
    z-index: 20000;
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
    background-image: url('../assets/images/pic_sobig.png');
    float: left;
    cursor: pointer;
  }

  .map-BottomNavigation-left-content {
    color: #fff;
    font-size: 13px;
    text-indent: -90px;
    line-height: 16px;
  }

  .map-BottomNavigation-right {
    width: 35%;
    height: 100%;
    position: absolute;
    right: -58px;
    top: 14px;
    font-size: 13px;
    color: #fff;
  }

  .map-BottomNavigation-right-coordinate {
    width: 230px;
    position: absolute;
    right: 56%;
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
    right: 35%;
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
          right: 105px;
          width: 95px;
          height: 20px;
          top: 8px;
          /* background: salmon; */
          border: 1px solid #eecdcd;
          border-radius: 5px;
        }
      }

    }
  }
  @media (min-width: 1280px) {
    .WellCoverMonitoring {
      width: 550px;
      left: 18%;
    }
    .map-BottomNavigation-left-content{
      text-indent: -35px;
    }
    .images{
      width:40.6%  ;
    }
  }
  @media (min-width: 1366px) {
    .WellCoverMonitoring {
      width: 575px;
      left: 22%;
    }
    .map-BottomNavigation-left-content{
      text-indent: -83px;
    }
  }
  @media (min-width: 1400px) {
    .WellCoverMonitoring {
      width: 575px;
      left: 24%;
    }
  }
  @media (min-width: 1440px) {
    .WellCoverMonitoring {
      width: 575px;
      left: 2%;
    }
  }
  @media (min-width: 1600px) {
    .WellCoverMonitoring {
      width: 613px;
      left: 28%;
    }
  }
  @media (min-width: 1680px) {
    .WellCoverMonitoring {
      width: 613px;
      left: 29%;
    }
  }
  @media (min-width: 1920px) {
    .WellCoverMonitoring {
      width: 613px;
      left: 30%;
    }
    .map-BottomNavigation-left-content{
      text-indent: -145px;
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
    width: 460px;
    height: calc(100% - 113px);
    position: absolute;
    right: 1px;
    top: 85px;
    z-index: 2000;
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
        top: 74%;
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
    margin-right: 5px;
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
    z-index: 2000;
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
  .BMap_top img {
    display: none;
  }

  .maplibTcBtn_deskTop {
    height: 5px;
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
    z-index: 2000;
  }

  .el-slider__bar {
    background-color: #ffffff;
  }

  .el-dialog__wrapper {
    z-index: 30000;
  }
</style>
