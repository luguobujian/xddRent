<template>
  <div class="container">
    <div class="top-search-btn van-hairline">
      <div class="city-box">
        <div class="city">北京</div>
        <van-icon name="/static/icons/arrow-down.png" />
      </div>
      <div class="search-btn-box">
        <div class="search-btn">
          <van-icon name="/static/icons/search2.png" />
          输入箱子名称进行搜索
        </div>
      </div>
    </div>
    <div class="result-box">
      <div v-for="(item, index) in reuslts"
           :key="index"
           class="result-item">
        <div class="result-item-img-box">
          <img :src="item.url"
               alt="">
        </div>
        <div class="result-name">讯纳箱/Alphard</div>
        <div class="n-address-box">
          <div class="location-box">
            <van-icon name="/static/icons/addres_icon.png"
                      size="12px" />
            {{item.location}}
          </div>
          <div>
            销量：2.3w
          </div>
        </div>
        <div class="per-address-box">
          <div class="unit-box">
            <span>¥</span>{{item.u}}
          </div>
          <div class="tag">特价</div>
          <div class="o-cost">¥1700/天</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      reuslts: [{
        url: '/static/images/banner_1.png',
        name: '讯纳箱/Alphard',
        u: '800/天',
        location: '北京'
      }, {
        url: '/static/images/banner_1.png',
        name: '讯纳箱/Alphard',
        u: '800/天',
        location: '北京'
      }]
    }
  }
}
</script>
<style scoped>
.top-search-btn {
  display: flex;
  padding: 0 15px 7px;
  background: #fff;
}
.search-btn-box {
  width: 285px;
  height: 32px;
  background: #f4f4f4;
  border-radius: 16px;
}
.search-btn {
  flex: 1;
  font-size: 13px;
  color: #999999;
  text-align: center;
  line-height: 32px;
}
.city-box {
  display: flex;
  width: 60px;
  line-height: 32px;
}
.city {
  flex: 1;
}

.result-box {
  padding: 13.5px;
}
.result-item {
  display: inline-block;
  margin: 4.5px;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
}
.result-item:nth-child(2n) {
  margin-right: 0;
}
.result-item-img-box {
}
.result-item-img-box img {
  width: 168px;
  height: 170px;
}
.result-name {
  line-height: 21px;
  padding-top: 10px;
  padding-left: 8px;
}
.n-address-box {
  display: flex;
  font-size: 11px;
  color: #999999;
  line-height: 22px;
  padding: 2px 8px 6px;
}
.per-address-box {
  line-height: 22px;
  padding: 0px 8px 12px;
}
.per-address-box {
  display: flex;
}
.location-box {
  /* float: right; */
  flex: 1;
  font-size: 11px;
  color: #999999;
}
.unit-box {
  /* flex: 1; */
  font-size: 15px;
  color: #97d700;
}
.unit-box span {
  font-size: 11px;
}
.tag {
  display: inline-block;
  /* width: 23px; */
  height: 16px;
  font-size: 10px;
  color: #97d700;
  line-height: 14px;
  text-align: center;
  padding: 1px 4px;
  background: rgba(151, 215, 0, 0.2);
  border-radius: 6px 0 6px 0;
  margin-top: 3px;
  margin-left: 8px;
}
.o-cost {
  font-size: 11px;
  color: #999999;
  line-height: 16px;
  margin-top: 4px;
  margin-left: 8px;
  text-decoration: line-through;
}
</style>
<style>
.city-box .van-icon--image {
  width: 8px !important;
  height: 4px !important;
  margin-right: 15px;
  transform: rotate(180deg);
}
.city-box .van-icon__image {
  vertical-align: top;
}
.search-btn-box .van-icon__image {
  vertical-align: -10%;
}
.search-btn ._van-icon {
  margin-right: 5px;
}
.location-box .van-icon__image {
  vertical-align: -12%;
}
</style>