<template>
  <div class="container van-hairline--top">
    <div>
      <div class="title-box">{{title}}</div>
      <div class="content-box">
        <wxParse :content="content"
                 @preview="preview"
                 @navigate="navigate" />
      </div>
    </div>
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'
import { userPrivacy, userAgreement } from '@/api/getData'
export default {
  data () {
    return {
      id: null,
      title: '',
      content: '  '
    }
  },
  components: {
    wxParse
  },
  onLoad (options) {
    console.log(options)
    if (options.f === '2') {
      this.getProblemInfo()
    } else {
      this.userAgreement()
    }
  },
  methods: {
    async getProblemInfo () {
      try {
        const res = await userPrivacy()
        console.log(res)
        // this.title = res.data.data.titlle
        mpvue.setNavigationBarTitle({
          title: res.data.data.titlle
        })
        this.content = res.data.data.content
      } catch (error) {

      }
    },
    async userAgreement () {
      try {
        const res = await userAgreement()
        console.log(res)
        // this.title = res.data.data.titlle
        mpvue.setNavigationBarTitle({
          title: res.data.data.titlle
        })
        this.content = res.data.data.content
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
  /* padding: 15px; */
  word-wrap: break-word;
  word-break: normal;
}
</style>