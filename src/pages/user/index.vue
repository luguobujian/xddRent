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
                 src="/static/images/user.png"
                 alt=""></div>
        </div>
        <div>
          <van-cell-group>
            <van-field v-model="value1"
                       label="账户名"
                       right-icon="arrow"
                       placeholder="请输入"
                       input-align="right" />
            <van-field v-model="value"
                       label="选择地区"
                       right-icon="arrow"
                       placeholder="请选择"
                       input-align="right"
                       readonly
                       clickable
                       name="area"
                       :value="value"
                       @click="showArea = true" />
            <van-field :value="gender"
                       label="性别"
                       right-icon="arrow"
                       placeholder="请选择"
                       readonly
                       clickable
                       input-align="right"
                       @click="showGender=true" />
            <van-field :value="tel"
                       label="绑定手机"
                       placeholder="显示图标"
                       input-align="right" />
            <van-field v-model="value1"
                       label="个人简介"
                       right-icon="arrow"
                       placeholder="请输入"
                       input-align="right" />
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
                    block>保存</van-button>
      </div>
    </div>
    <van-action-sheet :show="showGender"
                      :actions="actions"
                      cancel-text="取消"
                      @select="selectGender"
                      @cancel="showGender= false" />
  </div>
</template>

<script>
import AreaList from '../../../static/vant/area/area'
export default {
  data () {
    return {
      value: '',
      tel: '133333333',
      showGender: false,
      showArea: false,
      gender: '',
      actions: [
        { name: '男', color: '#000' },
        { name: '女', color: '#000' }
      ],
      areaList: AreaList // 数据格式见 Area 组件文档
    }
  },
  methods: {
    onConfirm (e) {
      let values = e.target.values
      this.value = values.map(item => item.name).join('/')
      this.showArea = false
    },
    selectGender (e) {
      console.log(e)
      this.gender = e.mp.detail.name
      this.showGender = false
    },
    goNextPage () {
      mpvue.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          const src = res.tempFilePaths[0]
          mpvue.navigateTo({
            url: `/pages/upload/main?src=${src}`
          })
        }
      })
      // mpvue.navigateTo({
      //   url: '/pages/upload/main'
      // })
    },
    uploadImage (path) {
      // var _this = this
      mpvue.showLoading({
        title: '正在上传..'
      })
      // mpvue.uploadFile({
      //   url: app.globalData.domain + 'user/uploadimage',
      //   filePath: path,
      //   name: 'file',
      //   formData: {
      //     'uid': app.globalData.userId
      //   },
      //   success: function (res) {
      //     var data = JSON.parse(res.data)
      //     if (data.status == 0) {
      //       mpvue.showToast({
      //         title: data.err,
      //         duration: 2000
      //       })
      //       return false
      //     }
      //     mpvue.hideLoading()
      //     _this.setData({
      //       imageurls: 'Uploads/' + data.urls,
      //       postimage: path
      //     })
      //   }
      // })
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