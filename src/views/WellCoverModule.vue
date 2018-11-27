<template>
<div id="each">
  <div ref="lineImg" class="lineEcharts"></div>
  <div ref="yuyu" class="Bargraph"></div>
  <div ref="chart" class="Piechart"></div>
  <div ref="Scatter" class="Scatterplot"></div>
</div>

</template>
<script>
  import echarts from 'echarts';
  export default {
    name: '',
    data() {
      return {
       one:[],
        two:'',
        three:'',
        four:'',
        five:'',
        six:'',
        seven:''

      }
    },

    methods: {
      // 折线图
      drawLine () {
        debugger
        let _this = this;
        // 基于准备好的dom，初始化echarts实例
        console.log(this.one,'23434');
        let myChart = echarts.init(this.$refs.yuyu);
        // 指定图表的配置项和数据
        let option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [144, 144, 456, 143, 568, 345, 111],
            type: 'line'
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      // 柱状图
      graps () {
        let arr = echarts.init(this.$refs.lineImg);
        let opt = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }]
        };
        arr.setOption(opt);
      },
      chars(){
        let brr = echarts.init(this.$refs.chart);
        let opts = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        brr.setOption(opts);
      },
      Scatter(){
        let crr = echarts.init(this.$refs.Scatter);
        let options = {
          xAxis: {},
          yAxis: {},
          series: [{
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.0, 6.95],
              [13.0, 7.58],
              [9.0, 8.81],
              [11.0, 8.33],
              [14.0, 9.96],
              [2.0, 3.24],
            ],
            type: 'scatter'
          }]
        };
        crr.setOption(options);
      },
      // 联调
      Couplet(){
        this.$http.post('/test/user')
          .then(res => {
            let arr = res.Secondcover;
            for(let i = 0 ; i < arr.length; i++){
              console.log(arr[i].date,'99878676')
              this.one = arr[i].date;
              this.two = arr[i].coordinateX;
              this.three = arr[i].coordinateY;
              this.four = arr[i].date;
              this.five = arr[i].date1;
              this.six = arr[i].date2;
              this.seven = arr[i].name;
            }

            console.log(this.one,'接口')
          })
      }
    },
    mounted(){

     this.drawLine();
     this.graps();
     this.chars();
     this.Scatter();
      this.Couplet();
    },
    created(){

    }
  }


</script>
<style lang = less scoped>
/*   #each{
     width: 100%;
     height: 100%;
   }*/
  .lineEcharts {
    width: 500px;
    height: 300px;
    float: left;
    margin-left:20%;
    margin-top: 8%;
  }
  .Bargraph{
    width: 500px;
    height: 300px;

    float: left;
    margin-left: 10%;
    margin-top: 8%;
}
  .Piechart{
    width: 500px;
    height: 300px;
    float: left;
    margin-left:20%;
    margin-top: 4%;
  }
  .Scatterplot{
    width: 500px;
    height: 300px;
    float: left;
    margin-left: 10%;
    margin-top: 4%;
  }
</style>
