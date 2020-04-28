<template>
  <div class="container">
    <van-sticky>
      <div class="top-search-btn van-hairline">
        <div class="city-box">
          <div class="city PingFangSC-Medium">{{city.name}}</div>
          <van-icon name="/static/icons/arrow-down.png" />
        </div>
        <div class="search-btn-box">
          <div class="search-btn">
            <van-icon name="/static/icons/search.png" />
            输入箱子名称进行搜索
          </div>
        </div>
      </div>
    </van-sticky>
    <div class="result-box">
      <div class="result-item"
           v-for="(item, index) in reuslts"
           :key="index"
           :data-id="item.id"
           @click="goNextPage">
        <div class="result-item-img-box">
          <img :src="item.pro_img"
               alt="">
        </div>
        <div class="result-name PingFangSC-Medium">{{item.name}}</div>
        <div class="n-address-box">
          <div class="location-box PingFangSC-Regular">
            <van-icon class="location-ico"
                      name="/static/icons/addres_icon.png"
                      size="12px" />
            {{item.loacl}}
          </div>
          <div>
            销量：{{item.sell_num}}
          </div>
        </div>
        <div class="per-address-box">
          <div class="unit-box Oswald-Medium">
            <span>¥</span>{{item.pre_price}}
          </div>
          <div v-if="item.switch===1"
               class="tag PingFangSC-Medium">特价</div>
          <div class="o-cost">¥{{item.price}}/天</div>
        </div>
      </div>
    </div>
    <nomoreComponents :tipBoxTop="tipBoxTop"
                      :tipSrc="tipSrc"
                      :dataList="reuslts"></nomoreComponents>
  </div>
</template>
<script>
import { getRecommentGoods, getSpePriceGoods, getGoodsList } from '@/api/getData'
import nomoreComponents from '@/components/nomore'

export default {
  data () {
    return {
      city: {
        name: '北京市',
        tags: 'BEIJING,北京市',
        cityid: 2
      },
      fromCode: null,
      typeId: null,
      reuslts: null,
      tipBoxTop: '50px'
    }
  },
  components: {
    nomoreComponents
  },
  onLoad (options) {
    console.log(options)
    mpvue.setNavigationBarTitle({
      title: decodeURI(options.title)
    })

    this.fromCode = Number(options.fromCode)
    this.typeId = options.type_id

    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      try {
        if (this.fromCode === 1) {
          const res1 = await getRecommentGoods({ area_id: this.city.id, page: '', page_size: '' })
          console.log(res1)
          // this.reuslts = res1.data.data
          let arr = res1.data.data
          arr.forEach((item, key) => {
            item.pro_img = item.images.split(',')[0]
          })
          this.reuslts = arr
        } else if (this.fromCode === 2) {
          const res2 = await getSpePriceGoods({ area_id: this.city.id, page: '', page_size: '' })
          console.log(res2)
          // this.reuslts = res2.data.data
          let arr = res2.data.data
          arr.forEach((item, key) => {
            item.pro_img = item.images.split(',')[0]
          })
          this.reuslts = arr
        } else if (this.fromCode === 3) {
          const res3 = await getGoodsList({ type_id: this.typeId, area_id: this.city.id, page: '', page_size: '' })
          console.log(res3)
          // this.reuslts = res3.data.data
          let arr = res3.data.data
          arr.forEach((item, key) => {
            item.pro_img = item.images.split(',')[0]
          })
          this.reuslts = arr
        }
      } catch (error) {
        console.log('* getGoodsList error', error)
      }
    },
    goNextPage (e) {
      console.log(e)
      let id = e.mp.currentTarget.dataset.id
      mpvue.navigateTo({
        url: `/pages/product/detail/main?id=${id}`
      })
    }
  }
}
</script>
<style scoped>
/* .nomore-skeleton-img {
  display: block;
  width: 121px;
  height: 100px;
  margin: 0 auto;
}
.nomore-skeleton-tip {
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  line-height: 22px;
  text-align: center;
} */

.top-search-btn {
  display: flex;
  padding: 0 15px 7px;
  background: #fff;
}
.search-btn-box {
  width: 270px;
  height: 32px;
  background: #f4f4f4;
  border-radius: 16px;
}
.search-btn {
  flex: 1;
  font-size: 13px;
  color: #999999;
  text-align: center;
  line-height: 32px;
}
.city-box {
  flex: 1;
  display: flex;
  width: 60px;
  line-height: 32px;
}
.city {
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.result-box {
  padding: 15px 0;
  margin: 0 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.result-item {
  display: inline-block;
  margin-bottom: 9px;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
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
.n-address-box {
  display: flex;
  font-size: 11px;
  color: #999999;
  line-height: 22px;
  padding: 2px 8px 6px;
}
.per-address-box {
  line-height: 22px;
  padding: 0px 8px 12px;
}
.per-address-box {
  display: flex;
}
.location-box {
  /* float: right; */
  flex: 1;
  font-size: 11px;
  color: #999999;
}
.location-ico {
  vertical-align: -7%;
}
.unit-box {
  /* flex: 1; */
  font-size: 15px;
  color: #97d700;
}
.unit-box span {
  font-size: 11px;
}
.tag {
  display: inline-block;
  /* width: 23px; */
  height: 16px;
  font-size: 10px;
  color: #97d700;
  line-height: 16px;
  text-align: center;
  padding: 0 5px;
  background: rgba(151, 215, 0, 0.2);
  border-radius: 6px 0 6px 0;
  margin-top: 3px;
  margin-left: 8px;
}
.o-cost {
  font-size: 11px;
  color: #999999;
  line-height: 16px;
  margin-top: 4px;
  margin-left: 8px;
  text-decoration: line-through;
}
</style>
<style>
.city-box .van-icon--image {
  width: 8px !important;
  height: 4px !important;
  margin-right: 15px;
  transform: rotate(180deg);
}
.city-box .van-icon__image {
  vertical-align: top;
}
.search-btn-box .van-icon__image {
  vertical-align: -10%;
}
.search-btn ._van-icon {
  margin-right: 5px;
}
.location-box .van-icon__image {
  vertical-align: -12%;
}
</style>