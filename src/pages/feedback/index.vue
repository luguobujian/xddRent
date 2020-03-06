<template>
  <div class="container">
    <div>
      <div class="textarea-box">
        <van-field :value="message"
                   autosize
                   type="textarea"
                   maxlength="200"
                   placeholder="请详细描述您的问题"
                   @change="changeMessage" />
        <div class="message-length-box">{{message.length}}/200</div>
      </div>
      <div class="input-box">
        <van-field :value="mg"
                   autosize
                   label="联系方式"
                   input-align="right"
                   placeholder="请输入您的联系方式(选填)"
                   show-word-limit />

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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      mg: ''
    }
  },
  methods: {
    changeMessage (e) {
      console.log(e)
      this.message = e.mp.detail
    },
    submit () {
      console.log(this.message)
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
  margin-top: 0px !important;
}

.van-button--small {
  color: #fff;
  height: 39px !important;
}
</style>
