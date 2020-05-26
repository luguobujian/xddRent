<template>
  <div class="container">
    <div class="main-top-box">
      <div class="main-form-box">
        <div class="update-avatar-box van-hairline "
             @click="onChooseImage">
          <div class="clearfix">
            <div class="fl">上传营业执照</div>
            <div class="fr">
              <van-icon name="arrow" />
            </div>
            <div class="fr">
              <img class="avatar"
                   :src="images || '/static/images/upload.png'"
                   alt=""></div>
          </div>
        </div>
        <div>
          <van-cell-group>
            <van-field :value="name"
                       label="公司全称"
                       placeholder="请输入"
                       input-align="right"
                       @input="onInputNameKey" />
            <van-field :value="address"
                       label="联系地址"
                       right-icon="arrow"
                       placeholder="请填写"
                       input-align="right"
                       @input="onInputAddrKey" />
            <van-field :value="phone"
                       label="联系方式"
                       placeholder="输入联系方式"
                       input-align="right"
                       @input="onInputPhoneKey" />
            <van-field :value="mai"
                       label="邮箱（选填）"
                       placeholder="输入邮箱"
                       input-align="right"
                       @input="onInputMaiKey" />
          </van-cell-group>
        </div>

      </div>
    </div>
    <div class="bottom-btn-box">
      <div class="bottom-btn-margin">
        <van-button color="#97D700"
                    size="small"
                    custom-style="font-size: 15px"
                    round
                    block
                    @click="submit">提交</van-button>
      </div>
    </div>
    <van-toast id="van-toast" />

  </div>
</template>

<script>
import Toast from '../../../static/vant/toast/toast'
import API from '@/api/api'
import { companyProve, statusProve } from '@/api/getData'
export default {
  data () {
    return {
      name: '',
      phone: '',
      address: '',
      mai: '',
      images: ''
    }
  },
  onLoad () {
    this.statusProve()
  },
  methods: {
    async statusProve () {
      try {
        const res = await statusProve()
        console.log(res)
        if (res.data.code === 1) {
          this.images = res.data.data.msg.images
          this.name = res.data.data.msg.name
          this.phone = res.data.data.msg.phone
          this.address = res.data.data.msg.address
          this.mai = res.data.data.msg.mai
        }
      } catch (error) {
        console.log('* statusProve error ', error)
      }
    },
    onConfirm (e) {
      let values = e.target.values
      this.value = values.map(item => item.name).join('/')
      this.showArea = false
    },
    onInputNameKey (e) {
      this.name = e.mp.detail
    },
    onInputAddrKey (e) {
      this.address = e.mp.detail
    },
    onInputPhoneKey (e) {
      this.phone = e.mp.detail
    },
    onInputMaiKey (e) {
      this.mai = e.mp.detail
    },
    async onChooseImage () {
      let that = this
      const token = await API.getStorageToken()
      mpvue.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          const file = res.tempFilePaths[0]
          console.log(token)
          let header = {
            'token': token,
            'openId': '',
            'content-type': 'application/x-www-form-urlencoded'
          }
          mpvue.uploadFile({
            url: `${API.baseUrl}api/Upload/upload`, // 仅为示例，非真实的接口地址
            filePath: file,
            name: 'file',
            header,
            success (res) {
              console.log(res)
              if (res.statusCode === 200) {
                const result = JSON.parse(res.data)
                console.log(result)
                if (result.code === 1) {
                  that.images = result.data
                }
              }
            },
            fail (res) {
              console.log(res)
              // do something
            }
          })
        }
      })
    },
    async submit () {
      try {
        if (!this.images) {
          Toast.fail('请上传营业执照')
          return
        }
        if (!this.name) {
          Toast.fail('企业全称不能为空')
          return
        }
        if (!this.address) {
          Toast.fail('联系地址不能为空')
          return
        }
        if (!this.phone) {
          Toast.fail('联系方式不能为空')
          return
        }
        const res = await companyProve({ name: this.name, phone: this.phone, address: this.address, mai: this.mai, images: this.images })
        console.log(res)
        if (res.data.code === 1) {
          this.goNextPage()
        }
      } catch (error) {
        Toast.fail(error)
      }
    },
    goNextPage () {
      mpvue.redirectTo({
        url: '/pages/company/verify/main?from=company'
      })
    }
  }
}
</script>

<style scope>
.main-top-box {
  /* flex: 1; */
}

.main-form-box {
  background-color: #fff;
}
.update-avatar-box {
  line-height: 108px;
  margin: 0 15px;
}
.avatar {
  width: 75px;
  height: 75px;
  border-radius: 8px;
  vertical-align: -28%;
}

.bottom-btn-box {
  /* height: 49px; */
  /* background-color: #fff; */
}
.bottom-btn-margin {
  margin: 30px 15px !important;
}
</style>

<style>
.van-cell {
  padding: 17px 15px !important;
}
.van-cell:after {
  width: 92% !important;
}
._van-icon {
  color: #969799;
  margin-top: 22px !important;
  margin-left: 5px !important;
}
.van-field__icon-container {
  padding-left: 6px !important;
}
.van-button--small {
  color: #fff;
  height: 39px !important;
}

.van-picker__cancel,
.van-picker__confirm {
  color: #97d700 !important;
}
</style>