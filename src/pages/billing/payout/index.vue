<template>
  <div class="container van-hairline--top">
    <div class="info-box">
      <div class="info-tit-box">收款账户</div>
      <div v-if="radio === 'alipay'"
           class="o-info-box">支付宝账户</div>
      <div v-if="radio === 'card'"
           class="o-info-box">银行卡账户</div>
      <div v-if="radio === 'wxpay'"
           class="o-info-box">微信账户</div>
      <div class="o-info-box">收款帐号：{{(radioInfo && radioInfo.number) || ''}}</div>
    </div>
    <van-icon class="chs-btn"
              size="14"
              name="arrow"
              @click="showPayout = true" />
    <div class="form-box">
      <div>
        <van-field type="number"
                   label="￥"
                   placeholder="请输入提现金额"
                   label-width="22px"
                   custom-style="font-family:'Oswald-Medium'"
                   :value="money"
                   @input="onInputMoneyKey" />
      </div>
      <div class="
                   tip-box">当前余额：¥{{haveMoney}} <span class="colorBtn"
              @click="getAll">全部提现</span>
      </div>
    </div>
    <div class="bottom-btn-box">
      <div class="bottom-btn-margin">
        <van-button color="#97D700"
                    size="small"
                    custom-style="font-size: 15px"
                    round
                    block
                    @click="goPayout">确认提现</van-button>
      </div>
    </div>
    <van-popup :show="showPayout"
               position="bottom"
               custom-style="height: 80%;width: 100%"
               round
               closeable
               @clickOverlay="showPayout = false"
               @close="showPayout = false">
      <div class="payout-box">
        <div class="payout-tit">选择提现账户</div>
        <div class="payout-type-box">
          <van-radio-group :value="radio"
                           @input="onChange">
            <div class="type-item card"
                 @click="onClick">
              <div class="type-item-left">
                <div class="type-item-tit">银行卡</div>
                <div class="type-item-cell">
                  <div class="small-tit">持卡人</div>
                  <div>{{cardInfo && cardInfo.name}}</div>
                </div>
                <div class="type-item-cell">
                  <div class="small-tit">开户行</div>
                  <div>{{cardInfo &&cardInfo.address}}</div>
                </div>
                <div class="type-item-cell">
                  <div class="small-tit">银行卡号</div>
                  <div>{{cardInfo &&cardInfo.number}}</div>
                </div>
              </div>
              <div class="type-item-right">
                <van-radio class="type-item-radio"
                           checked-color="#97D700"
                           name="card"></van-radio>
              </div>
            </div>
            <div class="type-item alipay"
                 @click="onClick">
              <div class="type-item-left">
                <div class="type-item-tit">支付宝</div>
                <div class="type-item-cell">
                  <div class="small-tit">绑定手机</div>
                  <div>{{alipayInfo && alipayInfo.address}}</div>
                </div>
                <div class="type-item-cell">
                  <div class="small-tit">帐号</div>
                  <div>{{alipayInfo && alipayInfo.number}}</div>
                </div>
              </div>
              <div class="type-item-right">
                <van-radio class="type-item-radio"
                           checked-color="#97D700"
                           name="alipay"></van-radio>
              </div>
            </div>
            <div class="type-item wxpay"
                 @click="onClick">
              <div class="type-item-left">
                <div class="type-item-tit">微信</div>
                <div class="type-item-cell">
                  <div v-if="!wxpayInfo"
                       class="small-tit">暂无微信账户信息</div>
                  <div v-if="wxpayInfo"
                       class="small-tit">绑定手机</div>
                  <div v-if="wxpayInfo">{{wxpayInfo && wxpayInfo.address}}</div>
                </div>
                <div v-if="wxpayInfo"
                     class="type-item-cell">
                  <div class="small-tit">帐号</div>
                  <div>{{wxpayInfo && wxpayInfo.number}}</div>
                </div>
              </div>
              <div class="type-item-right">
                <van-radio v-if="wxpayInfo"
                           class="type-item-radio"
                           checked-color="#97D700"
                           name="wxpay"></van-radio>
                <div v-if="!wxpayInfo"
                     class="add-button">去添加</div>
              </div>
            </div>
          </van-radio-group>
        </div>
      </div>
    </van-popup>
    <van-toast id="van-toast" />
    <van-dialog :show="show"
                id="van-dialog"
                use-slot
                title="输入提现密码"
                show-cancel-button
                confirmButtonColor="#97D700"
                @cancel="show=false"
                @confirm="submit">

      <div class="inp-box">
        <van-cell-group>
          <van-field :value="password"
                     type="password"
                     border
                     placeholder="请输入提现密码"
                     @input="onInputPassword" />
        </van-cell-group>
      </div>
      <div class="tip-text"
           @click="goGetPassPage">忘记密码?</div>
    </van-dialog>
  </div>
</template>
<script>
// import Dialog from '../../../../static/vant/dialog/dialog'
import Toast from '../../../../static/vant/toast/toast'
import { pullWallet, myMoney, firstPay, accountList } from '@/api/getData'
export default {
  data () {
    return {
      showPayout: false,
      radio: null,
      radioInfo: null,
      // accountList: null,
      cardInfo: null,
      alipayInfo: null,
      wxpayInfo: null,
      type: null,
      number: null,
      money: null,
      haveMoney: null,
      show: false,
      hasPassword: null,
      password: null
    }
  },
  onLoad () {
    this.myMoney()
    this.firstPay()
    this.accountList()
  },
  mounted () {

  },
  methods: {
    async myMoney () {
      try {
        const res = await myMoney()
        console.log(res)
        this.haveMoney = res.data.data.money
      } catch (error) {
        console.log('* myMoney error', error)
        Toast.fail(error.data.msg)
      }
    },
    async firstPay () {
      try {
        const res = await firstPay()
        console.log(res)
        if (res.data.code === 1) {
          this.hasPassword = res.data.data
        }
      } catch (error) {
        console.log('* firstPay error', error)
      }
    },
    async accountList () {
      try {
        const res = await accountList()
        console.log(res)
        let arr = res.data.data
        arr.forEach((item, key) => {
          if (item.type === '1') {
            this.alipayInfo = item
          } else if (item.type === '2') {
            this.wxpayInfo = item
          } else if (item.type === '3') {
            this.cardInfo = item
          }
        })
      } catch (error) {
        console.log('* accountList error', error)
      }
    },
    async submit () {
      try {
        if (!this.radioInfo) {
          Toast.fail('请选择提现账号')
          return
        }
        if (!this.radioInfo.number) {
          Toast.fail('提现账号获取失败')
          return
        }
        if (!this.money) {
          Toast.fail('提现金额不能为空')
          return
        }
        const res = await pullWallet({ type: this.radioInfo.type, number: this.radioInfo.number, money: this.money, pwd: this.password })
        console.log(res)
        if (res.data.code === 1) {
          Toast.success('提交成功')
          setTimeout(() => { mpvue.navigateBack() }, 1500)
        }
      } catch (error) {
        console.log('* submit error', error)
      }
    },
    onInputMoneyKey (e) {
      this.money = e.mp.detail
    },
    onInputPassword (e) {
      this.password = e.mp.detail
    },
    onChange (e) {
      console.log(e)
      this.radio = e.mp.detail
      this.radioInfo = this[e.mp.detail + 'Info']
      // if (this.hasPassword === 1) {
      //   this.show = true
      // } else {
      //   mpvue.navigateTo({
      //     url: '/pages/billing/settings/main?from=setPass'
      //   })
      // }

      this.showPayout = false
    },
    getAll () {
      this.money = this.haveMoney
    },
    goPayout () {
      if (!this.money) {
        Toast.fail('提现金额不能为空')
        return
      }

      if (!this.radioInfo) {
        Toast.fail('请选择提现账号')
        return
      }

      if (this.money > this.haveMoney) {
        Toast.fail('提现金额不可大于当前金额')
        return
      }

      if (this.hasPassword === 1) {
        this.show = true
      } else {
        mpvue.navigateTo({
          url: '/pages/billing/settings/main?from=setPass'
        })
      }

      this.showPayout = false
    },
    goGetPassPage () {
      mpvue.navigateTo({
        url: '/pages/billing/settings/main?from=getPass'
      })
    }
  }
}
</script>
<style scope>
.container {
  font-size: 13px;
  color: #666666;
}
.info-box,
.form-box {
  padding: 0 15px;
  background: #fff;
}
.info-box {
  padding-bottom: 5px;
}
.form-box {
  margin-top: 10px;
}
.info-tit-box {
  font-size: 15px;
  color: #333333;
  font-weight: bold;
  padding: 15px 0 10px;
}
.o-info-box {
  padding-bottom: 5px;
}
.tip-box {
  padding: 10px 0;
}
.colorBtn {
  color: #97d700;
}
.bottom-btn-margin {
  margin: 36px 15px !important;
}

.chs-btn {
  position: absolute;
  top: 16px;
  right: 15px;
}
/* =======↓=payout======== */
.payout-tit {
  font-size: 17px;
  color: #333333;
  text-align: center;
  line-height: 24px;
  padding: 20px 0;
}
.payout-type-box {
  padding: 0 15px;
}
.type-item {
  display: flex;
  padding: 15px;
  background: #faf9f9;
  border-radius: 4px;
  margin-bottom: 15px;
}
.type-item-tit {
  font-size: 15px;
  color: #333333;
  padding-bottom: 5px;
}
.type-item-left {
  flex: 1;
}
.type-item-cell {
  display: flex;
  color: #333;
  font-size: 13px;
  line-height: 18px;
  margin-top: 5px;
  /* justify-content: space-between; */
}
.small-tit {
  width: 70px;
  color: #666;
}
.type-item-radio {
  position: relative;
}
.add-button {
  font-size: 13px;
  color: #97d700;
  margin-top: 15px;
}
</style>

<style>
.van-cell {
  font-size: 24px !important;
  padding: 22px 16px 10px !important;
}
.van-cell__title {
  flex: none !important;
  min-width: 12px !important;
  margin-right: 10px !important;
}
.van-field__input {
  font-family: "Oswald-Medium" !important;
}
.van-button--small {
  color: #fff;
  height: 39px !important;
}
.van-popup--bottom.van-popup--round {
  border-top-left-radius: 8px !important;
  border-top-right-radius: 8px !important;
}
.van-radio {
  margin-top: 38px;
}
.alipay .van-radio {
  margin-top: 27px;
}
.wxpay .small-tit {
  /* width: auto; */
}
.inp-box {
  margin: 0 30px;
}
.tip-text {
  font-size: 13px;
  color: #666666;
  text-align: right;
  line-height: 30px;
  margin: 0 30px;
}
</style>