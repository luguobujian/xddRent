<template>
  <div class="container">
    <div>
      <van-search :value="value"
                  placeholder="请输入搜索关键词" />
    </div>
    <div class="some-set-citys-box">
      <div>
        <div class="some-set-tit">当前定位</div>
        <div class="some-set-box">
          <div class="this-one-city">北京</div>
          <div class="get-location">
            <van-icon name="../../../static/icons/loca.png"
                      size="16px" />重新定位
          </div>
        </div>
      </div>
      <div>
        <div class="some-set-tit">最近访问</div>
        <div class="some-set-box citys-item-box">
          <div class="citys-item">北京</div>
          <div class="citys-item">北京</div>
          <div class="citys-item">北京</div>
        </div>
      </div>
      <div>
        <div class="some-set-tit">热门城市</div>
        <div class="some-set-box citys-item-box">
          <div class="citys-item">北京</div>
          <div class="citys-item">北京</div>
          <div class="citys-item">北京</div>
          <div class="citys-item">北京</div>
          <div class="citys-item">北京</div>
          <div class="citys-item">北京</div>
        </div>
      </div>
    </div>
    <div>
      <van-index-bar :scrollTop="scrollTop">
        <view v-for="(item, index) in citys"
              :key="index">
          <van-index-anchor :index="item.name" />
          <van-cell v-for="(itm, idx) in item.cities"
                    :key="idx"
                    :title="itm.name" />
        </view>
      </van-index-bar>
    </div>

  </div>
</template>
<script>
import citys from './city'

export default {
  data () {
    return {

      citys: citys.city,
      scrollTop: 0
    }
  },
  methods: {

  },
  onPageScroll (event) {
    this.scrollTop = event.scrollTop
  }
}
</script>
<style scoped>
.some-set-citys-box {
  padding: 5px 15px;
  background: #fff;
}
.some-set-tit {
  margin: 10px 0;
}
.some-set-box {
  padding-bottom: 5px;
}
.some-set-box div {
  display: inline-block;
}
.this-one-city,
.citys-item {
  color: #97d700;
  line-height: 32px;
  padding: 0 30px;
  background: rgba(151, 215, 0, 0.06);
  border: 0.5px solid #97d700;
  border-radius: 16px;
}
.get-location {
  font-size: 15px;
  color: #333333;
  margin: 0 20px;
}
.citys-item {
  font-size: 15px;
  color: #666666;
  padding: 0 37px;
  margin: 0 10px 10px 0;
  border: 0.5px solid #f6f6f6;
  background: #f6f6f6;
}
</style>
<style lang="">
.get-location ._van-icon {
  vertical-align: -10%;
  margin: 0 5px;
}
</style>