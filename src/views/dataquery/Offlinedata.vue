<template>
  <div class="main-content">
    <header>
      <label class="title"><img src="../../icon/lxsj.png"/><span>离线数据</span></label>
      <div class="param-content">
        <div style="display: inline-block;" v-show="!timer">
          <label class="param-title">刷新时间:</label>
          <el-radio v-model="time" label="1">1分钟</el-radio>
          <el-radio v-model="time" label="5">5分钟</el-radio>
          <el-radio v-model="time" label="3">手动</el-radio>
        </div>
        <label v-show="time !== '3' && timer">当前每{{time}}分钟查询,更换条件查询请暂停</label>
        <el-button v-show="time !== '3' && !timer" @click="getDataOfTime">执行</el-button>
        <el-button v-show="time !== '3' && timer" @click="clearTimer">停止</el-button>
        <el-button v-show="time === '3'" @click="auto">查询</el-button>
      </div>
    </header>
    <div class="content">
      <el-scrollbar style="height: 100%;">
     <el-table :data="tableData" border fit highlight-current-row height="500px" style="width: 97%;margin-left: 1%;">
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
					<el-table-column align="center" label="数据类型">
						<template slot-scope="scope">
							<span>{{scope.row.dataType}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="集控器信号强度">
						<template slot-scope="scope">
							<span>{{scope.row.controllerSignalStrength}}dBm</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="集控器电压">
						<template slot-scope="scope">
							<span>{{scope.row.voltage}}V</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="工作模式">
						<template slot-scope="scope">
							<span>{{scope.row.workingModel}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="连接状态">
						<template slot-scope="scope">
							<span>{{scope.row.connStatus}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="触发器电量">
						<template slot-scope="scope">
							<span>{{scope.row.sensorPower}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="报警状态">
						<template slot-scope="scope">
							<span>{{scope.row.alarmStatus}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="经度">
						<template slot-scope="scope">
							<span>{{scope.row.longitude}}/W</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="维度">
						<template slot-scope="scope">
							<span>{{scope.row.latitude}}/N</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="时间">
						<template slot-scope="scope">
							<span>{{forMatterDate(scope.row.insertTime)}}</span>
						</template>
					</el-table-column>
				</el-table>
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-sizes="[5,10,20,50]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      </el-scrollbar>
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
        dataType: '0',
        limit: 10,
        page: 1,
        total: null,
        timer: null,
        tableData:[],
        forMatterDate: function(datetime) {
					return formatDate(new Date(datetime), 'yyyy-MM-dd hh:mm:ss');
				}
      }
    },
    methods: {
      indexMethod(index) {
        return index * 2;
      },
      auto(){
        this.$http.get('holecoverServer/offline',{
             limit:this.limit,
             page:this.page
        })
          .then(res => {
            if(res.status === 200 || res.status === '200'){
              this.tableData = res.data.rows;
              this.total = res.data.total;
            }else{
              alert('接口错误')
            }
          });
      },
      getDataOfTime() {
        this.timer = setInterval(this.auto, this.time * 60000);
      },
      clearTimer() {
        if(this.timer) {
          clearInterval(this.timer); //停止定时器
          this.timer = null;
        }
      },
      handleSizeChange(val) {
        this.limit = val;
        this.auto();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.auto();
      },
    },
    mounted() {
     this.auto();
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
  div.pagination-container{
    margin-top: 20px;
    float: right;
    margin-right: 4%;
  }
</style>
<style>

</style>
