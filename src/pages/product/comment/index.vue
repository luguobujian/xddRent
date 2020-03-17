<template>
  <div class="container">
    <div class="top-summary-box mb10">
      <div class="left-rate ">
        <div class="top-summary-item">
          服务:
          <van-rate class="rate-box"
                    :value="val1"
                    size="15"
                    allow-half
                    color="#97D700"
                    void-color="#fff"
                    void-icon="star"
                    bind:change="onChange" />{{val1}}分
        </div>
        <div class="top-summary-item">
          服务:
          <van-rate class="rate-box"
                    :value="val1"
                    size="15"
                    allow-half
                    color="#97D700"
                    void-color="#fff"
                    void-icon="star"
                    bind:change="onChange" />{{val1}}分
        </div>
        <div class="top-summary-item">
          其他:
          <van-rate class="rate-box"
                    :value="val1"
                    size="15"
                    allow-half
                    color="#97D700"
                    void-color="#fff"
                    void-icon="star"
                    bind:change="onChange" />{{val1}}分
        </div>
      </div>
      <div class="right-score">
        <div class="top-val">4分</div>
        <div class="bottom-tit">综合评分</div>
      </div>
    </div>
    <div class="bottom-main-box">
      <div class="tab-box">
        <div :class="{'active': tabIndex == 0}"
             @click="onSelectTab(0)">全部评价(2938)</div>
        <div :class="{'active': tabIndex == 1}"
             @click="onSelectTab(1)">有图</div>
      </div>
      <div class="
             items-box">
        <div v-for="(item, index) in dataList"
             :key="index"
             class="item">
          <div class="left-avatar-box">
            <img src=""
                 alt="">
          </div>
          <div class="right-main-box van-hairline">
            <div>{{item.name}}</div>
            <div class="time-rate-some">
              <div class="time-box">{{item.time}}</div>
              <div>
                <van-icon v-if="item.val >= 1"
                          name="star"
                          color="#97d700"
                          size="12px" />
                <van-icon v-if="item.val >= 2"
                          name="star"
                          color="#97d700"
                          size="12px" />
                <van-icon v-if="item.val >= 3"
                          name="star"
                          color="#97d700"
                          size="12px" />
                <van-icon v-if="item.val >= 4"
                          name="star"
                          color="#97d700"
                          size="12px" />
                <van-icon v-if="item.val >= 5"
                          name="star"
                          color="#97d700"
                          size="12px" />
                <div v-if="item.val%1"
                     class="banke">
                  <van-icon name="star"
                            color="#97d700"
                            size="12px" />
                </div>
              </div>
            </div>
            <div class="rm-text">
              小区内部环境典雅幽静，绿化多，通过小区道路的合理组织，休闲设施的精心安排，提供自然、舒适的居住环境。
            </div>
            <div class="rm-imgs">
              <img src="../../../../static/images/zz.png"
                   alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabIndex: 0,
      val1: 1.5,
      dataList: [{
        name: '李斯丹妮',
        time: '2019.07.21 16:29',
        val: 2.5
      }, {
        name: '李斯丹妮',
        time: '2019.07.21 16:29',
        val: 5
      }]
    }
  },
  methods: {
    onSelectTab (i) {
      this.tabIndex = i
    }
  }
}
</script>
<style scoped>
.top-summary-box {
  display: flex;
  font-size: 13px;
  color: #666666;
  padding: 15px;
  background-color: #fff;
}
.top-summary-item {
  line-height: 18px;
  margin: 4px 0;
}
.left-rate {
  flex: 1;
}

.right-score {
  width: 44%;
  text-align: center;
  position: relative;
}
.right-score::before {
  content: "";
  width: 1px;
  height: 30px;
  background: #eeeeee;
  position: absolute;
  left: 0;
  top: 23px;
}
.top-val {
  font-size: 25px;
  color: #97d700;
  line-height: 36px;
  margin-top: 9px;
}
.bottom-tit {
  font-size: 13px;
  color: #666666;
}
.tab-box {
  padding: 5px 0;
}
.tab-box div {
  display: inline-block;
  font-size: 15px;
  color: #666;
  background: #f6f6f6;
  line-height: 20px;
  padding: 6px 15px;
  margin-right: 10px;
  border: 1px solid #f6f6f6;
  border-radius: 16px;
}
.tab-box div.active {
  color: #97d700;
  border: 1px solid #97d700;
  background: #fff;
}
.bottom-main-box {
  padding: 15px;
  background-color: #fff;
}
.left-avatar-box,
.left-avatar-box img {
  width: 31px;
  height: 31px;
  border-radius: 50%;
  background-color: #97d700;
}
.item {
  display: flex;
  margin: 15px 0;
}
.item .right-main-box {
  flex: 1;
  margin-left: 6px;
}
.time-rate-some {
  display: flex;
  line-height: 16px;
}
.time-box {
  flex: 1;
  font-size: 11px;
  color: #837e7e;
}
.banke {
  display: inline-block;
  width: 6px;
  height: 12px;
  overflow: hidden;
}
.rm-text {
  font-size: 15px;
  color: #333333;
  line-height: 24px;
  margin: 8px 0;
}
.rm-imgs {
  margin-bottom: 9px;
}
.rm-imgs img {
  width: 72px;
  height: 72px;
  margin: 0 6px 6px 0;
}
.rm-imgs img:nth-child(4n) {
  margin-right: 0;
}
</style>
<style>
.rate-box {
  vertical-align: -14%;
}
.banke ._van-icon {
  vertical-align: 14%;
}
</style>