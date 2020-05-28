<template>
  <div>
    <web-view :src="url"></web-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
      url: ''
    }
  },
  onLoad (options) {
    console.log(options)
    this.url = options.id
  }
}
</script>
<style lang="">
</style>