<template>
  <div class="container">
    <canvas v-if="option.id"
            :canvasId="option.id"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend"
            disable-scroll
            :style="{ width: option.width + 'px', height: option.height + 'px', background: 'rgba(0, 0, 0, 1)' }">
    </canvas>
    <canvas v-if="option.targetId"
            :canvas-id="option.targetId"
            disable-scroll
            :style="{
      position: 'fixed',
      top: -option.width * option.pixelRatio + 'px',
      left: -option.height * option.pixelRatio + 'px',
      width: option.width * option.pixelRatio + 'px',
      height: option.height * option.pixelRatio + 'px'
    }">
    </canvas>
    <div class="bottom-btn-box">
      <div class="bottom-btn"
           @click="submit">
        上传头像
      </div>
    </div>
  </div>
</template>

<script>
import WeCropper from 'we-cropper'
import API from '@/api/api'
// import { upload } from '@/api/getData'
const device = mpvue.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 40 // 底部留好完成按钮
export default {
  data () {
    return {
      _wecropper: null,
      option: {
        type: Object,
        id: 'cropper', // 用于手势操作的canvas组件标识符
        targetId: 'targetCropper', // 用于用于生成截图的canvas组件标识符
        pixelRatio: device.pixelRatio, // 传入设备像素比
        width, // 画布宽度
        height, // 画布高度
        scale: 2.5, // 最大缩放倍数
        zoom: 8, // 缩放系数
        cut: {
          x: (width - 200) / 2,
          y: (width - 200) / 2,
          width: 200, // 裁剪框宽度
          height: 200 // 裁剪框高度
        }
      }
    }
  },
  methods: {
    touchstart ($event) {
      this._wecropper.touchStart($event.mp)
    },
    touchmove ($event) {
      this._wecropper.touchMove($event.mp)
    },
    touchend ($event) {
      this._wecropper.touchEnd($event.mp)
    },
    pushOrigin (src) {
      this._wecropper.pushOrign(src)
    },
    updateCanvas () {
      this._wecropper.updateCanvas()
    },
    getCropperBase64 (fn) {
      return this._wecropper.getCropperBase64(fn)
    },
    getCropperImage (opt, fn) {
      return this._wecropper.getCropperImage(opt, fn)
    },
    init () {
      this._wecropper = new WeCropper(Object.assign(this.option, {
        id: this.option.id,
        targetId: this.option.targetId,
        pixelRatio: this.option.pixelRatio
      }))
        .on('ready', (...args) => {
          this.$emit('ready', ...args)
        })
        .on('beforeImageLoad', (...args) => {
          this.$emit('beforeImageLoad', ...args)
        })
        .on('imageLoad', (...args) => {
          this.$emit('imageLoad', ...args)
        })
        .on('beforeDraw', (...args) => {
          this.$emit('beforeDraw', ...args)
        })
    },
    async getStorageToken () {
      return new Promise((resolve, reject) => {
        mpvue.getStorage({
          key: 'token',
          success (res) {
            resolve(res.data)
          },
          fail (res) {
            console.log('* FAIL getStorageToken', res)
            resolve('')
          }
        })
      })
    },
    async submit () {
      try {
        const file = await this.getCropperImage()
        const token = await this.getStorageToken()
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
                const pages = getCurrentPages()
                const prevPage = pages[pages.length - 2]
                prevPage.data.$root[0].setData('avatar', result.data)
                mpvue.navigateBack()
              }
            }
          },
          fail (res) {
            console.log(res)
            // do something
          }
        })
      } catch (error) {
        console.log('*uploadFile　error', error)
      }
    }
  },
  onLoad (option) {
    this.init()
    this.pushOrigin(option.src)
  }
}
</script>
<style lang="">
.bottom-btn-box {
  flex: 1;
  color: #fff;
  background-color: #000;
}
.bottom-btn {
  height: 100%;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  background-color: #97d700;
}
</style>