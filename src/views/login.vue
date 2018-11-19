<template>
  <div id="login">
    <!--<img src="@/assets/images/pic_3.gif" alt="">-->
    <!--<img src="@/../static/slider/pic_3.gif" alt="">-->
    <img src="@/assets/images/login/zy_login.png" alt="">
    <div class="LoginSignIn">
      <!--logo-->
      <div class="logins">
       <div class="login"><img src="../assets/images/login/zy_logo.png" alt=""></div>
        <div class="loginw"><img src="../assets/images/login/zy_logo2.png" alt=""></div>
      </div>
      <!--登录input按钮-->
      <div class="LeftLo">
        <div class="LoginSignInLeft lo"><el-input placeholder="请输入用户名" prefix-icon="el-icon-phoneBook" v-model="loginForm.username"></el-input></div>
        <div class="LoginSignInRight lo"><el-input  type="password" placeholder="请输入密码" prefix-icon=" el-icon-password" @keyup.enter.native="loginIn()" v-model="loginForm.password"></el-input></div>
        <!--<div class="LoginSignInBut" @click="loginIn">登录</div>-->
        <el-button type="primary" size="medium " @click="loginIn">登录</el-button>
        <div class="check">
          <el-tooltip class="item" effect="dark" content="欢迎来到智慧城市" placement="right-end"><el-checkbox v-model="checked">记住密码</el-checkbox></el-tooltip>

        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    data() {
      return {
        loginForm:{
          username:'',
          password:'',
        },
        checked:false
      }
    },

    methods: {
      loginIn() {
        let self = this;
        if(this.loginForm.username === '' || this.loginForm.password === ''){
          this.$message('账号密码不能为空');
        }else{
          if (self.checked === true) {
            //传入账号名，密码，和保存天数3个参数
            self.setCookie(self.loginForm.username, self.loginForm.password,self.checked, 7);
            }else {
            //清空Cookie
            self.clearCookie();
          }
          self.$router.push({path: '/map'})
        }
        },
      //设置cookie
      setCookie(c_name, c_pwd, c_check, exdays) {
        let exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "ZhengyuanWisdomCityUserName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "ZhengyuanWisdomCityuserPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "ZhengyuanWisdomCitychecked" + "=" + c_check + ";path=/;expires=" + exdate.toGMTString();
        console.log(c_check,'c_check');
      },
      //读取cookie
      getCookie: function() {
        const _this = this;
        if (document.cookie.length > 0) {
          let arr = document.cookie.split('; ');
          for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].split('=');
            //判断查找相对应的值
            if (arr2[0] == 'ZhengyuanWisdomCityUserName') {
              this.loginForm.username = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] == 'ZhengyuanWisdomCityuserPwd') {
              this.loginForm.password = arr2[1];
            } else if(arr2[0] == 'ZhengyuanWisdomCitychecked'){
              _this.checked = !!arr2[1];         //保存记住密码的状态
            }
          }
        }
      },
      //清除cookie
      clearCookie: function() {
        this.setCookie("", "", "", -1); //修改2值都为空，天数为负1天
      }
      },
    mounted(){
       this.getCookie();
        }
    }


</script>

<style lang="less" scoped>
  #login {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /*background-image: url('../assets/images/pic_logins.jpg');*/
    /*background-repeat: repeat-y;*/
    img {
      width: 100%;
      height: 100%;
    }
  }
  .LoginSignIn {
    width: 450px;
    height: 286px;
    position: absolute;
    bottom: 22.5%;
    left: 33%;
    .check{
      width: 80px;
      height: 20px;
      position: absolute;
      right: 65%;
      bottom: 1%;
    }
  }
  .LeftLo{
    width: 300px;
    height: 150px;
    margin-top: 25px;
    margin-left: 17%;
  }
  #login{
    img{
      height: 110%;
    }
  }
 /* @media (min-width: 1280px) {
    .logins .loginw{
      width: 315px;
      margin-right: 59px;
    }
    .logins .login{
     width: 75px;
     height: 75px;
   }
  }*/
  @media (min-width: 1360px){
    .LoginSignIn {
      width: 450px;
      height: 286px;
      position: absolute;
      bottom: 22.5%;
      left: 33%;
      .check{
        width: 80px;
        height: 20px;
        position: absolute;
        right: 65%;
        bottom: 1%;
      }
    }
    .LeftLo{
      width: 300px;
      height: 150px;
      margin-top: 25px;
      margin-left: 17%;
    }
    #login{
      img{
        height: 110%;
      }
    }
  }
  @media (min-width: 1400px){
    .LoginSignIn {
      width: 450px;
      height: 286px;
      position: absolute;
      bottom: 26.5%;
      left: 34%;
      .check{
        width: 80px;
        height: 20px;
        position: absolute;
        right: 65%;
        bottom: 1%;
      }
    }
  }
  @media (min-width: 1440px){
    .LoginSignIn {
      width: 450px;
      height: 286px;
      position: absolute;
      bottom: 24.5%;
      left: 34%;
      .check{
        width: 80px;
        height: 20px;
        position: absolute;
        right: 65%;
        bottom: 1%;
      }
    }

  }
  @media (min-width: 1600px){
    .LoginSignIn {
      width: 450px;
      height: 286px;
      position: absolute;
      bottom: 24.5%;
      left: 36%;
      .check{
        width: 80px;
        height: 20px;
        position: absolute;
        right: 65%;
        bottom: 1%;
      }
    }
    .LeftLo{
      width: 300px;
      height: 150px;
      margin-top: 25px;
      margin-left: 17%;
    }
    #login{
      img{
        height: 110%;
      }
    }
  }
  @media (min-width: 1680px){
    .LoginSignIn {
      width: 450px;
      height: 286px;
      position: absolute;
      bottom: 29%;
      left: 36.6%;
      .check{
        width: 80px;
        height: 20px;
        position: absolute;
        right: 65%;
        bottom: -10%;
      }
    }
    .LeftLo{
      width: 300px;
      height: 150px;
      margin-top: 55px;
      margin-left: 17%;
    }
  }
  @media (min-width: 1920px){
    .LoginSignIn {
      width: 450px;
      height: 286px;
      position: absolute;
      bottom: 30%;
      left: 38%;
      .check{
        width: 80px;
        height: 20px;
        position: absolute;
        right: 65%;
        bottom: -10.5%;
        color:#fff;
      }
    }
    .LeftLo{
      width: 300px;
      height: 150px;
      margin-top: 57px;
      margin-left: 17%;
    }
  }
  .lo {
    width: 297px;
    height: 38px;
    color: #fff;
    font-size: 16px;
    border-radius: 4px;
    margin-bottom: 14px;
    input {
      width: 100%;
      height: 100%;
      text-indent: 25px;
      border:0;
    }
  }
.logins{
  width: 449px;
  height: 85px;
  .login{
    width: 85px;
    height: 85px;
    float: left;
  }
  .loginw{
    width: 362px;
    height: 56px;
    float: right;
    margin-left: 2px;
    margin-top: 11px;
  }
}
  .LoginSignInLeft {

    left: 5%;
  }

  .LoginSignInRight {
    left: 46%;
  }
  .LoginSignInLeft input {
    background-image: url('../assets/images/login/zy_user.png');
    background-repeat: no-repeat;
  }

  .LoginSignInRight input {
    background-image: url('../assets/images/login/zy_password.png');
    background-repeat: no-repeat;
  }
  .LoginSignInBut {
    width: 297px;
    height: 40px;
    border-radius: 4px;
    cursor: pointer;
    background: #0B90E6;
    font-size: 18px;
    font-family:MicrosoftYaHei;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:59px;
  }
</style>
<style>
  .LeftLo .el-button--medium{
    font-size: 18px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-weight: 600;

  }
  .LeftLo .el-button--primary{
    width: 297px;
    height: 39px;
  }
  .el-input__prefix{
    color:#409EFF;
  }
 .LeftLo .el-checkbox__label{
    color:#fff;
  }
</style>
