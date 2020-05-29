<template>
  <div class="container van-hairline--top">
    <wxParse v-if="content"
             :content="content"
             @preview="preview"
             @navigate="navigate" />
  </div>
</template>
<script>
import wxParse from 'mpvue-wxparse'

import { getAllInfo, userAgreement } from '@/api/getData'

export default {
  data () {
    return {
      type: 1,
      content: null
    }
  },
  onLoad (options) {
    console.log(options)
    this.type = options.idx
    mpvue.setNavigationBarTitle({
      title: options.tit
    })
    if (options.idx === '3') {
      this.userAgreement()
      return
    }
    this.getAllInfo()
  },
  components: {
    wxParse
  },
  mounted () {
    // let pages = getCurrentPages()
  },

  methods: {
    async getAllInfo () {
      console.log(this.type)
      try {
        const res = await getAllInfo({ type: this.type })
        console.log('getAllInfo', res)
        if (res.data.code === 1) {
          this.content = res.data.data
        }
      } catch (error) {

      }
    },
    async userAgreement () {
      try {
        const res = await userAgreement()
        console.log('userAgreement', res)
        if (res.data.code === 1) {
          this.content = res.data.data.content
        }
      } catch (error) {

      }
    }
  },
  onUnload () {
    if (this.$options.data) {
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>
<style scope>
.container {
  background: #fff;
  word-break: break-all;
  word-wrap: break-word;
}
.title-box {
  font-size: 20px;
  color: #333333;
  font-weight: bold;
  text-align: center;
  margin: 16px 16px 0;
}
.content-box {
  font-size: 15px;
  color: #333333;
  margin: 16px 16px 0;
}
.wxParse {
  padding: 15px;
  word-wrap: break-word;
  word-break: normal;
}
</style>