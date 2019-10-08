<template>
  <div id="app">
      
      <router-view></router-view>

  </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    }
}
</script>

<style>
    /* 公共样式 */
    /* 阿里妈妈字体图标在线网址 */
    @import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');
    @import url('../node_modules/vant/lib/index.css');
    
    *{
        margin: 0;
        padding: 0;
    }

    a{
        color:inherit;
    }
    a:hover{
        text-decoration: none;
    }
    ol,ul,li{
        list-style: none;
    }
    i,em{
        font-style: normal;
    }
</style>