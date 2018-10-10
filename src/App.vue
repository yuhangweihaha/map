<template>
  <div id="app">
    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
      return{

      }
  },
  methods:{

  },
}


</script>

<style>
#app {
  width: 100%;
  height: 100%;
  background: lightgoldenrodyellow;
  box-shadow: 0px 1px 15px rgba(238, 133, 0, 0.98) inset;
}
.clr { background-color:pink; }
.oneStyle { color:blue; font-size: 33px;}
.twoStyle { font-size: 33px;}
</style>
