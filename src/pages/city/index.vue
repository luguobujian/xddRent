<template>
  <div class="container">
    <div>
      <van-search :value="value"
                  shape="round"
                  placeholder="请输入搜索关键词"
                  @change="onKeyInput" />
    </div>
    <div v-if="keyword"
         class="search-item-box">
      <div class="search-item van-hairline"
           v-for="(item, index) in searchRes"
           :key="index"
           :data-city="item.name"
           :data-id="item.cityid"
           @click="chsCitys">
        <div v-for="(itm, idx) in item.resNameArr"
             :key="idx"
             class="word"
             :class="{active:itm.inc }">{{itm.v}}</div>
      </div>
    </div>
    <div v-if="!keyword"
         class="some-set-citys-box">
      <div>
        <div class="some-set-tit">当前定位</div>
        <div class="some-set-box">
          <div v-if="selectedCity.name"
               class="this-one-city">{{selectedCity.name}}</div>
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
      <div v-if="hotCitys && hotCitys!=0">
        <div class="some-set-tit">热门城市</div>
        <div class="some-set-box citys-item-box">
          <div v-for="(item, index) in hotCitys"
               :key="index"
               class="citys-item"
               :data-city="item.city"
               :data-id="item.city_id"
               @click="chsCitys">{{item.city}}</div>
        </div>
      </div>
    </div>
    <div v-if="!keyword">
      <van-index-bar :scrollTop="scrollTop">
        <view v-for="(item, index) in citys"
              :key="index">
          <van-index-anchor :index="item.name" />
          <van-cell v-for="(itm, idx) in item.cities"
                    :key="idx"
                    :title="itm.name"
                    :data-city="itm.name"
                    :data-id="itm.cityid"
                    @click="chsCitys" />
        </view>
      </van-index-bar>
    </div>
  </div>
</template>
<script>
import citys from './city'

import { getHotCity } from '@/api/getData'

import QQMapWX from '../../../static/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js'
let qqmapsdk = new QQMapWX({
  key: '7URBZ-BJHKG-WUDQL-I6COI-YRTOK-RMFWF'
})
export default {
  data () {
    return {
      citys: citys.city,
      scrollTop: 0,
      keyword: null,
      primaryListData: null,

      selectedCity: {
        name: '北京市',
        cityid: 2
      },

      hotCitys: null,
      searchRes: []
    }
  },
  computed: {
    wordHightlight () {
      return function (word) {
        console.log(this.keyword.split('').includes(word))
        return this.keyword.split('').includes(word)
      }
    }
  },
  onLoad () {
    this.getHotCity()

    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
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
                  qqmapsdk.reverseGeocoder({
                    coord_type: 0,
                    location: {
                      latitude: res.latitude,
                      longitude: res.longitude
                    },
                    success (res) {
                      console.log(res)
                    },
                    fail (err) {
                      console.log(err)
                    },
                    complete (err) {
                      console.log(err)
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
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
    async getHotCity () {
      try {
        const res = await getHotCity()
        this.hotCitys = res.data.data
        console.log(res)
      } catch (error) {
        console.log('* error getHotCity', error)
      }
    },
    onKeyInput (e) {
      let keyword = e.mp.detail.trim()
      this.keyword = keyword
      if (!keyword) return
      let reg = new RegExp(keyword)
      let arr = []
      for (let j = 0; j < this.primaryListData.length; j++) {
        let resNameArr = []
        let item = this.primaryListData[j]
        if (reg.test(item.name)) {
          let nameArr = item.name.split('')
          for (let i = 0; i < nameArr.length; i++) {
            let v = nameArr[i]
            if (this.keyword.split('').includes(v)) {
              resNameArr.push({ i: i, inc: true, v: v })
            } else {
              resNameArr.push({ i: i, inc: false, v: v })
            }
          }
          item.resNameArr = resNameArr
          arr.push(item)
        }
      }
      this.searchRes = arr
    },
    chsCitys (e) {
      console.log(e)
      this.selectedCity = {
        name: e.mp.currentTarget.dataset.city,
        cityid: e.mp.currentTarget.dataset.id
      }

      const pages = getCurrentPages()
      const prevPage = pages[pages.length - 2]

      prevPage.data.$root[0].setData('showCity', this.selectedCity)

      this.keyword = ''
      mpvue.navigateBack()
    },
    searchRes () {

    }
  },
  onPageScroll (event) {
    this.scrollTop = event.scrollTop
  }
}
</script>
<style scoped>
.search-item-box {
  padding: 0 15px;
  background-color: #fff;
}

.search-item-box .search-item {
  line-height: 21px;
  padding: 15px 0;
}

.word {
  display: inline-block;
  font-size: 15px;
  color: #333333;
}

.word.active {
  color: #97d700;
}

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