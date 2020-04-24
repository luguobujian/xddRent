<template>
  <div class="container van-hairline-top">
    <van-cell v-for="(item, index) in dataList"
              :key="index"
              :title="item.titlle"
              :id="item.id"
              is-link
              @click="goNextPage" />
    <nomoreComponents :tipBoxTop="tipBoxTop"
                      :tipSrc="tipSrc"
                      :dataList="dataList"></nomoreComponents>
  </div>
</template>

<script>
import nomoreComponents from '@/components/nomore'
import { getProblemList } from '@/api/getData'
export default {
  data () {
    return {
      dataList: null
    }
  },
  components: {
    nomoreComponents
  },
  onLoad () {
    this.getProblemList()
  },
  methods: {
    async getProblemList () {
      try {
        const res = await getProblemList()
        console.log(res)
        this.dataList = res.data.data
      } catch (error) {

      }
    },
    goNextPage (e) {
      console.log(e)
      let id = e.mp.currentTarget.id
      mpvue.navigateTo({
        url: `/pages/faqs/detail/main?id=${id}`
      })
    }
  }
}
</script>
<style scope>
</style>
<style>
.van-cell {
  padding: 16px 13px !important;
}
</style>