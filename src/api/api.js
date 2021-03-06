// const app = getApp()
import Toast from '../../static/vant/toast/toast'

class API {
  constructor () {
    this.baseUrl = 'http://test.shuoxun.com:56083/'
    this.exclude = [
      'api/user/getUserInfo',
      'api/Prove/statusProve'
    ]
    // this.header = {
    //   'token': '',
    //   'openId': '',
    //   'content-type': 'application/x-www-form-urlencoded'
    // }
    // this.request = this.request.bind(this)
  }

  async getStorageToken (url) {
    return new Promise((resolve, reject) => {
      mpvue.getStorage({
        key: 'token',
        success (res) {
          resolve(res.data)
        },
        fail (res) {
          // console.log(`* FAIL getStorageToken ${url}`, res)
          resolve('')
        }
      })
    })
  }

  async request (url = '', data = {}, method = 'GET') {
    try {
      const token = await this.getStorageToken(url)
      const vToken = this.exclude.includes(url)
      // console.log(vToken)
      // console.log(`token ${new Date()}`, token)
      return new Promise((resolve, reject) => {
        let header = {
          'token': token,
          'openId': '',
          'content-type': 'application/x-www-form-urlencoded'
        }
        console.log(header)
        method = method.toUpperCase()
        url = this.baseUrl + url
        mpvue.request({
          url,
          data,
          header,
          method,
          success: res => {
            if (res.statusCode === 401) {
              console.log('* FAIL  res statusCode 401', res)
              reject(res.statusCode)
              if (vToken) return
              mpvue.showToast({
                title: '未登录:请先登录',
                icon: 'none',
                duration: 2000,
                success () {
                  mpvue.navigateTo({
                    url: '/pages/login/main'
                  })
                }
              })
            } else if (res.statusCode !== 200) {
              reject(res)
              console.log('* FAIL res statusCode !200', res)
            } else {
              if (res.data.code === 0) {
                reject(res)

                Toast.fail(res.data.msg)

                console.log(`* FAIL res Code 0 Url:${url}`, res)
                console.log(`* FAIL res Code 0 Url:${url}DATA:`, data)
                return
              }
              resolve(res)
            }
          },
          fail: res => {
            reject(res)
            console.log('* FAIL mpvue.request', res)
          }
        })
      })
    } catch (error) {
      console.log('* FAIL async request', error)
    }
  }
}

export default new API()
