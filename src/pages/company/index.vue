<template>
  <div class="container">
    <div class="main-top-box">
      <div class="main-form-box">
        <div class="update-avatar-box van-hairline ">
          <div class="clearfix">
            <div class="fl">上传营业执照</div>
            <div class="fr">
              <van-icon name="arrow" />
            </div>
            <div class="fr">
              <img class="avatar"
                   src="/static/images/upload.png"
                   alt=""></div>
          </div>
        </div>
        <div>
          <van-cell-group>
            <van-field v-model="value1"
                       label="公司全称"
                       right-icon="arrow"
                       placeholder="请输入"
                       input-align="right" />
            <van-field v-model="value"
                       label="联系地址"
                       right-icon="arrow"
                       placeholder="请填写"
                       input-align="right"
                       :value="value" />
            <van-field v-model="value1"
                       label="联系方式"
                       placeholder="输入联系方式"
                       input-align="right" />
            <van-field v-model="value1"
                       label="邮箱（选填）"
                       placeholder="输入邮箱"
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
                    round
                    block
                    @click="goNextPage">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import AreaList from '../../../static/vant/area/area'
export default {
  data () {
    return {
      value: '',
      showArea: false,
      areaList: AreaList // 数据格式见 Area 组件文档
    }
  },
  methods: {
    onConfirm (e) {
      let values = e.target.values
      this.value = values.map(item => item.name).join('/')
      this.showArea = false
    },
    goNextPage () {
      wx.navigateTo({
        url: '/pages/company/verify/main'
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
  width: 90% !important;
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
  height: 35px !important;
}

.van-picker__cancel,
.van-picker__confirm {
  color: #97d700 !important;
}
</style>