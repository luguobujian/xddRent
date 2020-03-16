<template>
  <div class="container">
    <div>
      <div class="top-search van-hairline">
        <van-search :value="keyword"
                    placeholder="请输入搜索关键词"
                    use-action-slot
                    @change="onChange"
                    @search="onSearch"
                    @clear="onClear"
                    shape="round"
                    left-icon="/static/icons/search2.png">
          <view class="r-icon-box"
                slot="action"
                bind:tap="onClick">
            <van-icon name="cross"
                      size="20px" />
          </view>
        </van-search>
      </div>
      <div v-if="!keyword"
           class="bottom-items-box">
        <div class="history-box">
          <div class="title">历史搜索</div>
          <div class="his-items-box">
            <div v-for="(item, index) in historys"
                 :key="index"
                 class="item"
                 @click="chsItem(item.t)">
              {{item.t}}
            </div>
          </div>
        </div>
        <div class="hot-box">
          <div class="title">热门搜索</div>
          <div class="hot-items-box">
            <div v-for="(item, index) in hots"
                 :key="index"
                 class="item"
                 @click="chsItem(item.t)">
              {{item.t}}
            </div>
          </div>
        </div>
      </div>
      <div v-if="keyword"
           class="result-box">
        <div v-for="(item, index) in reuslts"
             :key="index"
             class="result-item">
          <div class="result-item-img-box">
            <img :src="item.url"
                 alt="">
          </div>
          <div class="result-name">讯纳箱/Alphard</div>
          <div class="per-address-box">
            <div class="unit-box">
              <span>¥</span>{{item.u}}
            </div>
            <div class="location-box">
              <van-icon name="/static/icons/addres_icon.png"
                        size="12px" />
              {{item.location}}
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
      historys: [{
        t: '国庆'
      }, {
        t: '大阅兵仪式'
      }, {
        t: '消防员用叉子吃饭'
      }, {
        t: '国庆'
      }],
      hots: [{
        t: '北京'
      }],
      reuslts: [{
        url: '/static/images/banner_1.png',
        name: '讯纳箱/Alphard',
        u: '800/天',
        location: '北京'
      }, {
        url: '/static/images/banner_1.png',
        name: '讯纳箱/Alphard',
        u: '800/天',
        location: '北京'
      }],
      keyword: ''
    }
  },
  mounted () {

  },
  methods: {
    onChange (e) {
      this.keyword = e.mp.detail
    },
    onSearch () {

    },
    onClear () {
      this.keyword = ''
    },
    chsItem (e) {
      this.keyword = e
    }
  }
}
</script>
<style scoped>
.van-search {
  padding: 7px 15px !important;
  padding-right: 7px !important;
}
.bottom-items-box {
  padding: 0 15px;
  background-color: #fff;
}
.history-box {
  padding-top: 10px;
}
.title {
  font-size: 15px;
  color: #333333;
  padding: 10px 0 15px;
}
.item {
  display: inline-block;
  font-size: 15px;
  color: #666666;
  line-height: 21px;
  padding: 5px 15px;
  margin-right: 10px;
  margin-bottom: 10px;
  background: #f6f6f6;
  border-radius: 16px;
}
.result-box {
  padding: 13.5px;
}
.result-item {
  display: inline-block;
  margin: 4.5px;
  background-color: #fff;
}
.result-item:nth-child(2n) {
  margin-right: 0;
}
.result-item-img-box {
}
.result-item-img-box img {
  width: 168px;
  height: 170px;
}
.result-name {
  line-height: 21px;
  padding-top: 10px;
  padding-left: 8px;
}
.per-address-box {
  line-height: 22px;
  padding: 6px 8px 12px;
}
.per-address-box {
  display: flex;
}
.location-box {
  float: right;
  font-size: 11px;
  color: #999999;
}
.unit-box {
  flex: 1;
  font-size: 15px;
  color: #97d700;
}
.unit-box span {
  font-size: 11px;
}
</style>
<style>
.r-icon-box ._van-icon {
  vertical-align: -14%;
}
.van-cell__left-icon-wrap {
  -webkit-align-items: stretch !important;
  align-items: stretch !important;
}
.van-search__content--round .van-icon-search {
  font-size: 14px;
  color: #333;
}
.location-box .van-icon__image {
  vertical-align: -12%;
}
</style>