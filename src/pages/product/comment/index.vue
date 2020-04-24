<template>
  <div class="container van-hairline--top">
    <div class="top-summary-box mb10">
      <div class="left-rate ">
        <div class="top-summary-item">
          服务:
          <van-rate class="rate-box"
                    :value="detail.score.service"
                    size="15"
                    allow-half
                    color="#97D700"
                    void-color="#fff"
                    void-icon="star"
                    bind:change="onChange" />{{detail.score.service}}分
        </div>
        <div class="top-summary-item">
          服务:
          <van-rate class="rate-box"
                    :value="detail.score.transport"
                    size="15"
                    allow-half
                    color="#97D700"
                    void-color="#fff"
                    void-icon="star"
                    bind:change="onChange" />{{detail.score.transport}}分
        </div>
        <div class="top-summary-item">
          其他:
          <van-rate class="rate-box"
                    :value="detail.score.other"
                    size="15"
                    allow-half
                    color="#97D700"
                    void-color="#fff"
                    void-icon="star"
                    bind:change="onChange" />{{detail.score.other}}分
        </div>
      </div>
      <div class="right-score">
        <div class="top-val">{{detail.score.all}}分</div>
        <div class="bottom-tit">综合评分</div>
      </div>
    </div>
    <div class="bottom-main-box">
      <div class="tab-box">
        <div :class="{'active': tabIndex == 0}"
             @click="onSelectTab(0)">全部评价({{detail.num}})</div>
        <div :class="{'active': tabIndex == 1}"
             @click="onSelectTab(1)">有图</div>
      </div>
      <div class="items-box">
        <div v-for="(item, index) in dataList"
             :key="index"
             class="item">
          <div class="left-avatar-box">
            <img :src="item.avatar"
                 alt="">
          </div>
          <div class="right-main-box van-hairline">
            <div class="right-main-name">{{item.username}}</div>
            <div class="time-rate-some">
              <div class="time-box">{{item.createtime}}</div>
              <div>
                <van-icon v-if="item.all_num >= 1"
                          name="star"
                          color="#97d700"
                          size="12px" />
                <van-icon v-if="item.all_num >= 2"
                          name="star"
                          color="#97d700"
                          size="12px" />
                <van-icon v-if="item.all_num >= 3"
                          name="star"
                          color="#97d700"
                          size="12px" />
                <van-icon v-if="item.all_num >= 4"
                          name="star"
                          color="#97d700"
                          size="12px" />
                <van-icon v-if="item.all_num >= 5"
                          name="star"
                          color="#97d700"
                          size="12px" />
                <div v-if="item.all_num%1"
                     class="banke">
                  <van-icon name="star"
                            color="#97d700"
                            size="12px" />
                </div>
              </div>
            </div>
            <div class="rm-text">
              {{item.text}}
            </div>
            <div class="rm-imgs">
              <img v-for="(itm, idx) in item.imgsArr"
                   :key="idx"
                   :src="itm"
                   alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getGoodsValuation } from '@/api/getData'
export default {
  data () {
    return {
      tabIndex: 0,
      val1: 1.5,

      id: null,
      detail: null,
      dataList: null
    }
  },
  onLoad (options) {
    console.log(options)
    this.id = options.id
    this.getGoodsValuation()
  },
  methods: {
    async getGoodsValuation () {
      try {
        const res = await getGoodsValuation({ goods_id: this.id, type: this.tabIndex, page: '' })
        console.log(res)
        this.detail = res.data.data
        let dataList = res.data.data.list
        dataList.forEach((item, key) => {
          dataList[key].imgsArr = item.picimages.split(',')
        })
        this.dataList = dataList
      } catch (error) {
        console.log('* getGoodsValuation error', error)
      }
    },
    onSelectTab (i) {
      this.tabIndex = i
      this.getGoodsValuation()
    }
  }
}
</script>
<style scoped>
.top-summary-box {
  display: flex;
  width: 100%;
  font-size: 13px;
  color: #666666;
  padding: 15px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
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
  margin-top: 112px;
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
.right-main-name {
  font-size: 13px;
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