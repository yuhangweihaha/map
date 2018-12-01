<template>
  <div class="main-content">
    <header>
      <label class="title"><img src="../../icon/flow/pic_flow2.png"/><span>流量管理</span></label>
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
      <el-table :data="yuyu" border fit highlight-current-row  height="500px" style="width: 100%;">
        <el-table-column align="center" label="序号" type="index" width="50">
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
        <el-table-column align="center" label="设备类型">
          <template slot-scope="scope">
            <span>{{scope.row.alarmStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="设备状态">
          <template slot-scope="scope">
            <span>{{scope.row.controllerSignalStrength}}dBm</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="城市">
          <template slot-scope="scope">
            <span>{{scope.row.city}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="经度">
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="维度">
          <template slot-scope="scope">
            <span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="注册时间">
          <template slot-scope="scope">
            <span>{{scope.row.voltage}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="当前剩余流量">
          <template slot-scope="scope">
            <span>{{scope.row.workingModel}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="当前超出流量">
          <template slot-scope="scope">
            <span>{{scope.row.connStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="总流量">
          <template slot-scope="scope">
            <span>{{scope.row.sensorPower}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-sizes="[5,10,20,50]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import { formatDate } from '@/common/js/date.js'
  export default {
    name: '',
    data() {
      return {
        time: '3',
        yuyu:[],
        value:'1',
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
      flow(){
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
        this.flow();
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
</style>
<style>
  header .param-content button{
    width: 66px;
    height: 40px;
  }
</style>
