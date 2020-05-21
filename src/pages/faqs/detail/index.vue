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
import { getProblemInfo } from '@/api/getData'
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
    this.id = options.id
    this.getProblemInfo()
  },
  methods: {
    async getProblemInfo () {
      try {
        const res = await getProblemInfo({ id: this.id })
        console.log(res)
        this.title = res.data.data.title
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
  /* text-align: center; */
  margin: 16px 16px 0;
  word-wrap: break-word;
  word-break: normal;
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