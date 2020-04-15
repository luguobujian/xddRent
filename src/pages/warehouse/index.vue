<template>
  <div class="container">
    <div class="main-box">
      <div v-for="(item, index) in dataList"
           :key="index"
           :data-index="index"
           :data-id="item.id"
           class="item van-hairline"
           @click="onClick">
        <div class="item-name">{{item.tit}}</div>
        <div class="item-content">
          <div class="item-left">
            <van-icon name="/static/icons/addres_icon.png" />
          </div>
          <div class="item-right">{{item.val}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataList: [
        {
          id: 1,
          tit: '这里是地址这里是地址这里是地址这里地址这',
          val: '里是这里是地地这里是地址这里是地址'
        }, {
          id: 2,
          tit: '这里是地址这里是地址这里是地址这里地址这',
          val: '里是这里是地地这里是地址这里是地址'
        }
      ]
    }
  },
  methods: {
    onClick (e) {
      const { index, id } = e.currentTarget.dataset
      const pages = getCurrentPages()
      const prev = pages[pages.length - 2]
      const indexData = this.dataList[index]

      prev.data.$root[0].setData('warehouse', { id, tit: indexData.tit, val: indexData.val })

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
</style>