<template>
  <div class="container">
    <div>
      <div class="textarea-box">
        <van-field :value="text"
                   autosize
                   type="textarea"
                   maxlength="200"
                   placeholder="请详细描述您的问题"
                   @change="onInputKeyText" />
        <div class="message-length-box">{{text.length}}/200</div>
      </div>
      <div class="input-box">
        <van-field :value="mobile"
                   type="number"
                 maxlength="11"

                   autosize
                   label="联系方式"
                   input-align="right"
                   placeholder="请输入您的联系方式(选填)"
                   show-word-limit
                   @change="onInputKeyMobile" />

      </div>
      <div class="bottom-btn-box">
        <div class="bottom-btn-margin">
          <van-button color="#97D700"
                      size="small"
                      round
                      block
                      @click="submit">保存</van-button>
        </div>
      </div>
      <van-toast id="van-toast" />
    </div>
  </div>
</template>

<script>
import Toast from '../../../static/vant/toast/toast'
import { getfeedBack } from '@/api/getData'
export default {
  data () {
    return {
      text: '',
      mobile: ''
    }
  },
  methods: {
    onInputKeyText (e) {
      this.text = e.mp.detail.trim()
    },
    onInputKeyMobile (e) {
      this.mobile = e.mp.detail.trim()
    },
    async submit () {
      try {
        const res = await getfeedBack({ text: this.text, mobile: this.mobile })
        console.log(res)
        if (res.data.code === 1) {
          Toast.success('提交成功')
          setTimeout(() => { mpvue.navigateBack() }, 1500)
        }
      } catch (error) {
        console.log('* submit error', error)
        Toast.fail(error.data.msg)
      }
    }
  }
}
</script>

<style scope>
.textarea-box {
  margin-bottom: 10px;
}
.message-length-box {
  font-size: 12px;
  color: #999999;
  text-align: right;
  background-color: #fff;
  padding: 10px 15px;
}
.input-box {
  margin-bottom: 30px;
}
.bottom-btn-margin {
  margin: 7px 15px !important;
}
</style>
<style>
.van-field__input--textarea {
  min-height: 140px !important;
}
.textarea-box .van-cell::after {
  border: none !important;
}
.van-field__body--textarea.van-field__body--ios {
  /* margin-top: 0px !important; */
}

.van-button--small {
  color: #fff;
  height: 39px !important;
}
</style>
