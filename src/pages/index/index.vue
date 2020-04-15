<template>
  <div class="container">
    <div class="top-swiper">
      <swiper :autoplay="autoplay"
              :interval="interval"
              :duration="duration"
              @change="bindChange">
        <block v-for="(item, index) in background"
               :key="index">
          <swiper-item>
            <view class="swiper-item">
              <img :src="item.smallimage"
                   alt=""></view>
          </swiper-item>
        </block>
      </swiper>
      <div class="indicator-dots-box">
        <div v-for="(item, index) in background"
             :key="index"
             class="indicator-dots"
             :class="{active: indicatorDots == index}"></div>
      </div>
    </div>
    <div class="serach-box">
      <div class="icon-box">
        <van-icon name="/static/icons/location.png" />北京
      </div>
      <div class="inp-box"
           @click="goNextPage('search')">
        <van-icon name="/static/icons/search.png" />输入箱子名称进行搜索
      </div>
    </div>
    <div class="two-g-box">
      <div class="two-g-one-box"
           @click="goNextPage('product', {title: '推荐商品', fromCode: 1})">
        <div class="twgobt">推荐商品</div>
        <div class="twgobb">更多口碑尖货</div>
      </div>
      <div class="slash"></div>
      <div class="two-g-one-box"
           @click="goNextPage('product', {title: '特价商品', fromCode: 2})">
        <div class="twgobt">特价商品</div>
        <div class="twgobb">更多超值好物</div>
      </div>
    </div>
    <div class="items-box">
      <div class="item">
        <div class="item-tit">汽车领域</div>
        <div class="sub-item-tit">Automotive field</div>
        <div class="item-img">
          <img src="/static/images/item1.png"
               alt="">
        </div>
      </div>
      <div class="item item-bg item-middle">
        <div class="item-tit">零售领域</div>
        <div class="sub-item-tit"></div>
        <div class="item-img">
          <img src="/static/images/item2.png"
               alt="">
        </div>
      </div>
      <div class="item item-bg">
        <div class="item-tit">运输领域</div>
        <div class="sub-item-tit"></div>
        <div class="item-img">
          <img src="/static/images/item3.png"
               alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner, getGoodsType } from '@/api/getData'

export default {
  data () {
    return {
      routers: {
        search: '/pages/search/main',
        product: '/pages/product/main'
      },
      background: ['/static/images/banner_1.jpg', '/static/images/banner_1.jpg', '/static/images/banner_1.jpg'],
      indicatorDots: 0,
      vertical: false,
      autoplay: false,
      interval: 2000,
      duration: 500
    }
  },
  onLoad () {
    this.getBanner()
    // this.getGoodsType()
  },

  methods: {
    /**
    *获取banner数据
    */
    async getBanner () {
      try {
        const res = await getBanner()
        console.log('page', res)
        this.background = res.data.data
      } catch (error) {
        console.log('* error', error)
        if (error === 401) {
          this.getBanner()
        }
      }
    },
    async getGoodsType () {
      try {
        const res = await getGoodsType()
        console.log('page', res)
      } catch (error) {
        console.log('* error', error)
      }
    },
    bindChange (e) {
      this.indicatorDots = e.mp.detail.current
    },
    goNextPage (p, data) {
      mpvue.navigateTo({
        url: `${this.routers[p]}?${this.parseParams(data)}`
      })
    },
    parseParams (data) {
      try {
        var tempArr = []
        for (var i in data) {
          var key = encodeURIComponent(i)
          var value = encodeURIComponent(data[i])
          tempArr.push(key + '=' + value)
        }
        var urlParamsStr = tempArr.join('&')
        return urlParamsStr
      } catch (err) {
        return ''
      }
    }
  },
  created () {

  }
}
</script>

<style scoped>
.container {
  height: auto;
  position: relative;
}

swiper {
  height: 350px;
}
.swiper-item,
image {
  width: 100%;
  height: 100%;
}
.top-swiper {
  position: relative;
}
.indicator-dots-box {
  height: 5px;
  position: absolute;
  left: 50%;
  bottom: 50px;
  transform: translateX(-50%);
}
.indicator-dots {
  display: inline-block;
  width: 8px;
  height: 5px;
  transform: skewX(-45deg);
  background: rgba(255, 255, 255, 0.3);
  margin: 0 2px;
}
.indicator-dots.active {
  background: rgba(255, 255, 255);
}
.serach-box {
  display: flex;
  width: 345px;
  height: 55px;
  background: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  border-radius: 4px;
  position: absolute;
  top: 322px;
  left: 15px;
}
.icon-box {
  height: 25px;
  line-height: 25px;
  font-size: 20px;
  color: #333333;
  margin: 15px 0;
  padding: 0 15px;
  border-right: 1px solid #eee;
}
.inp-box {
  font-size: 15px;
  color: #999999;
  margin: 17px 0;
  padding: 0 15px;
}
.two-g-box {
  display: flex;
  margin-top: 50px;
  margin-bottom: 5px;
}
.two-g-one-box {
  width: 144px;
  text-align: center;
}
.two-g-one-box:first-child {
  margin-left: 40px;
  margin-right: 12px;
}
.two-g-one-box:last-child {
  margin-left: 12px;
  margin-right: 40px;
}
.twgobt {
  font-size: 13px;
  color: #333333;
  line-height: 18px;
}
.twgobb {
  font-size: 11px;
  color: #999999;
  line-height: 16px;
  margin-top: 2px;
}
.slash {
  width: 1px;
  height: 36px;
  background: #dddddd;
  transform: skewX(-30deg);
}

.items-box {
  display: flex;
  margin: 15px;
  border-radius: 6px;
  justify-content: space-between;
  overflow: hidden;
}
.item-tit {
  font-size: 17px;
  color: #333333;
  line-height: 24px;
  padding-top: 5px;
}
.item {
  padding: 15px;
  background: #fff;
}
.item-bg {
  background: #97d700;
}
.item-middle {
  /* margin: 0 7.5px; */
}
.item-bg .item-tit {
  color: #fff;
}
.sub-item-tit {
  height: 15px;
  font-size: 10px;
  color: rgba(3, 3, 3, 0.2);
  line-height: 15px;
}
.item-img {
  margin: 17px 10px 10px;
}
.item-img,
.item-img img {
  width: 60px;
  height: 60px;
}
</style>
<style lang="">
.icon-box ._van-icon,
.inp-box ._van-icon {
  vertical-align: -10%;
  margin-right: 5px;
}
</style>