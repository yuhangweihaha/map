<template>
  <div id="login">
    <img src="../assets/images/pic_logins.jpg" alt="">
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
  /*background-image: url('../assets/images/pic_logins.jpg');*/
  /*background-repeat: repeat-y;*/
  img{
    width: 100%;
    height: 100%;
  }
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
</style>
<!--
<template>
  <div>
    <input type="text" placeholder="请输入..." v-model="searchVal">
    <ul>
      <li v-for="(item,index) in NewItems" :key="index" :value="item.value" v-text="item.name"></li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        searchVal: "",
        items: [
          {
            name: "上海",
            value: "sh"
          },
          {
            name: "北京",
            value: "bj"
          },
          {
            name: "重庆",
            value: "cq"
          },
          {
            name: "嗨嗨嗨",
            value: "hhh"
          },
          {
            name: "海上",
            value: "hs"
          },
          {
            name: "京都",
            value: "jd"
          }
        ]
      };
    },
    methods: {},
    computed: {
      NewItems() {
        var _this = this;
        var NewItems = [];
        this.items.map(function(item) {
          if (item.name.search(_this.searchVal) != -1) {
            NewItems.push(item);
          }
        });
        return NewItems;
      }
    }
  };
</script>
-->



<!--<template>
<div id="app">
  <input type="text" v-model='search' />
  <ul v-for="item in searchData ">
    <li>{{item.name}},价格:￥{{item.price}}</li>
  </ul>
</div>
</template>
<script>
  export default {
    name: "HelloWorld",
    data() {
      return{
        search: '',
        products: [{
          name: '苹果',
          price: 25,
          category: "水果"
        }, {
          name: '香蕉',
          price: 15,
          category: "水果"
        }, {
          name: '雪梨',
          price: 65,
          category: "水果"
        }, {
          name: '宝马',
          price: 2500,
          category: "汽车"
        }, {
          name: '奔驰',
          price: 10025,
          category: "汽车"
        }, {
          name: '柑橘',
          price: 15,
          category: "水果"
        }, {
          name: '奥迪',
          price: 25,
          category: "汽车"
        }, {
          name: '火龙果',
          price: 25,
          category: "工具"
        }]
      }

    },
    computed: {
      searchData: function() {
        var search = this.search;
        if (search) {
          return this.products.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }

        return this.products;
      }
    }
  }
</script>-->



<!--<template>
  <div class="dormitory">
    <div class="searchWord">
      <div style="display: inline-block"> 搜索：</div>
      <el-input v-model="search" style="display: inline-block;width: 1300px"
                placeholder="请输入搜索内容">
      </el-input>
    </div>
     &lt;!&ndash;遍历表格&ndash;&gt;
    <div class="dormitoryData">
      <el-table
        ref="dormitoryTable"
        :data="tables"
        tooltip-effect="dark"
        stripe
        style="width: 100%">
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column label="序号"  type="index" width="65"></el-table-column>
        <el-table-column label="人物" prop="people">
        </el-table-column>
        <el-table-column label="关系" prop="relationship">
        </el-table-column>
        <el-table-column label="初见" prop="meet">
        </el-table-column>
        <el-table-column label="地点" prop="place">
        </el-table-column>
        <el-table-column label="昵称" prop="execg">
        </el-table-column>
        <el-table-column label="认识年限" prop="year">
        </el-table-column>
        <el-table-column label="成名之作" prop="works">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dormitory: [{
          people: '雷森',
          relationship: '大学室友',
          meet: '2010-09-02',
          place: '图书馆',
          execg: '胖子',
          year: '8年',
          works: '海阔天空'
        }, {
          people: '刘利伟',
          relationship: '大学室友',
          meet: '2010-09-02',
          place: '5#633',
          execg: '老大',
          year: '8年',
          works: '勇气'
        }, {
          people: '李金龙',
          relationship: '大学室友',
          meet: '2010-09-02',
          place: '5#633',
          execg: '二哥',
          year: '8年',
          works: '遇见'
        }, {
          people: '马康',
          relationship: '大学室友',
          meet: '2010-09-02',
          place: '餐饮大厦',
          execg: '康哥',
          year: '8年',
          works: '不再联系'
        }, {
          people: '牛光卫',
          relationship: '大学室友',
          meet: '2010-09-02',
          place: '图书馆',
          execg: '牛牛娃',
          year: '8年',
          works: '断点'
        }, {
          people: '陆兆攀',
          relationship: '大学室友',
          meet: '1991-07-27',
          place: '百浪',
          execg: '帅哥',
          year: '27年',
          works: '不再犹豫'
        }, {
          people: '小甜',
          relationship: '亲密的人',
          meet: '2016-10-05',
          place: '小寨',
          execg: '甜甜圈',
          year: '2年',
          works: 'Forever Love'
        }],
        search: ''
      }
    },
    computed: {
      // 模糊搜索
      tables () {
        const search = this.search;
        if (search) {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.dormitory.filter(data => {
            // some() 方法用于检测数组中的元素是否满足指定条件;
            // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。
            // 注意： some() 不会改变原始数组。
            return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(data[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.dormitory
      }
    },
    methods: {
    }
  }
</script>-->

<!--<template>
  <div>
    <el-input v-model="tableDataName" placeholder="请输入姓名" style="width:240px"></el-input>
    <el-button type="primary" @click="doFilter">搜索</el-button>
    <el-button type="primary" @click="openData">展示数据</el-button>
    <el-table
      :data="tableDataEnd"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItems">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableDataBegin: [
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            date: "2016-05-03",
            name: "王二虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            date: "2016-05-04",
            name: "王二虎",
            address: "上海市普陀区金沙江路 1516 弄"
          },
          {
            date: "2016-05-05",
            name: "王三虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-06",
            name: "张三虎",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            date: "2016-05-07",
            name: "赵小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            date: "2016-05-08",
            name: "于小虎",
            address: "上海市普陀区金沙江路 1516 弄"
          }
        ],
        tableDataName: "",
        tableDataEnd: [],
        currentPage: 4,
        pageSize: 2,
        totalItems: 0,
        filterTableDataEnd:[],
        flag:false
      };
    },
    created() {
      this.totalItems = this.tableDataBegin.length;
      if (this.totalItems > this.pageSize) {
        for (let index = 0; index < this.pageSize; index++) {
          this.tableDataEnd.push(this.tableDataBegin[index]);
        }
      } else {
        this.tableDataEnd = this.tableDataBegin;
      }
    },
    methods: {
      //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
      //用两个变量接收currentChangePage函数的参数
      doFilter() {
        if (this.tableDataName == "") {
          this.$message.warning("查询条件不能为空！");
          return;
        }
        this.tableDataEnd = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd=[]
        this.tableDataBegin.forEach((value, index) => {
          if(value.name){
            if(value.name.indexOf(this.tableDataName)>=0){
              this.filterTableDataEnd.push(value)
            }
          }
        });
        //页面数据改变重新统计数据数量和当前页
        this.currentPage=1
        this.totalItems=this.filterTableDataEnd.length
        //渲染表格,根据值
        this.currentChangePage(this.filterTableDataEnd)
        //页面初始化数据需要判断是否检索过
        this.flag=true
      },
      openData() {},
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.handleCurrentChange(this.currentPage);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        //需要判断是否检索
        if(!this.flag){
          this.currentChangePage(this.tableDataEnd)
        }else{
          this.currentChangePage(this.filterTableDataEnd)
        }
      }, //组件自带监控当前页码
      currentChangePage(list) {
        let from = (this.currentPage - 1) * this.pageSize;
        let to = this.currentPage * this.pageSize;
        this.tableDataEnd = [];
        for (; from < to; from++) {
          if (list[from]) {
            this.tableDataEnd.push(list[from]);
          }
        }
      }
    }
  };
</script>-->

<!--<template>
  <div>
    <el-input v-model="tableDataName" placeholder="请输入姓名" style="width:240px"></el-input>
    <el-button type="primary" @click="doFilter">搜索</el-button>
    <el-button type="primary" @click="openData">展示数据</el-button>
    <el-table
      :data="tableDataEnd"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItems">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableDataBegin: [
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            date: "2016-05-03",
            name: "王二虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            date: "2016-05-04",
            name: "王二虎",
            address: "上海市普陀区金沙江路 1516 弄"
          },
          {
            date: "2016-05-05",
            name: "王三虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-06",
            name: "王三虎",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            date: "2016-05-07",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            date: "2016-05-08",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄"
          }
        ],
        tableDataName: "",
        tableDataEnd: [],
        currentPage: 4,
        pageSize: 2,
        totalItems: 0,
        filterTableDataEnd:[],
        flag:false
      };
    },
    created() {
      this.totalItems = this.tableDataBegin.length;
      if (this.totalItems > this.pageSize) {
        for (let index = 0; index < this.pageSize; index++) {
          this.tableDataEnd.push(this.tableDataBegin[index]);
        }
      } else {
        this.tableDataEnd = this.tableDataBegin;
      }
    },
    methods: {
      //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
      //用两个变量接收currentChangePage函数的参数
      doFilter() {
        if (this.tableDataName == "") {
          this.$message.warning("查询条件不能为空！");
          return;
        }
        this.tableDataEnd = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd=[]
        this.tableDataBegin.forEach((value, index) => {
          if(value.name){
            if(value.name.indexOf(this.tableDataName)>=0){
              this.filterTableDataEnd.push(value)
            }
          }
        });
        //页面数据改变重新统计数据数量和当前页
        this.currentPage=1
        this.totalItems=this.filterTableDataEnd.length
        //渲染表格,根据值
        this.currentChangePage(this.filterTableDataEnd)
        //页面初始化数据需要判断是否检索过
        this.flag=true
      },
      openData() {},
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.handleCurrentChange(this.currentPage);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        //需要判断是否检索
        if(!this.flag){
          this.currentChangePage(this.tableDataEnd)
        }else{
          this.currentChangePage(this.filterTableDataEnd)
        }
      }, //组件自带监控当前页码
      currentChangePage(list) {
        let from = (this.currentPage - 1) * this.pageSize;
        let to = this.currentPage * this.pageSize;
        this.tableDataEnd = [];
        for (; from < to; from++) {
          if (list[from]) {
            this.tableDataEnd.push(list[from]);
          }
        }
      }
    }
  };
</script>-->




