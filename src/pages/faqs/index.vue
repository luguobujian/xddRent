<template>
  <div class="container van-hairline-top">
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
      mpvue.navigateTo({
        url: '/pages/faqs/detail/main'
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