<template>
  <div class="container van-hairline-top">
    <div class="detail-box">
      <div>
        <div class="p-t-box">
          <div>
            <img class="top-s-box"
                 :src="baseUrl + '/PingFangSC/xddmppic/top-bg.jpg'"
                 alt="">
          </div>
          <div class="txt-tip-box"
               :style="{top: top}">
            <div class="m-s-box">
              <van-icon :name="ico"
                        size="19px" />{{statusText}}
              <!-- {{detail.is_buy === 1? '(购)': '(租)'}}{{detail.get_methods === 1? '(提)': '(送)'}} -->
            </div>
            <div v-if="showSubtit"
                 class="cause-box">
              <!-- 未通过原因：联系方式不正确 -->
              <div v-if="mark === 'DZF'">剩余
                <van-count-down :time="countDown"
                                format="HH 时 mm 分" /> 自动关闭订单</div>
              <div v-if="mark === 'YTK'">定金已于{{push_goods_time}}退还</div>
              <div v-if="mark === 'ZLZ'">已使用{{dday || 0}}天</div>
            </div>
          </div>
          <div class="top-see-btn"
               v-if="mark==='YTK' || mark==='YGH'">
            <van-button size="small"
                        color="#97D700"
                        round
                        plain
                        type="default"
                        @click="goShare">查看返还记录</van-button>
          </div>
        </div>
        <!-- 还货图片 -->
        <div v-if="(mark === 'TDJZ' || mark === 'YTK' || mark==='YGH') && returnimages && returnimages.length !== 0"
             class="img-box">
          <div class="img-tit PingFangSC-Medium">还货图片</div>
          <div class="img-items-box">
            <div class="img-item"
                 v-for="(item, index) in returnimages"
                 :key="index">
              <img :src="item"
                   alt="">
            </div>
          </div>
        </div>
        <!-- 破损图片 -->
        <div v-if="(mark === 'TDJZ' || mark==='YTK' || mark==='ZLZ' || mark==='YGH') &&  detail.bad_images.new_images && detail.bad_images.new_images.length !==0 "
             class="img-box">
          <div class="img-tit PingFangSC-Medium">破损图片</div>
          <div class="img-items-box">
            <div class="img-item"
                 v-for="(item, index) in detail.bad_images.new_images"
                 :key="index">
              <img :src="item.images"
                   alt="">
              <div>编号:{{item.box_code}}</div>
            </div>
          </div>
        </div>
        <div v-if="mark==='ZLZ'"
             class="order-mark-box mb10">
          <div class="count-day-box">
            <div class="om-tit">租赁时长</div>
            <div class="cd-n van-hairline">{{detail.use_time}}天</div>
          </div>
          <div class="order-mark-info"
               v-if="pullimagestime">
            <div class="om-tit">开始时间</div>
            <div class="omi-c PingFangSC-Medium">{{pullimagestime}}</div>
          </div>
          <div class="order-mark-info">
            <div class="om-tit">订单备注</div>
            <div class="omi-c PingFangSC-Medium">{{detail.text === "null "? '无': (detail.text || '无')}}</div>
          </div>
        </div>
        <!-- 收货图片 -->
        <div v-if="(mark === 'TDJZ' || mark === 'ZLZ' || mark === 'YWC' || mark==='YTK' || mark==='YGH') && getimages && getimages.length !==0"
             class="img-box">
          <div class="img-tit PingFangSC-Medium">收货图片</div>
          <div class="img-items-box">
            <div class="img-item"
                 v-for="(item, index) in getimages"
                 :key="index">
              <img :src="item"
                   alt="">
            </div>
          </div>
        </div>
        <!-- 破损图片 -->
        <div v-if="(mark === 'TDJZ' || mark === 'ZLZ' || mark==='YTK' || mark==='YGH') && detail.bad_images.old_images && detail.bad_images.old_images.length !==0"
             class="img-box">
          <div class="img-tit PingFangSC-Medium">破损图片</div>
          <div class="img-items-box">
            <div class="img-item"
                 v-for="(item, index) in detail.bad_images.old_images"
                 :key="index">
              <img :src="item.images"
                   alt="">
              <div>编号:{{item.box_code}}</div>
            </div>
          </div>
        </div>
        <!-- 物流信息 -->
        <div v-if="detail.get_methods === 2"
             class="wuliu-box mb10"
             @click="goNextPage">
          <div class="wuliu-icon">
            <van-icon name="/static/icons/wuliu-icon.png"
                      color="#1989fa" />
          </div>
          <div class="wuliu-info">
            <div class="wi-addr">【北京市】快件已到达 北京海淀运转中心…</div>
            <div class="wi-time">2020.1.7 15:30到达</div>
          </div>
          <div class="arrow-box">
            <van-icon name="/static/icons/arrow.png"
                      size="12px" />
          </div>
        </div>
        <!------------- 收货信息 --------------->
        <div v-if="detail.get_methods===2"
             class=" shouhuo-box wuliu-box mb10">
          <div class="wuliu-icon">
            <van-icon name="/static/icons/location.png"
                      color="#1989fa" />
          </div>
          <div class="wuliu-info shouhuo-info">
            <div class="sh-info">
              <span class="PingFangSC-Medium">{{detail.address_name}}</span>
              <span class="">{{detail.address_mobile}}</span>
              <span class="s-t-icon PingFangSC-Medium">收</span>
            </div>
            <div class="wi-time">{{detail.address}}</div>
          </div>
        </div>

        <!-------------- 取货信息 --------------->
        <div v-if="detail.get_methods === 1"
             class=" shouhuo-box huanhuo-box wuliu-box mb10">
          <div class="wuliu-icon">
            <van-icon name="/static/icons/location.png"
                      color="#1989fa" />
          </div>
          <div class="wuliu-info shouhuo-info huanhuo-info">
            <div class="sh-info van-hairline">
              <span class="PingFangSC-Medium">{{detail.get_people}}</span>
              <span class="">{{detail.get_phone}}</span>
              <span class="s-t-icon PingFangSC-Medium">取</span>
            </div>
            <div class="huanhuo-text-box">
              <div class="huanhuo-text-t-box van-hairline">
                <div class="htt-l">取货时间</div>
                <div class="htt-r">{{detail.get_time}}</div>
              </div>
              <div class="huanhuo-text-t-box van-hairline">
                <div class="htt-l">仓库信息</div>
                <div class="htt-r">
                  <div class="htt-r-t">{{detail.house.name}}</div>
                  <div class="htt-r-b">{{detail.house.area_name}}{{detail.house.areatext}}</div>
                </div>
              </div>
              <div class="huanhuo-text-t-box van-hairline">
                <div class="htt-l">仓库电话</div>
                <div class="htt-r">{{detail.house.mobile || ''}}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 还货信息 -->
        <div v-if="mark === 'DTH11'"
             class=" shouhuo-box huanhuo-box wuliu-box mb10">
          <div class="wuliu-icon">
            <van-icon name="/static/icons/location.png"
                      color="#1989fa" />
          </div>
          <div class="wuliu-info shouhuo-info huanhuo-info">
            <div class="sh-info van-hairline">
              <span class="PingFangSC-Medium">{{detail.get_people}}</span>
              <span class="">{{detail.get_phone}}</span>
              <span class="s-t-icon PingFangSC-Medium">{{mark === 'DTH'?'取':"收"}}</span>
            </div>
            <div class="huanhuo-text-box">
              <div class="huanhuo-text-t-box van-hairline">
                <div class="htt-l">取货时间</div>
                <div class="htt-r">{{detail.get_time}}</div>
              </div>
              <div class="huanhuo-text-t-box van-hairline">
                <div class="htt-l">仓库信息</div>
                <div class="htt-r">
                  <div class="htt-r-t">{{detail.house.name}}</div>
                  <div class="htt-r-b">{{detail.house.area_name}}{{detail.house.areatext}}</div>
                </div>
              </div>
              <div class="huanhuo-text-t-box van-hairline">
                <div class="htt-l">仓库电话</div>
                <div class="htt-r">{{detail.house.mobile || ''}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 商品列表 -->
        <div class="product-info mb10">
          <div class="pi-box"
               v-for="(item, index) in detail.son"
               :key="index">
            <div class="pi-box-img">
              <img :src="item.goodsimages"
                   alt="">
            </div>
            <div class="pi-box-r">
              <div class="pbr-t PingFangSC-Medium">{{item.goods_name}}</div>
              <div class="pbr-m">{{item.goods_format}}</div>
              <div class="pbr-b">
                <div class="pbrb-l PingFangSC-Medium">¥{{item.price}}</div>
                <div class="pbrb-r">x{{item.goods_num}}</div>
                <div>
                  <van-button class="pj-btn"
                              v-if="mark==='YTK'"
                              size="small"
                              color="#97D700"
                              custom-style="width: 64px;font-size: 11px;"
                              round
                              plain
                              type="default"
                              @click="goShare">评价商品</van-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 订单备注 -->
        <div class="order-mark-box mb10"
             v-if="mark!=='ZLZ'">
          <div class="count-day-box"
               v-if="detail.is_buy === 0 && mark!=='YTK' ">
            <div class="om-tit">租赁时长</div>
            <div class="cd-n van-hairline">{{detail.use_time}}天</div>
          </div>
          <div class="order-mark-info">
            <div class="om-tit">订单备注</div>
            <div class="omi-c PingFangSC-Medium">{{detail.text === "null "? '无': (detail.text || '无')}}</div>
          </div>
        </div>
        <!-- 订单时间相关 -->
        <div class="some-time-box mb10">
          <div>
            <span class="some-time-title">订单编号：</span>
            <span class="PingFangSC-Medium">{{detail.order_id}}</span>
          </div>
          <div v-if="createtime">
            <span class="some-time-title">创建时间：</span>
            <span class="PingFangSC-Medium">{{createtime}}</span>
          </div>
          <div v-if="detail.paytime && detail.paytime !=='0'">
            <span class="some-time-title">支付时间：</span>
            <span class="PingFangSC-Medium">{{paytime}}</span>
          </div>
          <div v-if="detail.pullimagestime && detail.pullimagestime !=='0'">
            <span class="some-time-title">取货时间：</span>
            <span class="PingFangSC-Medium">{{pullimagestime}}</span>
          </div>
          <div v-if="detail.returntime && detail.returntime !=='0'">
            <span class="some-time-title">还货时间：</span>
            <span class="PingFangSC-Medium">{{returntime}}</span>
          </div>
          <div v-if="detail.push_goods_time && this.is_buy === 0">
            <span class="some-time-title">返款时间：</span>
            <span class="PingFangSC-Medium">{{push_goods_time}}</span>
          </div>
        </div>
        <!-- 金额信息 -->
        <div v-if="detail.is_buy === 0"
             class="amount-box">
          <div class="ab-tit">
            <span class="PingFangSC-Medium">定金</span>
            <span class="abt-r PingFangSC-Medium">合计：¥{{detail.get_price}}</span>
          </div>
          <div class="one-info-box"
               v-for="(item, index) in detail.son"
               :key="index">
            <div class="oi-l">
              <span class="oil-l">{{item.goods_name}}</span>
              <span class="PingFangSC-Medium">x{{item.goods_num}}</span>
            </div>
            <div class="oi-r PingFangSC-Medium">¥{{item.get_price}}</div>
          </div>
        </div>
        <!-- 运费信息 -->
        <div class="amount-box"
             v-if="detail.get_methods === 2">
          <div class="ab-tit">
            <span class="PingFangSC-Medium">运费</span>
            <span class="abt-r PingFangSC-Medium">合计：¥{{detail.transport_money}}</span>
          </div>
          <div class="one-info-box"
               v-for="(item, index) in detail.son"
               :key="index">
            <div class="oi-l">
              <span class="oil-l">{{item.goods_name}}</span>
              <span class="PingFangSC-Medium">x{{item.goods_num}}</span>
            </div>
            <div class="oi-r PingFangSC-Medium">¥{{item.transport_money}}</div>
          </div>
        </div>
        <!-- 租金信息 -->
        <div class="amount-box"
             v-if="detail.is_buy === 0">
          <div class="ab-tit">
            <span class="PingFangSC-Medium">租金</span>
            <span class="abt-r PingFangSC-Medium">合计：¥{{detail.price}}</span>
          </div>
          <div class="one-info-box"
               v-for="(item, index) in detail.son"
               :key="index">
            <div class="oi-l">
              <span class="oil-l">{{item.goods_name}}</span>
              <span class="PingFangSC-Medium">x{{item.goods_num}}</span>
            </div>
            <div class="oi-r PingFangSC-Medium">¥{{item.price}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-btn-box van-hairline--top"
         v-if="mark === 'YWC'  || mark === 'DQR' || mark === 'DZF' || mark === 'DTH' || mark === 'DFH' || mark==='YGH' || mark==='ZLZ' || mark === 'DQH' || (mark === 'YTK' && detail.status === '9' && detail.ticket === '2') ">
      <div class="bottom-btn-box-left">
        <span v-if="mark==='DZF' || mark==='DQR' || mark==='YGH'"
              class="bbb-l-r">应付:</span>
        <span v-if="mark==='DZF' || mark==='DQR' || mark==='YGH'"
              class="bbb-l-l Oswald-Medium">¥{{detail.pay_price}}</span>
      </div>
      <div class="bottom-btn-box-right"
           @click="goShare">
        <van-button class="cancel-btn"
                    v-if="mark==='DTH' || mark==='DZF' || mark==='DFH' || mark==='DFH' ||mark==='DQR'"
                    plain
                    size="small"
                    color="#ddd"
                    custom-style="width: 90px"
                    round
                    type="default">取消订单</van-button>
        <van-button v-if="mark==='DQR'"
                    plain
                    size="small"
                    color="#97d700"
                    custom-style="width: 100px"
                    round
                    type="primary">上传支付凭证</van-button>
        <van-button v-if="mark==='DZF' && detail.get_methods === 2"
                    size="small"
                    color="#97D700"
                    custom-style="width: 90px"
                    round
                    type="default">立即付款</van-button>
        <van-button v-if="mark==='ZLZ' || mark==='YGH' || mark==='YWC'  || mark==='TDJZ' "
                    plain
                    size="small"
                    color="#ddd"
                    custom-style="width: 90px"
                    round
                    type="default">申请售后</van-button>
        <van-button v-if="mark==='ZLZ' "
                    size="small"
                    color="#97D700"
                    custom-style="width: 90px; margin-left: 10px"
                    round
                    type="default">返还</van-button>
        <van-button v-if="mark==='YGH'"
                    size="small"
                    color="#97D700"
                    custom-style="width: 90px; margin-left: 10px"
                    round
                    type="default">支付</van-button>
        <!-- <van-button v-if="mark==='YTK' "
                    plain
                    size="small"
                    color="#ddd"
                    custom-style="width: 100px"
                    round
                    type="default">查看返还记录</van-button> -->
        <van-button v-if="mark==='YTK'  && detail.status === '9' && detail.ticket === '2'"
                    plain
                    size="small"
                    color="#ddd"
                    custom-style="width: 90px"
                    round
                    type="default">申请开票</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import API from '@/api/api'
import moment from 'moment'
import { getOrderDetail, getTranspost } from '@/api/getData'
export default {
  data () {
    return {
      baseUrl: API.baseUrl,
      top: '50rpx',
      ico: '/static/icons/await.png',
      id: null,
      mark: null,
      dday: 0,
      countDown: null,
      statusText: null,
      showSubtit: true,
      detail: null,
      get_methods: null,
      getimages: null,
      returnimages: null,
      createtime: null,
      paytime: null,
      get_time: null,
      returntime: null,
      push_goods_time: null,
      pullimagestime: null
    }
  },
  onLoad (options) {
    this.id = options.id
    this.mark = options.mark
    this.statusText = options.statusText

    if (this.mark === 'DTH' || this.mark === 'DSH' || this.mark === 'DQR' || this.mark === 'DFH' || this.mark === 'YSH' || this.mark === 'YQX' || this.mark === 'YGH' || this.mark === 'YGB' || this.mark === 'TDJZ' || this.mark === 'YWC') {
      this.top = '66rpx'
      this.showSubtit = false
    }
    if (this.mark === 'YGB' || this.mark === 'YQX') {
      this.ico = '/static/icons/order-close.png'
    }
    if (this.mark === 'YWC' || this.mark === 'YTK') {
      this.ico = '/static/icons/order-over.png'
    }
    this.getOrderDetail()
    this.getTranspost()
  },
  mounted () {

  },
  methods: {
    async getOrderDetail () {
      try {
        const res = await getOrderDetail({ order_id: this.id })
        console.log('getOrderDetail', res)
        if (res.data.code === 1) {
          let result = res.data.data
          this.detail = res.data.data

          console.log()
          this.dday = (new Date().getTime() - parseInt(res.data.data.pullimagestime) * 1000) / 1000 / 60 / 60 / 24
          this.dday = this.dday < 1 ? 1 : this.dday

          this.get_methods = res.data.data.get_methods
          this.createtime = moment(result.createtime * 1000).format('YYYY.MM.DD HH:mm:ss ') // 创建时间
          this.paytime = moment(result.paytime * 1000).format('YYYY.MM.DD HH:mm:ss ') // 支付时间
          // this.get_time = moment(result.get_time * 1000)).format('YYYY-MM-DD HH:mm:ss ') // 取货时间
          this.returntime = moment(result.returntime * 1000).format('YYYY.MM.DD HH:mm:ss ') // 还货时间
          this.push_goods_time = moment(result.push_goods_time * 1000).format('YYYY.MM.DD ') // 返款时间
          this.pullimagestime = result.pullimagestime ? moment(result.pullimagestime * 1000).format('YYYY.MM.DD ') : '' // 开始租赁（收货时间）

          this.getimages = result.getimages && result.getimages.split(',')
          this.returnimages = result.returnimages && result.returnimages.split(',')

          if (this.mark === 'DZF') {
            let timeDown = result.createtime + (12 * 60 * 60) - (new Date().getTime() / 1000)
            timeDown = timeDown > 0 ? parseInt(timeDown * 1000) : 0
            this.countDown = timeDown
          }
        }
      } catch (error) {
        console.log('* error getOrderDetail', error)
      }
    },
    async getTranspost () {
      try {
        const res = await getTranspost({ order_id: this.id })
        console.log(res)
        if (res.data.code === 1) {

        }
      } catch (error) {

      }
    },
    goNextPage () {
      mpvue.navigateTo({
        url: '/pages/order/transport/main'
      })
    },
    goShare () {
      mpvue.navigateTo({
        url: '/pages/share/main'
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
.PingFangSC-Medium {
  color: #333;
}
.container {
  /* height: 100%; */
}
.detail-box {
  flex: 1;
  overflow-y: auto;
}
.p-t-box {
  position: relative;
}
.top-see-btn {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
}
.top-s-box {
  width: 100%;
  height: 93px;
}
.txt-tip-box {
  position: absolute;
  top: 25px;
  left: 20px;
}
.m-s-box {
  font-size: 18px;
  color: #ffffff;
  /* font-weight: bold; */
  line-height: 25px;
}
.cause-box {
  font-size: 13px;
  color: #ffffff;
  line-height: 18px;
  margin-top: 5px;
  margin-left: 25px;
}

.img-box {
  padding: 2px 15px 8px;
  background-color: #fff;
  margin-bottom: 10px;
}
.img-tit {
  font-size: 13px;
  color: #333333;
  padding: 14px 0;
}
.img-item {
  display: inline-block;
  margin-right: 7px;
  margin-bottom: 7px;
}
.img-item:nth-child(4n) {
  margin: 0;
}
.img-item img {
  width: 81px;
  border-radius: 2px;
  height: 81px;
  /* background: skyblue; */
}
.img-item div {
  font-size: 12px;
  color: #333333;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.some-time-box {
  font-size: 13px;
  padding: 10px 15px;
  background: #fff;
}
.some-time-box div {
  padding: 5px 0;
}
.some-time-title {
  color: #666666;
  width: 75px;
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
/* 还货 */
.huanhuo-info .sh-info {
  padding: 10px 0;
}
.huanhuo-text-t-box {
  display: flex;
  font-size: 13px;
  color: #333;
  padding: 10px 0;
}
.htt-l {
  color: #999999;
}
.htt-r {
  flex: 1;
  margin-left: 15px;
}
/* ???? */
.order-mark-box {
  font-size: 13px;
  padding: 0 15px;
  background-color: #fff;
}
.om-tit {
  font-size: 13px;
  color: #666666;
  margin-right: 20px;
  position: relative;
}

.count-day-box {
  display: flex;
  color: #333;
  line-height: 50px;
}
.cd-n {
  flex: 1;
  font-weight: bold;
}
.order-mark-info {
  display: flex;
  padding: 17px 0;
}
.omi-c {
  flex: 1;
  color: #333;
  font-size: 13px;
  line-height: 18px;
}
/* ??? */
.product-info {
  padding: 8px 15px;
  background-color: #fff;
}
.pi-box {
  display: flex;
  padding: 8px 0;
}
.pi-box-r {
  flex: 1;
}
.pi-box-img {
  width: 70px;
  height: 70px;
  margin-right: 10px;
}
.pi-box-img img {
  width: 70px;
  height: 70px;
  border-radius: 4px;
  /* background-color: skyblue; */
}
.pbr-t {
  font-size: 13px;
  color: #333333;
}
.pbr-m {
  width: 265px;
  font-size: 12px;
  color: #999999;
  line-height: 17px;
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pbr-b {
  font-size: 13px;
  color: #333333;
  line-height: 18px;
  margin-top: 11px;
}
.pbr-b {
  display: flex;
}
.pbrb-r {
  flex: 1;
  text-align: right;
}
/* ?? */
.amount-box {
  padding: 0 15px 5px;
  background-color: #fff;
  margin-bottom: 10px;
}
.ab-tit {
  display: flex;
  font-size: 13px;
  color: #333333;
  font-weight: bold;
  padding: 16px 0;
}
.abt-r {
  flex: 1;
  text-align: right;
}
.one-info-box {
  display: flex;
  font-size: 13px;
  color: #666666;
  padding-bottom: 10px;
}
.oi-l {
  padding-left: 15px;
}
.oi-r {
  flex: 1;
  text-align: right;
}
.oil-l {
  margin-right: 20px;
}
.bottom-btn-box {
  display: flex;
  height: 49px;
  background-color: #fff;
  /* justify-content: space-between; */
  padding-bottom: env(safe-area-inset-bottom);
}
.bottom-btn-box-left {
  flex: 1;
  text-indent: 7px;
  /* height: 35px; */
}
.bottom-btn-box-right {
  padding: 7px 15px 7px 0;
}
.bottom-btn-box .ab-tit {
  min-height: 1px;
}
.bottom-btn-box .bbb-l-r,
.bottom-btn-box .bbb-l-l {
  display: inline-block;
  line-height: 49px;
}

.bbb-l {
  flex: 1;
  line-height: 35px;
  font-size: 15px;
  color: #333333;
}
.bbb-l span {
  line-height: 35px;
}
.bbb-l-r {
  font-size: 15px;
  line-height: 21px;
  /* margin-top: 9px; */
  vertical-align: top;
}
.bbb-l-l {
  font-size: 20px;
  color: #97d700;
  /* font-weight: bold; */
}
</style>
<style>
.van-count-down {
  display: inline-block;
  color: #fff !important;
  font-size: 13px !important;
}

.m-s-box ._van-icon {
  vertical-align: -10%;
  margin-right: 6px;
}
.wuliu-icon .van-icon--image {
  width: 15px !important;
  height: 13px !important;
}
.wuliu-box .arrow-box ._van-icon {
  margin-top: 12px;
}
.shouhuo-box .van-icon--image {
  width: 11px !important;
  height: 13px !important;
}
.shouhuo-box ._van-icon {
  margin-top: 3px;
}
.huanhuo-box ._van-icon {
  margin-top: 12px;
}
.top-see-btn .van-button--small.van-button--plain {
  width: 110px !important;
  height: 35px !important;
  font-size: 14px !important;
  color: #ffffff !important;
  background: rgba(255, 255, 255, 0.2) !important;
  border: 0.5px solid #ffffff !important;
}
.pj-btn .van-button--small.van-button--plain {
  color: #97d700 !important;
  height: 22px !important;
  margin-left: 20px !important;
}
.van-button--small {
  /* color: #666 !important; */
  /* color: #fff; */
  height: 35px !important;
  /* margin-left: 8px; */
  /* padding: 0 12px !important; */
}
.van-button--small.van-button--plain {
  color: #666 !important;
}
.cancel-btn .van-button--plain {
  margin-right: 10px !important;
}
</style>