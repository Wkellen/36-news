<template>
<div>
  <!-- 编辑页头部组件 -->
  <HeaderEdit title="编辑资料"/>

  <!-- 头像 -->
  <div class="head">
    <img :src="profile.head_img" alt="">
  </div>
  <!-- 导入条形组件 -->
  <CellBar label="昵称" :text="profile.nickname" />
  <CellBar label="密码" :text="profile.password" type="password" />
  <CellBar label="性别" :text="profile.gender === 1 ? '男' : '女'" />
</div>

</template>

<script>
// 引入编辑页头部组件
import HeaderEdit from "@/components/HeaderEdit"
import CellBar from "@/components/CellBar"

export default {

    data(){
      return{
        profile:{
          
        }
      }
    },
    components:{
        HeaderEdit,
        CellBar
    },

      mounted() {
    // 发送ajax请求发送用户账户信息，获取返回的用户信息进行渲染
    this.$axios({
      url: "user/" + localStorage.getItem("user_id"),
      // 添加头信息
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      if (data) {
        this.profile = data;

        if (data.head_img) {
          this.profile.head_img =
            this.$axios.defaults.baseURL + this.profile.head_img;
        } else {
          this.profile.head_img = "./static/default.jpg";
        }
      }
    });
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