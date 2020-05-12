<template>

  <div class="container van-hairline--top">

    <div class="main-items-box">
      <div>
        <van-radio-group :value="addressResult"
                         @change="onCheckboxAddress">
          <div v-for="(item, index) in dataList"
               class="item van-hairline"
               :key="index"
               :data-index="index"
               :data-name="item.id"
               @click="onClick">
            <div v-if="item.id == addressResult"
                 class="checked-box">
              <van-radio icon-size="18px"
                         checked-color="#97D700"
                         :name="item.id"></van-radio>
            </div>
            <div class="l-info-box">
              <div class="info-top-box">
                <span class="name-box">{{item.name}}</span>
                <span>{{item.mobile}}</span>
              </div>
              <div class="info-bottom-box">{{item.addressone}}{{item.addresstwo}}</div>
            </div>
            <div class="r-btns-box">
              <van-icon name="/static/icons/edit-icon.png"
                        @click.stop="onEdit(index)" />
              <van-icon name="/static/icons/del-icon.png"
                        :data-id="item.id"
                        @click.stop="onDel" />
            </div>
          </div>
        </van-radio-group>
      </div>
      <nomoreComponents :tipBoxTop="tipBoxTop"
                        :tipSrc="tipSrc"
                        :dataList="dataList"></nomoreComponents>
    </div>

    <div class="bottom-btn-box">
      <div class="bottom-btn-margin">
        <van-button color="#97D700"
                    size="small"
                    custom-style="font-size: 13px"
                    round
                    block
                    @click="goNextPage">新增地址</van-button>
      </div>
    </div>
    <van-dialog id="van-dialog"
                confirmButtonColor="#97D700" />
  </div>
</template>
<script>
import Dialog from '../../../../static/vant/dialog/dialog'
import nomoreComponents from '@/components/nomore'

import { getMyAddress, delAddress } from '@/api/getData'
import Toast from '../../../../dist/wx/static/vant/toast/toast'

export default {
  data () {
    return {
      dataList: [],
      addressResult: '',
      addressIndex: ''

    }
  },
  components: {
    nomoreComponents
  },
  onLoad (options) {
    console.log(options)
    if (options.f === 'detail') {
      mpvue.setNavigationBarTitle({
        title: '选择收获地址'
      })
    }
  },
  onShow () {
    this.getMyAddress()
  },
  mounted () {

  },
  methods: {
    async getMyAddress () {
      try {
        const res = await getMyAddress()
        this.dataList = res.data.data
        console.log(res)
      } catch (error) {

      }
    },
    onClick (e) {
      const { index, name } = e.currentTarget.dataset
      const pages = getCurrentPages()
      const prev = pages[pages.length - 2]
      const indexData = this.dataList[index]
      this.addressResult = name
      this.addressIndex = index

      console.log(prev)

      prev.data.$root[0].setData('address', { id: indexData.id, val: `${indexData.name}   ${indexData.mobile}`, text: `${indexData.addressone}${indexData.addresstwo}` })

      console.log(prev)

      setTimeout(() => { mpvue.navigateBack() }, 1000)
    },
    onCheckboxAddress (e) {
      this.addressResult = e.mp.detail
    },
    onEdit (i) {
      mpvue.navigateTo({
        url: `/pages/user/addaddr/main?${this.parseParams(this.dataList[i])}`
      })
    },
    onDel (e) {
      console.log(e)
      let id = e.mp.currentTarget.dataset.id
      Dialog.confirm({
        title: '提示',
        message: '确认删除该地址信息？'
      }).then(() => {
        // on confirm
        this.addressResult = ''
        this.addressIndex = ''
        const res = delAddress({ id })
        console.log('delAddress', res)
        if (res['_v'].data.code === 1) {
          Toast.success('删除成功')
          this.getMyAddress()
        }
      }).catch(() => {
        // on cancel
      })
    },
    goNextPage () {
      mpvue.navigateTo({
        url: '/pages/user/addaddr/main'
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
.main-items-box {
  flex: 1;
}
.bottom-btn-margin {
  background-color: #fff;
  padding: 7px 15px;
}
.item {
  display: flex;
  flex-direction: row;
  padding: 0 15px 20px;
  background-color: #fff;
}
.checked-box {
  display: inline-block;
  margin-top: 38px;
  margin-right: 15px;
}
.l-info-box {
  flex: 1;
}
.info-top-box {
  font-size: 16px;
  color: #222222;
  font-weight: bold;
  line-height: 22px;
  padding: 20px 0 8px;
}
.name-box {
  margin-right: 30px;
}
.info-bottom-box {
  font-size: 13px;
  color: #999999;
  line-height: 18px;
}
.r-btns-box {
  margin-top: 39px;
}
</style>
<style>
.van-icon--image {
  width: 20px !important;
  height: 20px !important;
  padding: 10px !important;
  padding-right: 0 !important;
  margin-left: 10px !important;
}

.main-items-box [class*="van-hairline"]::after {
  left: 15px !important;
  width: 92% !important;
}

.van-button--small {
  color: #fff;
  height: 35px !important;
}

.van-dialog {
  color: #333;
  border-radius: 6px !important;
}

.van-dialog__message-text {
  font-size: 17px !important;
}
</style>