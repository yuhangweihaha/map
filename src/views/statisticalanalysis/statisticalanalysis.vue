<template>
  <div style=" height: 100%; overflow: hidden;">
    <div class="mask" v-show='Cmask'>
      <img src="@/assets/images/5.gif" alt="">
    </div>
    <header>
      <label class="title"><img src="../../icon/pic_statistics.png"/><span>电量统计</span></label>
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
      <el-table :data="ScopeInformation" border fit highlight-current-row height="350"
                style="width: 100%">
        <el-table-column
          prop="sensorNo"
          label="传感器编号">
        </el-table-column>
        <el-table-column
          prop="gatewayNo"
          label="集控器编号">
        </el-table-column>
        <el-table-column
          label="设备坐标">
          <template slot-scope="scope">
            <span>{{ scope.row.latitude }}、{{ scope.row.longitude }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="voltage"
          label="电量"
          width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.sensorPower }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page"
                       :page-sizes="[5,10,20,50]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </el-dialog>
  </div>

</template>
<script>
  import mapj from '../../../static/json/map.json'

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
        drawingMode: ''
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
            limit:this.limit,
            page:this.page
          })
            .then(
              success => {
                if (success.status === 200 || success.status === "200") {
                  console.log(success.data, 'successssssssss');
                  this.Cmask = false;
                  this.ScopeInformation = success.data.rows;
                  this.Range = true;
                  this.total = success.data.total;
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
        if(this.sheng == '' && this.shi== ''){
          this.$message({
            showClose: true,
            message: '您需要定位到市一级'
          });
        }else{
          this.map.centerAndZoom(this.Thesum, 16);
          /*this.map.centerAndZoom(this.Thesum, 11);
          this.$message({
            showClose: true,
            message: '您不可以改变地图级别'
          });
          this.Thesum = this.sheng + this.shi + this.qu + this.input;
          console.log(this.sheng, '省');
          console.log(this.qu, '区');
          console.log(this.shi, '市');
          console.log(this.E, '市');*/
          // if(this.input !== ''){



          // }
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
    },

    mounted() {
      // console.log(mapj);
      this.initMap();
      this.getCityData(mapj);
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

</style>
