// const app = getApp()

class API {
  constructor () {
    this.baseUrl = 'http://47.105.55.65:10082/'
    // this.header = {
    //   'token': '',
    //   'openId': '',
    //   'content-type': 'application/x-www-form-urlencoded'
    // }
    // this.request = this.request.bind(this)
  }

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
  }

  async request (url = '', data = {}, method = 'GET') {
    try {
      const token = await this.getStorageToken()
      console.log(`token ${new Date().getTime()}`, token)
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
            if (res.statusCode !== 200) {
              reject(res)
              console.log('* FAIL res statusCode !200', res)
            } else if (res.statusCode === 401) {
              reject(res.statusCode)
              console.log('* FAIL  res statusCode 401', res)
            } else {
              if (res.data.code === 0) {
                reject(res)
                console.log('* FAIL res Code 0', res)
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
