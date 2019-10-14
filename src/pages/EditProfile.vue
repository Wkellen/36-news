<template>
<div>
  <!-- 编辑页头部组件 -->
  <HeaderEdit title="编辑资料"/>

  <!-- 头像 -->
  <div class="head">
    <img src="../../static/default.jpg" alt="">
  </div>
  <!-- 导入条形组件 -->
  <CellBar label="昵称" text="吉山网友" />
  <CellBar label="密码" text="123" />
  <CellBar label="性别" text="男" />
</div>

</template>

<script>
// 引入编辑页头部组件
import HeaderEdit from "@/components/HeaderEdit"
import CellBar from "@/components/CellBar"

export default {
    components:{
        HeaderEdit,
        CellBar
    }
}
</script>

<style scoped lang="less">
  .head{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;

    img{
      display: block;
      width: 80 / 320 * 100vw;
      height: 80 / 320 * 100vw;
      border-radius: 50%
    }
  }
</style>