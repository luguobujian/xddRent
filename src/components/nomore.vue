<template>
  <div class="nomore-component">
    <div v-if="!dataList || dataList.length === 0"
         class="nomore-skeleton-box"
         :style="{top: tipBoxTop || '50%'}">
      <div>
        <div>
          <img class="nomore-skeleton-img"
               :src="baseUrl + '/PingFangSC/xddmppic/' + tipSrc"
               alt="">
        </div>
        <div v-if="dataList"
             class="nomore-skeleton-tip">
          <!-- 暂无相关数据 -->
          {{noTip}}
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
import API from '@/api/api'
export default {
  props: ['tipBoxTop', 'tipSrc', 'noTip', 'dataList'],
  data () {
    return {
      baseUrl: API.baseUrl,
      tipText: '数据加载中。。。'
    }
  },
  onLoad () {
    // console.log(tipBoxTop)
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
.nomore-component {
  flex: 1;
}
.nomore-skeleton-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}
.nomore-skeleton-img {
  display: block;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
.nomore-skeleton-tip {
  font-size: 15px;
  color: #333333;
  line-height: 30px;
  text-align: center;
  margin-top: -60px;
}
</style>