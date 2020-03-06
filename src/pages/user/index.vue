<template>
  <div class="container">
    <div class="main-top-box">
      <div class="main-form-box">
        <div class="update-avatar-box clearfix">
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
            <van-field v-model="value1"
                       label="性别"
                       right-icon="arrow"
                       placeholder="请选择"
                       input-align="right" />
            <van-field v-model="value1"
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
                    round
                    block>保存</van-button>
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
    }
  }
}
</script>

<style scope>
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
  height: 49px;
  background-color: #fff;
}
.bottom-btn-margin {
  margin: 30px 15px !important;
}
</style>

<style>
.van-cell:after {
  width: 90% !important;
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
</style>