<template>
  <div class="container">
    <div class="main-top-box">
      <div class="main-form-box">
        <div>
          <van-cell-group>
            <van-field v-model="value1"
                       label="收货人"
                       placeholder="请输入收货人" />
            <van-field v-model="value1"
                       label="手机号码"
                       placeholder="请输入手机号码" />
            <van-field v-model="value"
                       label="所在地区"
                       placeholder="请选择所在地区"
                       readonly
                       clickable
                       name="area"
                       right-icon="arrow"
                       :value="value"
                       @click="showArea = true" />
            <van-field v-model="value1"
                       type="textarea"
                       label="详细地址"
                       placeholder="请输入详细地址" />
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
                    block>提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import AreaList from '../../../../static/vant/area/area'
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
.main-form-box {
  background-color: #fff;
}
.bottom-btn-box {
  height: 49px;
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
.van-field__input--textarea {
  height: 42px !important;
  min-height: 42px !important;
}
.van-field__body--textarea.van-field__body--ios {
  margin-top: 3px !important;
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