<template>
  <div class="container van-hairline--top">
    <div class="main-box">
      <div v-for="(item, index) in dataList"
           :key="index"
           :data-index="index"
           :data-id="item.id"
           class="item van-hairline"
           @click="onClick">
        <div class="item-name PingFangSC-Medium">{{item.name}}</div>
        <div class="item-content">
          <div class="item-left">
            <van-icon name="/static/icons/addres_icon.png"
                      size="12px"
                      custom-style="vertical-align: 6%" />
          </div>
          <div class="item-right">{{item.areatext}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getWarehouse } from '@/api/getData'
export default {
  data () {
    return {
      id: null,
      dataList: null
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getWarehouse()
  },
  methods: {
    async getWarehouse () {
      try {
        const res = await getWarehouse({ goods_id: this.id })
        this.dataList = res.data.data
        console.log(res)
      } catch (error) {

      }
    },
    onClick (e) {
      const { index, id } = e.currentTarget.dataset
      const pages = getCurrentPages()
      const prev = pages[pages.length - 2]
      const indexData = this.dataList[index]

      prev.data.$root[0].setData('warehouse', { id, tit: indexData.name, val: `${indexData.area_name}${indexData.areatext}` })

      console.log(prev)

      setTimeout(() => { mpvue.navigateBack() }, 1000)
    }
  }
}
</script>
<style lang="">
.main-box {
  padding: 0 15px;
  background-color: #fff;
}
.item {
  padding: 15px 0;
}

.item-name {
  color: #333333;
  line-height: 21px;
}
.item-content {
  display: flex;
  margin-top: 8px;
}
.item-right {
  flex: 1;
  font-size: 13px;
  color: #999999;
  line-height: 18px;
  margin-left: 5px;
}

._van-icon {
  vertical-align: 6% !important;
}
</style>