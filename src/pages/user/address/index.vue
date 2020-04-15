<template>

  <div class="container">

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
                <span>{{item.tel}}</span>
              </div>
              <div class="info-bottom-box">{{item.text}}</div>
            </div>
            <div class="r-btns-box">
              <van-icon name="/static/icons/edit-icon.png"
                        @click.stop="onEdit" />
              <van-icon name="/static/icons/del-icon.png"
                        @click.stop="onDel" />
            </div>
          </div>
        </van-radio-group>
      </div>

    </div>
    <div class="bottom-btn-box">
      <div class="bottom-btn-margin">
        <van-button color="#97D700"
                    size="small"
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

export default {
  data () {
    return {
      dataList: [{
        id: 1,
        name: '马小哈',
        tel: 13333333333,
        text: '北京市海淀区龙翔路甲一号泰祥商务楼508北京市'
      }, {
        id: 2,
        name: '马哈',
        tel: 13333333333,
        text: '北京市海淀区龙翔路甲一号泰祥商务楼508北京市'
      }],
      addressResult: '',
      addressIndex: ''
    }
  },
  mounted () {

  },
  methods: {
    onClick (e) {
      const { index, name } = e.currentTarget.dataset
      const pages = getCurrentPages()
      const prev = pages[pages.length - 2]
      const indexData = this.dataList[index]
      this.addressResult = name
      this.addressIndex = index

      prev.data.$root[0].setData('address', { id: indexData.id, val: `${indexData.name}   ${indexData.tel}`, text: indexData.text })

      console.log(prev)

      setTimeout(() => { mpvue.navigateBack() }, 1000)
    },
    onCheckboxAddress (e) {
      this.addressResult = e.mp.detail
    },
    onEdit () {

    },
    onDel (e) {
      Dialog.confirm({
        // customStyle: '',
        title: '提示',
        message: '确认删除该地址信息？'
      }).then(() => {
        // on confirm
        this.addressResult = ''
        this.addressIndex = ''
      }).catch(() => {
        // on cancel
      })
    },
    goNextPage () {
      mpvue.navigateTo({
        url: '/pages/user/addaddr/main'
      })
    },
    submit () {

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