<template>
  <div>
    <!-- 编辑页头部组件 -->
    <HeaderEdit title="编辑资料" />

    <!-- 头像 -->
    <div class="head">
      <img :src="profile.head_img" alt />
      <van-uploader :after-read="afterRead" class="uploader" />
    </div>
    <!-- 导入昵称条形组件 -->
    <CellBar label="昵称" :celltext="profile.nickname" @click="show1 = !show1" />
    <!-- 弹出层 -->
    <!-- :value读取昵称，点取消不会被修改 -->
    <van-dialog v-model="show1" title="编辑昵称" @confirm="handleNickname" show-cancel-button>
    <!-- 编辑昵称输入框 -->
      <van-field :value="profile.nickname" placeholder="请输入新昵称" ref="nickname" />
    </van-dialog>

    <!-- 导入密码条形组件 -->
    <CellBar label="密码" :celltext="profile.password" type="password" @click="show2 = !show2" />
    <!-- 弹出层 -->
    <van-dialog v-model="show2" title="修改密码" @confirm="handlePassword" show-cancel-button>
    <!-- 编辑密码输入框 -->
      <van-field placeholder="请输入新密码" ref="password" />
    </van-dialog>

    <!-- 导入性别条形组件 -->
    <CellBar label="性别" :celltext="profile.gender === 1 ? '男' : '女'" @click="show3 = !show3" />
    <!-- 弹出层 -->
    <van-dialog v-model="show3" title="编辑性别" @confirm="handleGender" show-cancel-button>
      <!-- 性别选择组件 -->
      <van-radio-group v-model="genderCache">
        <van-cell-group>
          <van-cell title="男" clickable @click="genderCache = '1'">
            <van-radio slot="right-icon" name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="genderCache = '0'">
            <van-radio slot="right-icon" name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
// 引入编辑页头部组件
import HeaderEdit from "@/components/HeaderEdit";
import CellBar from "@/components/CellBar";

export default {
  data() {
    return {
      profile: {},
      // 昵称弹窗
      show1: false,
      // 密码弹窗
      show2: false,
      // 性别弹窗
      show3: false,
      // 储存性别
      genderCache:"1"
    };
  },

  components: {
    HeaderEdit,
    CellBar
  },

  methods: {
    // 封装编辑接口的函数
    //data表示要传给服务器的数据
    editprofile(data, callback) {
      // 判断是否有传入数据
      if (!data) {
        return;
      }
      this.$axios({
        url: `/user_update/` + localStorage.getItem("user_id"),
        method: "POST",
        headers: { Authorization: localStorage.getItem("token") },
        data
      }).then(res => {
        const { message } = res.data;
        // 如果成功提示
        if (message === "修改成功") {
          // 传入回调函数
          // 也可以这样写callback && callback()
          if (callback) {
            callback();
          }
          this.$toast.success(message);
        }
      });
    },

    // 将图片上传给服务器并修改头像
    afterRead(file) {
      // 触发回调函数获取文件对象
      // console.log(file);
      // 构造表单
      const formdata = new FormData();
      // 添加表单数据
      formdata.append("file", file.file);

      // 将表单数据发送给服务器
      this.$axios({
        url: "/upload",
        method: "POST",
        // 添加头信息
        headers: { Authorization: localStorage.getItem("token") },
        //  上传表单数据
        data: formdata
      }).then(res => {
        const { data } = res.data;
        // 用响应数据的图片链接替换用户头像
        this.profile.head_img = this.$axios.defaults.baseURL + data.url;

        //  完全修改用户的头像,调用函数
        this.editprofile({ head_img: data.url });
      });
    },

    // 编辑昵称确认键触发事件
    handleNickname() {
      // 拿到输入框的值
      const value = this.$refs.nickname.$refs.input.value;

      // 提交到服务器接口
      this.editprofile({ nickname: value }, () => {
        this.profile.nickname = value;
      });
    },
    // 编辑密码确认键触发事件
    handlePassword() {
      // 拿到输入框的值
      const value = this.$refs.password.$refs.input.value;

      // 提交到服务器接口
      this.editprofile({ password: value });
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
      // 如果有返回data数据的话
      if (data) {
        this.profile = data;
        // 把接收到数据的性别值赋值给genderCache
        this.genderCache = String(data.gender);

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