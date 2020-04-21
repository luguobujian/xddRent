<template>
  <div class="container van-hairline--top">
    <div class="main-top-box">
      <div class="main-form-box">
        <div>
          <van-cell-group>
            <van-field :value="name"
                       label="收货人"
                       placeholder="请输入收货人"
                       @change="onNameChange" />
            <van-field :value="mobile"
                       label="手机号码"
                       placeholder="请输入手机号码"
                       @change="onMobileChange" />
            <van-field :value="addressone"
                       label="所在地区"
                       placeholder="请选择所在地区"
                       readonly
                       clickable
                       name="area"
                       right-icon="arrow"
                       @click="showArea = true" />
            <van-field :value="addresstwo"
                       type="textarea"
                       label="详细地址"
                       placeholder="请输入详细地址"
                       @change="onAddresstwoChange" />
          </van-cell-group>
          <van-popup :show="showArea"
                     position="bottom"
                     @cancel="showArea = false">
            <van-area :area-list="areaList"
                      title="地区"
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
                    custom-style="font-size:15px"
                    round
                    block
                    @click="submit">提交</van-button>
      </div>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import AreaList from '../../../../static/vant/area/area'
import citys from '../../city/city'
import Toast from '../../../../static/vant/toast/toast'
import { addAddress, editAddress } from '@/api/getData'
export default {
  data () {
    return {
      name: null,
      mobile: null,
      addressone: null,
      addresstwo: null,
      area_id: null,
      showArea: false,
      areaList: AreaList,
      citys: citys.city,
      primaryListData: null
    }
  },
  onLoad (options) {
    console.log(options)
    if (options.id) {
      this.id = options.id
      this.name = decodeURI(options.name)
      this.mobile = options.mobile
      this.addressone = decodeURI(options.addressone).split('%2F').join('/')
      this.addresstwo = decodeURI(options.addresstwo)
      this.area_id = options.two_id
    }
  },
  mounted () {
    let citys = this.citys
    let tempData = []
    citys.forEach((item, key) => {
      tempData = tempData.concat(item.cities)
    })
    this.primaryListData = tempData
  },
  methods: {
    submit () {
      if (this.id) {
        this.editAddress()
        return
      }
      this.addAddress()
    },
    async addAddress () {
      try {
        if (!this.name) {
          Toast.fail('请输入收货人姓名')
          return
        }
        if (!this.mobile) {
          Toast.fail('请输入手机号')
          return
        }
        if (!this.addressone) {
          Toast.fail('请选择所在地区')
          return
        }
        if (!this.addresstwo) {
          Toast.fail('请输入详细地址')
          return
        }
        const res = await addAddress({ name: this.name, mobile: this.mobile, addressone: this.addressone, addresstwo: this.addresstwo, area_id: this.area_id })
        console.log(res)
        if (res.data.code === 1) {
          Toast.success('添加成功')
          setTimeout(() => { mpvue.navigateBack() }, 1500)
        } else {
          Toast.fail(`添加失败:${res.data.msg}`)
        }
      } catch (error) {
        console.log('* addAddress error', error)
        Toast.fail(`添加失败:${error.data.msg}`)
      }
    },
    async editAddress () {
      try {
        if (!this.name) {
          Toast.fail('请输入收货人姓名')
          return
        }
        if (!this.mobile) {
          Toast.fail('请输入手机号')
          return
        }
        if (!this.addressone) {
          Toast.fail('请选择所在地区')
          return
        }
        if (!this.addresstwo) {
          Toast.fail('请输入详细地址')
          return
        }
        const res = await editAddress({ id: this.id, name: this.name, mobile: this.mobile, addressone: this.addressone, addresstwo: this.addresstwo, area_id: this.area_id })
        console.log(res)
        if (res.data.code === 1) {
          Toast.success('修改成功')
          setTimeout(() => { mpvue.navigateBack() }, 1500)
        } else {
          Toast.fail(`修改失败:${res.data.msg}`)
        }
      } catch (error) {
        console.log('* addAddress error', error)
        Toast.fail(`修改失败:${error.data.msg}`)
      }
    },
    onConfirm (e) {
      let values = e.target.values
      let city = values[1].name
      for (let i = 0; i < this.primaryListData.length; i++) {
        if (city === this.primaryListData[i].name) {
          this.area_id = this.primaryListData[i].cityid
          break
        }
      }
      this.addressone = values.map((item) => item.name).join('/')
      this.showArea = false
    },
    onNameChange (e) {
      this.name = e.mp.detail
    },
    onMobileChange (e) {
      this.mobile = e.mp.detail
    },
    onAddresstwoChange (e) {
      this.addresstwo = e.mp.detail
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
  padding: 16px 15px !important;
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
  margin-top: 0px !important;
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
