<template>
  <div class="container">
    <div class="main-top-box">
      <div class="main-form-box">
        <div class="update-avatar-box clearfix"
             @click="goNextPage">
          <div class="fl">头像</div>
          <div class="fr">
            <van-icon name="arrow" />
          </div>
          <div class="fr">
            <img class="avatar"
                 :src="avatar || (baseUrl + '/PingFangSC/xddmppic/user.png')"
                 alt=""></div>
        </div>
        <div>
          <van-cell-group>
            <van-field :value="username"
                       label="账户名"
                       right-icon="arrow"
                       placeholder="请输入"
                       input-align="right"
                       @input="onInputUsernameKey" />
            <van-field :value="showCity.name"
                       label="选择地区"
                       right-icon="arrow"
                       placeholder="请选择"
                       input-align="right"
                       readonly
                       clickable
                       name="area"
                       data-from="area"
                       @click="goNextPage" />
            <van-field :value="genderDesc"
                       label="性别"
                       right-icon="arrow"
                       placeholder="请选择"
                       readonly
                       clickable
                       input-align="right"
                       @click="showGender=true" />
            <van-field :value="mobile"
                       maxlength="11"
                       type="number"
                       label="绑定手机"
                       disabled
                       placeholder="请输入"
                       input-align="right"
                       @input="onInputMobileKey" />
            <van-field :value="bio"
                       label="个人简介"
                       right-icon="arrow"
                       placeholder="请输入"
                       input-align="right"
                       @input="onInputBioKey" />
          </van-cell-group>
          <van-popup :show="showArea"
                     position="bottom"
                     @cancel="showArea = false">
            <van-area :area-list="areaList"
                      @confirm="onConfirm"
                      @cancel="showArea = false" />
          </van-popup>
        </div>

      </div>
    </div>
    <div class="bottom-btn-box">
      <div class="bottom-btn-margin">
        <van-button color="#97D700"
                    size="small"
                    custon-style="font-size: 15px"
                    round
                    block
                    @click="submit">保存</van-button>
      </div>
    </div>
    <van-action-sheet :show="showGender"
                      :actions="actions"
                      cancel-text="取消"
                      @select="selectGender"
                      @cancel="showGender= false" />
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import API from '@/api/api'

import Toast from '../../../static/vant/toast/toast'
import AreaList from '../../../static/vant/area/area'
import { getUserInfo, refreshInfo } from '@/api/getData'
let globalThat = null
export default {
  data () {
    return {
      baseUrl: API.baseUrl,

      routers: {
        area: '/pages/city/main'
      },
      showGender: false,
      showArea: false,
      actions: [
        { code: '0', name: '男', color: '#000' },
        { code: '1', name: '女', color: '#000' }
      ],
      areaList: AreaList, // 数据格式见 Area 组件文档
      setData (key, value) {
        globalThat[key] = value
      },
      showCity: {
        name: '',
        cityid: null
      },
      avatar: null,
      username: null,
      genderDesc: null,
      gender: null,
      mobile: null,
      bio: null,
      openid_qq: null,
      openid_wx: null,
      area: null
    }
  },

  onLoad () {
    this.getUserInfo()
  },
  // onShow () {
  //   this.getUserInfo()
  // },
  mounted () {
    globalThat = this
  },
  methods: {
    async getUserInfo () {
      try {
        const res = await getUserInfo()
        console.log(res)
        if (res.data.code === 1) {
          this.avatar = res.data.data.avatar
          this.username = res.data.data.username
          this.genderDesc = this.actions[res.data.data.gender].name
          this.gender = res.data.data.gender
          this.mobile = res.data.data.mobile
          this.bio = res.data.data.bio
          this.showCity.name = res.data.data.area
        }
      } catch (error) {
        console.log('* getUserInfo error ', error)
      }
    },
    onConfirm (e) {
      let values = e.target.values
      this.value = values.map(item => item.name).join('/')
      this.showArea = false
    },
    selectGender (e) {
      console.log(e)
      this.genderDesc = e.mp.detail.name
      this.gender = e.mp.detail.code
      this.showGender = false
    },
    onInputUsernameKey (e) {
      console.log(e)
      this.username = e.mp.detail.trim()
    },
    onInputMobileKey (e) {
      console.log(e)
      this.mobile = e.mp.detail.trim()
    },
    onInputBioKey (e) {
      console.log(e)
      this.bio = e.mp.detail
    },
    async submit () {
      try {
        if (!this.username) {
          Toast.fail('账号名不能为空')
          return
        }
        if (!this.showCity.name) {
          Toast.fail('所在地区不能为空')
          return
        }
        if (!this.genderDesc) {
          Toast.fail('性别不能为空')
          return
        }
        if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
          Toast.fail('请输入正确手机号')
          return
        }
        const res = await refreshInfo({ avatar: this.avatar, username: this.username, gender: this.gender, mobile: this.mobile, bio: this.bio, area: this.showCity.name })
        console.log(res)
        if (res.data.code === 1) {
          mpvue.navigateBack()
        }
      } catch (error) {
        console.log('*submit　error', error)
      }
    },
    goNextPage (p) {
      console.log(p)
      if (p.mp.currentTarget.dataset.from) {
        p = p.mp.currentTarget.dataset.from
        mpvue.navigateTo({
          url: `${this.routers[p]}`
        })
        return
      }
      mpvue.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          const src = res.tempFilePaths[0]
          mpvue.navigateTo({
            url: `/pages/upload/main?src=${src}`
          })
        }
      })
    },
    uploadImage (path) {
      mpvue.showLoading({
        title: '正在上传..'
      })
    }
  }
}
</script>

<style scope>
image {
  display: inline-block;
}
.main-top-box {
  flex: 1;
}

.main-form-box {
  background-color: #fff;
}
.update-avatar-box {
  line-height: 56px;
  margin: 0 15px;
}
.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  vertical-align: middle;
}
.bottom-btn-box {
  /* height: 49px; */
  background-color: #fff;
}
.bottom-btn-margin {
  margin: 7px 15px !important;
}
</style>

<style>
.van-cell {
  padding: 16px 13px !important;
}
.van-cell:after {
  width: 92% !important;
}
._van-icon {
  color: #969799;
  margin-top: 22px !important;
  margin-left: 5px !important;
}
.van-button--small {
  color: #fff;
  height: 35px !important;
}

.van-picker__cancel,
.van-picker__confirm {
  color: #97d700 !important;
}

.van-popup--bottom.van-popup--round {
  border-radius: 6px 6px 0 0 !important;
}
.van-action-sheet__cancel,
.van-action-sheet__item {
  font-size: 15px !important;
  color: #999999;
}
</style>