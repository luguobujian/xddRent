<template>
  <div class="container">
    <div>
      <van-search :value="value"
                  placeholder="请输入搜索关键词" />
    </div>
    <div>
      <van-index-bar :scrollTop="scrollTop">
        <view v-for="(item, index) in citys"
              :key="index">
          <van-index-anchor :index="item.title" />
          <van-cell v-for="(itm, idx) in item.lists"
                    :key="idx"
                    :title="itm" />
        </view>
      </van-index-bar>
    </div>

  </div>
</template>
<script>
import citys from './city'

export default {
  data () {
    return {

      citys: citys.city,
      scrollTop: 0
    }
  },
  methods: {

  },
  onPageScroll (event) {
    this.scrollTop = event.scrollTop
  }
}
</script>
<style scoped>
</style>