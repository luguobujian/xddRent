<template>
  <div class="container">
    <div class=" shouhuo-box wuliu-box mb10">
      <div class="wuliu-icon">
        <van-icon name="/static/icons/location.png"
                  color="#1989fa" />
      </div>
      <div class="wuliu-info shouhuo-info">
        <div class="sh-info">
          <span class="">{{detail.address_name}}</span>
          <span class="">{{detail.address_mobile}}</span>
          <span class="s-t-icon">收</span>
        </div>
        <div class="wi-time">{{detail.address}}</div>
      </div>
    </div>
    <div class="box">
      <div class="tit">物流详情</div>
      <van-steps :steps="steps"
                 :active="active"
                 direction="vertical"
                 active-color="#97D700"
                 inactive-color="#97D700"
                 active-icon="/static/icons/active-icon.png" />
    </div>
  </div>
</template>
<script>
import { getOrderDetail, getTranspost } from '@/api/getData'
export default {
  data () {
    return {
      id: null,
      detail: null,
      steps: []
    }
  },
  onLoad (options) {
    console.log(options)
    this.id = options.id
    this.getOrderDetail()
    this.getData()
  },
  methods: {
    async getOrderDetail () {
      try {
        const res = await getOrderDetail({ order_id: this.id })
        console.log('getOrderDetail', res)
        if (res.data.code === 1) {
          this.detail = res.data.data
        }
      } catch (error) {
        console.log('* error getOrderDetail', error)
      }
    },
    async getData () {
      try {
        const res = await getTranspost({ order_id: this.id })
        console.log(res)
        let result = res.data.data
        let arr = []
        result.forEach((item, key) => {
          arr.push({
            text: item.location,
            desc: item.datatime
          })
        })
        this.steps = arr
      } catch (error) {
        console.log('* error', error)
      }
    }
  }
}
</script>
<style lang="">
.box {
  flex: 1;
  padding: 15px;
  background: #fff;
  overflow: auto;
}
.tit {
  padding: 15px 0;
  line-height: 24px;
}
/* wuliu */
.wuliu-box {
  display: flex;
  padding: 15px;
  background: #fff;
}

.wuliu-info {
  flex: 1;
  margin-left: 8px;
}
.wi-addr {
  font-size: 15px;
  color: #97d700;
  line-height: 21px;
}
.wi-time {
  font-size: 12px;
  color: #999999;
  margin-top: 3px;
}

/* 收货 */
.shouhuo-box {
}
.shouhuo-info {
  margin-left: 10px;
}
.sh-info {
  font-size: 15px;
  color: #333333;
}
.s-t-icon {
  display: inline-block;
  width: 23px;
  height: 18px;
  font-size: 11px;
  color: #97d700;
  text-align: center;
  line-height: 18px;
  background: rgba(151, 215, 0, 0.2);
  border-radius: 6px 0 6px 0;
  vertical-align: 10%;
}
.sh-info span {
  margin-right: 15px;
}
.htt-r-b {
  font-size: 12px;
  color: #999999;
  line-height: 17px;
  margin-top: 5px;
}
</style>
<style >
.van-step--vertical {
  font-size: 14px !important;
  color: #999999 !important;
}
.van-step--vertical::after {
  border: none !important;
}
[class*="van-hairline"]::after {
  border: none !important;
}
.van-step--vertical .van-step__line {
  background: rgba(151, 215, 0, 0.2) !important;
}
</style>