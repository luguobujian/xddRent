import WeCropper from '../../static/vant/cropper/we-cropper.js'
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 46 // 底部留好完成按钮
Page({
  data: {
    cropperOpt: {
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

  },

  onLoad: function (options) {
    this.data.cropperOpt.src = options.src
    const { cropperOpt } = this.data
    console.log(cropperOpt)
    this.mycropper = new WeCropper(cropperOpt)
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })
      .updateCanvas()
  },
  touchStart (e) {
    this.mycropper.touchStart(e)
  },
  touchMove (e) {
    this.mycropper.touchMove(e)
  },
  touchEnd (e) {
    this.mycropper.touchEnd(e)
  },
  getCropperImage () {
    var that = this
    console.log(123)
    that.mycropper.getCropperImage((src) => {
      if (src != null) {
        console.log(src)
        var pages = getCurrentPages()
        // var currPage = pages[pages.length - 1] // 当前页面
        var prevPage = pages[pages.length - 2] // 上一个页面
        prevPage.uploadImage(src)
        wx.navigateBack()
      }
    })
  }
})
