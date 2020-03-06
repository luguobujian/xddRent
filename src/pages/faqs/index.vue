<template>
  <div class="container">
    <van-cell v-for="(item, index) in 6"
              :key="index"
              title="单元格"
              is-link
              @click="goNextPage" />
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goNextPage (id) {
      console.log(id)
      wx.navigateTo({
        url: '/pages/faqs/detail/main'
      })
    }
  }
}
</script>
<style scope>


</style>