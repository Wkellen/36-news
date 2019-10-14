<template>
  <div>
    <router-link to="/edit_profile">
    <div class="profile">
      <!-- 读取axios的服务器基础路径拼接图片地址动态生成图片 -->
      <img :src="profile.head_img" alt />

      <div class="profile-center">
        <div class="name">
          <span class="iconfont iconxingbienan"></span>
          {{profile.nickname}}
        </div>
        <div class="time">2019-10-09</div>
      </div>
      <span class="iconfont iconjiantou1"></span>
    </div>
    </router-link>

    <!-- 调用条形组件 -->
    <CellBar label="我的关注" text="关注的用户" />
    <CellBar label="我的跟帖" text="跟帖/回复" />
    <CellBar label="我的收藏" text="文章/视频" />
    <CellBar label="注销登录" @click="handleLogout"/>
>
  </div>
</template>

<script>
// 引入组件
import CellBar from "@/components/CellBar";

export default {
  data() {
    return {
      // 个人信息
      profile: {}
    };
  },

  // 注册组件
  components: {
    CellBar
  },

  methods:{
    // 退出登录
    handleLogout(){
      // 清除token
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");

      // replace可以替换页面
      this.$router.replace('/login')
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
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #eee solid;

  img {
    width: 70 / 320 * 100vw;
    height: 70 / 320 * 100vw;
    border-radius: 50%;
    object-fit: cover; //不让头像拉伸，保持原样
  }
  .profile-center {
    flex: 1;
    padding: 0px 10px;
  }
  .name {
    span {
      color: #75b9eb;
    }
  }
  .time {
    color: #999;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>