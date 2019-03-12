<template>
    <div style="width: 100%;height: 100%;">
      <div class="Leftlogin">
        <div class="Leftloginone">
          <div class="bigdataspan">污染源企业</div>
          <div class="Leftloginonetitle" ref="Leftloginone"></div>
        </div>
        <div class="Leftloginthree">
         <!-- <div class="Leftthree">
            <p><span style="background: #FFAC3F"></span> 信号趋势</p>
            <p><span style="background: #52FFFF"></span> 逻辑回归趋势</p>
          </div>-->
          <div class="bigdataspan">噪声污染分布</div>
          <div class="Leftloginthreetitle" ref="Leftloginthree"></div>
        </div>
        <div class="Leftlogintwo">
          <div class="lefttwo">
            <div><span style="background: #de3d06"></span> 三级噪音</div>
            <div><span style="background: #45c83c"></span> 二级噪音</div>
            <div><span style="background: #051b89;"></span> 一级噪音</div>
          </div>
          <div class="bigdataspan">污染企业分布</div>  <!--ref="Leftlogintwo"-->
          <div class="Leftlogintwotitle"><img src="@/icon/pic_jinan3.gif" alt=""></div>
        </div>
      </div>
      <div class="Contentlogin">
        <div class="Contentlogintop">
          <div class="sssb">
            <div style="padding-top: 1%">
              <p style="font-size:18px;color:#65C6E7">实时空气质量检测</p>
              <p>AQI指数:</p>
              <p>62.00</p>
              <p>首要污染物:</p>
              <p>PM2.5</p>
              <p>浓度:</p>
              <p>44.1微克/立方米</p>
            </div>

          </div>
          <div class="spanjihe">
            <p><span style="background: #1fa447"></span><span style="background: #b2de43"></span><span style="background: #e1a626"></span><span style="background: #f6461d"></span><span style="background: #b52c24"></span></p>
            <p><span>0</span><span>50</span><span>100</span><span>150</span><span>200</span></p>
          </div>
        </div>
        <div class="Contentloginbottom">
          <div class="loginbottom">
            <p style="color:#65C6E7;font-size: 14px;font-weight: 700;line-height: 34px">地下水质量检测平均值</p>
          </div>
          <div class="Contentloginbottomtitle" ref="Contentloginbottom"></div>
          <div class="loginbottoms">
            <div>
              <div><span>14</span>&nbsp; <div style="float: right">需氧量(mg/l)</div></div>
              <div><span>16</span>&nbsp; <div style="float: right">氨氮量(mg/l)</div></div>
            </div>
            <div>
              <div><span>23</span>&nbsp; <div style="float: right">含磷量(mg/l)</div></div>
              <div><span>13</span>&nbsp; <div style="float: right">含氮量(mg/l)</div></div>
            </div>
          </div>
        </div>
      </div>
      <div class="Rightlogin">
        <div class="Rightloginone">
          <div class="bigdataspans">垃圾处理区域月统计</div>
          <div class="Rightloginonetitle" ref="Rightloginoe">

          </div>
        </div>
        <div class="Rightlogintwo">
          <div class="bigdataspans">各地区抽样土壤检测平均值</div>
          <div class="Rightlogintwotitle" ref="Rightlogintwo"></div>
        </div>
        <div class="Rightloginthree">
          <div class="bigdataspans">污水检测实时报警</div>
          <div class="Rightloginthreetitle" ref="Rightloginthree"></div>
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
        atmospheres:[],
        atmospheretwo:[],
        max:88,
        isVideo:false,
        showJK:false,
        yu:false,
        pickerOptions0: {
          disabledDate: (time) => {
            if(this.toTime != "") {
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
        timer: null,
        pro:''
      }
    },

    methods: {
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
        var radius = '50%';
        var leiDaCenter = ['50%', '58%'];
        var leiDadata = [{
          name: "市中区",
          max: 10,
          pre: 32
        }, {
          name: "槐荫市",
          max: 10,
          pre: 3
        }, {
          name: "天桥区",
          max: 10,
          pre: 3
        }, {
          name: "历程区",
          max: 10,
          pre: 5.5
        }, {
          name: "长清区",
          max: 10,
          pre: 5
        }, {
          name: "平阴县",
          max: 10,
          pre: 3
        }, {
          name: "章丘市",
          max: 10,
          pre: 2
        }, {
          name: "济阳县",
          max: 10,
          pre: 2
        }, {
          name: "商河县",
          max: 10,
          pre: 2
        }];
        var radarAllDatas = [
          [{
            name: "10月"
          }],
          [{
            name: "11月"
          }],
          [{
            name: "12月",
          }]
        ]
        var colorListRadar = ["#00faf7", "#f19049", "#c6fc5e"];
        var leiDaArr = []; //雷达图
        var leiDaXzhou = []; //轮播的名称
        var legendLeiDa = []; //用于装legend的
        var displayLeiDaAllTitle = []; //显示雷达图的参数
        for (let z = 0; z < radarAllDatas.length; z++) {
          leiDaXzhou.push(radarAllDatas[z][0].name);
          legendLeiDa.push({
            name: radarAllDatas[z][0].name,
            icon: "circle"
          });
          leiDaArr.push({
            name: radarAllDatas[z][0].name,
            type: 'radar',
            symbol: "circle",
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: colorListRadar[z],
              }
            },
            areaStyle: {
              normal: {
                color: colorListRadar[z],
                opacity: 0.6
              },
            },
            lineStyle: {
              normal: {
                color: colorListRadar[z],
                type: 'solid',
                width: 3,
                opacity: 1
              }
            },
            data: radarAllDatas[z]
          })
        }

        let option = {
          baseOption: {
            timeline: {
              show: false,
              type: 'slider',
              axisType: 'category',
              bottom: '0',
              currentIndex: 0, //0 时表示当前选中项为 timeline.data[0]（即使用 options[0]
              autoPlay: true, //是否自动播放
              loop: true,
              rewind: true, //反向轮播
              realtime: true, //拖动圆点的时候，是否实时更新视图。
              controlPosition: 'left',
              label: {
                normal: {
                  color: '#2998ff',
                },
              },
              itemStyle: {
                normal: {
                  color: '#fff',
                  borderColor: '#2998ff',
                  borderWidth: 2,
                }
              },
              checkpointStyle: { //『当前项』（checkpoint）的图形样式
                color: 'rgb(215, 0, 0)',
              },
              lineStyle: {
                show: true, //false 不显示轴线
                color: '#2998ff',
              },
              controlStyle: { //控制按钮的样式
                show: true,
                showPrevBtn: true,
                showNextBtn: true,
                itemGap: 50,
                itemSize: 36,
                normal: {
                  color: 'rgb(215, 0, 0)',
                  borderColor: 'rgb(215, 0, 0)',
                },
                emphasis: {
                  color: 'rgb(215, 0, 0)',
                  borderColor: 'rgb(215, 0, 0)',
                },
              },
              data: leiDaXzhou,
            },
            legend: {
              show: true,
              orient: 'vertical',
              top: '1%',
              left: '0.5%',
              itemWidth: 10,
              textStyle: {
                fontSize: 13,
                color: "#fff"
              },
              data: legendLeiDa
            },
            radar: [{
              indicator: leiDadata,
              radius: radius,
              center: leiDaCenter,
              startAngle: 126,
              splitNumber: 4,
              shape: 'circle',
              name: {
                show: true,
                fontSize: 12,
                color: "#fff",
                formatter: function(value, indicator) {
                  return indicator.name + ' ' + indicator.pre
                },
              },
              nameGap: 25,
              splitArea: {
                areaStyle: {
                  color: 'transparent',
                  shadowBlur: 10
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#0095B0'
                }
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(0,155,226,0.6)'
                }
              },
              indicator: leiDadata
            },

            ],

            series: leiDaArr //series结束
          },
          options: [{
            radar: [{
              indicator: [{
                name: "市中区",
                max: 10,
                pre: 8
              }, {
                name: "槐荫市",
                max: 10,
                pre: 8
              }, {
                name: "天桥区",
                max: 10,
                pre: 8
              }, {
                name: "历程区",
                max: 10,
                pre: 8
              }, {
                name: "长清区",
                max: 10,
                pre: 8
              }, {
                name: "平阴县",
                max: 10,
                pre: 8
              },{
                name: "章丘市",
                max: 10,
                pre: 8
              },
                {
                  name: "济阳县",
                  max: 10,
                  pre: 8
                }, {
                  name: "商河县",
                  max: 10,
                  pre: 9
                }
              ]
            }],
            series: [{
              z: 1,
              itemStyle: {
                normal: {
                  opacity: 0.2
                }
              },
              areaStyle: {
                normal: {
                  opacity: 0.2
                }
              },
              lineStyle: {
                normal: {
                  opacity: 0.2
                }
              },
              data: [{
                value: [8, 8.5, 8.5, 8.5, 9, 7, 8, 8, 5]
              }]
            }, {
              z: 1,
              itemStyle: {
                normal: {
                  opacity: 0.2
                }
              },
              areaStyle: {
                normal: {
                  opacity: 0.2
                }
              },
              lineStyle: {
                normal: {
                  opacity: 0.2
                }
              },
              data: [{
                value: [8, 8.5, 8.5, 8.5, 9, 7, 8, 8, 5]
              }]
            }, {
              z: 3,
              itemStyle: {
                normal: {
                  opacity: 1
                }
              },
              areaStyle: {
                normal: {
                  opacity: 0.6
                }
              },
              lineStyle: {
                normal: {
                  opacity: 1
                }
              },
              data: [{
                value: [8, 8.5, 8.5, 8.5, 9, 7, 8, 8, 5]
              }]
            }]
          },
            {
              radar: [{
                indicator: [{
                  name: "市中区",
                  max: 10,
                  pre: 7
                }, {
                  name: "槐荫市",
                  max: 10,
                  pre: 7
                }, {
                  name: "天桥区",
                  max: 10,
                  pre: 8
                }, {
                  name: "历程区",
                  max: 10,
                  pre: 7
                }, {
                  name: "长清区",
                  max: 10,
                  pre: 8
                }, {
                  name: "平阴县",
                  max: 10,
                  pre: 8
                },
                  {
                    name: "章丘市",
                    max: 10,
                    pre: 7
                  }, {
                    name: "济阳县",
                    max: 10,
                    pre: 8
                  }, {
                    name: "商河县",
                    max: 10,
                    pre: 7
                  }
                ]
              }],
              series: [{
                z: 1,
                itemStyle: {
                  normal: {
                    opacity: 0.2
                  }
                },
                areaStyle: {
                  normal: {
                    opacity: 0.2
                  }
                },
                lineStyle: {
                  normal: {
                    opacity: 0.2
                  }
                },
                data: [{
                  value: [8, 8.5, 8.5, 8.5, 9, 7, 8, 7, 4]
                }]
              }, {
                z: 3,
                itemStyle: {
                  normal: {
                    opacity: 1
                  }
                },
                areaStyle: {
                  normal: {
                    opacity: 0.6
                  }
                },
                lineStyle: {
                  normal: {
                    opacity: 1
                  }
                },
                data: [{
                  value: [7, 7, 6, 6, 6, 7.5, 5, 8, 6]
                }]
              }, {
                z: 1,
                itemStyle: {
                  normal: {
                    opacity: 0.2
                  }
                },
                areaStyle: {
                  normal: {
                    opacity: 0.2
                  }
                },
                lineStyle: {
                  normal: {
                    opacity: 0.2
                  }
                },
                data: [{
                  value: [7, 7, 6, 6, 6, 7.5, 5, 8, 6]
                }]
              }]
            },
            {
              radar: [{
                indicator: [{
                  name: "市中区",
                  max: 10,
                  pre: 8
                }, {
                  name: "槐荫市",
                  max: 10,
                  pre: 8.5
                }, {
                  name: "天桥区",
                  max: 10,
                  pre: 8.5
                }, {
                  name: "历程区",
                  max: 10,
                  pre: 8.5
                }, {
                  name: "长清区",
                  max: 10,
                  pre: 9
                }
                  , {
                    name: "平阴县",
                    max: 10,
                    pre: 7
                  },
                  {
                    name: "章丘市",
                    max: 10,
                    pre: 5.5
                  }, {
                    name: "济阳县",
                    max: 10,
                    pre: 5
                  }, {
                    name: "商河县",
                    max: 10,
                    pre: 3
                  }
                ]
              }],
              series: [{
                z: 3,
                itemStyle: {
                  normal: {
                    opacity: 1
                  }
                },
                areaStyle: {
                  normal: {
                    opacity: 0.6
                  }
                },
                lineStyle: {
                  normal: {
                    opacity: 1
                  }
                },
                data: [{
                  value: [8, 8.5, 8.5, 8.5, 9, 7, 5.5 , 5, 3]
                }]
              }, {
                z: 1,
                itemStyle: {
                  normal: {
                    opacity: 0.2
                  }
                },
                areaStyle: {
                  normal: {
                    opacity: 0.2
                  }
                },
                lineStyle: {
                  normal: {
                    opacity: 0.2
                  }
                },
                data: [{
                  value: [8, 8.5, 8.5, 8.5, 9, 7, 5.5 , 5, 3]
                }]
              }, {
                z: 1,
                itemStyle: {
                  normal: {
                    opacity: 0.2
                  }
                },
                areaStyle: {
                  normal: {
                    opacity: 0.2
                  }
                },
                lineStyle: {
                  normal: {
                    opacity: 0.2
                  }
                },
                data: [{
                  value:[8, 8.5, 8.5, 8.5, 9, 7, 5.5 , 5, 3]
                }]
              }]
            },
          ]
        }
        brr.setOption(option);
      },
      // 蜘蛛网
      atmosphere(){
        this.atmospheretwo = [];
        this.atmospheres = [];
        this.$http.get('/url/holecoverServer/getResSensorAir')
          .then(res => {
            let _this = this;
            let rs = res.data.rows;
            rs.forEach(function (row) {
              _this.atmospheretwo.push({
                max: '100',
                name: row.category,
              });
              _this.atmospheres.push(row.total)
            });
            this.autos();
          /*  console.log( _this.atmospheretwo,'yuyudddd');
            console.log( _this.atmospheres,'yuyudddd');*/
          });
      },
      // 柱形图
      Typeratio() {
        let brr = echarts.init(this.$refs.Leftloginone);
        var plantCap = [{
          name: '总数',
          value: '3680'
        }, {
          name: '废水企业',
          value: '2100'
        }, {
          name: '放射源企业',
          value: '380'
        }, {
          name: '固废企业',
          value: '300'
        }, {
          name: '废气企业',
          value: '700'
        }];

        var datalist = [{
          offset: [52, 48],
          symbolSize: 120,
          fontSize: 28,
          opacity: .95,
          color: '#f467ce'
        }, {
          offset: [20, 78],
          symbolSize: 95,
          opacity: .88,
          color: '#7aabe2'
        }, {
          offset: [7, 23],
          symbolSize: 90,
          opacity: .84,
          color: '#ff7123'
        }, {
          offset: [87, 80],
          symbolSize: 90,
          opacity: .8,
          color: '#ffc400'
        }, {
          offset: [86, 22],
          symbolSize: 80,
          opacity: .7,
          color: '#178eeb'
        }];
        var datas = [];
        for (var i = 0; i < plantCap.length; i++) {
          var item = plantCap[i];
          var itemToStyle = datalist[i];
          datas.push({
            name: item.value + '\n' + item.name,
            value: itemToStyle.offset,
            symbolSize: itemToStyle.symbolSize,
            label: {
              normal: {
                textStyle: {
                  fontSize: 14
                }
              }
            },
            itemStyle: {
              normal: {
                color: itemToStyle.color,
                opacity: itemToStyle.opacity
              }
            },
          })
        }
        var option = {
          grid: {
            show: false,
            top: 10,
            bottom: 10
          },
          xAxis: [{
            gridIndex: 0,
            type: 'value',
            show: false,
            min: 0,
            max: 100,
            nameLocation: 'middle',
            nameGap: 5
          }],
          yAxis: [{
            gridIndex: 0,
            min: 0,
            show: false,
            max: 100,
            nameLocation: 'middle',
            nameGap: 30
          }],
          series: [{
            type: 'scatter',
            symbol: 'circle',
            symbolSize: 120,
            label: {
              normal: {
                show: true,
                formatter: '{b}',
                color: '#fff',
                textStyle: {
                  fontSize: '20'
                }
              },
            },
            itemStyle: {
              normal: {
                color: '#00acea'
              }
            },
            data: datas
          }]
        };

        brr.setOption(option);
      },
      typeAnalysis(){

        this.$http.get('/url/getFaultRate')
          .then(res => {
            let _this = this;
             console.log(res[0],'898989')
            let arr = res[0];
             for(let i = 0; i <arr.length;i++){
               console.log(arr[i].month,'arr[i].date');

             }
            this.statistics();
          });
      },
      // 中下
      Analysis() {
        let brr = echarts.init(this.$refs.Contentloginbottom);

        let option = {
          title: [{
            x: "18%",
            bottom: 30,
            text: '水温(℃)',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 15,
              color: "#65C6E7"
            },
          }, {
            x: "45%",
            bottom: 30,
            text: 'PH值',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 15,
              color: "#65C6E7"
            },
          }, {
            x: "67%",
            bottom: 30,
            text: '浊度(NTU)',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 15,
              color: "#65C6E7"
            },
          }],
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c}",

          },
          series: [{
            type: 'pie',
            label: { //标签的位置
              normal: {
                show: false,
              }
            },
            clockwise: false,
            radius: ['35%', '40%'],
            center: ['25%', '50%'],
            data: [{
              value: 18,
              name: '水温(℃)',
              itemStyle: {
                color: 'rgba(241,192,73,1.0)'
              }
            }]
          }, {
            name: '',
            type: 'pie',
            clockwise: false,
            silent: true,
            minAngle: 20, //最小的扇区角度（0 ~ 360）
            center: ['25%', '50%'], //饼图的中心（圆心）坐标
            radius: ['0%', '25%'],
            itemStyle: { //图形样式
              normal: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(241,192,73,0.5)' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(241,192,73,1)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                },
                borderWidth: 1.5,
                opacity: 0.21,
              }
            },
            label: { //标签的位置
              normal: {
                show: true,
                align: 'center',
                position: 'center', //标签的位置
                formatter: "{c}",
                fontSize: 20,
                textStyle: {
                  color: 'rgba(241,192,73,1.0)',
                }
              }
            },
            data: [{
              value: 18
            }]
          }, {
            type: 'pie',
            label: { //标签的位置
              normal: {
                show: false,
              }
            },
            clockwise: false,
            radius: ['35%', '40%'],
            center: ['50%', '50%'],
            data: [{
              value: 23,
              name: 'PH值',
              itemStyle: {
                color: 'rgba(48,230,142,1.0)'
              }
            }]
          }, {
            name: '',
            type: 'pie',
            clockwise: false,
            silent: true,
            minAngle: 20, //最小的扇区角度（0 ~ 360）
            center: ['50%', '50%'], //饼图的中心（圆心）坐标
            radius: ['0%', '25%'],
            itemStyle: { //图形样式
              normal: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(48,230,142,0.1)' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(48,230,142,1)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                },
                borderWidth: 1.5,
                opacity: 0.21,
              }
            },
            label: { //标签的位置
              normal: {
                show: true,
                align: 'center',
                position: 'center', //标签的位置
                formatter: "{c}",
                fontSize: 20,
                textStyle: {
                  color: 'rgba(48,230,142,1.0)',
                }
              }
            },
            data: [{
              value: 23
            }]
          }, {
            type: 'pie',
            label: { //标签的位置
              normal: {
                show: false,
              }
            },
            clockwise: false,
            radius: ['35%', '40%'],
            center: ['75%', '50%'],
            data: [{
              value: 20,
              name: '浊度(NTU)',
              itemStyle: {
                color: 'rgba(232,30,135,1.0)'
              }
            }]
          }, {
            name: '',
            type: 'pie',
            clockwise: false,
            silent: true,
            minAngle: 20, //最小的扇区角度（0 ~ 360）
            center: ['75%', '50%'], //饼图的中心（圆心）坐标
            radius: ['0%', '25%'],
            itemStyle: { //图形样式
              normal: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(232,30,135,0.1)' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(232,30,135,1)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                },
                borderWidth: 1.5,
                opacity: 0.21,
              }
            },
            label: { //标签的位置
              normal: {
                show: true,
                align: 'center',
                position: 'center', //标签的位置
                formatter: "{c}",
                fontSize: 20,
                textStyle: {
                  color: 'rgba(232,30,135,1.0)',
                }
              }
            },
            data: [{
              value: 20
            }]
          }]
        };
        brr.setOption(option);
      },
      // 波浪
      statistics() {
        let brr = echarts.init(this.$refs.Rightlogintwo);
        let option = {
          grid: {
            x: 55,
            y: 30,
            x2: 65,
            y2: 25,
            borderWidth: 2
          },
          yAxis: {
            name:'化学物',
            data: ['镉', '汞', '铅', '钾', '铬', '铜', '砷', '锌'],
            /*splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }*/
            splitLine: {
              show: false,
              lineStyle: {
                color: '#233e64'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#178eeb'
              },
            },
          },
          xAxis: {
            name:'超标率',
            axisLabel: {
              formatter: '{value} %'
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#233e64'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#178eeb'
              },
            },
          },
          series: [{
            type: 'scatter',
            name: '1990',
            symbol: 'circle', //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            symbolSize: function(data) {
              return Math.sqrt(data[2]) * 4;
            },
            itemStyle: {
              normal: {
                color: (params) => {
                  // build a color map as your need.
                  let colorList = [
                    '#DF6A85',
                    '#716AA9',
                    '#34BCC3',
                    '#FC6D44',
                    '#0B9FCA',
                    '#7e2dc2',
                    '#55c2b9',
                    '#c23837',
                  ];
                  return colorList[params.dataIndex]
                },
              }
            },
            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data[3];
                },
                position: 'top'
              },
            },
            data: [
              [50, '镉', 10],
              [60, '汞', 10],
              [90, '铅', 10],
              [20, '钾', 10],
              [40, '铬', 10],
              [70, '铜', 10],
              [35, '砷', 10],
              [28, '锌', 10],
            ]
          }]
        };
        brr.setOption(option);
        // brr.shift();
      },
      // 水波图
      Wave() {
        let brr = echarts.init(this.$refs.Rightloginthree);
        var data = [
          [400, 0, '泄露'],
          [600, 0, '未处理'],
          [200, 0, '超标'],
          [1200, 0, '总数']
        ]
        let option = {
          xAxis: {
            show: false,
            type: 'value',
            min: 0,
            max: 6
          },
          yAxis: {
            show: false,
            type: 'value',
            min: 0,
            max: 4
          },
          grid: {
            bottom: 0,
            top: 0,
            left: 0,
            right: 0
          },
          series: [{
            type: 'custom',
            name: 'custom',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0,0,0,1, [
                  {offset: 0, color: '#63E4FB'},
                  {offset: 1, color: '#028BBB'}
                ]),
                shadowBlur: 20,
                shadowOffsetX: -15,
                shadowOffsetY: 15,
                shadowColor: 'rgba(0,0,0,0.8)'
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0.5,0,0.5,1, [
                  {offset: 0, color: '#63E4FBCC'},
                  {offset: 1, color: '#028BBBCC'}
                ])
              }
            },
            renderItem: function(params, api) {
              var value = api.value(0);
              var diff = api.value(1);
              var name = api.value(2);
              var size = (100 - 30) / (15 - 0) * value/100 + 60;
              var coord = api.coord([params.dataIndexInside + 1, (params.dataIndexInside) % 2+ 1]);
              var x = coord[0];
              var y = coord[1];
              var d = (size / 2) * Math.cos(45 / 180);
              var points = {
                left: [x - d, y],
                right: [x + d, y],
                top: [x, y - d],
                bottom: [x, y + d]
              }
              var valueLength = String(value).length;
              var valueWidth = 12 * valueLength;
              var unitWidth = 12;
              var iconWidth = diff ? 5 : 0;
              var labelWidth = valueWidth + unitWidth + iconWidth;
              var labelHeight = 18
              return {
                type: 'group',
                children: [
                  {
                    type: 'polygon',
                    shape: {
                      points: [points.left, points.top, points.right, points.bottom, points.left]
                    },
                    style: api.style(),
                    styleEmphasis: api.styleEmphasis()
                  },
                  {
                    type: 'group',
                    children: [
                      {
                        type: 'text',
                        style: {
                          text: value,
                          x: x - labelWidth / 2,
                          y: y - labelHeight / 2,
                          fill: '#fff',
                          font: 'normal 18px "Microsoft YaHei", sans-serif'
                        }
                      },
                      {
                        type: 'text',
                        style: {
                          text: '个',
                          x: x - labelWidth / 2 + valueWidth,
                          y: y - 5,
                          fill: '#fff',
                        }
                      },
                      {
                        type: 'text',
                        style: {
                          text: diff > 0 ? '↑' : (diff < 0 ? '↓' : ''),
                          x: x - labelWidth / 2 + valueWidth + unitWidth,
                          y: y - 5,
                          fill: '#fff',
                        }
                      }
                    ]
                  },
                  {
                    type: 'text',
                    style: {
                      text: name,
                      x: x - (name.length * 12 / 2),
                      y: y - d - 18,
                      fill: '#8492A6',
                      font: 'normal 12px "Microsoft YaHei", sans-serif'
                    }
                  }
                ]
              }
            },
            data: data,
            animationDuration: 1500,
            animationEasing: 'sinusoidalInOut',
            animationDelay: function(idx) {
              return idx * 300;
            }
          }]
        };
        brr.setOption(option);
      },
      // 左下
      signal() {
        let brr = echarts.init(this.$refs.Leftloginthree);
        var data = {
          id: 'echartPie',
          value: [12, 32, 54, 12,23,43,54,65,12,32],
          legend: ['商河市', '济阳市', '章丘市', '平阴市', '长清区', '历城区', '历下区', '市中区', '槐荫区', '天桥区'],
          color: ['#3FA7DC', '#c23837', '#5170A2', '#E1B0AA', '#a9e142', '#E1CA74', '#D89EE1', '#2a6ee1', '#3ce161', '#DCCEBB'],
          // tooltipShow:false,    //设置悬浮提示显示              --默认显示true
          // hoverAnimation:false, //设置鼠标悬浮点击饼图动画效果  --默认开启动画true
        }
        var seriesData = []
        data.value.forEach(function(item, index) {
          seriesData.push({
            value: item,
            name: data.legend[index]
          })
        })
        var option = {
          tooltip: {
            legend: {
              orient : 'vertical',
              x : 10,
              y : 500,
            },
            trigger: 'item',
            show: data.tooltipShow === false ? false : true
            //   formatter: "{b}: {c} ({d}%)"
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right:0,
            top: 0,
            bottom:0,
            icon: 'circle',
            selectedMode: false,
            itemWidth: 6,
            itemHeight: 6,
            itemGap: 6,
            borderRadius: 6,
            data: data.legend,
            textStyle: {
              color: '#708ACC'
            },
          },
          series: [{
            type: 'pie',
            // clickable:false,
            // selectedMode: 'single',//单点击设置
            hoverAnimation: data.hoverAnimation === false ? false : true,
            radius: ['59%', '100%'],
            color: data.color,
            label: {
              normal: {
                position: 'inner',
                // formatter: '{d}%',
                formatter: function(param) {
                  if (!param.percent) return ''
                  var f = Math.round(param.percent * 10) / 10;
                  var s = f.toString();
                  var rs = s.indexOf('.');
                  if (rs < 0) {
                    rs = s.length;
                    s += '.';
                  }
                  while (s.length <= rs + 1) {
                    s += '0';
                  }
                  return s + '%';
                },
                textStyle: {
                  color: '#fff',
                  fontSize: 9
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: seriesData
          }]
        };
        brr.setOption(option);
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
      videoEnd(){
        this.$refs.video_d.play();
      }
    },
    mounted() {
      let _this = this;
      //传感器类型
      _this.$message({
        message: '地图加载成功',
        type: 'success'
      });
      this.Analysis();
      this.statistics();
      this.Wave();
      this.autos();
      this.signal();
      this.option();
      // this.typeAnalysis();
      setInterval(function () {
        _this.hold();
        // _this.atmosphere();   //蜘蛛网
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
      .Leftthree{
        position: absolute;
        right: 5%;
        top: 17%;
        width: 25%;
        height: 15%;
        p{
          width: 100%;
          height: 50%;
          padding: 0;
          margin: 0;
          font-size: 12px;
          color:#708ACC;
          span{
           width:20% ;
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
    height: 100%;
    float: left;
    /*opacity: 0.6;*/
    margin-left: 1.5%;
    position: relative;
    .Contentlogintop {
      width: 100%;
      /*margin-left: 5%;*/
      margin-top: 2%;
      height: 52%;
      z-index: 100;
      opacity: 0.6;
      position: relative;
     background:#061D3D;
      background-image: url('../icon/map.png');
      background-repeat: no-repeat;
      background-size: 85% 96%;
      .sssb{
        width: 202px;
        height: 297px;
        margin-left: 5%;
        color:#fff;
        margin-top: 5%;
        background-image: url('../icon/juxing.png');
        background-repeat: no-repeat;
        background-size: 100% 95%;
        p{
          margin-left: 5%;
          text-align: center;
        }

      }
     .ssb p:nth-child(1){
        margin-top: 5%;
      }
      .spanjihe{
        position: absolute;
        right: 6%;
        bottom: 8%;
        p{
          padding: 0;
          margin: 0;
          color:#fff;
          span{
            display: inline-block;
            width: 40px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            font-size: 9px;
            cursor: pointer;

          }
        }

      }
    }
    .Contentloginbottom {
      width: 100%;
      height: 40%;
      /*background: gold;*/
      background-image: url('../icon/pic_bottom.png');
      background-repeat: no-repeat;
      background-size: 100% 84%;
      margin-top: 29px;
      position: relative;
      .Contentloginbottomtitle {
        width: 54%;
        height: 60%;
        z-index: 10000;
        margin-right: 3%;
        float: right;
        margin-top: 5%;
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
        width: 40%;
        height: 60%;
        float: left;
        margin-top: 7%;
        margin-left: 3%;
        div{
          width: 100%;
          height: 37%;
          margin-top: 4%;
          text-align: center;
          line-height: 82px;
          div{
            width: 50%;
            height: 100%;
            float: left;
            font-size: 16px;
            color:#65C6E7;
            span{
              width: 40%;
              height: 100%;
              display: inline-block;
              background-image: url('../icon/shuizhi.png');
              background-repeat: no-repeat;
              background-size: 100% 100%;
              font-size: 26px;
              color:#65C6E7;
              font-weight: 700;
              text-indent: 0px;
            }
          }
        }
      }
    }
    .Contentvideo{
      width: 350px;
      height: 223px;
      position: absolute;
      top: 8%;
      right: 0%;
      z-index: 30000;
      background-image: url('../icon/pic_rideo.png');
      background-repeat: no-repeat;
      background-size: 100% 102%;
      .videospan{
        position: absolute;
        width: 30px;
        height: 30px;
        right: 2%;
        top: 3px;
        cursor: pointer;
      }
      #vid{
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
        position: absolute;
        z-index: 10000;
        top: 17.5%;
        right: 6%;
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
        position: absolute;
        z-index: 10000;
        top: 17.5%;
        right: 6%;
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
        left: 5%;
        z-index: 1000;
        div {
          width: 28%;
          height: 100%;
          float: left;
          margin-left: 4%;
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



