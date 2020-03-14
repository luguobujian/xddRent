<template>
  <div class="container">
    <div class="detail-box">
      <div>
        <div class="p-t-box">
          <div>
            <img class="top-s-box"
                 src="/static/images/top-bg.png"
                 alt="">
          </div>
          <div class="txt-tip-box">
            <div class="m-s-box">
              <van-icon name="warning-o"
                        size="22px" />未通过
            </div>
            <div class="cause-box">未通过原因：联系方式不正确</div>
          </div>
        </div>
        <!-- 还货图片 -->
        <div class="img-box">
          <div class="img-tit">还货图片</div>
          <div class="img-items-box">
            <div class="img-item"><img src=""
                   alt=""></div>
            <div class="img-item"><img src=""
                   alt=""></div>
            <div class="img-item"><img src=""
                   alt=""></div>
            <div class="img-item"><img src=""
                   alt=""></div>
          </div>
        </div>
        <!-- 破损图片 -->
        <div class="img-box">
          <div class="img-tit">破损图片</div>
          <div class="img-items-box">
            <div class="img-item">
              <img src=""
                   alt="">
              <div>箱子编号1</div>
            </div>
            <div class="img-item">
              <img src=""
                   alt="">
              <div>箱子编号2</div>
            </div>
            <div class="img-item">
              <img src=""
                   alt="">
              <div>箱子编号3</div>
            </div>
            <div class="img-item">
              <img src=""
                   alt="">
              <div>箱子编号4</div>
            </div>
          </div>
        </div>
        <!-- 物流信息 -->
        <div class="wuliu-box mb10"
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
            <van-icon name="arrow" />
          </div>
        </div>
        <!-- 收货信息 -->
        <div class=" shouhuo-box wuliu-box mb10">
          <div class="wuliu-icon">
            <van-icon name="/static/icons/location.png"
                      color="#1989fa" />
          </div>
          <div class="wuliu-info shouhuo-info">
            <div class="sh-info">
              <span class="">李先生</span>
              <span class="">18632763762</span>
              <span class="s-t-icon">收</span>
            </div>
            <div class="wi-time">北京市海淀区龙翔路甲一号泰祥商务楼208室</div>
          </div>
        </div>
        <!-- 还货信息 -->
        <div class=" shouhuo-box huanhuo-box wuliu-box mb10">
          <div class="wuliu-icon">
            <van-icon name="/static/icons/location.png"
                      color="#1989fa" />
          </div>
          <div class="wuliu-info shouhuo-info huanhuo-info">
            <div class="sh-info van-hairline">
              <span class="">李先生</span>
              <span class="">18632763762</span>
              <span class="s-t-icon">还</span>
            </div>
            <div class="huanhuo-text-box">
              <div class="huanhuo-text-t-box van-hairline">
                <div class="htt-l">取货时间</div>
                <div class="htt-r">2020.02.21</div>
              </div>
              <div class="huanhuo-text-t-box van-hairline">
                <div class="htt-l">取货时间</div>
                <div class="htt-r">
                  <div class="htt-r-t">这里是仓库名称</div>
                  <div class="htt-r-b">这里是地址这里是地址这里是地址这里是地址这里是地址</div>
                </div>
              </div>
              <div class="huanhuo-text-t-box van-hairline">
                <div class="htt-l">仓库电话</div>
                <div class="htt-r">1862736273</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 商品列表 -->
        <div class="product-info mb10">
          <div class="pi-box">
            <div class="pi-box-img">
              <img src=""
                   alt="">
            </div>
            <div class="pi-box-r">
              <div class="pbr-t">讯纳箱/Alphard</div>
              <div class="pbr-m">红色/大号</div>
              <div class="pbr-b">
                <div class="pbrb-l">¥69.9</div>
                <div class="pbrb-r">x1</div>
              </div>
            </div>
          </div>
          <div class="pi-box">
            <div class="pi-box-img">
              <img src=""
                   alt="">
            </div>
            <div class="pi-box-r">
              <div class="pbr-t">讯纳箱/Alphard</div>
              <div class="pbr-m">红色/大号</div>
              <div class="pbr-b">
                <div class="pbrb-l">¥69.9</div>
                <div class="pbrb-r">x1</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 订单备注 -->
        <div class="order-mark-box mb10">
          <div class="count-day-box">
            <div class="om-tit">租赁时长</div>
            <div class="cd-n van-hairline">30天</div>
          </div>
          <div class="order-mark-info">
            <div class="om-tit">订单备注</div>
            <div class="omi-c">这里是备注这里是备注这里是备注这里是备注这里是备注这里是备注这里是备注这里是备注</div>
          </div>
        </div>
        <!-- 订单时间相关 -->
        <div class="some-time-box mb10">
          <div>
            <span class="some-time-title">订单编号：</span>
            <span>1238612964129</span>
          </div>
          <div>
            <span class="some-time-title">创建时间：</span>
            <span>1238612964129</span>
          </div>
          <div>
            <span class="some-time-title">支付时间：</span>
            <span>1238612964129</span>
          </div>
          <div>
            <span class="some-time-title">取货时间：</span>
            <span>1238612964129</span>
          </div>
          <div>
            <span class="some-time-title">还货时间：</span>
            <span>1238612964129</span>
          </div>
          <div>
            <span class="some-time-title">取货时间：</span>
            <span>1238612964129</span>
          </div>
          <div>
            <span class="some-time-title">返款时间：</span>
            <span>1238612964129</span>
          </div>
        </div>
        <!-- 金额信息 -->
        <div class="amount-box">
          <div class="ab-tit">
            <span>定金</span>
            <span class="abt-r">合计：¥20000.00</span>
          </div>
          <div class="one-info-box">
            <div class="oi-l">
              <span class="oil-l">这里是箱子名称</span>
              <span>x2</span>
            </div>
            <div class="oi-r">¥5000.00</div>
          </div>
          <div class="one-info-box">
            <div class="oi-l">
              <span class="oil-l">这里是箱子名称</span>
              <span>x2</span>
            </div>
            <div class="oi-r">¥5000.00</div>
          </div>
        </div>
        <!-- 运费信息 -->
        <div class="amount-box">
          <div class="ab-tit">
            <span>运费</span>
            <span class="abt-r">合计：¥20000.00</span>
          </div>
          <div class="one-info-box">
            <div class="oi-l">
              <span class="oil-l">这里是箱子名称</span>
              <span>x2</span>
            </div>
            <div class="oi-r">¥5000.00</div>
          </div>
          <div class="one-info-box">
            <div class="oi-l">
              <span class="oil-l">这里是箱子名称</span>
              <span>x2</span>
            </div>
            <div class="oi-r">¥5000.00</div>
          </div>
        </div>
        <!-- 租金信息 -->
        <div class="amount-box">
          <div class="ab-tit">
            <span>租金</span>
            <span class="abt-r">合计：¥20000.00</span>
          </div>
          <div class="one-info-box">
            <div class="oi-l">
              <span class="oil-l">这里是箱子名称</span>
              <span>x2</span>
            </div>
            <div class="oi-r">¥5000.00</div>
          </div>
          <div class="one-info-box">
            <div class="oi-l">
              <span class="oil-l">这里是箱子名称</span>
              <span>x2</span>
            </div>
            <div class="oi-r">¥5000.00</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-btn-box">
      <div class="bbb-l">
        <span class="bbb-l-r">应付:</span>
        <span class="bbb-l-l">¥20000.00</span>
      </div>
      <div>
        <van-button plain
                    size="small"
                    color="#DDDDDD"
                    round
                    type="default">取消订单</van-button>
        <van-button plain
                    size="small"
                    color="#97D700"
                    round
                    type="default">上传支付凭证</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    goNextPage () {
      wx.navigateTo({
        url: '/pages/order/transport/main'
      })
    }
  }
}
</script>
<style scoped>
.container {
  height: 100%;
}
.detail-box {
  flex: 1;
}
.p-t-box {
  position: relative;
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
  font-weight: bold;
  line-height: 25px;
}
.cause-box {
  font-size: 13px;
  color: #ffffff;
  line-height: 18px;
  margin-top: 5px;
  margin-right: 25px;
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
  background: skyblue;
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
  vertical-align: 20%;
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
  background-color: skyblue;
}
.pbr-t {
  font-size: 13px;
  color: #333333;
}
.pbr-m {
  font-size: 12px;
  color: #999999;
  line-height: 17px;
  margin-top: 5px;
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
  padding: 7px 15px;
  background-color: #fff;
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
  line-height: 21px;
  /* margin-top: 9px; */
  vertical-align: top;
}
.bbb-l-l {
  font-size: 20px;
  color: #97d700;
  font-weight: bold;
}
</style>
<style>
.m-s-box ._van-icon {
  vertical-align: -16%;
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
.huanhuo-box ._van-icon {
  margin-top: 11px;
}
.van-button--small {
  /* color: #fff; */
  height: 35px !important;
  margin-left: 8px;
  padding: 0 12px !important;
}
</style>