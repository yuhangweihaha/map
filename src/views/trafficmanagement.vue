<template>
  <div style="width: 100%;height: 100%;">
    <div id="container" v-show="twei">
      <div class="container-Summary" v-show="Summary">
        <span style="width: 250px;height: 100%;"> 在线车辆个数：<div
          style="display: inline-block;font-size: 21px;font-weight: 700;color:#ffcd56">{{containerone}}</div> 辆</span><span
        style="width: 240px;height: 100%;">拥堵里程数：<div
        style="display: inline-block;font-size: 21px;font-weight: 700;color:#ffcd56">{{containertwo}} </div> 公里</span><span
        style="width: 295px;height: 100%;">拥堵区域内车辆个数：<div
        style="display: inline-block;font-size: 21px;font-weight: 700;color:#ffcd56">{{containerthree}}</div> 辆</span>
      </div>
    </div>
    <div id="containers" v-show="wei"></div>
    <div id="LifeCircle" v-show="Circle">
      <footer>
        <div class="timeAxis">
          <span v-for="entime in showtime" @click="timeto(entime)" :class="usertime === entime.time ? 'actives' : ''">{{entime.time}}</span>
        </div>
      </footer>

    </div>
    <!--<bigdata></bigdata>-->
    <!--城市菜单-->
    <div class="leftCity" v-show="cityip">
      <div class="top_leftCity">
        <div
          style="font-size: 18px;color:#fff;float: left;line-height: 20px;margin-right: 10px;margin-left: 10px;width: 75px;text-align: center;">
          {{city}}
        </div>
        <el-switch
          v-model="value1"
          active-color="#319AC8"
          inactive-color="#2B5162">
        </el-switch>
      </div>
      <div class="bottom_leftCity" ref="Citys">
        <div class="abcd">
          <span v-for="abc in this.ABCDE" @click="activeAbc = abc.name"
                :style="{color: abc.name === activeAbc ? 'red' : '#ffffff',fontSize: abc.name === activeAbc ? '20px' : '19px'}">{{abc.name}}</span>
          <!--<span>A</span><span>B</span><span>C</span><span>D</span><span>E</span><span>F</span><span>G</span><span>H </span><span>I</span><span>J</span><span>K</span><span>L</span><span>M</span><span>N</span><span>O</span><span>P</span><span>Q</span><span>R</span><span>S</span><span>T</span><span>U</span><span>V</span><span>W</span><span>X</span><span>X</span><span>Y</span><span>Z</span>-->
        </div>
        <ul>
          <!--<li v-for="citt in this.cityli" @click="clickcit(citt)" v-show="!activeAbc || (activeAbc && activeAbc.toLowerCase() === citt.pinyin.substr(0, 1))">{{citt.name}}</li>-->
          <li v-for="citt in this.cityli" @click="clickcit(citt)"
              :style="{color: activeAbc.toLowerCase() === citt.pinyin.substr(0, 1) ? 'red' : '#ffffff',fontSize:  activeAbc.toLowerCase() === citt.pinyin.substr(0, 1) ? '16px' : '14px'}">
            {{citt.name}}
          </li>
        </ul>
      </div>
    </div>
    <!--左侧菜单栏-->
    <div id="leftBar" ref="leftBars">
      <div v-for="(sdsdf,index) in ssd" class="al" @click="toLink(sdsdf.nnn,index)"
           :class="isSelect === sdsdf.nnn ? 'active' : ''">{{sdsdf.nnn}}
      </div>
      <div class="bar" ref="Bars" @click="clickleftbar" :class="this.itos === 1 ? 'baros':'barts' "></div>
    </div>
    <!--右侧菜单栏-->
    <div id="rightBar" ref="rightBars">
      <!--当前拥堵-->
      <div style="width: 90%;height: 90%;margin: 5% auto" v-show="showrealtime">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!--当前拥堵段排名-->
          <el-tab-pane label="当前拥堵段排名" name="first">
            <el-table :data="monit" border fit highlight-current-row height="108%"
                      style="width: 100%;background: none;color:#fff"
                      :header-cell-style="{background:'#4d80c5', color:'#fff',opacity:1}"
                      @row-click="clickrightBar">
              <el-table-column align="center" label="排名"
                               type="index"
                               width="70">
              </el-table-column>
              <el-table-column align="center" label="道路名称" width="210">
                <template slot-scope="scope">
                  <div style="height: 13px;font-size: 11px;color:#00AAFF;margin-bottom: 3px;margin-top: -3px;">
                    {{scope.row.cityName}}
                  </div>
                  <div style="height: 16px;font-size: 11px;margin-top: 5px;">{{scope.row.dir}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="高峰拥堵">
                <template slot-scope="scope">
                  <span class="spannn"></span>
                  <span>{{scope.row.idx}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="高峰车速">
                <template slot-scope="scope">
                  <span>{{scope.row.speed}}</span>
                </template>
              </el-table-column>
            </el-table>

          </el-tab-pane>
          <!--区域拥堵排名-->
          <el-tab-pane label="区域拥堵排名" name="second">
            <el-table :data="add" border fit highlight-current-row height="108%"
                      style="width: 100%;background: none;color:#fff"
                      :header-cell-style="{background:'#4d80c5', color:'#fff'}"
                      @row-click="region">
              <el-table-column align="center" label="排名"
                               type="index"
                               width="70">
              </el-table-column>
              <el-table-column align="center" label="区域" width="210">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="拥堵指数">
                <template slot-scope="scope">
                  <span>{{scope.row.index}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="旅行速度">
                <template slot-scope="scope">
                  <span>{{scope.row.speed}}</span>
                </template>
              </el-table-column>
            </el-table>

          </el-tab-pane>
          <!--商圈拥堵排名-->
          <el-tab-pane label="商圈拥堵排名" name="third">
            <el-table :data="int" border fit highlight-current-row height="108%"
                      style="width: 100%;background: none;color:#fff"
                      :header-cell-style="{background:'#4d80c5', color:'#fff'}"
                      @row-click="TradingArea">
              <el-table-column align="center" label="排名"
                               type="index"
                               width="70">
              </el-table-column>
              <el-table-column align="center" label="区域" width="210">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="拥堵指数">
                <template slot-scope="scope">
                  <span>{{scope.row.index}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="旅行速度">
                <template slot-scope="scope">
                  <span>{{scope.row.speed}}</span>
                </template>
              </el-table-column>
            </el-table>

          </el-tab-pane>
        </el-tabs>
      </div>
      <!--交通预测-->
      <div style="width: 100%;height: 100%;" v-show="Forecast">
        <div class="rightBar_top">
          <h3 class="title">未来一周拥堵预测</h3>
          <div class="rightBar_tops">
            <span><span style="color:#3BBFF9">真实值</span><span style="color:#E46C0A">预测值</span></span>
            <div class="weather">
              <!-- this.temperature = dayWindPower.temperature; //-2wendu
               this.humidity = dayWindPower.humidity;   //"10"sjhidu
               this.weathers = dayWindPower.weather;    //"晴"
               this.windPower = dayWindPower.windPower;    //"≤3"
               this.windDirection = dayWindPower.windDirection //北-->
              <span>{{citycity}}</span>&nbsp;&nbsp;天气： <span>{{temperature}}℃</span>&nbsp;&nbsp;
              <span>{{ weathers}}</span>&nbsp;&nbsp;<span>{{windDirection}}风&nbsp;{{windPower}}</span>&nbsp;&nbsp;
              湿度：<span>{{humidity}}</span>
            </div>
          </div>
          <div class="data-highcharts-chart" ref="highcharts"></div>
        </div>
        <div class="rightBar_bottom">
          <h3 class="title">需进行交通管控路段</h3>
          <div class="data-rightBar_bottom-chart">
            <el-table :data="yuyu" border fit highlight-current-row height="108%"
                      style="width: 100%;background: none;color:#fff"
                      :header-cell-style="{background:'#4d80c5', color:'#fff'}"
                      @row-click="clickrightBar">
              <el-table-column align="center" label="排名"
                               type="index"
                               width="70">
              </el-table-column>
              <el-table-column align="center" label="道路名称" width="210">
                <template slot-scope="scope">
                  <div style="height: 13px;font-size: 11px;color:#00AAFF;margin-bottom: 3px;margin-top: -3px;">
                    {{scope.row.cityName}}
                  </div>
                  <div style="height: 16px;font-size: 11px;margin-top: 5px;">{{scope.row.dir}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="高峰拥堵">
                <template slot-scope="scope">
                  <span class="spannn"></span>
                  <span>{{scope.row.idx}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="高峰车速">
                <template slot-scope="scope">
                  <span>{{scope.row.speed}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!--路线分析-->
      <div style="width: 100%;height: 100%;" v-show="RouteAnalysis">
        <div class="destination">
          <div>
            <el-radio v-model="radio" label="1">出发地</el-radio>
            <el-radio v-model="radio" label="2">目的地</el-radio>
          </div>
        </div>
        <div class="dests">
          <el-select v-model="value2" placeholder="国贸">
            <el-option
              v-for="item in this.guomao"
              :key='item.name'
              :label='item.name'
              :value='item.name'>
            </el-option>
          </el-select>
        </div>
        <div id="colorTip" class="noSelect">
          <ul>
            <li data-time-type="20" style="background: rgb(76, 140, 74);" ref="onn">20分钟</li>
            <li data-time-type="20" style="background: rgb(166, 193, 81);" ref="tww">30分钟</li>
            <li data-time-type="20" style="background: rgb(254, 250, 81);" ref="thh">45分钟</li>
            <li data-time-type="20" style="background: rgb(255, 185, 81);" ref="foo">60分钟</li>
            <li data-time-type="20" style="background: rgb(250, 101, 77);" ref="fii">90分钟</li>
          </ul>
        </div>
      </div>
      <!--安全分析-->
      <div style="width: 95%;height: 95%;margin: 1% auto" v-show="safety">
        <div style="width: 59%;height: 30px;position: absolute;left: 18px;top: 6%;}" v-show="sgd">
          <el-row>
            <el-button type="primary" plain size="mini" @click="zhuxian">主线</el-button>
            <el-button type="primary" plain size="mini" @click="qiaoliang">桥梁</el-button>
            <el-button type="primary" plain size="mini" @click="shoufeizhan">收费站</el-button>
            <el-button type="primary" plain size="mini" @click="churukou">JCT+引路+出入口</el-button>
          </el-row>
        </div>
        <el-tabs v-model="Names" @tab-click="security">
          <!--驾驶风险路段-->
          <el-tab-pane label="驾驶风险路段" name="first" id="luduan">
            <el-scrollbar style="height: 100%;" class="leftscro" ref="leftscro">
              <el-table :data="Drivingrisk" border fit highlight-current-row height="100%"
                        style="width: 100%;background: none;color:#fff;font-size: 13px"
                        :header-cell-style="{background:'#4d80c5', color:'#fff',opacity:1,fontWeight:'none'}">

                <el-table-column label="排名"
                                 type="index">
                </el-table-column>
                <!--  <el-table-column align="center" label="城市" width="75">
                    <template slot-scope="scope">
                      <span>呼和浩特</span>
                    </template>
                  </el-table-column>-->
                <el-table-column align="center" label="高速名称" width="132">
                  <template slot-scope="scope">
                    <span>{{scope.row.linkNameChn}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="位置描述" width="168">
                  <template slot-scope="scope">
                    <span>{{scope.row.addressDesc}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="驾驶风险值" width="105">
                  <template slot-scope="scope">
                    <span>{{scope.row.ndbkvIndex | numFilter}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="急刹指数" width="72">
                  <template slot-scope="scope">
                    <span>{{scope.row.brakeIndex | numFilter}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="急转指数" width="72">
                  <template slot-scope="scope">
                    <span>{{scope.row.turnIndex | numFilter}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="急加指数" width="76">
                  <template slot-scope="scope">
                    <span>{{scope.row.accelerationIndex | numFilter}}</span>
                  </template>
                </el-table-column>

              </el-table>
            </el-scrollbar>
          </el-tab-pane>
          <!--超速路段-->
          <el-tab-pane label="超速路段" name="second">
            <el-table :data="Overspeed" border fit highlight-current-row height="108%"
                      style="width: 100%;background: none;color:#fff"
                      :header-cell-style="{background:'#4d80c5', color:'#fff'}">
              <el-table-column align="center" label="排名"
                               type="index" width="50">
              </el-table-column>
              <!-- <el-table-column align="center" label="城市" width="80">
                 <template slot-scope="scope">
                   <span>呼和浩特</span>
                 </template>
               </el-table-column>-->
              <el-table-column align="center" label="高速名称" width="160">
                <template slot-scope="scope">
                  <span>{{scope.row.linkNameChn}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="位置描述" width="170">
                <template slot-scope="scope">
                  <span>{{scope.row.addressDesc}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="概率" width="74">
                <template slot-scope="scope">
                  <span>{{scope.row.speedingPercent | numFilter}} %</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="20%" width="74">
                <template slot-scope="scope">
                  <span>{{scope.row.speedingLessTwentyPercent | numFilter}} %</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="20-50" width="72">
                <template slot-scope="scope">
                  <span>{{scope.row.speedingTwentyFiftyPercent | numFilter}} %</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="50%" width="72">
                <template slot-scope="scope">
                  <span>{{scope.row.linkType | numFilter}} %</span>
                </template>
              </el-table-column>

            </el-table>

          </el-tab-pane>
          <!--运行状态突变常发路段-->
          <el-tab-pane label="运行状态突变常发路段" name="third">
            <el-table :data="runningState" border fit highlight-current-row height="108%"
                      style="width: 100%;background: none;color:#fff"
                      :header-cell-style="{background:'#4d80c5', color:'#fff'}">
              <el-table-column label="排名"
                               type="index">
              </el-table-column>
              <!--<el-table-column align="center" label="城市">
                <template slot-scope="scope">
                  <span>&lt;!&ndash;{{scope.row.name}}&ndash;&gt;呼和浩特</span>
                </template>
              </el-table-column>-->
              <el-table-column align="center" label="高速名称" width="150">
                <template slot-scope="scope">
                  <span>{{scope.row.linkNameChn}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="位置描述" width="160">
                <template slot-scope="scope">
                  <span>{{scope.row.addressDesc}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="速度差">
                <template slot-scope="scope">
                  <span>{{scope.row.avgSpd}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="速度差指数">
                <template slot-scope="scope">
                  <span>{{scope.row.totSpIndex}}</span>
                </template>
              </el-table-column>
            </el-table>

          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="bar" ref="Bars" @click="clickbar" :class="this.ito === 1 ? 'baro':'bart' "></div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import {formatDate} from '@/common/js/date.js';
  import img1 from '../icon/ditie.png';
  import img2 from '../icon/icon.png';
  import bigdata from '@/common/bigdata';

  export default {
    name: '',
    data() {
      return {
        radio: '1',
        activeAbc: '',
        map: '', //地图
        object3Dlayer: '',
        guomao: [],
        isLeft: true,
        isright: true,
        Circle: false, //生活圈
        opct: '',   //生活圈地图载体
        ito: '',
        itos: '',
        starttime: '',
        endtime: '',
        value: '',
        value2: '',
        limit: '',
        page: '',
        yuyu: [],
        monit: [],
        cityip: true,
        lon: '116.470323',
        lat: '39.992598',
        lons: [],
        lats: [],
        Conge: [],
        prediction: [],
        times: [],
        add: [],
        int: [],
        marker: '',
        value1: false,
        city: '北京',
        cityli: [],
        getCityRoadTop: '110000', //城市代码
        timer1: '', //定时器
        humidity: '',  //湿度
        windDirection: '', //风力
        windPower: '',  //风级
        weathers: '',  //天气
        temperature: '', // 温度
        citycity: '',  //城市
        yyy: '',
        www: '',
        lll: '',
        ccc: '',
        Forecast: false, // 交通预测开关
        showrealtime: true, // 实时交通
        RouteAnalysis: false,
        safety: false, //安全分析
        activeName: 'first',
        Names: 'first',
        /* district:null,*/
        polygons: [],
        poly: [],
        sj: 'district',
        Cityalphabet: [],
        timeIndexs: '14',
        sqlon: '',
        isSelect: '实时监测',
        usertime: '14:00',
        sqlat: '',
        // guomao1:[],
        ssd: [{
          nnn: '实时监测'
        },
          {
            nnn: '交通预测'
          },
          {
            nnn: '路线分析'
          },
          {
            nnn: '安全分析'
          },
        ],
        ABCDE: [{
          name: 'A'
        },
          {
            name: 'B'
          },
          {
            name: 'C'
          },
          {
            name: 'D'
          },
          {
            name: 'E'
          },
          {
            name: 'F'
          },
          {
            name: 'G'
          },
          {
            name: 'H'
          },
          {
            name: 'T'
          },
          {
            name: 'J'
          },
          {
            name: 'K'
          },
          {
            name: 'L'
          },
          {
            name: 'M'
          },
          {
            name: 'N'
          },
          {
            name: 'O'
          },
          {
            name: 'P'
          },
          {
            name: 'Q'
          },
          {
            name: 'R'
          },
          {
            name: 'S'
          },
          {
            name: 'T'
          },
          {
            name: 'U'
          },
          {
            name: 'V'
          },
          {
            name: 'W'
          },
          {
            name: 'X'
          },
          {
            name: 'Y'
          },
          {
            name: 'Z'
          },
        ],
        coordinates: [],
        twei: true,
        wei: false,
        mapv: '',
        Drivingrisk: [],   //驾驶风险
        Overspeed: [], //超速路段
        runningState: [], //运行状态
        sgd: true,
        aktype: 2,
        bigd: [],
        layer: '',
        guomaos: [],
        polygon: [],
        Storage: [],
        color: '#86fc61',
        colors: '#86fc61',
        app: [],
        containerone: '连接中...',
        containertwo: '连接中...',
        containerthree: '连接中...',
        Summary: true,
        contone: '70000',
        conttwo: '300',
        radios: 0,
        zindex: 6,
        timest: '',
        opp: 'B000A8WS9T',
        Throughout: '始',   //始终
        address: '国贸',   // 地址
        Minute: '20',  // 分钟
        bjlan: 116.459,
        bjlng: 39.9099,
        cityCodes: 110000,    //北京
        showtime: [{
          time: '06:00',
          name: '6'
        }, {
          time: '07:00',
          name: '7'
        }, {
          time: '08:00',
          name: '8'
        }, {
          time: '09:00',
          name: '0'
        }, {
          time: '10:00',
          name: '10'
        }, {
          time: '11:00',
          name: '11'
        }, {
          time: '12:00',
          name: '12'
        }, {
          time: '13:00',
          name: '13'
        }, {
          time: '14:00',
          name: '14'
        }, {
          time: '15:00',
          name: '15'
        }, {
          time: '16:00',
          name: '16'
        }, {
          time: '17:00',
          name: '17'
        }, {
          time: '18:00',
          name: '18'
        }, {
          time: '19:00',
          name: '19'
        }, {
          time: '20:00',
          name: '20'
        }, {
          time: '21:00',
          name: '21'
        }, {
          time: '22:00',
          name: '22'
        }]
      }
    },
    methods: {
      // 点击左侧列表
      toLink(data, index) {
        this.isSelect = data;
        console.log(data);
        if (index === 0) {
          this.cityip = true;
          this.realtime();
          this.Summary = true;
        } else if (index === 1) {
          this.cityip = true;
          this.clickForecast();
          this.Summary = false;
        } else if (index === 2) {
          if(this.RouteAnalysis){
            return false;
          }
          this.cityip = false;
          /* this.$message({
             showClose: true,
             message: '开发中，敬请期待',
             type: 'success'
           });*/

          this.Route();
        } else if (index === 3) {
          this.cityip = false;
          this.safetyAnalysis();

        }
        /*<div class="al" @click="realtime">实时监测</div>
          <div class="al" @click="clickForecast">交通预测</div>
          <div class="al">路线查询</div>
          &lt;!&ndash;      <div class="al">路况分析</div>&ndash;&gt;
          <div class="al" @click="safetyAnalysis">安全分析</div>*/
      },
      timeto(data) {
        let _this = this;
        _this.Minute = 20;
        this.empty();
        this.timeIndexs = data.name;
        this.usertime = data.time;
        // this.Lifecircle();
        this.biaoqian();
      },
      // 引入地图
      maps() {
        let _this = this;
        this.map = new AMap.Map('container', {
          pitch: 70,
          viewMode: '3D',
          resizeEnable: true,
          buildingAnimation: false,
          showIndoorMap: false,
          mapStyle: 'amap://styles/f3a095258b6162eb6522214f3252fe04'
        });
        this.map.setZoomAndCenter(19, [this.lon, this.lat]);

        /*   let map = new AMap.Map('container', {
            resizeEnable: true,
            zoom:4,
            center: [116.397428, 39.90923],
            mapStyle:'amap://styles/a92c23c68ca519ec235825c3be99462b'
            //前往创建自定义地图样式：https://lbs.amap.com/dev/mapstyle/index
          });*/
        let trafficLayer = new AMap.TileLayer.Traffic({
          zIndex: 10
        });

        trafficLayer.setMap(this.map);
        trafficLayer.show();
      },
      //引入大数据地图
      bigdatamaps() {
        let _this = this;
        _this.mapv = Loca.create('containers', {
          // mapStyle: 'amap://styles/grey',
          mapStyle: 'amap://styles/f3a095258b6162eb6522214f3252fe04',
          zoom: 4,
          center: [126.4976, 32.1697],
          features: ['bg', 'road'],
          pitch: 50,
          // Loca 自 1.2.0 起 viewMode 模式默认为 3D，如需 2D 模式，请显示配置。
          // viewMode: '3D',d
        });

        _this.mapv.on('mapload', function () {
          _this.mapv.getMap().plugin(['AMap.ControlBar'], function () {
            let controlBar = new AMap.ControlBar();
            _this.mapv.getMap().addControl(controlBar);
          });
        });

        this.layer = Loca.visualLayer({
          container: _this.mapv,
          type: 'point',
          shape: 'circle'
        });

        /*  layer.setData(citys, {
            lnglat: 'lnglat'
          });*/
        this.tongyong();
      },
      // 生活圈地图引入
      Life() {

        /*   let map = new AMap.Map('container', {
            resizeEnable: true,
            zoom:4,
            center: [116.397428, 39.90923],
            mapStyle:'amap://styles/a92c23c68ca519ec235825c3be99462b'
            //前往创建自定义地图样式：https://lbs.amap.com/dev/mapstyle/index
          });*/
        /* let trafficLayer = new AMap.TileLayer.Traffic({
           zIndex: 10
         });

         trafficLayer.setMap(this.map);
         trafficLayer.show();*/
      },
      // 大数据地图数据变化
      tongyong() {
        let _this = this;
        this.layer.setData(_this.bigd, {
          lnglat: 'lnglat'
        });
        this.layer.setOptions({
          style: {
            // 支持动态回调，为每一个点设置半径
            radius: function (obj) {
              // 城市类型，0：省会直辖市，1：地级市，2：区县
              var style = obj.value.style;
              var r;
              if (style == 0) {
                r = 10;
              } else if (style == 1) {
                r = 5;
              } else {
                r = 3.5;
              }

              return r;
            },
            color: '#47aff7',
            borderColor: '#c3faff',
            borderWidth: 1,
            opacity: 0.8
          }
        });

        this.layer.render();
      },
      // 折叠表格
      clickbar() {
        if (this.isLeft) {
          this.$refs.rightBars.style.transform = 'translateX(100%)';
          /*  this.$refs.Bars.style.background = ' url(../icon/buttons.png) no-repeat -47px center #002775';*/
          this.isLeft = false;
          this.ito = 1;
        } else {
          this.$refs.rightBars.style.transform = 'translateX(0%)';
          this.isLeft = true;
          this.ito = 0;
        }
      },
      clickleftbar() {
        if (this.isright) {
          this.$refs.leftBars.style.transform = 'translateX(-100%)';
          /*  this.$refs.Bars.style.background = ' url(../icon/buttons.png) no-repeat -47px center #002775';*/
          this.isright = false;
          this.itos = 1;
        } else {
          this.$refs.leftBars.style.transform = 'translateX(0%)';
          this.isright = true;
          this.itos = 0;
        }
      },
      // 加入预测折线图
      lefttwo() {
        let brr = echarts.init(this.$refs.highcharts);
        let option = {
          grid: {
            top: '19%',
            left: '3%',
            right: '11%',
            bottom: '8%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b} <br/>{a} : {c}'
          },
          legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['真实值', '预测值'],
            right: '4%',
            textStyle: {
              fontSize: 12,
              color: '#6a9cd5'
            }
          },

          xAxis: [{
            name: '日期',
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
            // data: ['1/8', '1/9', '1/10', '1/11', '1/12', '1/13', '1/14', '1/15', '1/16', '1/17', '1/18', '1/19', '1/20', '1/21',],
            data: this.times,
          }],
          yAxis: [{
            type: 'value',
            name: '指数',
            scale: true,
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
          series: [
            {
              name: '高峰拥堵延时指数',
              type: 'line',
              stack: '2',
              lineStyle: {
                normal: {
                  width: 3
                }
              }, itemStyle: {
                normal: {

                  color: '#E46C0A',
                  borderColor: '#E46C0A',
                  borderWidth: 4
                }
              },

              // data: [1.4, 1.2, 1.5, 1.3, 1.9, 1.7, 1.1, 1.9, 1.8, 1.2, 1.7, 1.1, 2.0, 1.7]
              data: this.prediction
            },
            {
              name: '高峰拥堵延时指数',
              type: 'line',
              stack: '1',
              lineStyle: {
                normal: {
                  width: 3
                }
              },
              itemStyle: {
                normal: {

                  color: '#3BBFF9',
                  borderColor: '#3BBFF9',
                  borderWidth: 4
                }
              },
              // data: [1.4, 1.2, 1.5, 1.3, 1.9, 1.7, 1.1]
              data: this.Conge
            },
          ]
        };
        brr.setOption(option);
        var currentIndex = -1;

        this.timer1 = window.setInterval(function () {
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
        /*  setInterval(function () {

          }, 1000);*/

      },
      // 堵车预测列表接口
      auto() {
        this.$http.get('/url/trafficServer/getCityRoadTop', {
          adcode: this.getCityRoadTop,
          date: '2019-01-17'
        })
          .then(res => {
            let _this = this;
            if (res.status === 200 || res.status === '200') {
              this.yuyu = res.data.rows;
              // console.log(this.yuyu, 'this.yuyuyuyuyu')
              let add = res.data.rows
              /*add.forEach(function (app) {

              });*/
              for (let i = 0; i < add.length; i++) {
                let cdd = add[i].lnglats;
                for (let y = 0; y < cdd.length; y++) {
                  _this.yyy = cdd[3].lat;
                  _this.www = cdd[3].lon;
                }
              }
              _this.map.setZoomAndCenter(18, [_this.www, _this.yyy]);
              // 天气
              this.weather();
            } else {
              alert('接口错误')
            }
          });
      },
      monitoring() {
        this.$http.get('/url/trafficServer/getCityRoadTop', {
          adcode: this.getCityRoadTop,
          date: '2019-01-16'
        })
          .then(res => {
            let _this = this;
            if (res.status === 200 || res.status === '200') {
              this.monit = res.data.rows;
              // console.log(this.yuyu, 'this.yuyuyuyuyu')
              let add = res.data.rows
              for (let i = 0; i < add.length; i++) {
                let cdd = add[i].lnglats;
                for (let y = 0; y < cdd.length; y++) {
                  _this.lll = cdd[7].lat;
                  _this.ccc = cdd[7].lon;
                }
              }
              _this.map.setZoomAndCenter(18, [_this.ccc, _this.lll]);
            } else {
              alert('接口错误')
            }
          });
      },
      // 天气
      weather() {
        let _this = this;
        AMap.plugin('AMap.Weather', function () {
          //创建天气查询实例
          let weather = new AMap.Weather();

          //执行实时天气信息查询
          weather.getLive(_this.city, function (err, dayWindPower) {
            /*  humidity:'',  //湿度
                windDirection:'', //风力
                windPower:'',  //风级
                weathers:'',  //天气
                temperature:'' // 温度*/
            console.log(dayWindPower);
            _this.temperature = dayWindPower.temperature; //-2wendu
            _this.humidity = dayWindPower.humidity;   //"10"sjhidu
            _this.weathers = dayWindPower.weather;    //"晴"
            _this.windPower = dayWindPower.windPower;    //"≤3"
            _this.windDirection = dayWindPower.windDirection //北
            _this.citycity = dayWindPower.city;
          });
        });
      },
      // 交通预测折线图
      Congestion() {
        this.$http.get('/url/trafficServer/getCityPredict', {
          adcode: this.getCityRoadTop,
          date: '2019-01-15'
        })
          .then(res => {
            let _this = this;
            if (res.status === 200 || res.status === '200') {
              let add = res.data.rows.idx;
              add.forEach(function (ad) {
                _this.prediction.push(ad.idx);
                _this.times.push(ad.dt);
                if (ad.timespan != 0) {
                  _this.Conge.push(ad.idx);
                }
              });
              this.cityAll();
              this.lefttwo();
            } else {
              alert('接口错误')
            }
          });

      },
      forMatterDate(datetime) {
        return formatDate(new Date(datetime), 'yyyy-MM-dd hh:mm:ss');
      },
      // 点击列表
      clickrightBar(data) {
        this.moveMarker();
        let _this = this;
        let da = data.lnglats;
        da.forEach(function (das) {
          _this.lons = das.lon;
          _this.lats = das.lat;
        });
        this.map.setZoomAndCenter(18, [this.lons, this.lats]);
        this.marks(this.lons, this.lats);
      },
      //图标
      marks(lon, lat) {
        this.marker = new AMap.Marker({
          position: new AMap.LngLat(lon, lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          // icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          icon: new AMap.Icon({
            image: img2,
            size: new AMap.Size(30, 61),  //图标大小
            // imageSize: new AMap.Size(30, 41),
          }),
          // offset: new AMap.Pixel(-13, -30),
          offset: new AMap.Pixel(0, 0),
          // 设置是否可拖拽
          draggable: true,
          cursor: 'move'
        });
        this.marker.setMap(this.map);
        this.marker.setAnimation('AMAP_ANIMATION_BOUNCE');
      },
      moveMarker() {
        if (this.marker) {
          this.marker.setMap(null);
          this.marker = null;
        }
      },
      // 城市接口
      cityAll() {
        this.$http.get('/url/trafficServer/getCityInfo', {})
          .then(res => {
            let _this = this;
            if (res.status === 200 || res.status === '200') {
              this.cityli = res.data.rows;
              let add = res.data.rows;
              add.forEach(function (dis) {
                _this.Cityalphabet = dis.code;  // 城市编码转城市名字

              });
              // _this.aaa();
              for (let i = 0; i < _this.cityli.length; i++) {
                _this.okk = _this.cityli[i].name
              }
            } else {
              alert('接口错误')
            }
          });
      },
      //点击城市
      clickcit(data) {
        let _this = this;
        this.clear();
        this.city = data.name;
        this.getCityRoadTop = data.code;
        this.auto();
        this.monitoring();
        this.RegionalRanking();
        this.Ranking();
        this.activeName = 'first';
        this.aaa();
        if(this.Forecast){
          _this.Congestion();
        }
        /*var rand = Math.floor(Math.random () * 900) + 100;
        var rands = Math.floor(Math.random () * 100000) + 10000;
        console.log(rand,'rand')
        console.log(rands,'rands')*/

        setTimeout(function () {
          //
          _this.$refs.Citys.style.transform = 'translateX(-100%)';
          _this.value1 = false;
        }, 100)

      },
      aaa() {
        let _this = this;
        _this.contone = Math.floor(Math.random() * 100000) + 10000;
        _this.conttwo = Math.floor(Math.random() * 900) + 100;
        _this.yyy = Math.floor(Math.random() * 70) + 10;
        _this.zzz = Math.floor(Math.random() * 30) + 15;

        _this.ccc = Math.floor(Math.random() * 100000) + 10000;
        _this.bbb = Math.floor(Math.random() * 1000) + 100;
        console.log(_this.ccc)
        console.log(_this.bbb)
        /*    if (data == '北京') {
              _this.contone = 70000;
              _this.conttwo = 300;
            }
      console.log(_this.okk)*/

      },
      clear() {
        let _this = this;
        this.prediction = [];
        this.Conge = [];
        this.times = [];
        window.clearTimeout(_this.timer1);
      },
      // 区域排行
      RegionalRanking() {
        this.$http.get('/url/trafficServer/districtRank', {
          cityCode: this.getCityRoadTop,
          linksType: 1
        })
          .then(res => {
            let _this = this;
            if (res.status === 200 || res.status === '200') {
              this.add = res.data.rows;
            } else {
              alert('接口错误')
            }
          });
      },
      //实时监控
      realtime() {
        this.Forecast = false;
        this.showrealtime = true;
        this.twei = true;
        this.wei = false;
        this.monitoring();
        this.safety = false;
        this.$refs.rightBars.style.width = "500px";
        this.sgd = false;
        this.RouteAnalysis = false;
        this.Circle = false;
      },
      //点击切换
      handleClick(tab, event) {
        // console.log(tab._uid,'tab, eventtab, event');
        let _this = this;
        let auu = tab.index;
        if (auu == 1) {     //2
          _this.moveMarker();
          _this.map.setZoomAndCenter(13, [_this.ccc, _this.lll]);
        } else if (auu == 2) {   //3
          _this.moveMarker();
          _this.map.setZoomAndCenter(18, [_this.ccc, _this.lll]);
          _this.map.remove(_this.polygons)//清除上次结果
        } else if (auu == 0) {   //1
          _this.map.remove(_this.polygons)//清除上次结果
          _this.map.setZoomAndCenter(18, [_this.ccc, _this.lll]);
        }
      },
      // 安全交通点击变化
      security(tab, event, index) {
        // console.log(tab._uid);2 = 74 3 = 88 1 = 57
        let syz = tab.index;
        console.log(tab.index)
        if (syz == 0) {
          this.sgd = true;
        } else if (syz == 1) {
          this.sgd = false;
        } else if (syz == 2) {
          this.sgd = false;
        }
      },
      //交通预测
      clickForecast() {
        let _this = this;
        this.clear();
        this.Forecast = true;
        this.showrealtime = false;
        this.RouteAnalysis = false;
        this.auto();
        this.twei = true;
        this.wei = false;
        this.$refs.rightBars.style.width = "500px";
        this.sgd = false;
        this.Circle = false;
        setTimeout(function () {
          _this.Congestion();
        },100)
      },
      // 路线分析
      Route() {
        this.Forecast = false;
        this.showrealtime = false;
        this.RouteAnalysis = true;
        this.safety = -false;
        this.$refs.rightBars.style.width = "400px";
        this.Circle = true;
        this.twei = false;
        this.wei = false;
        this.Lifecircle();
      },
      //商圈排行接口
      Ranking() {
        this.$http.get('/url/trafficServer/districtRank', {
          cityCode: this.getCityRoadTop,
          linksType: 3
        })
          .then(res => {
            let _this = this;
            if (res.status === 200 || res.status === '200') {
              this.int = res.data.rows;
              let ha = res.data.rows;
              /*for(let i = 0 ; i < ha.length; i++){
                // console.log(ha[i].coords,'1');
                let haa = ha[i].coords;
                for(let y = 0 ; y <haa.length; y++){
                  // console.log(haa[y][0],'2');
                  let ll = haa[y][0];
                  for(let x = 0 ; x < ll.length; x++){
                    // console.log(ll[3],'3');
                  }
                }
              }*/
            } else {
              alert('接口错误')
            }
          });
      },
      // 点击商圈列表
      TradingArea(data) {
        this.moveMarker();
        let _this = this;
        let hh = data.coords;
        for (let i = 0; i < hh.length; i++) {
          let yy = hh[0];
          for (let y = 0; y < yy.length; y++) {
            let jj = yy[0];
            for (let t = 0; t < jj.length; t++) {
              _this.sqlat = jj[3].lat;
              _this.sqlon = jj[3].lon;
            }
          }
        }
        console.log(_this.sqlat);
        console.log(_this.sqlon);
        this.map.setZoomAndCenter(18, [this.sqlon, this.sqlat]);
        this.marks(this.sqlon, this.sqlat);
      },
      //区域列表
      region(data) {
        this.moveMarker();
        let _this = this;
        let district = null;
        console.log(data.name, 'datadata')
        if (!district) {
          //实例化DistrictSearch
          let opts = {
            subdistrict: 0,   //获取边界不需要返回下级行政区
            extensions: 'all',  //返回行政区边界坐标组等具体信息
            level: 'district'  //查询行政级别为 市
          };
          district = new AMap.DistrictSearch(opts);
        }
        //行政区查询
        district.setLevel('district');
        district.search(data.name, function (status, result) {
          _this.map.remove(_this.polygons)//清除上次结果
          _this.polygons = [];
          let bounds = result.districtList[0].boundaries;
          if (bounds) {
            for (let i = 0, l = bounds.length; i < l; i++) {
              //生成行政区划polygon
              let polygon = new AMap.Polygon({
                strokeWeight: 1,
                path: bounds[i],
                fillOpacity: 0.4,
                fillColor: '#80d8ff',
                strokeColor: '#0091ea'
              });
              _this.polygons.push(polygon);
            }
          }
          _this.map.add(_this.polygons);
          _this.map.setFitView(_this.polygons);//视口自适应
        });
      },
      // 地铁信息接口
      trafficServer() {
        this.$http.get('/url/trafficServer/subway', {}).then(res => {
          let _this = this;
          if (res.status === 200 || res.status === '200') {
            let sss = res.data.rows.features;
            for (let i = 0; i < sss.length; i++) {
              let zzz = sss[i].geometry;
              _this.coordinates.push(zzz.coordinates);

            }
            this.traff();
          } else {
            alert('接口错误')
          }
        });
      },
      //地铁放入地图(坐标转换)
      traff() {
        let _this = this;
        // let path = [[116.501972, 39.914826], [116.522297, 39.914917], [116.538, 39.915798], [116.561375, 39.915197],[116.583332, 39.915885], [116.605782, 39.914907], [116.625141, 39.912218], [116.64361, 39.910064], [116.653044, 39.89966]];
        let path = _this.coordinates;
        AMap.convertFrom(path, 'baidu', function (status, result) {
          if (result.info === 'ok') {
            let lnglats = result.locations; // Array.<LngLat>
            for (let i = 0, marker; i < path.length; i++) {
              marker = new AMap.Marker({
                map: _this.map,
                position: lnglats[i],
                // icon: '../icon/ditie.png',
                icon: new AMap.Icon({
                  // size: new AMap.Size(20, 20),  //图标大小
                  imageSize: [20, 23],
                  image: img1,
                  // image: "../icon/ditie.png",
                  // imageOffset: new AMap.Pixel(-330, -130)
                }),
                offset: new AMap.Pixel(20, 0)
              });

            }
            // _this.marker.setMap(_this.map);
          }
        });
      },
      //生活圈
      Lifecircle() {
        let _this = this;
        this.$http.get('/url/trafficServer/circle', {
          // districtId: 'B000A8WS9T',
          districtId: this.opp,
          dir: this.radios,
          timeIndex: this.timeIndexs
        }).then(res => {
          let _this = this;
          if (res.status === 200 || res.status === '200') {
            let sss = res.data.rows;
            _this.arr = 0;
            _this.guomaos = sss[_this.arr];
            this.timest = setInterval(function () {
              _this.arr++;
              _this.zindex--;
              if (_this.arr == 5) {
                _this.arr = 0;
                _this.Minute = 20;
                _this.zindex = 6;
                _this.color = '#679B4C';
                _this.colors = '#679B4C';
                _this.$refs.onn.style.height = '14px';
                _this.$refs.foo.style.height = '10px';
                _this.$refs.thh.style.height = '10px';
                _this.$refs.tww.style.height = '10px';
                _this.$refs.fii.style.height = '10px';
              }
              else if (_this.arr == 3) {
                _this.color = '#7C9F59';
                _this.colors = '#7C9F59';
                _this.Minute = 60;
                _this.$refs.foo.style.height = '14px';
                _this.$refs.thh.style.height = '10px';
                _this.$refs.tww.style.height = '10px';
                _this.$refs.fii.style.height = '10px';
                _this.$refs.onn.style.height = '10px';
              }
              else if (_this.arr == 2) {
                _this.color = '#BECC5B';
                _this.colors = '#BECC5B';
                _this.Minute = 45;
                _this.$refs.thh.style.height = '14px';
                _this.$refs.tww.style.height = '10px';
                _this.$refs.fii.style.height = '10px';
                _this.$refs.onn.style.height = '10px';
                _this.$refs.foo.style.height = '10px';
              } else if (_this.arr == 1) {
                _this.color = '#BF9656';
                _this.colors = '#BF9656';
                _this.Minute = 30;
                _this.$refs.tww.style.height = '14px';
                _this.$refs.fii.style.height = '10px';
                _this.$refs.onn.style.height = '10px';
                _this.$refs.foo.style.height = '10px';
                _this.$refs.thh.style.height = '10px';
              } else if (_this.arr == 4) {
                _this.color = '#BB5A56';
                _this.colors = '#BB5A56';
                _this.Minute = 90;
                _this.$refs.fii.style.height = '14px';
                _this.$refs.onn.style.height = '10px';
                _this.$refs.foo.style.height = '10px';
                _this.$refs.thh.style.height = '10px';
                _this.$refs.tww.style.height = '10px';
              }
              _this.guomaos = sss[_this.arr];
              _this.life(_this.arr);
              _this.biaoqian();
            }, 2000);
            _this.life(_this.arr);
          } else {
            alert('接口错误')
          }
        });
      },
      lijiek() {
        this.$http.get('/url/trafficServer/districts', {
          cityCode: this.cityCodes
        }).then(res => {
          let _this = this;
          if (res.status === 200 || res.status === '200') {
            let zzz = res.data.rows;
            _this.opzs = res.data.rows;
            zzz.forEach(function (de) {
              // this.SelectionRoute = de.id;
              // this.guomao = de.name;
              // this.selectcenter = de.center
              _this.guomao.push(de);
            });

            this.guomao1 = res.data.rows[1].center;   //进入模块默认为国贸
            console.log(this.guomao, '握手生活区2');
            console.log(zzz, '握手生活区3');
          } else {
            alert('接口错误')
          }
        });
      },
      // 生活圈渲染
      Lifes() {
        let _this = this;
        this.opct = new AMap.Map('LifeCircle', {
          viewMode: '2D',
          mapStyle: 'amap://styles/f3a095258b6162eb6522214f3252fe04'
        });
        this.opct.setZoomAndCenter(10, this.guomao1);
        this.biaoqian();
      },
      biaoqian() {
        let _this = this;
        this.markerContent = '' +
          '<div class="custom-content-marker">' +
          '   <div class="close-btnone">' + this.Throughout + '</div>' +
          '   <div class="close-btntwo">' + this.address + '</div>' +
          '   <div class="close-btnthree">' + this.Minute + "分钟" + '</div>' +
          '<div class="close-sanjiao"></div>' +
          '</div>'
        ;
        let position = new AMap.LngLat(this.bjlan, this.bjlng);
        if (_this.markers) {
          _this.opct.remove(_this.markers);
        }
        _this.markers = new AMap.Marker({
          position: position,
          content: _this.markerContent,
          offset: new AMap.Pixel(10, 20)
        });
        _this.opct.add(_this.markers);
      },
      life() {
        let _this = this;
        if (_this.arr == 0) {
          for (let i = 0; i < _this.polygon.length; i++) {
            _this.opct.remove(_this.polygon[i]);
          }
          _this.polygon = [];
        }
        let path = [this.guomaos];
        _this.polygon.push(new AMap.Polygon({
          path: path,
          strokeColor: _this.color,
          strokeWeight: 6,
          strokeOpacity: 0.2,
          fillOpacity: 0.4,
          fillColor: _this.colors,
          zIndex: _this.zindex,
        }));
        this.app = _this.polygon[_this.arr];
        this.opct.add(_this.app)

        /*   // 缩放地图到合适的视野级别
           this.opct.setFitView([ polygon ])*/
      },
      // 安全分析按钮
      safetyAnalysis() {
        this.twei = false;
        this.wei = true;
        this.Forecast = false;
        this.showrealtime = false;
        this.safety = true;
        this.RouteAnalysis = false;
        this.Circle = false;
        this.sgd = true;
        this.Names = 'first'
        this.safetdata();   //其余的量
        this.Drivin();      //驾驶风险
        this.bigdataDrivin(); //驾驶风险大数据地图
        this.$refs.rightBars.style.width = "710px";
      },
      //驾驶风险路段
      zhuxian() {
        this.aktype = 0;
        this.Drivin();
        this.bigdataDrivin();
      },
      qiaoliang() {
        this.aktype = 1;
        this.Drivin();
        this.bigdataDrivin();
      },
      shoufeizhan() {
        this.aktype = 2;
        this.Drivin();
        this.bigdataDrivin();
      },
      churukou() {
        this.aktype = 3;
        this.Drivin();
        this.bigdataDrivin();
      },
      // 安全分析大数据
      bigdataDrivin() {
        this.$http.get('/url/trafficServer/topPoints', {
          type: this.aktype,
        }).then(res => {
          let _this = this;
          _this.bigd = [];
          if (res.status === 200 || res.status === '200') {
            // this.Drivingrisk = res.data.rows;
            res.data.rows.forEach(function (row) {
              _this.bigd.push({
                lnglat: row,
              });
            });
            console.log(_this.bigd);
            _this.tongyong();
          } else {
            alert('接口错误')
          }
        });
      },
      // 风险路段
      Drivin() {
        this.$http.get('/url/trafficServer/roads', {
          type: this.aktype,
        }).then(res => {
          let _this = this;
          if (res.status === 200 || res.status === '200') {
            this.Drivingrisk = res.data.rows;

          } else {
            alert('接口错误')
          }
        });
      },
      //安全分析接口
      safetdata() {
        //超速路段
        this.$http.get('/url/trafficServer/roads', {
          type: 100,
        }).then(res => {
          let _this = this;
          if (res.status === 200 || res.status === '200') {
            this.Overspeed = res.data.rows;

          } else {
            alert('接口错误')
          }
        });
        //运行状态突变长发路段
        this.$http.get('/url/trafficServer/sdRoads   ', {}).then(res => {
          let _this = this;
          if (res.status === 200 || res.status === '200') {
            this.runningState = res.data.rows;

          } else {
            alert('接口错误')
          }
        });
      },
      // 随机数
      suijishu() {
        let _this = this;
        setInterval(function () {
          // _this.containerone = (Math.random() *1000 + 1000).toFixed(0) + 8;
          _this.containerone = parseInt(Math.random() * _this.conttwo + _this.contone, 10);
          _this.containertwo = parseInt(Math.random() * _this.yyy + _this.zzz, 10);
          _this.containerthree = parseInt(Math.random() * _this.bbb + _this.contone / 20, 10)
        }, 4500);
      },
      empty() {
        debugger
        let _this = this;
        for (let i = 0; i < _this.polygon.length; i++) {
          _this.opct.remove(_this.polygon[i]);
        }
        clearInterval(_this.timest);
        setTimeout(function () {
          _this.Lifecircle();
          _this.color = '#679B4C';
          _this.colors = '#679B4C';
          _this.arr = 0;
          _this.polygon = [];
        }, 100)
      },
      asdsadasd(){
        this.$http.get('/api/getAvgTemperature', {
          cityid: 101010100,
          year:2019
        })
          .then(res => {
            if (res.status === 200 || res.status === '200') {
              console.log(res,'chenggonglemei');
            } else {
              alert('接口错误')
            }
          });
      }
    },
    components: {
      // bigdata,

    },
    created() {
    },
    mounted() {
      this.maps();
      this.monitoring();
      // this.Congestion();   //折线图接口
      this.cityAll();
      this.RegionalRanking();
      this.Ranking();
      this.trafficServer();
      this.bigdatamaps();
      this.asdsadasd();
      this.Life();  //生活圈
      // this.Lifes();
      this.Lifes();
      this.aaa();
      this.suijishu();
      this.lijiek();
    },
    beforeUpdate() {

    },
    watch: {
      /* biaoqian(){
        this.markerContent = '' +
          '<div class="custom-content-marker">' +
          '   <div class="close-btnone">'+this.Throughout+'</div>' +
          '   <div class="close-btntwo">'+this.address+'</div>'+
          '   <div class="close-btnthree">'+this.Minute+"分钟"+'</div>' +
          '</div>'
        ;
      },*/
      value1: function () {
        if (this.value1) {
          this.$refs.Citys.style.transform = 'translateX(0%)';
        } else {
          this.$refs.Citys.style.transform = 'translateX(-100%)';
        }
      },
      radio: function (data) {
        let _this = this;
        _this.Minute = 20;
        console.log(this.radio, 'radioradioradioradio');
        if (data == '1') {
          _this.radios = 0;
          _this.Throughout = '始'
        } else if (data == '2') {
          _this.radios = 1;
          _this.Throughout = '终'
        }
        _this.biaoqian();
        _this.empty();

      },
      value2: function (data) {
        let _this = this;
        _this.Minute = 20;
        this.opzs.forEach(function (dd) {
          if (data == dd.name) {
            _this.opp = dd.id
            _this.bjlan = dd.center[0];
            _this.bjlng = dd.center[1];
          }
        });
        console.log(_this.bjlan);
        _this.address = data;
        _this.biaoqian();
        _this.empty();
        console.log(_this.opp)
      }
    },

    filters: {

      numFilter(value) {

        // 截取当前数据到小数点后两位

        let realVal = parseFloat(value).toFixed(0)

        // num.toFixed(2)获取的是字符串

        return parseFloat(realVal)

      }

    }
  }
</script>

<style lang="less" scoped>

  /*  body{
      scrollbar-3dlight-color:#D4D0C8; !*- 最外左 -*!
      scrollbar-highlight-color:#fff; !*- 左二 -*!
      scrollbar-face-color:#E4E4E4; !*- 面子 -*!
      scrollbar-arrow-color:#666; !*- 箭头 -*!
      scrollbar-shadow-color:#808080; !*- 右二 -*!
      scrollbar-darkshadow-color:#D7DCE0; !*- 右一 -*!
      scrollbar-base-color:#D7DCE0; !*- 基色 -*!
      scrollbar-track-color:#000;!*- 滑道 -*!
    }*/

  #container {
    width: 100%;
    height: 100%;
    opacity: .7;
    position: absolute;
    top: 0;
    z-index: 0;
    .container-Summary {
      width: 80%;
      height: 8%;
      position: absolute;
      top: 10%;
      left: 12%;
      z-index: 10;
      display: flex;
      span {
        display: inline-block;
        width: 20%;
        height: 100%;
        font-size: 17px;
        color: #fff;
        text-align: center;
        float: left;
        line-height: 77px;
        opacity: .8;
        margin-left: 8%;
        background-image: url('../icon/pic_bigdataborder.png');;
        background-repeat: repeat-y;
        background-size: 103% 96%;

      }
    }
  }

  #containers {
    width: 100%;
    height: 100%;
    opacity: .7;
    position: absolute;
    top: 0;
    z-index: 0;
  }

  #LifeCircle {
    width: 100%;
    height: 100%;
    opacity: 1;
    position: absolute;
    top: 0;
    z-index: 0;
  }

  #leftBar {
    position: absolute;
    z-index: 100 !important;
    left: 0;
    top: 295px;
    width: 230px;
    height: 400px;
    opacity: .7;
    background: #2E5566;
    transform: translateX(0%);
    border-radius: 0 5px 5px 0;
    transition: transform .35s ease;
    .bar {
      position: absolute;
      right: -20px;
      top: 50%;
      width: 20px;
      height: 180px;
      transform: translateY(-50%);
      cursor: pointer;
      border-radius: 0 20px 20px 0;

    }
    .baro {
      background: url(../icon/buttons.png) no-repeat -47px center #134853;
    }
    .bart {
      background: url(../icon/buttons.png) no-repeat -4px center #134853;
    }
    .baros {
      background: url(../icon/yuyu.png) no-repeat -47px center #134853;
    }
    .barts {
      background: url(../icon/yuyu.png) no-repeat -4px center #134853;
    }
    .al {
      width: 80%;
      height: 14%;
      margin: 14% auto;
      text-align: center;
      line-height: 57px;
      letter-spacing: 5px;
      cursor: pointer;
      color: #36B0E6;
      border-radius: 10px;
      border: 1px solid #36B0E6;
      font-size: 18px;
    }
    .active {
      border: 1px solid #ffcd56;
      color: #ffcd56;
    }
  }

  #rightBar {
    position: absolute;
    z-index: 100 !important;
    right: 0;
    top: 81px;
    bottom: 0;
    width: 500px;
    background: #2E5566;
    opacity: .7;
    border-radius: 5px 0 0 5px;
    /*border-left: 1px 0080ff solid;*/
    transform: translateX(0%);
    transition: transform .35s ease;
    .rightBar_top {
      width: 100%;
      height: 20%;
      position: relative;
      .data-highcharts-chart {
        width: 90%;
        height: 91%;
        margin: 0 auto;
      }
      .rightBar_tops {
        width: 120px;
        height: 18px;
        font-size: 11px;
        position: absolute;
        right: 5%;
        top: 21%;
        span {
          span {
            display: inline-block;
            margin-left: 5px;
          }
        }
      }
    }
    .rightBar_bottom {
      width: 100%;
      height: 80%;
      .data-rightBar_bottom-chart {
        width: 90%;
        height: 81%;
        margin: 0 auto;
      }
    }
    .bar {
      position: absolute;
      left: -20px;
      top: 50%;
      width: 20px;
      height: 180px;
      transform: translateY(-50%);
      cursor: pointer;
      border-radius: 20px 0 0 20px;

    }
    .baro {
      background: url(../icon/buttons.png) no-repeat -4px center #134853;
    }
    .bart {
      background: url(../icon/buttons.png) no-repeat -47px center #134853;
    }
    .title {
      color: white;
      line-height: 33px;
      font-size: 18px;
      margin-bottom: 10px;
      padding-left: 13px;
      border-left: 5px #4d80c5 solid;
      margin-left: 13px;
    }
    .spannn {
      width: 20px;
      height: 20px;
      background: url(../icon/congestion-icon.png);
      background-repeat: no-repeat;
      background-position: 3px -63px;
      display: inline-block;
      position: absolute;
      left: 0px;
    }
  }

  .leftCity {
    position: relative;
    .top_leftCity {
      position: absolute;
      top: 5px;
      left: 10px;
      z-index: 200 !important;
    }
    .bottom_leftCity {
      position: absolute;
      z-index: 100 !important;
      left: 0;
      width: 74%;
      height: 200px;
      background-color: #000;
      opacity: .7;
      transform: translateX(-100%);
      /*transform: translateX(0%);*/
      transition: transform .35s ease;
      ul {
        width: 97%;
        height: 84%;
        float: left;
        margin-top: 2%;
        display: flex;
        flex-wrap: wrap;
        li {
          list-style: none;
          -webkit-box-flex: 1;
          -ms-flex: 1;
          width: 78px;
          height: 12%;
          cursor: pointer;
          color: #fff;
          font-size: 14px;
          text-align: center;
          line-height: 25px;
        }
      }
    }
  }

  .weather {
    width: 232%;
    height: 20px;
    color: #fff;
    position: absolute;
    right: -6%;
    top: -171%;
    span {
      display: inline-block;
    }
  }

  .data-rightBar {
    width: 100%;
    height: 100%;
    margin: 10% auto;
  }

  .abcd {
    width: 89%;
    height: 25px;
    right: 0;
    position: absolute;
    top: 0;
    display: flex;
    span {
      display: inline-block;
      width: 5%;
      line-height: 25px;
      font-size: 19px;
      height: 100%;
      text-align: center;
      cursor: pointer;
      color: #fff;
    }
  }

  .abcd span:hover {
    font-size: 20px;
    color: red;
  }

  .destination {
    width: 90%;
    height: 40px;
    /*border: 1px solid #4d80c5;*/
    margin: 10% auto;
  }

  .dests {
    width: 90%;
    height: 31px;
    margin: -10% auto;
  }

  #colorTip {
    width: 90%;
    height: 30px;
    margin: 20% auto;
    ul {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      li {
        width: 20%;
        height: 10px;
        list-style: none;
        float: left;
        text-align: center;
        line-height: 61px;
        font-size: 14px;
        color: #fff;
        margin-top: 10px;
      }
    }
  }

  footer {
    position: absolute;
    bottom: 30px;
    z-index: 99999;
    width: 100%;
    .timeAxis {
      width: 74%;
      height: 60px;
      position: absolute;
      bottom: 22px;
      left: 3%;
      z-index: 100;
      border-bottom: 3px solid #aee1dd;
      display: flex;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      /*  -ms-flex-pack: justify;*/
      /*justify-content: space-between;*/
      span {
        display: inline-block;
        width: 5px;
        height: 70%;
        font-size: 17px;
        line-height: 132px;
        margin-top: 17px;
        color: #fc0;
        text-indent: -19px;
        background: #aee1dd;
        border-radius: 5px 5px 0 0;
        cursor: pointer;
      }
    }
    .actives {
      background: #ffcd56 !important;
      color: #aee1dd;
    }
  }
</style>
<style lang="less">
  #rightBar .el-table th, .el-table tr {
    background: none;
  }

  /*.el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td, .el-table__body tr.hover-row.current-row>td, .el-table__body tr.hover-row.el-table__row--striped.current-row>td, .el-table__body tr.hover-row.el-table__row--striped>td, .el-table__body tr.hover-row>td{
    background: none;
  }*/
  #rightBar .el-table__body tr:hover > td {
    cursor: pointer;
    background: none !important;

  }

  #rightBar .el-table__body tr.current-row > td {
    background: none !important;
  }

  #rightBar .el-table td, .building-top .el-table th.is-leaf {
    border: 0;
  }

  #rightBar .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
    border: 0;
  }

  #rightBar .el-table--border, .el-table--group {
    border: 1px solid #4d80c5

  }

  #rightBar .el-table--border::after, .el-table--group::after, .el-table::before {
    background: none;
  }

  #rightBar .cell div {
    font-size: 14px;
    text-indent: 10px;
    line-height: 20px;
  }

  #rightBar .cell div:nth-last-child {
    font-size: 17px;
  }

  #rightBar .el-table td, .el-table th.is-leaf {
    border: 0;
  }

  #rightBar .is-scrolling-none {
    height: 550px;
  }

  #rightBar .el-tabs__nav-wrap::after {
    background: none;
  }

  #rightBar .el-tabs__item {
    font-size: 16px;
    color: #fff;
  }

  #rightBar .el-tabs__content {
    margin-top: 6%;
  }

  #rightBar .el-tabs__active-bar {
    background-color: #4d80c5;
  }

  .amap-controlbar {
    display: none !important;
  }

  #luduan .el-table__body-wrapper {
    height: 758px;
  }

  .el-scrollbar__wrap {
    margin-bottom: 0px !important;
  }

  .destination .el-radio {
    color: #fff;
  }

  .custom-content-marker {
    width: 150px;
    height: 25px;
    background: #fff;
    .close-btnone {
      float: left;
      width: 15%;
      height: 100%;
      background: #0d5ab1;
      text-align: center;
      line-height: 25px;
      color: #edff00;
      font-size: 15px;
    }
    .close-btntwo {
      float: left;
      width: 50%;
      height: 100%;
      text-align: center;
      font-size: 15px;
      line-height: 25px;
    }
    .close-btnthree {
      float: left;
      width: 35%;
      height: 100%;
      background: #0d5ab1;
      text-align: center;
      line-height: 25px;
      font-size: 15px;
      color: #edff00;
    }
    .close-sanjiao {
      width: 0;
      height: 0;
      border-width: 6px;
      border-style: solid;
      border-color: #fff transparent transparent transparent;
      position: absolute;
      left: 15%;
      top:100%

    }
  }
  .data-highcharts-chart{
    width: 450px;
    height: 163px;
  }

  /*.sidebar {
    position: fixed;
    border-right: 1px solid rgba(0,0,0,.07);
    overflow-y: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    transition: transform .25s ease-out;
    width: 300px;
    z-index: 3;
  }
  .sidebar::-webkit-scrollbar {
    width: 4px
  }

  .sidebar::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 4px
  }

  .sidebar:hover::-webkit-scrollbar-thumb {
    background: hsla(0,0%,53%,.4)
  }

  .sidebar:hover::-webkit-scrollbar-track {
    background: hsla(0,0%,53%,.1)
  }*/
</style>

