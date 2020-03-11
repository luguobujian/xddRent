
<template>
  <div class="container">
    <div class="cropper-wrapper">
      <canvas class="cropper"
              disable-scroll="true"
              bindtouchstart="touchStart"
              bindtouchmove="touchMove"
              bindtouchend="touchEnd"
              :style="{width:width+'px',height:height+'px',backgroundColor: 'rgba(0, 0, 0, 0.8)'}"
              :canvasId="id">
      </canvas>
      <canvas class="cropper"
              disable-scroll="true"
              :style="{position:'fixed', top: '-'+(width * pixelRatio)+'px', left: '-'+(height * pixelRatio)+'px', width:width * pixelRatio+'px',height:height * pixelRatio+'px'}"
              :canvasId="targetId">
      </canvas>
      <div class="cropper-buttons">
        <div class="upload"
             bindtap="uploadTap">
          上传图片
        </div>
        <div class="getCropperImage"
             bindtap="getCropperImage">
          生成图片
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cropper from '../../../static/vant/cropper/we-cropper'

const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const height = width

export default {
  data () {
    return {
      cropperOpt: {
        id: 'cropper', // 用于手势操作的canvas组件标识符
        targetId: 'targetCropper', // 用于用于生成截图的canvas组件标识符
        pixelRatio: device.pixelRatio, // 传入设备像素比
        width, // 画布宽度
        height, // 画布高度
        scale: 2.5, // 最大缩放倍数
        zoom: 8, // 缩放系数
        cut: {
          x: (width - 200) / 2, // 裁剪框x轴起点
          y: (width - 200) / 2, // 裁剪框y轴期起点
          width: 200, // 裁剪框宽度
          height: 200 // 裁剪框高度
        }
      }
    }
  },
  components: {
    cropper
  }
}
</script>
<style>
</style>