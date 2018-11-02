<template>
  <!--已安装设备-->
  <div class="AlarmEquipment ipm" v-if="already">
    <div class="AlarmClos" @click="Aclose"></div>
    <p style="width: 100%;height: 30px">{{title}}</p>
    <div class="InstalledForm">
      <p>选择某一行，地图上自动定位到数据</p>
      <div class="InstalledFormInput">
        <div style="float: left">模糊匹配：</div>
        <!--模糊查询input-->
        <el-input v-model="state1" style="width: 57%"></el-input>
        <!--<button class="InstalledFormBut" @click="searchData">查询</button>-->
      </div>
      <el-table
        :data="tables.slice((currentPage1-1)*pagesize,currentPage1*pagesize)" stripe height="270" border
        style="width: 100%"
        @row-click="yuyu"
      >
        <el-table-column
          prop="date"
          heihht="30"
          label="设备编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="最新状态"
          width="90">
        </el-table-column>
        <el-table-column
          prop="address"
          label="最新上报时间">
        </el-table-column>
      </el-table>
      <div class="inps">
        <el-pagination @current-change="handleCurrentChange1" :current-page="currentPage1" layout="prev, next, jumper"
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size="pagesize" :total='n_tableData.length'>
        </el-pagination>
      </div>
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  export default {
    props: ['tableData', 'title'],
    data() {
      return {
        n_tableData: this.tableData,
        state1: '',
        currentPage1: 1,
        pagesize: 10,
        already: false
      }
    },
    methods: {
      // 分页
      handleCurrentChange1: function (currentPage) {//页码切换
        this.currentPage1 = currentPage;
        console.log(this.currentPage1);
      },
      hideOrShow: function (state) {
        this.already = state;
      },
      Already:function(data){
      },
      Aclose() {
        this.already = false;
        let _This = this;
        setTimeout(function () {
          _This.$emit('closeAll', '')
        }, 100)
      },
      openFullScreen() {
        this.loading = this.$loading({
          lock: false,
          text: '加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      // 关闭加载
      closeLoading() {
        this.loading.close();
      },
      // 传参的方式获得数据
      changeData: function (data) {
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].name, 'data');
          if (data[i].name === 0) {
            data[i].name = '正常'
          } else if (data[i].name === 1) {
            data[i].name = '离线'
          } else if (data[i].name === 2) {
            data[i].name = '超时'
          } else if (data[i].name === 3) {
            data[i].name = '报警'
          }
        }
        this.n_tableData = data;

      },
      yuyu(data) {
        this.$emit('listenToChildEvent', [data.coordinateX, data.coordinateY]);
      }
    },
    computed: {
      // 模糊搜索
      tables() {
        const search = this.state1;
        if (search) {

          return this.n_tableData.filter(name => {
            return Object.keys(name).some(key => {
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(name[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.n_tableData
      }
    },
    mounted() {

    }
  }
</script>
<style lang="less" scoped>
  #map {
    width: 100%;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

  }

  #allmap {
    height: 100%;
    overflow: hidden;
  }

  .map-herder {
    height: 80px;
    width: 100%;
    background: #48628b;
    opacity: 0.85;
    position: absolute;
    top: 0;
    z-index: 9999;
    box-shadow: 0 3px 0px #b4d3fc;
  }

  .map_herders {
    height: 50%;
    width: 80%;
    background: #e4e4e4;
    border-radius: 0 0 50px 0;
    position: relative;
  }

  .images {
    width: 31.6%;
    height: 117%;
    position: absolute;
    top: 16px;
    left: 3px;
    background-image: url('../assets/images/pic_logo3.png');
    background-repeat: repeat-y;
  }

  .map-herder-but {
    width: 72px;
    height: 8px;
    background: #b4d3fc;
    font-size: 2px;
    position: absolute;
    bottom: -8px;
    left: 47%;
    line-height: 8px;
    border-radius: 0 0 20px 20px;
    cursor: pointer;
    box-shadow: -2px 3px 11px #9E9E9E;
  }

  .map-herder-but:hover {
    background: #fdd974;
  }

  .map-LeftNavigation {
    width: 78px;
    height: 78%;
    background: #5d81b5;
    position: absolute;
    top: 110px;
    z-index: 9998;
    border-bottom: 2px solid #86b1f7;
    border-top: 2px solid #86b1f7;
    border-right: 2px solid #86b1f7;
    border-radius: 0 10px 10px 0;
    /*overflow:hidden;*/
  }

  .map-LeftNavigation-ul {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    /*overflow-y: scroll;*/
  }

  .map-LeftNavigation-li {
    width: 100%;
    height: 68px;
    border-bottom: 1px solid #000;
    cursor: pointer;
  }

  .map-LeftNavigation-li :hover {
    img {
      width: 50%;
      height: 70%;
    }
  }

  .tb {
    height: 17px;
    width: 100%;
    background: #2f558a;
    position: absolute;
    cursor: pointer;
  }

  .map-LeftNavigation-top {
    top: 0;
    border-radius: 0 10px 0 0;
  }

  .map-LeftNavigation-bottom {
    bottom: 0;
    border-radius: 0 0 10px 0;
  }

  .map-LeftNavigation-but {
    width: 12px;
    height: 65px;
    background: #b4d3fc;
    position: absolute;
    right: -12px;
    left: 103%;
    top: 45%;
    border-radius: 0 20px 20px 0;
    line-height: 70px;
    cursor: pointer;
    font-size: 18px;
    box-shadow: -3px 0 5px #333;
  }

  .map-LeftNavigation-but:hover {
    background: #fdd974;
  }

  .map-LeftNavigation-li-spant {
    width: 100%;
    height: 70%;
  }

  .map-LeftNavigation-li-spant img {
    margin-top: 6px;
  }

  .map-LeftNavigation-li-spanb {
    width: 100%;
    height: 30%;
    font-size: 13px;
    color: #fff;
    line-height: 21px;
  }

  .map-BottomNavigation {
    width: 100%;
    height: 27px;
    background: #2b4d77;
    position: fixed;
    bottom: 0;
    z-index: 9999;
  }

  .map-BottomNavigation-left {
    width: 20%;
    height: 61%;
    margin-left: 4px;
    margin-top: 6px;
  }

  .map-BottomNavigation-left-img {
    width: 16px;
    height: 15px;
    background-image: url('../assets/images/pic_sobig.png');
    float: left;
    cursor: pointer;
  }

  .map-BottomNavigation-left-content {
    color: #fff;
    font-size: 12px;
    text-indent: -90px;
    line-height: 16px;
  }

  .map-BottomNavigation-right {
    width: 35%;
    height: 100%;
    position: absolute;
    right: 15px;
    top: 7px;
    font-size: 12px;
    color: #fff;
  }

  .map-BottomNavigation-right-coordinate {
    float: left;
    margin-left: 20%;
  }

  .map-BottomNavigation-right-scale {
    float: left;
    margin-left: 7%;
  }

  .WellCoverMonitoring {
    width: 613px;
    height: 38px;
    background: #e4e4e4;
    position: absolute;
    top: 83px;
    left: 30%;
    z-index: 9998;
    -webkit-box-shadow: 0 0 13px 3px;
    box-shadow: 0 0 19px 1px;
    border-radius: 0px 0px 10px 10px;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      padding: 0;
      margin: 0;
      justify-content: center;
      align-items: center;
      li {
        flex: 1;
        font-size: 12px;
        list-style: none;
        color: #2c4586;
        cursor: pointer;
      }

    }
  }

  .CloseWellCoverMonitoring {
    cursor: pointer;
    border-left: 1px solid #5e5e5e;
  }

  .lis1 {
    border-right: 1px solid #5e5e5e;
    line-height: 26px;
    img {
      float: left;
      margin-left: 5px;
    }
  }

  .DetailedListOfManholeCovers {
    width: 27.5%;
    height: 86%;
    position: absolute;
    right: 1px;
    top: 10.6%;
    z-index: 9999;
    overflow: hidden;
  }

  .DetailedControl {
    height: 100%;
    width: 27px;
    float: right;
    .DetailedContens {
      height: 310px;
      width: 100%;
      background: #1d4173;
      border-radius: 6px 0 0 6px;
      box-sizing: border-box;
      border-left: 1px solid #b4d3fc;
    }
  }

  .DetailedLeft {
    width: 92%;
    height: auto;
  }

  .ipm {
    width: 402px;
    height: 402px;
    background: #31588d;
    border-radius: 5px;
    border: 1px solid #b4d3fc;
    margin-bottom: 10px;
    overflow: hidden;
    p {
      margin: 0;
      font-size: 15px;
      color: #fff;
      font-weight: bold;
      text-align: left;
      text-indent: 20px;
      line-height: 30px;
    }
    .InstalledForm {
      width: 96%;
      height: 91%;
      background: #eee;
      margin-left: 2%;
      p {
        width: 100%;
        height: 33px;
        background: #dfdfdf;
        font-weight: normal;
        text-align: left;
        text-indent: 14px;
        color: #000;
        font-size: 12px;
        line-height: 33px;
        border-bottom: 1px solid #bbb;
      }
      .InstalledFormInput {
        width: 100%;
        height: 31px;
        text-align: left;
        font-size: 12px;
        line-height: 31px;
        text-indent: 14px;
        input {
          width: 241px;
          height: 19px;
          border: 1px solid #a4a4a4;
          border-radius: 2px;
          margin-left: 2px;
        }
        .InstalledFormBut {
          /* width: 53px; */
          height: 20px;
          border: 1px solid #abc6dd;
          color: #042271;
          font-size: 12px;
          cursor: pointer;
          margin-right: 19px;
          border-radius: 2px;
          margin-top: 6px;
          /* display: inline-block; */
          float: right;
        }
      }
    }
  }

  .InstalledEquipment {
  }

  .AlarmClos {
    width: 21px;
    height: 21px;
    background: green;
    background-image: url('../assets/images/pic_close.png');
    float: right;
    margin-right: 5px;
    border-radius: 4px;
    cursor: pointer;
  }

  .InstallClos {
    width: 21px;
    height: 21px;
    background: seagreen;
    background-image: url('../assets/images/pic_close.png');
    float: right;
    margin-right: 5px;
    border-radius: 4px;
    cursor: pointer;
  }

  .xiacaozuo {
    z-index: 9999;
    position: absolute;
    top: 30%;
    height: 40px;
    width: 30%;
  }

</style>
<style>
  .el-pagination {
    width: 50%;
    height: 20px;
    margin-left: 48%;
    font-size: 10px;
  }

  .inps {
    width: 100%;
    height: 29px;
    border-top: 1px solid #a1adb8;
  }

  .el-pagination .btn-next {
    background: none;
  }

  .el-pagination .btn-prev {
    background: none;
  }

  .el-pagination button:disabled {
    background: none;
  }

  .el-pagination__editor.el-input .el-input__inner {
    height: 23px;
  }

  .InstalledFormInput .el-input__inner {
    height: 21px;
    margin-left: -26px;
    width: 133%;
    margin-top: 5px;
  }

  .InstalledFormInput.el-input {
    display: inline-block;
    width: 57%;
  }

  .DetailedControl .el-slider.is-vertical {
    position: relative;
    top: 195px;
    right: 1px;
    z-index: 9999;
  }

  .el-slider.is-vertical .el-slider__button-wrapper {
    z-index: 9999;
  }
</style>
