<template>
	<div class="main-content">
		<header>
			<label class="title"><img src="../../icon/sssj.png"/><span>实时数据</span></label>
			<div class="param-content">
				<div style="display: inline-block;" v-show="!timer">
					<label class="param-title">排序方式:</label>
					<el-radio v-model="searchType" label="0">时间</el-radio>
					<el-radio v-model="searchType" label="1">编号</el-radio>
					<label class="param-title">刷新时间:</label>
					<el-radio v-model="time" label="1">1分钟</el-radio>
					<el-radio v-model="time" label="5">5分钟</el-radio>
					<el-radio v-model="time" label="3">手动</el-radio>
				</div>
				<label v-show="time !== '3' && timer">当前每<span class="important">{{time}}</span>分钟按照<span class="important">{{searchType === '0' ? '时间' : '编号'}}</span>排序查询,更换条件查询请停止</label>
				<el-button v-show="time !== '3' && !timer" @click="getDataOfTime">执行</el-button>
				<el-button v-show="time !== '3' && timer" @click="clearTimer">停止</el-button>
				<el-button v-show="time === '3'" @click="initData">查询</el-button>
				<el-button-group>
					<el-button :class="dataType==='0' ? 'active' : ''" @click="changeDataType('0')">列表</el-button>
					<el-button :class="dataType==='1' ? 'active' : ''" @click="changeDataType('1')">表格</el-button>
				</el-button-group>
			</div>
		</header>
		<div class="content">
			<el-scrollbar style="height: 100%;">
				<el-collapse v-model="activeNames" v-show="dataType==='0'">
					<el-collapse-item v-for="(item, index) in listData" :title="item.city" :name="index">
						<ul>
							<li v-for="item_c in item.rows">
								<label><img src="../../icon/cgq.png" style="width: 26px;height: 19px;"/><span>传感器编号</span><span class="valueSpan">{{item_c.sensorNo}}</span></label>
								<label><img src="../../icon/jkq.png" style="width: 26px;height: 25px;"/><span>集控器编号</span><span class="valueSpan">{{item_c.gatewayNo}}</span></label>
								<label><img src="../../icon/dc.png" style="width: 16px;height: 26px;"/><span>电量</span><span class="valueSpan">{{item_c.sensorPower}}</span></label>
								<label><img src="../../icon/xh.png" style="width: 26px;height: 21px;"/><span>信号</span><span class="valueSpan">{{item_c.sensorSignalStrength}}</span></label>
								<br/>
								<label><img src="../../icon/jkqxx.png" style="width: 26px;height: 27px;"/><span>集控器信号</span><span class="valueSpan">{{item_c.controllerSignalStrength}}</span>dBm</label>
								<label><img src="../../icon/dy.png" style="width: 26px;height: 26px;"/><span>电压</span><span class="valueSpan">{{item_c.voltage}}</span>V</label>
								<label><img src="../../icon/jd.png" style="width: 26px;height: 26px;"/><span>经度</span><span class="valueSpan">{{item_c.longitude}}</span>/W</label>
								<label><img src="../../icon/wd.png" style="width: 26px;height: 26px;"/><span>维度</span><span class="valueSpan">{{item_c.latitude}}</span>/N</label>
								<span class="right-text">{{forMatterDate(item_c.insertTime)}}</span>
							</li>
						</ul>
					</el-collapse-item>
				</el-collapse>
				<el-table :data="tableData" border fit highlight-current-row v-show="dataType==='1'" height="500px" style="width: 97%;margin-left: 1%;">
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
					<el-table-column align="center" label="操作" width="100" fixed="right">
						<template slot-scope="scope">
							<el-button size="small" type="success" @click="openHistory(scope.row)">查看历史
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div v-show="dataType==='1'" class="pagination-container">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-sizes="[5,10,20,50]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</el-scrollbar>
		</div>
		<el-dialog title="历史记录" :visible.sync="dialogHistoryVisible" width="1000px">
			<div class="dialog-container">
				<el-select v-model="historyNo" placeholder="请选择编号">
					<el-option v-for="item in allDataOfSelect" :key="item.sensorNo" :label="item.sensorNo" :value="item.sensorNo">
					</el-option>
				</el-select>
				<el-date-picker v-model="historyDate" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
				</el-date-picker>
				<el-button class="filter-item" type="primary" icon="search" @click="initHistoryData">搜索</el-button>
			</div>
			<el-table :data="historyTableData" border fit highlight-current-row height="400px">
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
				<el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page.sync="page2" :page-sizes="[5,10,20,50]" :page-size="limit2" layout="total, sizes, prev, pager, next, jumper" :total="total2">
				</el-pagination>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { formatDate } from '@/common/js/date.js'
	export default {
		name: '',
		data() {
			return {
				searchType: '0',
				time: '3',
				dataType: '0',
				activeNames: [0],
				limit: 5,
				page: 1,
				limit2: 5,
				page2: 1,
				total: null,
				total2: null,
				timer: null,
				dialogHistoryVisible: false,
				historyDate: '',
				historyNo: '',
				forMatterDate: function(datetime) {
					return formatDate(new Date(datetime), 'yyyy-MM-dd hh:mm:ss');
				},
				pickerOptions: {
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
				listData: [],
				tableData: [],
				allDataOfSelect: [],
				historyTableData: []
			}
		},

		methods: {
			initData() {
				var isList = this.dataType === '0';
				this.$http.get('/holecoverServer/current?searchType=' + this.searchType + '&city=true&limit=' + this.limit + '&page=' + this.page)
					.then(res => {
						this.listData = res.data;
					});
				this.$http.get('/holecoverServer/current?searchType=' + this.searchType + '&city=false&limit=' + this.limit + '&page=' + this.page)
					.then(res => {
						this.$notify({
							title: '成功',
							message: '数据加载成功',
							type: 'success',
							duration: 2000
						});
						this.tableData = res.data.rows;
						this.total = res.data.total;
					});
			},
			getDataOfTime() {
				this.timer = setInterval(this.initData, this.time * 60000);
			},
			clearTimer() {
				if(this.timer) {
					clearInterval(this.timer); //停止定时器
					this.timer = null;
				}
			},
			changeDataType(data) {
				this.dataType = data;
			},
			handleSizeChange(val) {
				this.limit = val;
				this.initData();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.initData();
			},
			handleSizeChange2(val) {
				this.limit2 = val;
				this.initHistoryData();
			},
			handleCurrentChange2(val) {
				this.page2 = val;
				this.initHistoryData();
			},
			openHistory(nowData) {
				if(this.timer) {
					this.$confirm('查看历史详情需要停止实时刷新', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						})
						.then(() => {
							this.clearTimer();
							this.initHistoryParam(nowData);
						});
				} else {
					this.initHistoryParam(nowData);
				}

			},
			initHistoryParam(nowData) {
				this.historyNo = nowData.sensorNo;
				this.$http.get('/holecoverServer/page')
					.then(res => {
						this.allDataOfSelect = res.data.rows;
						this.initHistoryData();
						this.dialogHistoryVisible = true;
					});
			},
			initHistoryData() {
				var startTime = '',
					endTime = '';
				if(this.historyDate) {
					startTime = this.historyDate[0].getTime();
					endTime = this.historyDate[1].getTime();
				}
				this.$http.get('/holecoverServer/history?sensorId=' + this.historyNo + '&startTime=' + startTime + '&endTime=' + endTime + '&limit=' + this.limit + '&page=' + this.page)
					.then(res => {
						this.total = res.data.total;
						this.historyTableData = res.data.rows;
						this.dialogHistoryVisible = true;
					});
			}
		},
		mounted() {
			this.initData();
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
	
	header .param-content span.important {
		color: #E61E1E;
	}
	
	header .param-content {
		float: right;
	}
	
	header .param-content label {
		margin-left: 10px;
	}
	
	header .param-content label.param-title {
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
	
	header .param-content .el-button-group button.active {
		background-color: #49B9BC;
		color: #FFFFFF;
	}
	
	header .param-content button {
		width: 70px;
		margin-left: 10px;
	}
	
	div.content {
		margin-top: 40px;
		height: calc(100% - 220px);
		overflow-x: hidden;
	}
	
	div.content ul {
		padding: 0px;
		margin: 0px;
	}
	
	div.content ul li {
		list-style: none;
		margin-bottom: 20px;
		text-align: left;
		background-color: #F9F9F9;
		position: relative;
		color: #757575;
	}
	
	div.content ul li>label {
		position: relative;
		padding-left: 40px;
		margin-right: 20px;
		line-height: 50px;
	}
	
	div.content ul li>label img {
		position: absolute;
		top: -5px;
		left: 0px;
	}
	
	div.content ul li>label .valueSpan {
		color: #FB923A;
	}
	
	div.content ul li>.right-text {
		position: absolute;
		top: 40px;
		right: 100px;
	}
	
	.el-pagination {
		margin-top: 10px;
	}
	
	.el-dialog__header {
		text-align: left;
	}
	
	.el-dialog__body {
		padding-top: 15px;
	}
	
	.dialog-container {
		text-align: left;
		padding-bottom: 20px;
	}
	
	.dialog-container>* {
		margin-right: 10px;
	}
</style>