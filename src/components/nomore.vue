<template>
  <div>
    <div v-if="!dataList || dataList.length === 0"
         class="nomore-skeleton-box"
         :style="{marginTop:tipBoxTop || '50px'}">
      <div>
        <div>
          <img class="nomore-skeleton-img"
               :src="tipSrc?tipSrc:'/static/images/nomore.svg'"
               alt="">
        </div>
        <div v-if="dataList"
             class="nomore-skeleton-tip">
          暂无相关数据
        </div>
        <div v-else
             class="nomore-skeleton-tip">
          {{tipText}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: ['tipBoxTop', 'tipSrc', 'dataList'],
  data () {
    return {
      tipText: '数据加载中。。。'
    }
  },
  mounted () {
    this.setTipText()
  },
  methods: {
    setTipText () {
      setTimeout(() => {
        this.tipText = '数据加载错误'
      }, 2000)
    }
  }
}
</script>
<style scoped>
.nomore-skeleton-img {
  display: block;
  width: 121px;
  height: 100px;
  margin: 0 auto;
}
.nomore-skeleton-tip {
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  line-height: 30px;
  text-align: center;
}
</style>