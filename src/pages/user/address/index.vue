<template>
  <div class="container">
    <div class="main-items-box">
      <div>
        <div class="item van-hairline">
          <div class="l-info-box">
            <div class="info-top-box">
              <span class="name-box">马小哈</span>
              <span>18627636253</span>
            </div>
            <div class="info-bottom-box">北京市海淀区龙翔路甲一号泰祥商务楼508北京市</div>
          </div>
          <div class="r-btns-box">
            <van-icon name="/static/icons/edit-icon.png" />
            <van-icon name="/static/icons/del-icon.png" />
          </div>
        </div>
        <div class="item van-hairline">
          <div class="l-info-box">
            <div class="info-top-box">
              <span class="name-box">马小哈</span>
              <span>18627636253</span>
            </div>
            <div class="info-bottom-box">北京市海淀区龙翔路甲一号泰祥商务楼508北京市</div>
          </div>
          <div class="r-btns-box">
            <van-icon name="/static/icons/edit-icon.png" />
            <van-icon name="/static/icons/del-icon.png" />
          </div>
        </div>
      </div>

    </div>
    <div class="bottom-btn-box">
      <div class="bottom-btn-margin">
        <van-button color="#97D700"
                    size="small"
                    round
                    block
                    @click="goNextPage">新增地址</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {

  },
  mounted () {

  },
  methods: {
    goNextPage () {
      wx.navigateTo({
        url: '/pages/user/addaddr/main'
      })
    }
  }
}
</script>
<style scope>
.main-items-box {
  flex: 1;
}
.bottom-btn-margin {
  background-color: #fff;
  padding: 7px 15px;
}
.item {
  display: flex;
  flex-direction: row;
  padding: 0 15px 20px;
  background-color: #fff;
}
.l-info-box {
  flex: 1;
}
.info-top-box {
  font-size: 16px;
  color: #222222;
  font-weight: bold;
  line-height: 22px;
  padding: 20px 0 8px;
}
.name-box {
  margin-right: 30px;
}
.info-bottom-box {
  font-size: 13px;
  color: #999999;
  line-height: 18px;
}
.r-btns-box {
  margin-top: 39px;
}
</style>
<style>
.van-icon--image {
  width: 20px !important;
  height: 20px !important;
  padding: 10px !important;
  padding-right: 0 !important;
  margin-left: 10px !important;
}
[class*="van-hairline"]::after {
  left: 15px !important;
  width: 92% !important;
}
.van-button--small {
  color: #fff;
  height: 35px !important;
}
</style>