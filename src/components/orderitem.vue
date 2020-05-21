<template>
  <div>
    <div class="items-box">
      <div class="item"
           v-for="(item, index) in dataList"
           :key="index"
           @click="onClick(item.order_id, item.customMark, item.statusText)">
        <div class="order-no-info-box van-hairline">
          <div class="order-no-box">订单编号：{{item.order_id}}</div>
          <div class="order-status-box PingFangSC-Medium">{{ item.statusText}}</div>
        </div>
        <div class="product-info-box van-hairline"
             v-for="(itm, idx) in item.goods_arr"
             :key="idx">
          <div class="product-img-box">
            <img class="product-img"
                 :src="itm.goodsimages"
                 alt="">
          </div>
          <div class="product-text-box">
            <div class="product-name PingFangSC-Medium">{{itm.goods_name}}</div>
            <div class="product-skus-n">
              <span class="product-skus">{{itm.goods_format}}</span>
              <span class="product-n">x{{itm.goods_num}}</span>
            </div>
          </div>
        </div>
        <div class="btns-info-box">
          <div class="info-p-box Oswald-Medium">合计:¥{{item.pay_price}}</div>
          <div class="btns-box"
               v-if="item.status !== '9'">
            <van-button v-if="item.status === '1' || item.status === '2' || item.status === '3'"
                        plain
                        size="small"
                        color="#DDDDDD"
                        custom-style="width: 80px"
                        round
                        type="default">取消订单</van-button>
            <van-button v-if="item.status === '1'"
                        size="small"
                        color="#97d700"
                        custom-style="width: 80px"
                        round
                        type="primary">去支付</van-button>
            <van-button v-if="item.status === '11'"
                        size="small"
                        plain
                        color="#97d700"
                        custom-style="width: 100px"
                        round
                        type="primary">上传支付凭证</van-button>
            <van-button v-if="item.status === '2' && item.get_methods === 2"
                        plain
                        size="small"
                        color="#DDDDDD"
                        custom-style="width: 80px"
                        round
                        type="default">查看物流</van-button>
            <van-button v-if="item.status === '5'  || item.status === '6' || item.status === '7'"
                        plain
                        size="small"
                        color="#DDDDDD"
                        custom-style="width: 80px"
                        round
                        type="default">申请售后</van-button>
            <van-button v-if="item.status === '5'  || item.status === '6' || item.status === '7'"
                        size="small"
                        color="#97d700"
                        custom-style="width: 80px"
                        round
                        type="primary">返还</van-button>
          </div>
          <div class="btns-box"
               v-if="item.status === '9'">
            <div class="return-box money">
              <div class="return-box-tit">已返还金额:</div>
              <div class="money-tip">¥</div>{{item.get_price}}
            </div>
          </div>
        </div>
        <div v-if="item.down > 0"
             class="count-down ">
          <van-count-down :time="item.down"
                          format="HH 时 mm 分" />后关闭
        </div>
      </div>
      <nomoreComponents :tipBoxTop="tipBoxTop"
                        :tipSrc="tipSrc"
                        :dataList="dataList"></nomoreComponents>
    </div>
  </div>
</template>

<script>
import nomoreComponents from '@/components/nomore'
export default {
  props: ['dataList'],
  components: {
    nomoreComponents
  },
  methods: {
    onClick (id, mark, statusText) {
      this.$emit('childEvent', { id, mark, statusText })
    }
  }
}
</script>

<style scoped>
.item {
  padding: 0 15px;
  background: #fff;
  margin-bottom: 10px;
}
.order-no-info-box {
  display: flex;
  font-size: 13px;
  color: #999999;
  padding: 11px 0;
}
.order-no-box,
.order-status-box {
  flex: 1;
}
.order-status-box {
  color: #97d700;
  text-align: right;
}
.product-info-box {
  display: flex;
  padding: 15px 0;
}

.product-text-box {
  flex: 1;
}
.product-img-box {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.product-img {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background: skyblue;
}
.product-name {
  font-size: 13px;
  line-height: 18px;
  color: #333333;
  margin-top: 4px;
}
.product-skus-n {
  display: flex;

  font-size: 12px;
  color: #999999;
  line-height: 17px;
  margin-top: 8px;
}
.product-skus {
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-n {
  flex: 1;
}
.product-n {
  text-align: right;
}
.btns-info-box {
  padding: 8px 0;
}
.btns-info-box {
  display: flex;
}
.info-p-box {
  font-size: 14px;
  color: #333333;
  line-height: 30px;
}
.count-down {
  text-align: right;
  font-size: 13px;
  color: #333333;
  padding-bottom: 8px;
}
.btns-box {
  flex: 1;
  font-size: 13px;
  text-align: right;
  line-height: 30px;
}
.return-box {
  font-size: 15px;
  font-family: "Oswald-Medium";
}
.return-box div {
  display: inline-block;
}
.return-box-tit {
  color: #333;
  font-size: 13px;
  font-family: "PingFangSC-Regular";
}
.money-tip {
  font-size: 13px;
}
.money {
  color: #97d700;
}
</style>