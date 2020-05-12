<template>
  <div class="container van-hairline--top">
    <div class="top-main-box">
      <div>
        <div class="logo-box">
          <img class="logo"
               src=""
               alt="">
        </div>
        <div class="version-box">V1.1.0</div>
      </div>
      <div class="cell-group-box">
        <van-cell :class="index !=2 ?'no-border': ''"
                  v-for="(item, index) in cellItems"
                  :key="index"
                  :title="item.text"
                  is-link
                  @click="goNextPage(index)" />
      </div>

    </div>
    <div class="web-box">www.apicloud.com</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      cellItems: [
        { text: '功能介绍' },
        { text: '法律声明' },
        { text: '用户协议' }
      ]
    }
  },
  methods: {
    goNextPage (i) {
      mpvue.navigateTo({
        url: `/pages/about/detail/main?idx=${i + 1}&tit=${this.cellItems[i].text}`
      })
    }
  }
}
</script>
<style scope>
.container {
  background-color: #fff;
}
.top-main-box {
  flex: 1;
}
.logo-box {
  padding: 40px 0 10px;
}
.logo {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: #97d700;
  margin: 0 auto;
}
.version-box {
  text-align: center;
}
.cell-group-box {
  margin-top: 30px;
}
.web-box {
  text-align: center;
  font-size: 13px;
  color: #666666;
  height: 58px;
  line-height: 58px;
}
</style>
<style>
.van-cell {
  padding: 16px 13px !important;
}
.van-cell:after {
  width: 92% !important;
}
</style>