<template>
  <div id="login">
    <div class="LoginSignIn">
      <div class="LoginSignInLeft lo" >用户名： <input type="text"></div>
      <div class="LoginSignInRight lo" >密码： <input type="password"></div>
      <div class="LoginSignInBut" @click="loginIn"></div>
      <div class="LoginSignInchekbox"><input type="checkbox">记住密码？</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    data () {
      return {

      }
    },

    methods: {
      loginIn(){
      this.$router.push({path:'/map'})
      }
    },
//      created(){
//    }

  }
</script>

<style lang="less" scoped>
#login{
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background-image: url('../assets/images/pic_logins.jpg');
  background-repeat: repeat-y;
}
.LoginSignIn{
  width: 573px;
  height: 110px;
  position: absolute;
  bottom: 49px;
  left:32%;
}
.lo{
  width: 225px;
  height: 24px;
  position: absolute;
  top:35%;
  color:#fff;
  font-size: 16px;
  input{
    width: 150px;
    height: 75%;
    text-indent: 25px;
  }
}

.LoginSignInLeft{

  left: 5%;
}
.LoginSignInRight{
    left: 46%;
  }
.LoginSignInBut{
  width: 30px;
  height: 30px;
  background-image:url('../assets/images/pic_login1.png');
  /*background-repeat: repeat-y;*/
  border-radius: 50px;
  position: absolute;
  top:33%;
  right: 8%;
  cursor: pointer;
  box-shadow: 0 2px 1px 0;
}
  .LoginSignInchekbox{
    width: 110px;
    height: 20px;
    color:#fff;
    position: absolute;
    top: 72%;
    left: 16%;
    font-size: 12px;
    input{
      margin-top: 3px;
      float: left;
    }
  }
  .LoginSignInLeft input{
    background-image: url('../assets/images/pic_login2.png');
    background-repeat: no-repeat;
  }
     .LoginSignInRight input{
       background-image: url('../assets/images/pic_login3.png');
       background-repeat: no-repeat;
     }
</style>

<!--<template>
  <div class="bg-login">
    <div class="login-header container">
    </div>
    <div class="middle-box loginscreen bg-white container">
      <div class="login-top"></div>
      <div class="login-title text-center">
        <h1>用户登录</h1>
      </div>
      <el-form inline-message :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="username">
          <el-input status-icon prefix-icon="fa fa-user" v-model="loginForm.username" placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="fa fa-lock" :type="passwordType" @keyup.enter.native="doLogin"
                    v-model="loginForm.password" placeholder="请输入密码" auto-complete="on">
          </el-input>
          <span class="show-pwd" :style="eyeStatus" @click="showPwd"><i class="icon iconfont icon-eye"></i></span>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" :loading="loading" @click.native.prevent="doLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'login',
    data() {
      return {
        loginForm:{
          username:'',
          password:''
        },
        loginRules:{
          username:[{require:true, message:'用户名不能为空',trigger:'blur'},{min:5, max:20, message:'长度在 5 到 20 个字符', trigger: 'blur'}],
          password:[{require:true,trigger:'blur'},{min:6,message:'密码长度必须6位以上',trigger:'blur'}]
        },
        loading:false,
        passwordType:'password',
        eyeStatus:''
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
          this.eyeStatus = 'color:#1296db'
        } else {
          this.passwordType = 'password'
          this.eyeStatus = ''
        }
      },
      doLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid){
            this.loading = true
          } else{
            return false
          }
        })
      }
    }
  }
</script>
<style lang="scss" >
  $dark_gray:#889aa4;
  body{
    background: url("../assets/images/pic_login1.png") no-repeat center fixed;
    background-size: cover;
  }
  .container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  .bg-white{
    background-color: #ffffff;
    opacity: 0.8;
  }
  .middle-box{
    max-width: 400px;
    z-index: 100;
    margin: 0 auto;
    padding-bottom: 10px;
  }
  .loginscreen .middle-box{
    width: 300px;
  }
  .login-top{
    background-color: #3b3127;
    height: 6px;
  }
  .login-title{
    height:130px;
    padding:30px;
    font-weight:bold;
  }
  .login-header{
    height:265px;
  }
  .login-logo{
    margin-top:40px;
  }
  .login-logo-zh,
  .login-logo-en{
    font-weight:bold;
    color:#3b3127;
  }
  .login-logo-zh{
    font-size:45px;
    font-family:"宋体";
  }
  .login-logo-en{
    font-size:21px;
    font-family:"Helvetica";
  }
  .middle-box{
    .el-input {
      display: inline-block;
    }
    .el-button {
      display: inline-block;
      width:100%;
    }
    .el-input__inner {
      text-align: center;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 2px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
</style>-->
