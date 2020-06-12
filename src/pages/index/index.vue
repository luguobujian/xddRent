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
            <view class="swiper-item"
                  :data-type="item.type"
                  :data-uid="item.url_id"
                  @click="goFromBanner">
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
      <div class="icon-box PingFangSC-Medium"
           @click="goNextPage('citys',{cityid: showCity.cityid})">
        <van-icon name="/static/icons/location.png" />{{showCity.name}}
      </div>
      <div class="inp-box"
           @click="goNextPage('search')">
        <van-icon name="/static/icons/search.png" />输入箱子名称进行搜索
      </div>
    </div>
    <div class="two-g-box">
      <div class="two-g-one-box"
           @click="goNextPage('product', {title: '推荐商品', fromCode: 1})">
        <div class="twgobt PingFangSC-Medium">推荐商品</div>
        <div class="twgobb">更多口碑尖货</div>
      </div>
      <div class="slash"></div>
      <div class="two-g-one-box"
           @click="goNextPage('product', {title: '特价商品', fromCode: 2})">
        <div class="twgobt PingFangSC-Medium">特价商品</div>
        <div class="twgobb">更多超值好物</div>
      </div>
    </div>
    <div class="items-box">
      <div class="item"
           :class="{itemBg : chsItemIdx===0}"
           @click="onClickItem(0)">
        <div class="item-tit PingFangSC-Medium">汽车领域</div>
        <div class="sub-item-tit">Automotive field</div>
        <div class="item-img">
          <img :src="chsItemIdx===0? baseUrl +'/PingFangSC/xddmppic/item1-act.png': baseUrl +'/PingFangSC/xddmppic/item1.png'"
               alt="">
        </div>
      </div>
      <div class="item item-middle"
           :class="{itemBg : chsItemIdx===1}"
           @click="onClickItem(1)">
        <div class="item-tit PingFangSC-Medium">零售领域</div>
        <div class="sub-item-tit">Retail area</div>
        <div class="item-img">
          <img :src="chsItemIdx===1? baseUrl +'/PingFangSC/xddmppic/item2-act.png': baseUrl +'/PingFangSC/xddmppic/item2.png'"
               alt="">
        </div>
      </div>
      <div class="item"
           :class="{itemBg : chsItemIdx===2}"
           @click="onClickItem(2)">
        <div class="item-tit PingFangSC-Medium">运输领域</div>
        <div class="sub-item-tit">Transportation field</div>
        <div class="item-img">
          <img :src="chsItemIdx===2? baseUrl +'/PingFangSC/xddmppic/item3-act.png': baseUrl +'/PingFangSC/xddmppic/item3.png'"
               alt="">
        </div>
      </div>
    </div>
    <van-overlay :show="showOverlay"
                 custom-style="background: rgba(0,0,0,.3)">
      <view class="wrapper">
        <van-loading size="30px"
                     vertical>加载中...</van-loading>
      </view>
    </van-overlay>
  </div>
</template>

<script>
import API from '@/api/api'
import citys from '../city/city'
import { xxWxLogin, exchangeCode, getBanner, getGoodsType } from '@/api/getData'
let that = null
export default {
  data () {
    return {
      baseUrl: API.baseUrl,
      routers: {
        citys: '/pages/city/main',
        search: '/pages/search/main',
        product: '/pages/product/main'
      },
      background: ['/static/images/banner_1.jpg', '/static/images/banner_1.jpg', '/static/images/banner_1.jpg'],
      indicatorDots: 0,
      vertical: false,
      autoplay: false,
      interval: 2000,
      duration: 500,
      setData: function (key, value) {
        that[key] = value
      },
      citys: citys.city,
      showCity: {
        name: '北京市',
        cityid: 2
      },
      showOverlay: true,
      chsItemIdx: 0
    }
  },
  onLoad () {
    that = this
    // this.privateWxLogin()
    //   .then(r => this.exchangeCode(r.code))
    //   .then(r => this.getBanner())
    this.exchangeCode()
    this.getBanner()
    this.wxGetSetting()
  },
  mounted () {
    let citys = this.citys
    let tempData = []
    citys.forEach((item, key) => {
      tempData = tempData.concat(item.cities)
    })
    this.primaryListData = tempData
  },
  methods: {
    onClickItem (i) {
      this.chsItemIdx = i
      if (i === 0) {
        this.goNextPage('product', { title: '汽车领域', fromCode: 3, type: 2 })
      } else if (i === 1) {
        this.goNextPage('product', { title: '零售领域', fromCode: 3, type: 3 })
      } else if (i === 2) {
        this.goNextPage('product', { title: '运输领域', fromCode: 3, type: 4 })
      }
    },
    /**
    *用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 auth.code2Session，使用 code 换取 openid 和 session_key 等信息
    */
    async privateWxLogin () {
      return new Promise((resolve, reject) => {
        mpvue.login({
          success (res) {
            console.log('privateWxLogin', res)
            if (res.code) {
              resolve(res.code)
            } else {
              reject(res)
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      })
    },

    /**
    *code登录获取openid
    */
    async exchangeCode () {
      try {
        const code = await this.privateWxLogin()
        const ucode = await xxWxLogin({ code })
        const res = await exchangeCode({ code })
        console.log(`ucode`, ucode)
        console.log(`App:exchangeCode ${new Date().getTime()}`, res)
        mpvue.setStorage({
          key: 'token',
          data: res.data.data.userinfo.token,
          success: res => {
            console.log(res)
          },
          fail: res => {
            console.log(res)
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    /**
    *获取banner数据
    */
    async getBanner () {
      try {
        const res = await getBanner()
        console.log('page', res)
        this.showOverlay = false
        this.background = res.data.data.length > 5 ? res.data.data.slice(0, 5) : res.data.data
      } catch (error) {
        console.log('* error getBanner', error)
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
    goFromBanner (e) {
      console.log(e)
      let type = e.mp.currentTarget.dataset.type
      let urlId = e.mp.currentTarget.dataset.uid

      if (type === '1') {
        mpvue.navigateTo({
          url: `/pages/product/detail/main?id=${urlId}`
        })
      } else if (type === '2') {
        mpvue.navigateTo({
          url: `/pages/web_view/main?id=${urlId}`
        })
      }
    },
    /**
    *用户权限设置
    */
    wxGetSetting () {
      let that = this
      wx.getSetting({
        success (res) {
          if (!res.authSetting['scope.record']) {
            wx.authorize({
              scope: 'scope.userLocation',
              success () {
                wx.getLocation({
                  type: 'wgs84',
                  success (res) {
                    console.log(res)
                    that.getCityInfo(res)
                  }
                })
              }
            })
          } else {
            wx.getLocation({
              type: 'wgs84',
              success (res) {
                console.log(res)
                that.getCityInfo(res)
              }
            })
          }
        }
      })
    },
    getCityInfo (res) {
      let that = this
      wx.request({
        url: 'https://api.map.baidu.com/geocoder/v2/?ak=LmUqsfoEtzX3YH0Zuv5v7B664w0jytO9&location=' + res.latitude + ',' + res.longitude + '&output=json',
        success: function (res) {
          console.log(res.data.result)
          let cityName = res.data.result.addressComponent.city
          for (let i = 0; i < that.primaryListData.length; i++) {
            let item = that.primaryListData[i]
            if (cityName === item.name) {
              that.showCity = {
                name: item.name,
                cityid: item.cityid
              }
            }
          }
        }
      })
    },
    bindChange (e) {
      this.indicatorDots = e.mp.detail.current
    },
    goNextPage (p, data) {
      mpvue.navigateTo({
        url: `${this.routers[p]}?${this.parseParams(data)}&city=${this.showCity.name}&cityid=${this.showCity.cityid}`
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
  }
}
</script>

<style scoped>
.container {
  height: auto;
  position: relative;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
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
  /* padding: env(safe-area-inset-top); */
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
  /* font-family: "PingFangSC-Medium"; */
  max-width: 100px;
  height: 25px;
  line-height: 25px;
  font-size: 18px;
  color: #333333;
  margin: 15px 0;
  padding: 0 15px;
  border-right: 1px solid #eee;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.inp-box {
  font-size: 15px;
  color: #999999;
  margin: 17px 0;
  padding: 0 15px;
}
.two-g-box {
  display: flex;
  margin-top: 48px;
  /* margin-bottom: 5px; */
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
  margin-top: 20px;
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
.itemBg {
  background: #97d700;
}
.item-middle {
  /* margin: 0 7.5px; */
}
.itemBg .item-tit {
  color: #fff;
}
.sub-item-tit {
  height: 15px;
  font-size: 8px;
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