<template>
  <div class="main-content">
    <header>
      <label class="title"><img src="../../icon/flow/pic_flow8.png"/><span>选择集控器</span></label>
      <div class="param-content">
        <div class="number">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in yuyu"
              :label="item.gatewayNo"
              :value="item.gatewayNo">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="北京">
            <el-option
              v-for="item in yuyu"
              :label="item.gatewayNo"
              :value="item.gatewayNo">
            </el-option>
          </el-select>
        </div>
        <div class="blocks">
          <el-button style="height: 38px;width: 66px" @click="handleCheck()">查看</el-button>

        </div>

      </div>
    </header>
    <div id="allmap" ref="allmap"></div>
  </div>
</template>
<script>
  import {formatDate} from '@/common/js/date.js'

  export default {
    name: '',
    data() {
      return {
        time: '3',
        yuyu: [],
        value: '',
        forMatterDate: function (datetime) {
          return formatDate(new Date(datetime), 'yyyy-MM-dd hh:mm:ss');
        },
        times: '',
        starttime: '',
        endtime: '',
        limit: 10,
        page: 1,
        total: null,
        map: '',
        one: '116.504000',
        two: '40.020000',
      }
    },
    methods: {
      indexMethod(index) {
        return index * 2;
      },
      // flow(){
      //   this.$http.get('holecoverServer/alarmHistory',{
      //     startTime: this.starttime,
      //     endTime: this.endtime,
      //     sensorId: this.value,
      //     limit:this.limit,
      //     page:this.page
      //   })
      //     .then(res => {
      //       // this.yuyu = res.Secondcover;
      //       if(res.status === 200 || res.status === '200'){
      //         this.yuyu = res.data.rows;
      //         console.log(res,'rwwwwwesres');
      //         this.total = res.data.total;
      //         this.value = res.data.total.sensorNo;
      //       }else{
      //         alert('接口错误')
      //       }
      //     });
      // },
      flow() {
        // let _this = this;
        this.map = new BMap.Map(this.$refs.allmap); // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(this.one, this.two), 14);// 初始化地图,设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(false); //开启鼠标滚轮缩放
      },
      handleCheck() {
        this.$http.get('holecoverServer/flowPackageByNo', {
          sensorNo: this.value,
        })
          .then(res => {
            // this.yuyu = res.Secondcover;
            if (res.status === 200 || res.status === '200') {
              console.log(res.data.rows,'sensorNosensorNo')
              this.yuyu = res.data.rows;
            } else {
              alert('接口错误')
            }
          });
      },
      handleSizeChange(val) {
        this.limit = val;
        this.flow();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.flow();
      },
    },
    mounted() {
      this.flow();
    }
  }
</script>

<style lang="less" scoped>
  #allmap {
    height: 100%;
    overflow: hidden;
  }
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

  header .block {
    float: left;
    margin-left: 20px;
  }

  header .blocks {
    float: right;
    margin-left: 20px;
  }

  header .number {
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

  footer {
    width: 100%;
    height: 50px;
    background: rgba(243, 243, 243, 1);
    bottom: 48px;
    position: relative;
    ul {
      width: 25%;
      height: 50px;
      float: right;
      padding: 0;
      margin: 0;
      li {
        float: left;
        width: 33.333%;
        height: 100%;
        list-style: none;
        text-align: right;
        line-height: 42px;
        font-size: 14px;
        span {
          width: 29px;
          height: 23px;
          display: inline-block;
          margin: 6px 5px;
          vertical-align : middle;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }

    }
  }
</style>
<style>
  header .param-content button {
    width: 66px;
    height: 40px;
  }
</style>
