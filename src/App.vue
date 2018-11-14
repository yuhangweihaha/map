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
  body{
    height: 100%;
    overflow: hidden;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
#app {
  width: 100%;
  height: 100%;
  font-family: Arial;
}
.anchorBL{display:none;}
</style>
