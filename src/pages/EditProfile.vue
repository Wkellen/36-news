<template>
  <div>
    <!-- 编辑页头部组件 -->
    <HeaderEdit title="编辑资料" />

    <!-- 头像 -->
    <div class="head">
      <img :src="profile.head_img" alt />
      <van-uploader :after-read="afterRead" class="uploader" />
    </div>
    <!-- 导入条形组件 -->
    <CellBar label="昵称" :text="profile.nickname" />
    <CellBar label="密码" :text="profile.password" type="password" />
    <CellBar label="性别" :text="profile.gender === 1 ? '男' : '女'" />
  </div>
</template>

<script>
// 引入编辑页头部组件
import HeaderEdit from "@/components/HeaderEdit";
import CellBar from "@/components/CellBar";

export default {
  data() {
    return {
      profile: {}
    };
  },

  components: {
    HeaderEdit,
    CellBar
  },

  methods: {
    // 将图片上传给服务器并修改头像
    afterRead(file) {
      // 触发回调函数获取文件对象
      // console.log(file);
      // 构造表单
      const formdata = new FormData
      // 添加表单数据
      formdata.append("file",file.file)

      // 将表单数据发送给服务器
      this.$axios({
        url:"/upload",
        method:"POST",
      // 添加头信息
      headers: {  Authorization: localStorage.getItem("token")},
      //  上传表单数据
       data:formdata
     }).then(res => {
       const {data} = res.data;
      // 用响应数据的图片链接替换用户头像
       this.profile.head_img = this.$axios.defaults.baseURL + data.url;
       
      //  完全修改用户的头像
      this.$axios({
        url:`/user_update/` +localStorage.getItem("user_id"),
        method:"POST",
        headers: { Authorization: localStorage.getItem("token")},
        data:{
          head_img:data.url
        }      
      }).then(res => {
        const {message} =res.data;
        if(message ==="修改成功"){
          this.$toast.success(message)
        }
      })
     })
    }
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
};
</script>

<style scoped lang="less">
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  position: relative;

  .uploader {
    position: absolute;
    opacity: 0;
  }
  img {
    display: block;
    width: 80 / 320 * 100vw;
    height: 80 / 320 * 100vw;
    border-radius: 50%;
  }
}
// 修改第三方组件的样式前面加上/deep/
/deep/ .van-uploader__upload {
  width: 80 / 320 * 100vw;
  height: 80 / 320 * 100vw;
}
</style>