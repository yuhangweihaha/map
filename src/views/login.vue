<template>
  <div id="login">
  <!--  <img src="../assets/images/pic_logins.jpg" alt="">-->
    <img src="../assets/images/login/zy_login.png" alt="">
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
          <el-tooltip class="item" effect="dark" content="可以选择是否记住密码" placement="right-end"><el-checkbox v-model="checked">记住密码</el-checkbox></el-tooltip>

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
            self.setCookie(self.loginForm.username, self.loginForm.password, 7);
          }else {
            //清空Cookie
            self.clearCookie();
          }
          self.$router.push({path: '/map'})
        }
        },
      //设置cookie
      setCookie(c_name, c_pwd, exdays) {
        let exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie: function() {
        if (document.cookie.length > 0) {
          console.log(document.cookie,'document.cookie');
          let arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'userName') {
              this.loginForm.username = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] == 'userPwd') {
              this.loginForm.password = arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie: function() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      }

      },
        created(){
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
  }
  .LeftLo .el-button--primary{
    width: 297px;
    height: 39px;
  }
  .el-input__prefix{
    color:#409EFF;
  }
  .el-checkbox__label{
    color:#fff;
  }
</style>
<!--<style>

  .head-log {
    height: 200px;
  }

  .company-log {
    width: 300px;
  }

  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
  }

  .user-defined-style {
    top: 800px;
  }

</style>

<template>

  <div class="login-wrap">
    <div class="ms-title">xx平台</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        &lt;!&ndash; `checked` 为 true 或 false &ndash;&gt;
        <el-checkbox v-model="checked">记住密码</el-checkbox>
        <br>
        <br>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>

</template>

<script>

  export default {
    data: function() {
      return {
        checked: true,
        ruleForm: {
          username: '',
          password: ''
        },
        userData: [],
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        }
      }
    },
    //页面加载调用获取cookie值
    mounted() {
      this.getCookie();
    },
    methods: {
      submitForm(formName) {
        const self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {

            //判断复选框是否被勾选 勾选则调用配置cookie方法
            if (self.checked == true) {
              console.log("checked == true");
              //传入账号名，密码，和保存天数3个参数
              self.setCookie(self.ruleForm.username, self.ruleForm.password, 7);
            }else {
              console.log("清空Cookie");
              //清空Cookie
              self.clearCookie();
            }
            console.log("登陆成功");
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //设置cookie
      setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie: function() {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'userName') {
              this.ruleForm.username = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] == 'userPwd') {
              this.ruleForm.password = arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie: function() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      }
    }
  }

</script>-->
