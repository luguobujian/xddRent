// const app = getApp()

class API {
  constructor () {
    this.baseUrl = 'http://47.105.55.65:10082/'
    this.header = {
      'token': '',
      'openId': '',
      'content-type': 'application/x-www-form-urlencoded'
    }
    this.request = this.request.bind(this)
  }

  async request (url = '', data = {}, method = 'POST') {
    return new Promise((resolve, reject) => {
      let header = this.header
      method = method.toUpperCase()
      url = this.baseUrl + url

      wx.request({
        url: url,
        data: data,
        header: header,
        method: method,
        success: res => {
          if (res.statusCode === 200) {
            resolve(res)
          } else {
            resolve(res)
            console.log('* CODE != 200', res)
          }
        },
        fail: res => {
          reject(res)
          console.log('* FAIL', res)
        }
      })
    })
  }
}

export default new API()
