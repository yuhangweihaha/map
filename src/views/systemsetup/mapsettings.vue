<template>
  <div class="main-content">
    <div id="mapsettings">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="地图设置" name="first">
             <div class="maps">
               <div class="maps-one mp">
                 <span  style="position: absolute;margin-top: 10px;left: 6%">背景图：</span>
                 <el-input v-model="input" placeholder="请输入内容"></el-input>
                 <el-button size="small" type="primary">图片</el-button>
               </div>
               <div class="maps-two mp">
                 <span  style="position: absolute;margin-top: 10px;left: 6%">经纬度：</span>
                 <el-input v-model="input" placeholder="请输入内容"></el-input>
                 <el-button size="small" type="primary">地图</el-button>
               </div>
               <div class="maps-three mp">
                 <span  style="position: absolute;margin-top: 10px;left: 3.6%">缩放级别：</span>
                 <el-select v-model="value6" placeholder="请选择">
                   <el-option
                     v-for="item in cities"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                     <span style="float: left">{{ item.label }}</span>
                     <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                   </el-option>
                 </el-select>

               </div>
               <div class="maps-four mp">
                 <el-row>
                   <el-button type="primary" @click="Submission">提交</el-button>
                 </el-row>
               </div>
             </div>
        </el-tab-pane>
        <el-tab-pane label="公司设置" name="second">
          <div class="Companysetup">
              <div class="Companysetup-img">
                logo
                <span>50*50</span>
              </div>
            <div class="Companyset-logo">传感器大数据监管平台</div>
            <div class="Companyset-btn" @click="Combtn"><img src="../../icon/flow/pic_flow6.png" alt=""></div>
            <div class="Companyset-time">创建时间：{{timeNow}}</div>
          </div>
          <!--遮罩层-->
          <el-dialog title="编辑信息" :visible.sync="Range">
           <div class="on">
             <span style="position: absolute;top: 13px;left: 14.5%;">公司名称：</span>
             <el-input v-model="input" placeholder="请输入内容"></el-input> </div>
            <div class="on" style="margin-top: 20px">
              <span style="position: absolute;margin-top: 10px;left: 12%">公司LOGO：</span>
              <el-upload
                class="upload-demo"
                ref="upload"
                multiple:false
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-change="handleChange"
                :on-success="yuy"
                :file-list="fileList3">
                <el-button size="small" type="primary">图片</el-button>
              </el-upload>
            </div>
         <div class="ons" style="margin-top:20px;">
           <el-row>
             <el-button type="primary" @click="uploads">上传</el-button>
           </el-row>
         </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="自定义项" name="third">自定义项</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import { formatDate } from '@/common/js/date.js'
  export default {
    name: '',
    data() {
      return {
        activeName: 'second',
        timeNow:'2018-11-14 12：08',
        input:'',
        Range:false,
        fileList3: [{
          name: 'pic_images1.png ',
          url: ''
        }],
        cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        value6: ''
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      Combtn(){
        this.handleRemove();
        this.Range = true;

      },
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-1);
      },
      // 上传
      uploads(){
        this.$message({
          message: '上传成功',
          type: 'success'
        });
        this.$refs.upload.submit()
        // this.Range = false;
      },
      handleRemove() {
        // console.log(file, fileList);
      },
      handlePreview(file) {
        alert(888)
        console.log(file);
      },
      yuy(response, file, fileList){
        console.log(response, file, fileList)
      },
      Submission(){
        alert(9999);
      }
    },
    mounted() {

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
  .Companysetup{
    width: 783px;
    height: 200px;
    border:1px solid #DBDBDB;
    margin: 10% auto;
    box-shadow: 1px 2px 10px #ccc;
    position: relative;
    .Companysetup-img{
      width: 100px;
      height: 100px;
      border:1px dashed #DBDBDB;
      font-size: 24px;
      line-height: 100px;
      text-align: center;
      position: relative;
      margin: 50px 30px 50px 50px;
      float: left;
      color:#ccc;
      span{
        font-size: 12px;
        position: absolute;
        bottom: -69px;
        right: 32px;
        color:#ccc;
      }
    }
    .Companyset-logo{
      font-size: 24px;
      float: left;
      margin-top: 85px;
    }
    .Companyset-btn{
      position: absolute;
      width: 24px;
      height: 24px;
      top:20px;
      right: 20px;
      img{
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    .Companyset-time{
      position: absolute;
      width: 172px;
      height: 12px;
      font-size: 12px;
      bottom: 20px;
      right: 20px;
    }
    .maps{
      width: 400px;
      height: 350px;
    }
   .mp{
     width: 100%;
     height: 40px;
     background: salmon;
     margin-top: 20px;
   }
  }
</style>
<style>
  #mapsettings .el-tabs__nav-scroll{
    height: 46px;
  }
  #mapsettings .el-tabs__content{
    height: 500px;
  }
  #mapsettings .el-tabs__nav{
    height: 46px;
  }
  #mapsettings .el-dialog{
    width: 558px;
    height: 300px;
    margin-top: 32vh!important;
  }
  #mapsettings .el-dialog__header{
    background: #49B9BC;

  }
  #mapsettings .el-dialog__title{
    font-size: 16px;
    color:#fff;
  }
  #mapsettings .el-dialog__close{
    font-size: 17px;
    color:#fff;
  }
  #mapsettings .upload-demo{
    width: 59%;
    height: 40px;
    float: left;
    position: relative;
    margin-left: 30%;
    border:1px solid #dcdfe6;
    border-radius: 4px;
  }
  #mapsettings .on{
    height: 40px;
    width: 100%;
    position: relative;
  }
  #mapsettings .ons{
    height: 40px;
    width: 100%;
    position: relative;
  }
  #mapsettings .el-upload-list{
    width: 50%;
    position: absolute;
  }
  #mapsettings .on .el-input__inner{
    margin-left: 19%;
    width: 59.5%;
  }
  #mapsettings .el-upload{
    position: absolute;
    right: 5px;
    top:5px;
  }
  #mapsettings .el-dialog__body{
  padding: 48px 20px;
  }
  .on .el-button--primary{
    background: #409EFF;
  }
  .ons .el-button--primary{
    width: 309px;
    height: 40px;
    margin-left: 99px;
  }
  .el-tab-pane{
    height: 500px;
  }
  .maps{
    width: 654px;
    height: 350px;
    margin: 0 auto;
    position: relative;
    font-size: 16px;
  }
  .mp{
    width: 100%;
    height: 40px;
    margin-top: 20px;
  }
  .maps-one .el-input__inner{
    float: left;
    margin-left: 118px;
    margin-top: 3px;
    width: 389px;
    height: 32px;
  }
  .maps-one .el-button{
    position: absolute;
    top: 5px;
    right: 28px;
    width: 90px;
    height: 32px;
    font-size: 16px;
  }
  .maps-two .el-input__inner{
    float: left;
    margin-top: 3px;
    margin-left: 118px;
    width: 389px;
    height: 32px;
  }
  .maps-two{
    position: relative;
  }
  .maps-two .el-button{
    width: 90px;
    height: 32px;
    position: absolute;
    top: 5px;
    right: 28px;
    font-size: 16px;
    background: #00CCCB;
  }
  #mapsettings .maps-three .el-select{
    margin-top: 3px;
    margin-left: -261px;
    width: 389px;
    height: 32px;
  }
  .maps-three .el-input__inner{
    margin-left: 118px;
    margin-top: 0px;
    width: 389px;
    height: 32px;
  }
  .maps-three .el-select{
    height: 32px!important;
  }
  .maps-three .el-input__suffix{
    right: -99px;
    font-weight: 800;
  }
  .maps-four .el-button{
    width: 388px;
    height: 32px;
    position: absolute;
    top: 5px;
    right: 144px;
    font-size: 16px;
    line-height: 7px;
  }
</style>
