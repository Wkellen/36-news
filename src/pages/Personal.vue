<template>
  <div>
    <div class="profile">
      <img src="http://img5.imgtn.bdimg.com/it/u=3022648694,4206294211&fm=26&gp=0.jpg" alt="">

      <div class="profile-center">
          <div class="name">
              <span class="iconfont iconxingbienan"></span>
              火星网友
          </div>
          <div class="time">
            2019-10-09
          </div>
      </div>
         <span class="iconfont iconjiantou1"></span>
    </div>

    <!-- 调用条形组件 -->
    <CellBar></CellBar>
  </div>
</template>

<script>
// 引入组件
import CellBar from '@/components/CellBar'


export default {
  components:{
    CellBar
  }
}
</script>

<style scoped lang="less">

.profile{
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #eee solid;

  img{
    width: 70 / 320 * 100vw;
    height: 70 / 320 * 100vw;
    border-radius: 50%;
    object-fit: cover;    //不让头像拉伸，保持原样
  };
  .profile-center{
    flex: 1;
    padding: 0px 10px;
  };
  .name{
    span{
      color: #75b9eb
    }
  }
  .time{
    color: #999;
    font-size: 14px;
    margin-top: 5px;
  }
}

</style>