<template>
  <div id="signal" style=" height: 100%; overflow: hidden;">
    <div class="mask" v-show='Cmask'>
      <img src="@/assets/images/5.gif" alt="">
    </div>
    <header>
      <label class="title"><img src="../../icon/pic_xin.png"/><span>信号统计</span></label>
      <div class="inpbut">
        <el-select
          v-model="sheng"
          @change="choseProvince"
          placeholder="省级地区">
          <el-option
            v-for="item in province"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select
          v-model="shi"
          @change="choseCity"
          placeholder="市级地区">
          <el-option
            v-for="item in shi1"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select
          v-model="qu"
          @change="choseBlock"
          placeholder="区级地区">
          <el-option
            v-for="item in qu1"
            :key="item.id"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="input" placeholder="请输入具体地址"></el-input>
        <el-button @click="btn">搜索</el-button>
      </div>
    </header>


    <div id="allmap" ref="allmap"></div>
    <!--圆域\方域范围内井盖信息-->
    <el-dialog title="范围内井盖电量统计" :visible.sync="Range">
    <div class="esignal">
      <div ref="gra" class="onsignal"><p>集控器信号强度</p></div>
      <div ref="lineImg" class="onsignal"><p>传感器信号强度</p></div>
    </div>
    </el-dialog>
  </div>

</template>
<script>
  import mapj from '../../../static/json/map.json';
  import echarts from 'echarts';

  export default {
    name: '',
    data() {
      return {
        map: '',
        one: '116.504000',
        two: '40.020000',
        Cmask: false,
        ScopeInformation: [],
        Range: false,
        input: '',
        local: null,
        point: null,
        marker: null,
        mapJson: "",
        province: '',
        sheng: '',
        shi: '',
        shi1: [],
        qu: '',
        qu1: [],
        city: '',
        block: '',
        E: '',
        Thesum: '',
        limit: 10,
        page: 1,
        total: null,
        timer: null,
        drawingMode: '',
        websock: null,
        drawLinex:[],
        drawLiney:[],
        autox:[],
        autoy:[],
        chartsData: null
      }
    },
    methods: {
      initMap() {
        let _this = this;
        this.map = new BMap.Map(this.$refs.allmap); // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(this.one, this.two), 14);// 初始化地图,设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(false); //开启鼠标滚轮缩放
        let overlays = [];
        let overlaycomplete = function (e) {
          _this.drawingMode = e.drawingMode;
          if (e.drawingMode == 'circle') {
            _this.ThePeak = e.overlay.Ou.Vd;
            _this.CenterLongitude = e.overlay.point.lng;         //中心经度
            _this.CenterLatitude = e.overlay.point.lat;          //中心维度
            _this.radius = _this.ThePeak - _this.CenterLatitude;   //半径
            _this.CircularDomain(1);
          } else {
            console.log(e.overlay);
            _this.longitudeLeft = e.overlay.Ou.Ol.lng; //左下经度
            _this.latitudeLeft = e.overlay.Ou.Ol.lat;  //左下纬度
            _this.longitude1Right = e.overlay.Ou.xl.lng;  //右上经度
            _this.latitude1Right = e.overlay.Ou.xl.lat;  //右上纬度
            _this.CircularDomain(2);
          }
          _this.Cmask = true;  //遮罩动画

          // 画第二个的时候删除上一个
          overlays.push(e.overlay);
          for (let i = 0; i < overlays.length; i++) {
            _this.map.removeOverlay(overlays[i - 1]);
          }

        };
        let styleOptions = {
          strokeColor: "red",    //边线颜色。
          fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
          strokeWeight: 3,       //边线的宽度，以像素为单位。
          strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
          fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
          strokeStyle: 'solid' //边线的样式，solid或dashed。
        };
        let drawingManager = new BMapLib.DrawingManager(this.map, {
          isOpen: false, //是否开启绘制模式
          enableDrawingTool: true, //是否显示工具栏
          drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(130, 20), //偏离值
            drawingModes: [
              BMAP_DRAWING_CIRCLE,
              BMAP_DRAWING_RECTANGLE
            ]
          },
          circleOptions: styleOptions, //圆的样式
          rectangleOptions: styleOptions //矩形的样式
        });
        drawingManager.addEventListener('overlaycomplete', overlaycomplete);
      },
      CircularDomain(type) {
        console.log(type, 'type');
        let _this = this;
        if (type == 1) {
          this.$http.get('/holecoverServer/circle', {
            // circle:[l:40.42808,l1:117.71842]
            /* 'longitude': 40.42808,  //中心点经度
             'latitude': 11.88989,  //中心点维度
             'radius': 10           //半径*/
            longitude: _this.CenterLongitude,  //中心点经度
            latitude: _this.CenterLatitude,  //中心点维度
            radius: 9999999999999,        //半径
            limit: this.limit,
            page: this.page,

          })
            .then(
              success => {
                if (success.status === 200 || success.status === "200") {
                  console.log(success, 'successssssssss');
                  this.Cmask = false;
                  this.ScopeInformation = success.data.rows;
                  this.Range = true;
                  this.total = success.data.total;
                  _this.initweb(1);
                } else if (success.status.code === 500 || success.status.code === "500") {
                  this.Cmask = false;
                  alert('服务器出错');
                }
                /* for(let i = 0 ; i < res.length ; i ++){
                   console.log(res[i]);
                   console.log(res[i].city);
                 }*/
              })
        } else {
          this.$http.get('/holecoverServer/square', {
            /*'longitudeLeft': _this.longitudeLeft,
            'latitudeLeft': _this.latitudeLeft,
            'longitude1Right': _this.longitude1Right,
            'latitude1Right': _this.latitude1Right*/
            longitudeLeft: -1,
            latitudeLeft: -1,
            longitude1Right: 99999931134,
            latitude1Right: 56456456674,
          })
            .then(
              success => {
                if (success.status === 200 || success.status === "200") {
                  console.log(success.data, 'successssssssss');
                  this.Cmask = false;
                  this.ScopeInformation = success.data.rows;
                  this.Range = true;
                  this.total = success.data.total;
                  setTimeout(function () {
                    _this.drawLine();
                    _this.auto();
                  }, 100);
                  _this.initweb(2);
                } else {
                  alert('接口错误');
                  this.Cmask = false;
                }
              })
        }

      },
      // 加载china地点数据，三级
      getCityData() {
        let that = this;
        that.province = [];
        that.city = [];
        that.block = [];
        // 省市区数据分类
        for (let item in mapj) {
          if (item.match(/0000$/)) {//省
            that.province.push({id: item, value: mapj[item], children: []})
          } else if (item.match(/00$/)) {//市
            that.city.push({id: item, value: mapj[item], children: []})
          } else {//区
            that.block.push({id: item, value: mapj[item]})
          }
        }
        // 分类市级
        for (let index in that.province) {
          for (let index1 in that.city) {
            if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
              that.province[index].children.push(that.city[index1])
            }
          }
        }
        // 分类区级
        for (let item1 in that.city) {
          for (let item2 in that.block) {
            if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
              that.city[item1].children.push(that.block[item2])
            }
          }
        }

      },
      // 选省
      choseProvince(e) {
        for (let index2 in this.province) {
          if (e === this.province[index2].id) {
            this.sheng = this.province[index2].value;
            this.shi1 = this.province[index2].children;
            this.shi = this.province[index2].children[0].value;
            this.qu1 = this.province[index2].children[0].children;
            // this.qu = this.province[index2].children[0].children[0].value;
          }
        }
      },
      // 选市
      choseCity(e) {
        for (let index3 in this.city) {
          if (e === this.city[index3].id) {
            this.shi = this.city[index3].value;
            this.qu1 = this.city[index3].children;
            // this.qu = this.city[index3].children[0].value
            // console.log(this.E)
          }
        }
      },
      // 选区
      choseBlock(e) {
        // console.log(this.E)
      },
      btn() {

        this.Thesum = this.sheng + this.shi + this.qu + this.input;
        if (this.sheng == '' && this.shi == '') {
          this.$message({
            showClose: true,
            message: '您需要定位到市一级'
          });
        } else {
          console.log(this.sheng);
          console.log(this.shi);
          this.map.centerAndZoom(this.Thesum, 16);
        }

      },
      handleSizeChange(val) {
        this.limit = val;
        if (this.drawingMode === 'circle') {
          this.CircularDomain(1);
        } else {
          this.CircularDomain(2);
        }

      },
      handleCurrentChange(val) {
        this.page = val;
        if (this.drawingMode === 'circle') {
          this.CircularDomain(1);
        } else {
          this.CircularDomain(2);
        }
      },
      drawLine() {
        let _this = this;
        // 基于准备好的dom，初始化echarts实例
        console.log(this.one, '23434');
        let myChart = echarts.init(this.$refs.lineImg);
        // 指定图表的配置项和数据
        let option = {
          xAxis: {
            type: 'category',
            data: this.chartsData['1']['gatewayNo']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.chartsData['3']['controllerSignalStrength'],
            type: 'line'
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      graps() {
        let arr = echarts.init(this.$refs.gra);
        let opt = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Sun', 'Sun', 'Sun', 'Sun', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130, 150, 80, 70, 110, 130],
            type: 'bar'
          }]
        };
        arr.setOption(opt);
      },
      auto() {
        let brr = echarts.init(this.$refs.gra);
        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.chartsData['0']['sensorNo'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: this.chartsData['2']['sensorSignalStrength']
            }
          ]
        };
        brr.setOption(option);
      },
      initweb(type) {
        let _this = this;
        if(type===1){
          let shape = 0;
          this.websock.send( shape + ',' + _this.CenterLatitude + ',' + _this.radius + ',' + _this.CenterLongitude);
          this.websock.onopen = this.websocketopen;
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onclose = this.websocketclose;
          this.websock.onerror = this.websocketerror;
        }else{
          let shape = 1;
          this.websock.send(shape + ',' + _this.latitudeLeft + ',' + _this.longitude1Right + ',' + _this.latitude1Right + ',' + _this.longitudeLeft);
          this.websock.onopen = this.websocketopen;
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onclose = this.websocketclose;
          this.websock.onerror = this.websocketerror;
        }

      },
      websocketopen() { //打开
        console.log("WebSocket连接成功")
      },
      websocketonmessage(data) { //数据接收
        this.chartsData = JSON.parse(data.data).rows;
        this.auto();
        this.drawLine();
      }
    },
    mounted() {
      // console.log(mapj);
      let _this = this;
      this.initMap();
      this.getCityData(mapj);
      // wenscoket
      const wsuri = "ws://192.168.2.162:8081/websocket/0"; //ws地址
      if('WebSocket' in window) {
        this.websock = new WebSocket(wsuri);
        console.log(this.websock);
      }else if('MozWebSocket' in window){
        this.websock = new MozWebSocket(wsuri);
      }
      else{
        alert('该浏览器不支持wenstocket');
        return false;
      }
     /* HostList(this.listQuary.type).then(res => {
        _this.listQuary.ip = res[0];
        _this.oldIp = res[0];
        _this.ipList = res;
        _this.initWebpack()
      })*/
    },
    created(){


    }
  }
</script>


<style lang="less" scoped>
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

  .inpbut {
    position: absolute;
    width: 53%;
    height: 50px;
    z-index: 1000;
    right: 6%;
    top: 91px;
  }
  .el-pagination {
    margin-top: 30px;
    margin-right: -29%;
  }
  @media (min-width: 1600px) {
    .inpbut {
      position: absolute;
      width: 63%;
      height: 50px;
      z-index: 1000;
      right: 6.5%;
      top: 91px;
    }
    .el-pagination {
      margin-top: 30px;
      margin-right: -14%;
      margin-left: 0;
    }
  }
  @media (min-width: 1920px) {
    .inpbut {
      position: absolute;
      width: 53%;
      height: 50px;
      z-index: 1000;
      right: 6%;
      top: 91px;
    }
    .el-pagination {
      margin-top: 30px;
      margin-right: -29%;
    }
  }
  .inpbut .el-input {
    width: 220px;
    height: 100%;
    padding-right:10px;
  }

  header {
    /*padding-bottom: 5px;*/
    text-align: left;
    line-height: 40px;
    border-bottom: 1px solid #E0E0E0;
    padding: 15px 10%;
  }

  header .title {
    position: relative;
    padding-left: 40px;
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


  .el-select-dropdown__list{
    padding: 16px 0;
  }
  .el-select{
    padding-right: 10px;
  }
.esignal{
  width: 100%;
  height: 510px;
  .onsignal{
    width: 50%;
    height: 100%;
    float: left;
  }
}
</style>
<style>
  #signal .el-dialog{
    width: 1274px;
    height: 615px;
  }
  #signal .el-dialog__header{
    background: #49B9BC;

  }
  #signal .el-dialog__title{
    color:#fff;
    font-size: 20px;
  }
  .el-dialog__headerbtn{
    color: #ffffff;
  }
</style>
