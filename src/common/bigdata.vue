<template>
  <div>
    <div id="containers" v-show="wei"></div>
  </div>
</template>

<script>
  // import 'https://webapi.amap.com/loca?v=1.2.0&key=51817c1c590b41d2a439cdcb16d51a95 ';
  export default {
    // props: ['test', 'imgs', 'index'],
    data() {
      return {
        wei: true
      }
    },
    methods: {
      bigdatamaps() {
        // let _this = this;
        var map = Loca.create('container', {
          mapStyle: 'amap://styles/grey',
          zoom: 5,
          center: [107.4976, 32.1697],
          features: ['bg', 'road'],
          pitch: 50,
          // Loca 自 1.2.0 起 viewMode 模式默认为 3D，如需 2D 模式，请显示配置。
          // viewMode: '3D',
        });

        map.on('mapload', function () {
          map.getMap().plugin(['AMap.ControlBar'], function () {
            var controlBar = new AMap.ControlBar();
            map.getMap().addControl(controlBar);
          });
        });

        var layer = Loca.visualLayer({
          container: map,
          type: 'point',
          shape: 'circle'
        });

        layer.setData(citys, {
          lnglat: 'lnglat'
        });

        layer.setOptions({
          style: {
            // 支持动态回调，为每一个点设置半径
            radius: function (obj) {
              // 城市类型，0：省会直辖市，1：地级市，2：区县
              var style = obj.value.style;
              var r;
              if (style == 0) {
                r = 6;
              } else if (style == 1) {
                r = 3;
              } else {
                r = 1.5;
              }

              return r;
            },
            color: '#47aff7',
            borderColor: '#c3faff',
            borderWidth: 1,
            opacity: 0.8
          }
        });

        layer.render();
      },
    },

    computed: {},

    mounted() {
      this.bigdatamaps()
    }
  }
</script>
<style lang="less" scoped>
  #containers {
    width: 100%;
    height: 100%;
    opacity: .9;
    position: absolute;
    top: 0;
    z-index: 0;
  }
</style>
