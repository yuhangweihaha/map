<template>
  <div class="main-content">
    <header>
      <label class="title"><img src="../../icon/pic_give.png"/><span>历史告警</span></label>
      <div class="param-content">
        <div class="number">
          <el-select v-model="value" placeholder="请选择" value="5225">
            <el-option
              v-for="item in yuyu"
              :label="item.gatewayNo"
              :value="item.gatewayNo">
            </el-option>
          </el-select></div>
        <div class="blocks">
          <el-button style="height: 38px;width: 66px" @click="handleCheck()">查看</el-button>

        </div>

      </div>
    </header>
    <div class="content">
      <el-scrollbar style="height: 100%;">
        <div class="contentleft" ref="contentlefts">

        </div>
        <div class="contentright">
          <el-table :data="yuyu" border fit highlight-current-row  height="500px" style="width: 100%;">
            <el-table-column align="center" label="城市">
              <template slot-scope="scope">
                <span>{{scope.row.alarmStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="传感器编号">
              <template slot-scope="scope">
                <span>{{scope.row.sensorNo}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="集控器编号">
              <template slot-scope="scope">
                <span>{{scope.row.gatewayNo}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-sizes="[5,10,20,50]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
        <div class="contentbottom">
          <div class="contentone" ref="contento"></div>
          <div class="contentwo" ref="contentw"></div>
          <div class="contenthree" ref="contents"></div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
  import { formatDate } from '@/common/js/date.js'
  import echarts from 'echarts';
  export default {
    name: '',
    data() {
      return {
        time: '3',
        yuyu:[],
        value:'1',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        forMatterDate: function(datetime) {
          return formatDate(new Date(datetime), 'yyyy-MM-dd hh:mm:ss');
        },
        times: '',
        starttime:'',
        endtime:'',
        limit: 10,
        page: 1,
        total: null,
      }
    },
    methods: {
      indexMethod(index) {
        return index * 2;
      },
      auto(){
        this.$http.get('holecoverServer/alarmHistory',{
          startTime: this.starttime,
          endTime: this.endtime,
          sensorId: this.value,
          limit:this.limit,
          page:this.page
        })
          .then(res => {
            // this.yuyu = res.Secondcover;
            if(res.status === 200 || res.status === '200'){
              this.yuyu = res.data.rows;
              console.log(res,'rwwwwwesres');
              this.total = res.data.total;
              this.value = res.data.total.sensorNo;
            }else{
              alert('接口错误')
            }
          });
      },
      handleCheck(){
        this.starttime = this.times[0].getTime();
        this.endtime = this.times[1].getTime();
        this.auto();
      },
      handleSizeChange(val) {
        this.limit = val;
        this.auto();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.auto();
      },
      contento(){
        let brr = echarts.init(this.$refs.contento);
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ]
            }
          ]
        };
        brr.setOption(option);
      },
      contentw(){
        let brr = echarts.init(this.$refs.contentw);
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ]
            }
          ]
        };
        brr.setOption(option);
      },
      contents(){
        let brr = echarts.init(this.$refs.contents);
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ]
            }
          ]
        };
        brr.setOption(option);
      },
      yuyuyu(){
        let brr = echarts.init(this.$refs.contentlefts);
        let option = {
          title: {
            text: '香港18区人口密度 （2011）',
            subtext: '人口密度数据来自Wikipedia',
            sublink: 'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (p / km2)'
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          visualMap: {
            min: 800,
            max: 50000,
            text:['High','Low'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['lightskyblue','yellow', 'orangered']
            }
          },
          series: [
            {
              name: '香港18区人口密度',
              type: 'map',
              mapType: 'HK', // 自定义扩展图表类型
              itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
              },
              data:[
                {name: '中西区', value: 20057.34},
                {name: '湾仔', value: 15477.48},
                {name: '东区', value: 31686.1},
                {name: '南区', value: 6992.6},
                {name: '油尖旺', value: 44045.49},
                {name: '深水埗', value: 40689.64},
                {name: '九龙城', value: 37659.78},
                {name: '黄大仙', value: 45180.97},
                {name: '观塘', value: 55204.26},
                {name: '葵青', value: 21900.9},
                {name: '荃湾', value: 4918.26},
                {name: '屯门', value: 5881.84},
                {name: '元朗', value: 4178.01},
                {name: '北区', value: 2227.92},
                {name: '大埔', value: 2180.98},
                {name: '沙田', value: 9172.94},
                {name: '西贡', value: 3368},
                {name: '离岛', value: 806.98}
              ],
              // 自定义名称映射
              nameMap: {
                'Central and Western': '中西区',
                'Eastern': '东区',
                'Islands': '离岛',
                'Kowloon City': '九龙城',
                'Kwai Tsing': '葵青',
                'Kwun Tong': '观塘',
                'North': '北区',
                'Sai Kung': '西贡',
                'Sha Tin': '沙田',
                'Sham Shui Po': '深水埗',
                'Southern': '南区',
                'Tai Po': '大埔',
                'Tsuen Wan': '荃湾',
                'Tuen Mun': '屯门',
                'Wan Chai': '湾仔',
                'Wong Tai Sin': '黄大仙',
                'Yau Tsim Mong': '油尖旺',
                'Yuen Long': '元朗'
              }
            }
          ]
        };
        brr.setOption(option);
      }
    },
    mounted() {
      this.auto();
      this.contento();
      this.contentw();
      this.contents();
      this.yuyuyu();
    }
  }
</script>

<style lang="less" scoped>
  div.main-content {
    padding: 15px 10%;
    height: 100%;
  }

  header {
    padding-bottom: 5px;
    text-align: left;
    line-height: 40px;
    border-bottom: 1px solid #E0E0E0;
  }

  header .title {
    position: relative;
    padding-left: 36px;
  }
  header .block{
    float: left;
    margin-left: 20px;
  }
  header .blocks{
    float: right;
    margin-left: 20px;
  }
  header .number{
    float: left;
  }

  header .title img {
    height: 26px;
    width: 32px;
    position: absolute;
    top: -5px;
    left: 0px;
  }

  header .param-content {
    float: right;
  }
  header .param-content > label {
    margin-left: 10px;
  }

  header .param-content > label.param-title {
    margin-left: 20px;
  }

  header .param-content button {
    height: 28px;
    padding: 0 10px;
  }

  header .param-content .el-button-group {
    margin-bottom: 2px;
    margin-left: 10px;
  }

  header .param-content > button {
    width: 70px;
    margin-left: 10px;
  }

  div.content {
    margin-top: 40px;
    height: calc(100% - 220px);
    overflow-x: hidden;
    position: relative;
  }
  .el-pagination {
    margin-top: 30px;
    margin-left: 50%;
  }
  @media (min-width: 1600px) {
    .el-pagination {
      margin-top: 30px;
      margin-left: 46%;
    }
  }
  .contentright{
    width: 48%;
    height: 600px;
    border:1px solid #ccc;
    float: right;
    right: 5px;
    box-shadow: -1px 3px 27px #ccc;
  }
  .contentleft{
    width: 48%;
    height: 600px;
    border:1px solid #ccc;
    float: left;
    box-shadow: 2px 6px 19px #ccc;
  }
  .contentbottom{
    width: calc(100% - 2px);
    height: 400px;
    border:1px solid #ccc;
    float: left;
    margin-top:50px;
    box-shadow: -5px -1px 27px #ccc;
    margin-bottom: 50px;
    div{
      width: 33.3%;
      height: 100%;
      float: left;
    }
  }
</style>
<style>
  header .param-content button{
    width: 66px;
    height: 40px;
  }
  .contentleft .el-table--enable-row-hover{
    width: 95%;
    height: 500px;
    margin-left: 2.5%;
    margin-top: 3%;
  }
</style>
