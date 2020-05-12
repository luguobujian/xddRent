<template>
  <div class="container van-hairline--top">
    <div class="form-box">
      <div v-if="payType == '2'"
           class="wxpay">
        <van-field :value="address"
                   label-class="label-style"
                   maxlength="30"
                   label="绑定手机号"
                   placeholder="请输入手机号"
                   input-align="right"
                   @input="onInputAddressKey" />
        <van-field :value="number"
                   label-class="label-style"
                   maxlength="30"
                   label="微信号"
                   placeholder="请输入帐号"
                   input-align="right"
                   @input="onInputNumberKey" />
      </div>
      <div v-if="payType == '3'"
           class="card">
        <van-field :value="name"
                   label="持卡人"
                   placeholder="请输入持卡人"
                   input-align="right"
                   @input="onInputNameKey" />
        <van-field :value="address"
                   label-class="label-style"
                   label="开户行"
                   maxlength="30"
                   placeholder="请输入开户行"
                   input-align="right"
                   @input="onInputAddressKey" />
        <van-field :value="number"
                   label-class="label-style"
                   label="银行卡号"
                   maxlength="30"
                   placeholder="请输入银行卡号"
                   input-align="right"
                   @input="onInputNumberKey" />
      </div>
      <div v-if="payType == '1'"
           class="alipay">
        <van-field :value="address"
                   label-class="label-style"
                   type="tel"
                   label="绑定手机号"
                   placeholder="请输入手机号"
                   input-align="right"
                   maxlength="30"
                   @input="onInputAddressKey" />
        <van-field :value="number"
                   label-class="label-style"
                   label="支付宝帐号"
                   placeholder="请输入帐号"
                   input-align="right"
                   maxlength="30"
                   @input="onInputNumberKey" />
        <van-field :value="name"
                   label-class="label-style"
                   label="支付宝姓名"
                   placeholder="请输入姓名"
                   input-align="right"
                   maxlength="30"
                   @input="onInputNameKey" />
      </div>
    </div>
    <div class="bottom-btn-box">
      <div class="bottom-btn-margin">
        <van-button :color="btnColor"
                    size="small"
                    custom-style="font-size: 15px"
                    round
                    block
                    @click="submit">确定</van-button>
      </div>
    </div>
    <van-toast id="van-toast" />

  </div>
</template>

<script>
import { editAccount } from '@/api/getData'
import Toast from '../../../../static/vant/toast/toast'

export default {
  data () {
    return {
      payType: 'wxpay',

      number: null,
      name: null,
      address: null
    }
  },
  onLoad (options) {
    console.log(options)
    this.payType = options.type
    let tit = null
    if (options.type === '1') {
      tit = '编辑支付宝'
    } else if (options.type === '2') {
      tit = '编辑微信'
    } else if (options.type === '3') {
      tit = '编辑银行卡'
    }
    mpvue.setNavigationBarTitle({
      title: tit
    })

    this.name = decodeURI(options.name)
    this.address = decodeURI(options.address)
    this.number = options.number
  },
  computed: {
    btnColor () {
      if (this.payType === 2) {
        return this.address && this.number ? '#97D700' : '#E6F3C8'
      } else {
        return this.address && this.number && this.name ? '#97D700' : '#E6F3C8'
      }
    }
  },
  methods: {
    async submit () {
      try {
        if (!this.address) {
          if (this.payType === 3) {
            Toast.fail('开户行不能为空')
            return
          } else {
            Toast.fail('绑定手机号不能为空')
            return
          }
        }
        if (!this.name) {
          if (this.payType === 3) {
            Toast.fail('持卡人不能为空')
            return
          }
          if (this.payType === 2) {
            Toast.fail('姓名不能为空')
            return
          }
        }
        if (!this.number) {
          Toast.fail('账号不能为空')
          return
        }

        const res = await editAccount({ type: this.payType, number: this.number, name: this.name, address: this.address })
        console.log(res)
        if (res.data.code === 1) {
          Toast('提交成功')
          mpvue.navigateBack()
        } else {
          Toast.fail(res.data.msg)
        }
      } catch (error) {
        console.log(`* submit error`, error)
        Toast.fail(error.data.msg)
      }
    },
    onInputNameKey (e) {
      this.name = e.mp.detail
    },
    onInputNumberKey (e) {
      this.number = e.mp.detail
    },
    onInputAddressKey (e) {
      this.address = e.mp.detail
    }
  },
  onUnload () {
    if (this.$options.data) {
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style scope>
.label-style {
  font-size: 15px !important;
  color: #333333 !important;
  /* margin-top: 0 !important; */
}
.bottom-btn-margin {
  margin: 30px 15px !important;
}
</style>
<style>
.van-cell {
  padding: 16px 15px !important;
}
</style>
<style>
.van-button--small {
  color: #fff;
  height: 39px !important;
}
</style>