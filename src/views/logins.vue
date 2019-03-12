<template>
  <div style="width: 100%;height: 100%;">
    <div class="Leftlogin">
      <div class="Leftloginone">
        <div class="bigdataspan">传感器类型占比分析</div>
        <div class="Leftloginonetitle" ref="Leftloginone"></div>
      </div>
      <div class="Leftlogintwo">
        <div class="bigdataspan">传感器告警增长趋势</div>  <!--ref="Leftlogintwo"-->
        <div class="Leftlogintwotitle" ref="Leftlogintwo"></div>
      </div>
      <div class="Leftloginthree">
        <!--  <div class="Leftthree">
            <p><span style="background: #FFAC3F"></span> 信号趋势</p>
            <p><span style="background: #52FFFF"></span> 逻辑回归趋势</p>
          </div>-->
        <div class="bigdataspan">传感器报警统计</div>
        <div class="Leftloginthreetitle" ref="Leftloginthree"></div>

      </div>
    </div>
    <div class="Contentlogin">
      <div class="Contentvideo" v-show="isVideo">
        <div class="videospan" @click="aaa"><img src="@/icon/pic_ridroclose.png" alt=""></div>
        <video src="@/icon/vidio/Monitor.mp4" id="vid" ref="video_d" autoplay="autopaly" @ended="videoEnd"
               muted="muted">
          　　你的浏览器不支持该视频播放
        </video>
      </div>
      <div class="Contentlogintop">
        <div class="sb" style="right: 30%;bottom: 38%" v-show="showJK" @click="sb"></div>
        <div class="sb" style="right: 35%;bottom: 40%" v-show="showJK" @click="sb"></div>
        <div class="sb" style="right: 20%;bottom: 30%" v-show="showJK" @click="sb"></div>
        <div class="sb" style="right: 40%;bottom: 25%" v-show="showJK" @click="sb"></div>
        <div class="sb" style="right: 60%;bottom: 10%" v-show="showJK" @click="sb"></div>
        <div class="tongji">
          <div>正常状态 {{this.datafour}}</div>
          <div>报警状态 {{this.datatwo}}</div>
          <div>已解决 {{this.datathree}}</div>
          <div>传感器总数 {{this.dataone}}</div>
        </div>
        <div id="allmap" ref="allmap"></div>
        <!--<canvas id="canvas"></canvas>
        <div id="time"></div>-->
        <div class="echartsContent" v-if="yu">
          <div class="content" id="lecharts"></div>
        </div>
        <div class="Transformation" @click="Transfor"></div>
        <div class="Deduction" @click="Deductions"></div>
      </div>
      <!--<div class="Contentloginbottom">
        <div class="loginbottom">
          <p style="color:#65C6E7;font-size: 14px;font-weight: 700;line-height: 34px">事故数量对比分析</p>
          <p style="color:#65C6E7;font-size: 13px">数据截止到2018 / 12 / 12</p>
        </div>
        <div class="loginbottoms">
          <p><span></span> 2017年</p>
          <p><span style="background-color: #F95C32;"></span> 2018年</p>
        </div>
        <div class="Contentloginbottomtitle" ref="Contentloginbottom"></div>
      </div>-->
    </div>
    <div class="Rightlogin">
      <div class="Rightloginone">
        <div class="bigdataspans">影响传感器信号因素分析(井盖)</div>
        <div class="Rightloginonetitle" ref="Rightloginoe">

        </div>
      </div>
      <div class="Rightlogintwo">
        <div class="bigdataspans">传感器类型流量使用统计</div>
        <div class="Rightlogintwotitle" ref="Rightlogintwo"></div>
      </div>
      <div class="Rightloginthree">
        <div class="bigdataspans">传感器状态情况</div>
        <div class="Rightloginthreetitle" ref="Rightloginthree"></div>
        <div class="rightspan">
          <div>在线数量 20067</div>
          <div>离线数量 198</div>
        </div>
      </div>
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
      return {
        img: require('@/icon/pic_map.png'),
        /* opt: ioption,*/
        map: '',
        mapv: '',
        sensor: [], //传感器流量
        sensors: [], //传感器流量
        number: [],
        numbers: [],
        atmospheres: [],
        atmospheretwo: [],
        one: '',
        tow: '',
        three: '',
        four: '',
        tent: '',
        max: 150,
        dataone: '',
        datatwo: '',
        datathree: '',
        datafour: '',
        isVideo: false,
        showJK: false,
        yu: false,
        pickerOptions0: {
          disabledDate: (time) => {
            if (this.toTime != "") {
              return time.getTime() > Date.now() || time.getTime() > new Date(this.toTime).getTime();
            } else {
              return time.getTime() > Date.now();
            }
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() > Date.now() || time.getTime() < new Date(this.fromTime).getTime();
          }
        },
        isShow: true,
        mapData: [{
          DataSet: null,
          mapvLayer: null,
          options: {
            fillStyle: 'rgba(0,255,255, 0.9)',
            size: 1.1,
            draw: 'simple',
            bigData: 'Point'
          }
        }, {
          DataSet: null,
          mapvLayer: null,
          options: {
            fillStyle: 'rgba(0,191,255, 0.9)',
            size: 1.1,
            draw: 'simple',
            bigData: 'Point'
          }
        },
          {
            DataSet: null,
            mapvLayer: null,
            options: {
              fillStyle: 'rgba(138,43,226, 0.9)',
              size: 1.1,
              draw: 'simple',
              bigData: 'Point'
            }
          },
          {
            DataSet: null,
            mapvLayer: null,
            options: {
              fillStyle: 'rgba(218,112,214, 0.9)',
              size: 1.1,
              draw: 'simple',
              bigData: 'Point'
            }
          },
          {
            DataSet: null,
            mapvLayer: null,
            options: {
              fillStyle: 'rgba(30,144,255, 0.9)',
              size: 1.1,
              draw: 'simple',
              bigData: 'Point'
            }
          },
          {
            DataSet: null,
            mapvLayer: null,
            options: {
              fillStyle: 'rgba(0,128,0, 0.9)',
              size: 1.1,
              draw: 'simple',
              bigData: 'Point'
            }
          },
          {
            DataSet: null,
            mapvLayer: null,
            options: {
              fillStyle: 'rgba(255,255,0, 0.9)',
              size: 1.1,
              draw: 'simple',
              bigData: 'Point'
            }
          },
          {
            DataSet: null,
            mapvLayer: null,
            options: {
              fillStyle: 'rgba(255,0,0, 0.9)',
              size: 1.1,
              draw: 'simple',
              bigData: 'Point'
            }
          }
        ],
        echartsDom: null,
        xAxisData: null,
        seriesData: null,
        nowxAxisData: null,
        alarmCount: null,
        offlineCount: null,
        normalCount: null,
        timer: null,
        pro: '',
        timeso:'',
        timest:'',
      }
    },

    methods: {
      initMap() {
        this.map = new BMap.Map(this.$refs.allmap, {
          enableMapClick: false
        });  // 创建Map实例
        this.map.disableScrollWheelZoom();
        this.map.disableDragging();
        this.map.disableDoubleClickZoom();
        this.map.disableKeyboard();
        this.map.setMapStyle({
          styleJson: [{
            "featureType": "water",
            "elementType": "all",
            "stylers": {
              "color": "#091934"
            }
          }, {
            "featureType": "land",
            "elementType": "all",
            "stylers": {
              "color": "#152834"
            }
          }, {
            "featureType": "boundary",
            "elementType": "geometry",
            "stylers": {
              "color": "#064f85"
            }
          }, {
            "featureType": "railway",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          }, {
            "featureType": "highway",
            "elementType": "geometry",
            "stylers": {
              "color": "#004981"
            }
          }, {
            "featureType": "highway",
            "elementType": "geometry.fill",
            "stylers": {
              "color": "#064f85",
              "lightness": 1
            }
          }, {
            "featureType": "highway",
            "elementType": "labels",
            "stylers": {
              "visibility": "on"
            }
          }, {
            "featureType": "arterial",
            "elementType": "geometry",
            "stylers": {
              "color": "#064f85",
              "lightness": -39
            }
          }, {
            "featureType": "arterial",
            "elementType": "geometry.fill",
            "stylers": {
              "color": "#064f85"
            }
          }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          }, {
            "featureType": "green",
            "elementType": "all",
            "stylers": {
              "color": "#064f85",
              "visibility": "off"
            }
          }, {
            "featureType": "subway",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          }, {
            "featureType": "manmade",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          }, {
            "featureType": "local",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          }, {
            "featureType": "arterial",
            "elementType": "labels",
            "stylers": {
              "visibility": "off"
            }
          }, {
            "featureType": "boundary",
            "elementType": "geometry.fill",
            "stylers": {
              "color": "#064f85"
            }
          }, {
            "featureType": "building",
            "elementType": "all",
            "stylers": {
              "color": "#091934"
            }
          }, {
            "featureType": "label",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          }, {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": {
              "color": "#ffffff"
            }
          }, {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": {
              "color": "#1e1c1c"
            }
          }, {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": {
              "visibility": "on"
            }
          }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": {
              "visibility": "off"
            }
          }]
        });
      },
      initMapOfData(data) {
        var _this = this;
        var lng = 105.403119;
        var lat = 38.028658;
        var zoom = 5;
        if (_this.pro) {
          var cityCenter = mapv.utilCityCenter.getCenterByCityName(_this.pro);
          lng = cityCenter.lng;
          lat = cityCenter.lat;
          zoom = 11;
        }
        _this.map.centerAndZoom(new BMap.Point(lng, lat), zoom); // 初始化地图,设置中心点坐标和地图级别
        var list = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
          ],
          oneObj = null;
        data.forEach(function (row) {
          oneObj = {
            geometry: {
              type: 'Point',
              coordinates: [Number(row.longitude + '195284731'), Number(row.latitude + '195284731')]
            },
            time: 100 * Math.random()
          };
          if (row.status === 0) {
            switch (row.holecoverType) {
              case '路灯传感器':
                list[0].push(oneObj);
                break;
              case '井盖传感器':
                list[1].push(oneObj);
                break;
              case '摄像头':
                list[2].push(oneObj);
                break;
              case '雨量计':
                list[3].push(oneObj);
                break;
              case '压力计':
                list[4].push(oneObj);
                break;
              case '液位计':
                list[5].push(oneObj);
                break;
            }
          } else if (row.status === 1) {
            list[6].push(oneObj);
          } else if (row.status === 2) {
            list[7].push(oneObj);
          }
        })
        _this.map.clearOverlays();
        this.mapData.forEach(function (row, i) {
          if (list[i] && list[i].length > 0) {
            /*f(row.DataSet) {
                            row.DataSet.set(list[i]);
                        } else {

                        }*/
            row.DataSet = new mapv.DataSet(list[i]);
            var option = JSON.parse(JSON.stringify(row.options));
            if (!_this.pro) {
              option['animation'] = {
                type: 'time',
                stepsRange: {
                  start: 0,
                  end: 100
                },
                trails: 1,
                duration: 6,
              }
            } else {
              option['size'] = 3
            }
            row.mapvLayer = new mapv.baiduMapLayer(_this.map, row.DataSet, option);
          }
        })
      },
      //hahaha
      resetEcharts(index) {
        this.echartsOption.xAxis[0].data.push(this.xAxisData[index]);
        this.echartsOption.xAxis[1].data.push(index);
        this.echartsOption.series[0].data.push(this.seriesData[index].alarmCount);
        this.echartsOption.series[1].data.push(this.seriesData[index].offlineCount);
        this.echartsOption.series[2].data.push(this.seriesData[index].normalCount);
        this.echartsDom.setOption(this.echartsOption);
      },
      //折线图
      initEcharts() {
        var _this = this;
        this.$http.get('/url/holecoverServer/evolutionStatistics?city=' + "济南市" + '&startTime='+ this.timeso +'&endTime='+ this.timest +'')
        // this.$http.get('/url/evolutionStatistics?city=' + "济南市" + '&startTime='+ this.timeso +'&endTime='+ this.timest +'')
          .then(res => {
            this.echartsDom = echarts.init(document.getElementById("lecharts"));
            this.xAxisData = res.data.date;
            this.seriesData = res.data.count;
            this.nowxAxisData = [this.xAxisData[0]];
            this.alarmCount = [this.seriesData[0].alarmCount];
            this.offlineCount = [this.seriesData[0].offlineCount];
            this.normalCount = [this.seriesData[0].normalCount];
            this.echartsOption = {
              backgroundColor: '#404a59',
              color: ['red', 'yellow', 'green'],
              legend: {
                data: [{
                  name: '报警',
                  icon: 'circle'
                },
                  {
                    name: '离线',
                    icon: 'circle'
                  }, {
                    name: '正常',
                    icon: 'circle'
                  }
                ],
                textStyle: {
                  color: '#fff',
                  fontSize: 16
                }
              },
              grid: {
                x: 50,
                x2: 30
              },
              xAxis: [{
                type: 'category',
                data: this.nowxAxisData,
                axisLine: {
                  lineStyle: {
                    color: '#FFFFFF'
                  }
                }
              },
                {
                  type: 'category',
                  boundaryGap: true,
                  data: (function () {
                    var res = [];
                    var len = 10;
                    while (len--) {
                      res.push(10 - len - 1);
                    }
                    return res;
                  })()
                }
              ],
              yAxis: [{
                type: 'value',
                axisLine: {
                  lineStyle: {
                    color: '#FFFFFF'
                  }
                }
              }, {
                type: 'value',
                axisLine: {
                  lineStyle: {
                    color: '#FFFFFF'
                  }
                },
                splitLine: {
                  show: false
                }
              }],
              series: [{
                data: this.alarmCount,
                name: '报警',
                yAxisIndex: 1,
                type: 'line',
                lineStyle: {
                  normal: {
                    width: 2,
                  }
                }
              }, {
                data: this.offlineCount,
                name: '离线',
                yAxisIndex: 1,
                type: 'line',
                lineStyle: {
                  normal: {
                    width: 2,
                  }
                }
              }, {
                data: this.normalCount,
                name: '正常',
                type: 'line',
                lineStyle: {
                  normal: {
                    width: 2,
                  }
                }
              }]
            };
            this.echartsDom.setOption(this.echartsOption);
            this.echartsDrag();
          });
      },
      getDate() {
        let now = new Date();//获取当前时间
        let nowMs = now.getTime();//获取当前时间的毫秒数
        let beforeMs =  nowMs -  1000 * 60 * 60 * 24 * parseInt(7);//前几天，n就取几，整数
        this.timeso = beforeMs;
        this.timest = nowMs;
        console.log( this.timeso,' this.timeso this.timeso this.timeso')
        console.log( this.timest,' this.timeso this.timeso this.timeso')
      },

      echartsDrag() {
        var div1 = document.getElementsByClassName("echartsContent")[0];
        div1.onmousedown = function (ev) {
          var oevent = ev || event;
          var distanceX = oevent.clientX - div1.offsetLeft;
          var distanceY = oevent.clientY - div1.offsetTop;
          document.onmousemove = function (ev) {
            var oevent = ev || event;
            div1.style.left = oevent.clientX - distanceX + 'px';
            div1.style.top = oevent.clientY - distanceY + 'px';
          };
          document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      },
      Deductions() {
        this.yu = true;
        this.initMap();
        this.initEcharts();
        let _this = this;
        var fromTime = _this.fromTime ? new Date(_this.fromTime).getTime() : '';
        var toTime = _this.toTime ? new Date(_this.toTime).getTime() : '';
        this.pro = '济南市';
        this.$http.get('/url/holecoverServer/evolution?sortListType=true&sortListColumn=insertTime&city=' + _this.pro + '&startTime=' + fromTime + '&endTime=' + toTime)
        // this.$http.get('/url/evolution?sortListType=true&sortListColumn=insertTime&city=' + _this.pro + '&startTime=' + fromTime + '&endTime=' + toTime)
          .then(res => {
            _this.data = [];
            for (var key in res.data.rows[0]) {
              _this.data.push({
                date: key,
                data: res.data.rows[0][key]
              });
            }
            if (_this.timer) {
              clearTimeout(this.timer);
            }
            if (_this.data.length === 0) {
              return false;
            }
            _this.nowDate = _this.data[0].date;
            _this.initMapOfData(_this.data[0].data);
            this.showJK = true;
            var index = 1;
            _this.timer = setInterval(function () {
              // _this.nowDate = _this.data[index].date;
              _this.initMapOfData(_this.data[index].data);
              _this.resetEcharts(index);
              if (index === _this.data.length - 1) {
                clearTimeout(_this.timer);
              } else {
                index++;
              }
            }, 2000)
            // 引入地图
          });
      },
      Transfor() {
        this.pro = this.pro ? '' : '济南';
        var lng = 105.403119;
        var lat = 38.028658;
        var zoom = 5;
        if (this.pro) {
          var cityCenter = mapv.utilCityCenter.getCenterByCityName(this.pro);
          lng = cityCenter.lng;
          lat = cityCenter.lat;
          zoom = 11;
          this.showJK = true;
        } else {
          this.showJK = false;
          this.isVideo = false;
          clearInterval(this.timer);
          this.auto();
          this.yu = false;
        }
        this.map.centerAndZoom(new BMap.Point(lng, lat), zoom); // 初始化地图,设置中心点坐标和地图级别
      },
      sb() {
        this.isVideo = true;
      },
      aaa() {
        this.isVideo = false;
      },
      // 大图
      auto() {
        this.initMap();
        this.$http.get('/url/holecoverServer/status')
          .then(res => {
            this.initMapOfData(res.data.rows);
          });
      },
      // 传感器类型
      hold() {
        this.sensor = [];
        this.sensors = [];
        this.$http.get('/url/holecoverServer/getResSensorFlow')
          .then(res => {
            let _this = this;
            let rs = res.data.rows;
            rs.forEach(function (row) {
              _this.sensor.push(row.category);
              _this.sensors.push(row.total);
            });
            this.statistics();
          });
      },
      // 蜘蛛网
      autos() {
        let brr = echarts.init(this.$refs.Rightloginoe);
        let option = {
          "normal": {
            "top": 200,
            "left": 300,
            "width": 500,
            "height": 400,
            "zIndex": 6,
            "backgroundColor": ""
          },
          "color": ["rgba(245, 166, 35, 1)"],

          "tooltip": {
            "show": true,
            "trigger": "item"
          },
          "legend": {
            "show": true,
            "icon": "circle",
            "left": "35%",
            "top": "90%",
            "orient": "horizontal",
            "textStyle": {
              "fontSize": 14,
              "color": "#fff"
            },
          },
          "radar": {
            "center": ["50%", "50%"],
            "radius": "70%",
            "startAngle": 90,
            "splitNumber": 4,
            "shape": "circle",
            "splitArea": {
              "areaStyle": {
                "color": ["transparent"]
              }
            },
            "axisLabel": {
              "show": false,
              "fontSize": 18,
              "color": "#fff",
              "fontStyle": "normal",
              "fontWeight": "normal"
            },
            "axisLine": {
              "show": true,
              "lineStyle": {
                "color": "grey"//
              }
            },
            "splitLine": {
              "show": true,
              "lineStyle": {
                "color": "grey"//
              }
            },
            "indicator": this.atmospheretwo
          },
          "series": [{
            "name": "数据1",
            "type": "radar",
            "symbol": "circle",
            "symbolSize": 10,
            "areaStyle": {
              "normal": {
                "color": "rgba(245, 166, 35, 0.4)"
              }
            },
            itemStyle: {
              color: 'rgba(245, 166, 35, 1)',
              borderColor: 'rgba(245, 166, 35, 0.3)',
              borderWidth: -10,
            },
            "lineStyle": {
              "normal": {
                "type": "dashed",

                "color": "rgba(245, 166, 35, 1)",
                "width": 2
              }
            },
            "data": [
              this.atmospheres
            ]
          }]
        };
        brr.setOption(option);
      },
      // 蜘蛛网
      atmosphere() {
        this.atmospheretwo = [];
        this.atmospheres = [];
        this.$http.get('/url/holecoverServer/getResSensorAir')
          .then(res => {
            let _this = this;
            let rs = res.data.rows;
            rs.forEach(function (row) {
              _this.atmospheretwo.push({
                max: '500',
                name: row.category,
              });
              _this.atmospheres.push(row.total)
            });
            this.autos();
          /*  console.log(_this.atmospheretwo, 'yuyudddd');
            console.log(_this.atmospheres, 'yuyudddd');*/
          });
      },
      // 柱形图
      Typeratio() {
        let brr = echarts.init(this.$refs.Leftloginone);
        let sourceBar = {
          "itemData": this.number,
          "seriesData": this.numbers
        };
        let itemData = sourceBar.itemData;
        let seriesData = sourceBar.seriesData;
        let tooltip = sourceBar.tooltip;
        let color = ['#00b9f6', '#38a97d', '#004eff', '#17c7e7', '#4e85ea', '#e49be9', '#078d9d', '#eca52a', '#ef9544', '#ea3b3b']

        let data = {};
        for (let k in itemData) {
          data[itemData[k]] = seriesData[k];
        }

        let xAxisData = [];
        let dataArr = [];
        for (let i in data) {
          xAxisData.push(i);
          dataArr.push(data[i]);
        }

        let option = {
          grid: {
            top: '15%',
            left: '5%',
            right: '10%',
            bottom: '8%',
            containLabel: true
          },
          tooltip: {
            show: "true",
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
              shadowStyle: {
                color: 'rgba(112,112,112,0)',
              },
            },
            formatter: function (params) {
              let unit = params[0].name.substring(params[0].name.indexOf('(') + 1, params[0].name.indexOf(')'));
              return params[0].name + '：' + params[0].value + '条数据';
            },
            // backgroundColor: 'rgba(0,0,0,0.7)', // 背景
            padding: [8, 10], //内边距
            // extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
          },
          xAxis: [{
            show: true,
            name: '来源',
            nameTextStyle: {
              fontSize: 13,
              color: '#708ACC'
            },
            type: 'category',
            nameLocation: 'end',
            nameGap: 8,
            axisLabel: {
              fontSize: 13,
              color: "#708ACC",
              interval: 0,
              margin: 16,
              formatter: function (params) {
                if (params.length > 6) {
                  params = params.substr(0, 6) + "...";
                } else {
                  params = params;

                }
                return params;
              }
            },
            axisLine: {
              show: true,
              symbol: ['none', 'arrow'],
              lineStyle: {
                color: '#708ACC'
              }
            },
            data: xAxisData
          }, {
            type: 'category',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: xAxisData
          }, {
            type: 'category',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: xAxisData
          }],
          yAxis: {
            type: 'value',
            name: '数量',
            nameTextStyle: {
              fontSize: 12,
              fontFamily: 'Microsoft YaHei',
              color: '#708ACC'
            },
            minInterval: 1,
            nameLocation: 'end',
            nameGap: 10,
            splitLine: {
              show: false
            },
            axisLabel: {
              show: true,
              fontSize: 12,
              fontFamily: 'Arial',
              color: "#708ACC"
            },
            axisLine: {
              show: true,
              symbol: ['none', 'arrow'],
              lineStyle: {
                color: '#708ACC'
              }
            }
          },
          series: [{
            type: 'bar',
            stack: 1,
            xAxisIndex: 0,
            barWidth: 10,
            barGap: 5,
            z: 2,
            data: function () {
              let itemArr = [];
              for (let i = 1; i < (dataArr.length + 1); i++) {
                let item = {
                  value: dataArr[i - 1],
                  itemStyle: {
                    normal: {
                      barBorderRadius: 50,
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: color[translateColor(i) * 2 - 2]
                      }, {
                        offset: 1,
                        color: color[translateColor(i) * 2 - 1]
                      }]),
                    }
                  }
                };
                itemArr.push(item);
              }
              return itemArr;
            }()
          },
            {
              type: 'scatter',
              stack: 1,
              symbolOffset: [0, 0], //相对于原本位置的偏移量
              label: {
                normal: {
                  show: false,
                }
              },
              xAxisIndex: 2,
              symbolSize: 10,
              z: 2,
              data: function () {
                let itemArr = [];
                for (let i = 1; i < (dataArr.length + 1); i++) {
                  let item = {
                    value: 0,
                    itemStyle: {
                      normal: {
                        borderColor: '#708ACC',
                        borderWidth: 2,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: color[translateColor(i) * 2 - 2]
                        }, {
                          offset: 1,
                          color: color[translateColor(i) * 2 - 1]
                        }]),
                      }
                    }
                  };
                  itemArr.push(item);
                }
                return itemArr;
              }()
            },
            {
              type: 'bar',
              xAxisIndex: 1,
              barGap: '140%',
              data: dataArr,
              barWidth: 22,
              itemStyle: {
                normal: {
                  barBorderRadius: 50,
                  color: '#0e2147'
                }
              },
              z: 1
            },
            {
              type: 'bar',
              xAxisIndex: 2,
              barWidth: 25,
              barGap: 1,
              z: 0,
              data: function () {
                let itemArr = [];
                for (let i = 1; i < (dataArr.length + 1); i++) {
                  let item = {
                    value: dataArr[i - 1],
                    itemStyle: {
                      normal: {
                        barBorderRadius: 50,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: color[translateColor(i) * 2 - 2]
                        }, {
                          offset: 1,
                          color: color[translateColor(i) * 2 - 1]
                        }]),
                      }
                    }
                  };
                  itemArr.push(item);
                }
                return itemArr;
              }()
            },
            {
              type: 'scatter',
              hoverAnimation: false,
              xAxisIndex: 2,
              symbolOffset: [0, 0], //相对于原本位置的偏移量
              symbolSize: 18,
              z: 2,
              data: function () {
                let itemArr = [];
                for (let i = 1; i < (dataArr.length + 1); i++) {
                  let item = {
                    value: 0,
                    itemStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: color[translateColor(i) * 2 - 2]
                        }, {
                          offset: 1,
                          color: color[translateColor(i) * 2 - 1]
                        }]),
                      }
                    }
                  };
                  itemArr.push(item);
                }
                return itemArr;
              }()
            }
          ]
        };

        function translateColor(index) {
          if (index > 5) {
            return translateColor(index - 5)
          }
          return index
        }

        brr.setOption(option);
      },
      typeAnalysis() {
        this.$http.get('getFaultRate')
          .then(res => {
            let _this = this;
            console.log(res[0], '898989')
            let arr = res[0];
            for (let i = 0; i < arr.length; i++) {
              console.log(arr[i].month, 'arr[i].date');
            }
            this.statistics();
          });
      },
      // 中下
      /*      Analysis() {
              let brr = echarts.init(this.$refs.Contentloginbottom);

              let option = {
                tooltip: {
                  trigger: 'axis',
                  showContent: false
                },
                legend: {
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                toolbox: {
                  feature: {
                    saveAsImage: {show: false}
                  }
                },
                dataset: {
                  source: [
                    ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    [41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                    [86.5, 92.1, 85.7, 83.1, 73.4, 55.1, 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],

                  ]
                },
                xAxis: [{
                  type: 'category',
                  boundaryGap: false,
                  axisLine: { //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                      color: '#233e64'
                    },
                  },
                  axisLabel: { //坐标轴刻度标签的相关设置
                    textStyle: {
                      color: '#6a9cd5',
                      margin: 15,
                    },
                  }
                }],
                yAxis: [{
                  type: 'value',
                  min: 0,
                  max: 140,
                  splitNumber: 7,
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: '#233e64'
                    }
                  },
                  axisLine: {show: false,},
                  axisLabel: {
                    margin: 20,
                    textStyle: {
                      color: '#6a9cd5',

                    },
                  },
                  axisTick: {show: false,},
                }],
                series: [
                  {
                    type: 'line',
                    smooth: true,

                    seriesLayoutBy: 'row',
                    lineStyle: {
                      normal: {
                        color: "#1A91F7"   // 线条颜色
                      }
                    },
                  },
                  {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    lineStyle: {
                      normal: {
                        color: "#F95C32"   // 线条颜色
                      }
                    },
                  },


                ]
              };
              brr.setOption(option);
            },*/
      // 波浪
      statistics() {
        let brr = echarts.init(this.$refs.Rightlogintwo);
        let option = {
          tooltip: {},
          grid: {
            top: '15%',
            left: '3%',
            right: '11%',
            bottom: '8%',
            containLabel: true,
          },
          color: ['#3deaff', '#FE9B1A'],
          legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['实际流量', '预计流量'],
            right: '4%',
            textStyle: {
              fontSize: 12,
              color: '#6a9cd5'
            }
          },
          xAxis: [{
            name: '类型',
            type: 'category',
            boundaryGap: false,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: '#6a9cd5'
              },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
              textStyle: {
                color: '#6a9cd5',
                margin: 15,
              },
            },
            axisTick: {show: false,},
            data: this.sensor,
          }],

          yAxis: [{
            name: '流量',
            type: 'value',
            splitNumber: 7,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#233e64'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6a9cd5'
              },
            },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: '#6a9cd5',

              },
            },
            axisTick: {show: false,},
          }],
          series: [{
            name: '实际流量',
            type: 'line',
            smooth: true, //是否平滑曲线显示
// 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            symbolSize: 0,

            lineStyle: {
              normal: {
                color: "#3deaff"   // 线条颜色
              }
            },
            areaStyle: { //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: 'rgba(61,234,255, 0.9)'},
                  {offset: 0.7, color: 'rgba(61,234,255, 0)'}
                ], false),

                shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },

            data: this.sensors
          },
            {
              name: '预计流量',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 3
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(205,52,42, 0.5)'
                  }, {
                    offset: 0.8,
                    color: 'rgba(235,235,21, 0)'
                  }], false),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowBlur: 10
                },
              },
              itemStyle: {
                normal: {

                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: 'rgba(205,52,42,1)'
                  }, {
                    offset: 1,
                    color: 'rgba(235,235,21,1)'
                  }])
                },
                emphasis: {
                  color: 'rgb(99,250,235)',
                  borderColor: 'rgba(99,250,235,0.2)',
                  extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                  borderWidth: 10
                }
              },
              data: [320, 260, 295, 245, 222, 265, 222, 320]
            }
          ]
        }
        brr.setOption(option);
        // brr.shift();
      },
      // 水波图
      Wave() {
        let brr = echarts.init(this.$refs.Rightloginthree);
        let option = {
          series: [{
            type: 'liquidFill',
            //data: [0.6, 0.5, 0.4, 0.3],
            data: [0.99, 0.85, 0.84, 0.63],
            radius: '60%',
            // 水球颜色
            color: ['#029f10', '#09b03c', '#4dca66', '#7bdc8d', '# a4e9aa'],
            center: ['32%', '56%'],
            // outline  外边
            outline: {
              // show: false
              borderDistance: 5,
              itemStyle: {
                borderWidth: 3,
                borderColor: '#029f10',
              },
            },
            label: {
              normal: {
                // textStyle: {
                color: '#029f10',
                insideColor: '#fff',
                fontSize: 26
                // }
              }
            },
            // 内图 背景色 边
            backgroundStyle: {
              color: '#030f20',
              /* borderWidth: 3,
               borderColor: '#1A91F7',*/
            }
          },
            {
              type: 'liquidFill',
              //data: [0.6, 0.5, 0.4, 0.3],
              data: [0.011, 0.5, 0.4, 0.3],
              radius: '60%',
              // 水球颜色
              color: ['#ff203d', '#fe4e62', '#fd6075', '#fe9fb5', '#fdb9c8'],
              center: ['70%', '56%'],
              // outline  外边
              outline: {
                // show: false
                borderDistance: 5,
                itemStyle: {
                  borderWidth: 3,
                  borderColor: '#ff203d',
                },
              },
              label: {
                normal: {
                  // textStyle: {
                  color: '#ff203d',
                  insideColor: '#fff',
                  fontSize: 26
                  // }
                }
              },
              // 内图 背景色 边
              backgroundStyle: {
                color: '#030f20',
                // borderWidth: 5,
                // borderColor: 'red',
              }
            }
          ]
        };
        brr.setOption(option);
      },
      // 左二
      lefttwo() {
        let brr = echarts.init(this.$refs.Leftlogintwo);
        let option = {
          grid: {
            top: '15%',
            left: '3%',
            right: '11%',
            bottom: '8%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['新增', '解决'],
            right: '4%',
            textStyle: {
              fontSize: 12,
              color: '#6a9cd5'
            }
          },

          xAxis: [{
            name: '时间',
            type: 'category',
            boundaryGap: false,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: '#6a9cd5'
              },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
              textStyle: {
                color: '#6a9cd5',
                margin: 15,
              },
            },
            axisTick: {show: false,},
            data: ['00:00', '16:0', '12:0', '18:00', '24:00'],
          }],
          yAxis: [{
            type: 'value',
            name: '数量',
            splitLine: {
              show: true,
              lineStyle: {
                color: '#233e64'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6a9cd5'
              },
            },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: '#6a9cd5',

              },
            }
          }],
          series: [{
            name: '解决',
            type: 'line',
            // smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            // showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(0,136,212)',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 10

              }
            },
            data: [120, 110, 191, 134, 150]
          }, {
            name: '新增',
            type: 'line',
            // smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            // showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            itemStyle: {
              normal: {

                color: 'rgb(219,50,51)',
                borderColor: 'rgba(219,50,51,0.2)',
                borderWidth: 10
              }
            },
            data: [220, 182, 125, 145, 122]
          },]
        };
        brr.setOption(option);
        var currentIndex = -1;
        setInterval(function () {
          var dataLen = option.series[0].data.length;

          // 取消之前高亮的图形
          brr.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: currentIndex
          });
          currentIndex = (currentIndex + 1) % dataLen;
          // 高亮当前图形
          brr.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndex,
          });
          // 显示 tooltip
          brr.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: currentIndex
          });
        }, 1000);

      },
      /*左下*/
      signal() {
        let brr = echarts.init(this.$refs.Leftloginthree);
        let option = {
          tooltip: {
            formatter: "{a} <br/>{b} : {c}"
          },
          toolbox: {
            show: false,
            feature: {
              restore: {},
              saveAsImage: {show: false}
            }
          },

          series: [{
            name: '业务指标',
            type: 'gauge',
            min: 0,
            max: 200,
            startAngle: 180,
            endAngle: 0,
            center: ["50%", "65%"], //整体的位置设置
            z: 3,
            radius: '110%',
            detail: {formatter: '{value}'},
            color: '#fff',
            data: [{value: 0, name: '传感器报警'}],
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              color: '#fff'
            },
            title: {
              textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                width: 10,
                shadowBlur: 1033,
              }
            },
            axisLabel: {
              textStyle: {
                color: '#454A57'
              }
            },

            pointer: {
              width: 5, //指针的宽度
              length: "80%", //指针长度，按照半圆半径的百分比
            },
            splitLine: { //分割线样式
              length: 15
            },
          }]
        };
        let _this = this;
        setInterval(function () {
          option.series[0].data[0].value = (Math.random() * 10).toFixed(0) + 6;
          _this.datatwo = option.series[0].data[0].value;
          _this.datafour = 20067 - _this.datatwo;
          brr.setOption(option, true);
        }, 3000);

      },
      // 传感器类型接口
      option() {
        this.$http.get('/url/holecoverServer/getResSensorAmount')
          .then(res => {
            let _this = this;
            console.log(res);
            let rs = res.data.rows;
            rs.forEach(function (row) {
              _this.number.push(row.category);
              _this.numbers.push(row.total);
            });
            this.Typeratio();
          });
      },
      lists() {
        this.$http.get('/url/holecoverServer/list', {
          page: '1',
          limit: '1',
          city: '',
          holecoverType: ''
        })
          .then(res => {
            this.dataone = res.data.total + 67;
            // this.datatwo = res.data.alarmCount;
            this.datathree = res.data.assignCount;

            console.log(this.dataone, 'yuhangwei');
          });
      },
      //
      mock() {
        let _this = this;
        this.$http.get('/wei/index')
          .then(res => {
            console.log(res.Secondcover, 'sdsdasdasdasdasd');
          });

      },
      videoEnd() {
        this.$refs.video_d.play();
      }
    },
    mounted() {
      let _this = this;
      this.auto();
      //传感器类型
      // this.Analysis();
      this.statistics();
      this.Wave();
      this.signal();
      this.option();
      this.lefttwo();
      this.mock();
      this.lists();
      this.getDate();
      // this.typeAnalysis();
      setInterval(function () {
        _this.hold();
        _this.atmosphere();
      }, 3000);

    }
  }
</script>

<style lang="less" scoped>
  .echartsContent {
    position: fixed;
    top: 42%;
    left: 511px;
    z-index: 2;
  }

  .echartsContent .content {
    width: 300px;
    height: 200px;
  }

  #login {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url('../icon/pic_map.png');
    background-repeat: repeat-y;
    background-size: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  header {
    width: 100%;
    height: 82px;
    background-image: url('../icon/pic_header.png');
    background-repeat: repeat-y;
    background-size: 100% 99%;
    color: #fff;
    font-size: 41px;
    text-align: center;
    line-height: 80px;
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
  }

  .yiqunshabi {
    width: 100%;
    height: 100%;
  }

  .Leftlogin {
    width: 24%;
    height: 100%;
    float: left;
    margin-left: 1%;
    .Leftloginone {
      width: 100%;
      height: 31%;
      background-image: url('../icon/leftback.png');
      background-repeat: no-repeat;
      background-size: 100%;
      position: relative;
      /*background: bisque;*/
      .Leftloginonetitle {
        width: 90%;
        height: 63%;
        position: absolute;
        z-index: 10000;
        top: 17.5%;
        left: 6%;
      }
    }
    .Leftlogintwo {
      width: 100%;
      height: 31%;
      max-width: 100%;
      max-height: 32%;
      background-image: url('../icon/leftback.png');
      background-repeat: no-repeat;
      background-size: 100%;
      position: relative;
      .Leftlogintwotitle {
        width: 90%;
        height: 63%;
        position: absolute;
        z-index: 10000;
        top: 17.5%;
        left: 6%;
        img {
          width: 90%;
          height: 90%;
        }
      }
      .lefttwo {
        width: 21%;
        height: 100px;
        position: absolute;
        right: 4%;
        top: 48%;
        z-index: 100000;
        div {
          padding: 0;
          margin: 0;
          width: 100%;
          height: 33%;
          color: #708ACC;
          font-size: 12px;
          text-align: center;
          line-height: 33px;
          span {
            display: inline-block;
            width: 13%;
            height: 36%;
            background: darkblue;
            float: left;
            border-radius: 42%;
            margin-top: 10%;
            margin-left: 15%;
          }

        }
      }
    }
    .Leftloginthree {
      width: 100%;
      height: 31%;
      background-image: url('../icon/leftback.png');
      background-repeat: no-repeat;
      background-size: 100%;
      position: relative;

      .Leftloginthreetitle {
        width: 90%;
        height: 63%;
        position: absolute;
        z-index: 10000;
        top: 17.5%;
        left: 6%;
      }
      .Leftthree {
        position: absolute;
        right: 5%;
        top: 17%;
        width: 25%;
        height: 15%;
        p {
          width: 100%;
          height: 50%;
          padding: 0;
          margin: 0;
          font-size: 12px;
          color: #708ACC;
          span {
            width: 20%;
            height: 20%;
            display: inline-block;
            border-radius: 20%;
          }
        }
      }
    }
    .bigdataspan {
      position: absolute;
      z-index: 100000;
      width: 41%;
      height: 7%;
      top: 4%;
      left: 5%;
      font-size: 14px;
      color: #65C6E7;
      text-indent: 5px;
    }
  }

  #login img {
    width: 90%;
    height: 90%;
  }

  #allmap {
    height: 100%;
    overflow: hidden;
  }

  .Contentlogin {
    width: 47%;
    height: 87%;
    float: left;
    /*opacity: 0.6;*/
    margin-left: 1.5%;
    position: relative;
    .Contentlogintop {
      width: 100%;
      /*margin-left: 5%;*/
      margin-top: 2%;
      height: 100%;
      z-index: 100;
      opacity: 0.6;
      position: relative;
      .Transformation {
        position: absolute;
        right: 7%;
        bottom: 14%;
        width: 42px;
        height: 42px;
        cursor: pointer;
        background-image: url('../icon/Backgbox.png');
        background-repeat: no-repeat;
        background-size: 100%;

      }
      .Deduction {
        position: absolute;
        right: 7%;
        bottom: 7%;
        width: 42px;
        height: 42px;
        cursor: pointer;
        background-image: url('../icon/Backgbox2.png');
        background-repeat: no-repeat;
        background-size: 100%;

      }
      .tongji {
        width: 100%;
        height: 60px;
        position: absolute;
        top: 0;
        z-index: 10000;
        div {
          width: 25%;
          height: 100%;
          float: left;
          font-size: 16px;
          color: #52FFFF;
          text-align: center;
          line-height: 60px;
          background-image: url('../icon/pic_bigdataborder.png');
          background-repeat: no-repeat;
          background-size: 97% 100%;
        }

      }
      .tongji div:nth-child(2) {
        background-image: url('../icon/Alarmbox.png');
        background-repeat: no-repeat;
        background-size: 97% 100%;
        color: #E15D68;
      }
      .sb {
        width: 22px;
        height: 27px;
        position: absolute;
        right: 10%;
        bottom: 50%;
        z-index: 200000;
        background-image: url('../icon/kaimr.png');
        background-repeat: no-repeat;
        background-size: 97% 100%;
        cursor: pointer;
      }
    }
    /* .Contentloginbottom {
       width: 100%;
       height: 40%;
       !*background: gold;*!
       background-image: url('../icon/pic_bottom.png');
       background-repeat: no-repeat;
       background-size: 100% 84%;
       margin-top: 29px;
       position: relative;
       .Contentloginbottomtitle {
         position: absolute;
         width: 92%;
         height: 66%;
         z-index: 10000;
         top: 9.5%;
         left: 4%;
       }
       .loginbottom {
         width: 30%;
         height: 53px;
         position: absolute;
         top: 9%;
         left: 35%;
         p {
           width: 100%;
           height: 50%;
           padding: 0;
           margin: 0;
           text-align: center;
           line-height: 25px;
         }
       }
       .loginbottoms {
         width: 10%;
         height: 40px;
         position: absolute;
         right: 5%;
         top: 10%;
         p {
           width: 100%;
           height: 50%;
           padding: 0;
           margin: 0;
           font-size: 13px;
           color: #708ACC;
           line-height: 20px;
           span {
             width: 30px;
             height: 4px;
             border-radius: 10px;
             display: inline-block;

           }
           span:nth-child(1) {
             background: #1A91F7;
           }
           span:nth-child(2) {
             background: #F95C32;
           }
         }
       }
     }*/
    .Contentvideo {
      width: 350px;
      height: 223px;
      position: absolute;
      top: 8%;
      right: 0%;
      z-index: 30000;
      background-image: url('../icon/pic_rideo.png');
      background-repeat: no-repeat;
      background-size: 100% 102%;
      .videospan {
        position: absolute;
        width: 30px;
        height: 30px;
        right: 2%;
        top: 3px;
        cursor: pointer;
      }
      #vid {
        width: 304px;
        height: 265px;
        margin-top: -4.5%;
        margin-left: 5%;
      }
    }
  }

  .Rightlogin {
    width: 24%;
    height: 100%;
    margin-right: 1%;
    float: right;
    .Rightloginone {
      width: 100%;
      height: 31%;
      background-image: url('../icon/rightback.png');
      background-repeat: no-repeat;
      background-size: 100%;
      position: relative;
      .Rightloginonetitle {
        width: 90%;
        height: 63%;
        /*position: absolute;*/
        z-index: 10000;
        top: 17.5%;
        right: -4%;
      }
    }
    .Rightlogintwo {
      width: 100%;
      height: 31%;
      background-image: url('../icon/rightback.png');
      background-repeat: no-repeat;
      background-size: 100%;
      position: relative;
      .Rightlogintwotitle {
        width: 90%;
        height: 63%;
        /*position: absolute;*/
        z-index: 10000;
        top: 17.5%;
        right: -4%;
      }
    }
    .Rightloginthree {
      width: 100%;
      height: 31%;
      background-image: url('../icon/rightback.png');
      background-repeat: no-repeat;
      background-size: 100%;
      position: relative;
      .Rightloginthreetitle {
        width: 90%;
        height: 63%;
        position: absolute;
        z-index: 10000;
        top: 17.5%;
        right: 6%;
      }
      .rightspan {
        position: absolute;
        width: 89%;
        height: 31px;
        top: 20%;
        left: 10%;
        z-index: 1000;
        div {
          width: 28%;
          height: 100%;
          float: left;
          margin-left: 10%;
          background-image: url('../icon/pic_yali.png');
          background-repeat: no-repeat;
          background-size: 100%;
          font-size: 12px;
          color: #01FDE8;
          text-align: center;
          line-height: 31px;
        }
      }
    }
    .bigdataspans {
      position: absolute;
      z-index: 100000;
      width: 44%;
      height: 7%;
      top: 4%;
      right: 3%;
      font-size: 14px;
      color: #65C6E7;
      text-indent: 5px;
    }

  }

  /*  @media (min-width: 1360px){
      .LoginSignIn {
        width: 450px;
        height: 286px;
        position: absolute;
        bottom: 22.5%;
        left: 33%;
        .check{
          width: 80px;
          height: 20px;
          position: absolute;
          right: 65%;
          bottom: 1%;
        }
      }
    }*/

</style>
<style>

</style>



