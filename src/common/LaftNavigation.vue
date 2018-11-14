<template>
      <div class="map-LeftNavigation-li" @click="Leftbut(index)">
        <div class="map-LeftNavigation-li-spant"><img :src='imgs' alt=""></div>
        <div class="map-LeftNavigation-li-spanb">{{test}}</div>
    </div>
</template>
<script>
  export default {
    props: ['test', 'imgs', 'index'],
    data() {
      return {}
    },
    methods: {
      Leftbut(index) {
        console.log(index, 7);
        this.$emit('Leftbut', ['index'])
      }
    },

    computed: {},
    mounted() {

    }
  }
</script>
<style lang="less" scoped>

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
  .map-LeftNavigation-li {
    width: 100%;
    height: 13%;
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

/*  .map-LeftNavigation-but {
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
  }*/

  .map-LeftNavigation-but:hover {
    background: #fdd974;
  }

  .map-LeftNavigation-li-spant {
    width: 100%;
    height: 60%;
  }

  .map-LeftNavigation-li-spant img {
    margin-top: 12px;
  }

  .map-LeftNavigation-li-spanb {
    width: 100%;
    height: 40%;
    font-size: 12px;
    color: #fff;
    line-height: 31px;
  }
</style>
