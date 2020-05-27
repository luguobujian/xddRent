<template>
  <div class="container">
    <div>
      <div class="top-search van-hairline">
        <van-search :value="keyword"
                    placeholder="请输入搜索关键词"
                    use-action-slot
                    focus="true"
                    @change="onChange"
                    @search="onSearch"
                    @clear="onClear"
                    shape="round"
                    left-icon="/static/icons/search2.png">
          <view class="r-icon-box"
                slot="action"
                @click="onClick">
            <van-icon class="search-ico"
                      name="/static/icons/close.png"
                      size="20px" />
          </view>
        </van-search>
      </div>
      <div v-if="!reuslts"
           class="bottom-items-box">
        <div class="history-box"
             v-if="historys.length!=0">
          <div class="title">历史搜索
            <van-icon class="fr"
                      name="/static/icons/del-icon.png"
                      size="20px"
                      @click.stop="onDel" />
          </div>
          <div class="his-items-box">
            <div v-for="(item, index) in historys"
                 :key="index"
                 class="item"
                 @click="chsItem(item.t)">
              {{item.text}}
            </div>
          </div>
        </div>
        <div class="hot-box"
             v-if="hots.length!=0">
          <div class="title">热门搜索</div>
          <div class="hot-items-box">
            <div v-for="(item, index) in hots"
                 :key="index"
                 class="item"
                 @click="chsItem(item.name)">
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
      <div v-if="reuslts"
           class="result-box">
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
          <div class="per-address-box">
            <div class="unit-box Oswald-Medium">
              <span>¥</span>{{item.pre_price}}<span>/天</span>
            </div>
            <div class="location-box">
              <van-icon name="/static/icons/addres_icon.png"
                        size="12px"
                        style="vertical-align: -1%" />
              {{item.loacl}}
            </div>
          </div>
        </div>
      </div>
      <nomoreComponents v-if="reuslts"
                        :tipBoxTop="tipBoxTop"
                        tipSrc="nshousuo.png"
                        noTip="暂无搜索结果"
                        :dataList="reuslts"></nomoreComponents>
    </div>
    <van-dialog id="van-dialog"
                confirmButtonColor="#97D700" />
  </div>
</template>
<script>
import { onSearch, historyEnter, getSearchHistory, historyCl, getHotSearch } from '@/api/getData'
import Dialog from '../../../static/vant/dialog/dialog'
import Toast from '../../../static/vant/toast/toast'
import nomoreComponents from '@/components/nomore'

export default {
  data () {
    return {
      historys: [],
      hots: [],
      reuslts: null,
      area: null,
      keyword: ''
    }
  },
  onLoad (options) {
    console.log(options)
    this.area = options.cityid
  },
  mounted () {
    this.getSearchHistory()
    this.getHotSearch()
  },
  components: {
    nomoreComponents
  },
  methods: {
    async getSearchHistory () {
      try {
        const res = await getSearchHistory()
        console.log(res)
        if (res.data.code === 1) {
          this.historys = res.data.data
        } else {
          Toast.fail(res.data.msg)
        }
      } catch (error) {
        Toast.fail(error.data.msg)
      }
    },
    async historyEnter () {
      try {
        const res = await historyEnter({ type: 2, text: this.keyword })
        console.log(res)
      } catch (error) {

      }
    },
    async getHotSearch () {
      try {
        const res = await getHotSearch()
        console.log(res)
        if (res.data.code === 1) {
          this.hots = res.data.data
        } else {
          Toast.fail(res.data.msg)
        }
      } catch (error) {
        Toast.fail(error.data.msg)
      }
    },
    async onSearch () {
      try {
        const res = await onSearch({ card: this.keyword, area: this.area })
        console.log('* onSearch', res)
        if (res.data.code === 1) {
          let arr = res.data.data
          arr.forEach((item, key) => {
            item.pro_img = item.images.split(',')[0]
          })
          this.historyEnter()
          this.getSearchHistory()
          this.reuslts = arr
        } else {
          Toast.fail(res.data.msg)
        }
      } catch (error) {
        console.log('* error', error)
        Toast.fail(error.data.msg)
      }
    },
    onDel () {
      Dialog.confirm({
        title: '提示',
        message: '确认删除历史信息？'
      }).then(() => {
        // on confirm
        const res = historyCl()
        res.then(r => {
          console.log('historyCl', r)
          if (r.data.code === 1) {
            this.getSearchHistory()
          }
        })
      }).catch(() => {
        // on cancel
      })
    },
    onChange (e) {
      this.keyword = e.mp.detail
      if (!this.keyword) {
        this.reuslts = null
        this.getSearchHistory()
      }
    },
    onClear () {
      this.keyword = ''
    },
    onClick () {
      mpvue.navigateBack()
    },
    chsItem (e) {
      this.keyword = e
      this.onSearch()
    },
    goNextPage (e) {
      console.log(e)
      let id = e.mp.currentTarget.dataset.id
      mpvue.navigateTo({
        url: `/pages/product/detail/main?id=${id}`
      })
    }
  },
  onUnload () {
    if (this.$options.data) {
      Object.assign(this.$data, this.$options.data())
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
  font-size: 15px;
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
.van-search--withaction {
  padding-top: 3px !important;
}

.r-icon-box ._van-icon {
  vertical-align: -14%;
  padding: 0 7px;
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