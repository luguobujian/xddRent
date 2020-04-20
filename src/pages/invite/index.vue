<template>
  <div class="container">
    <div class="top-box">
      <div class="tip-box">我的邀请码</div>
      <div class="code-box Oswald-Medium">827362</div>
    </div>
    <div class="items-box">
      <div class="items">
        <div v-for="(item,index) in dataList"
             :key="index"
             class="items-m clearfix">
          <div class="avatar-box fl">
            <img class="avatar"
                 src=""
                 alt="">
          </div>
          <div class="tl fl">
            <div class="title-box PingFangSC-Medium">{{item.t1}}</div>
            <div class="sub-title-box">{{item.t2}}</div>
          </div>
          <div class="tr fl">
            <div class="title-box PingFangSC-Medium">奖励：{{item.t3}}</div>
            <div class="sub-title-box">注册时间：{{item.t4}}</div>
          </div>
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
        { avatar: '', t1: '深海淹死一条鱼', t2: '18627263623', t3: '500元优惠券', t4: '2020.02.05' },
        { avatar: '', t1: '深海淹死一条鱼', t2: '18627263623', t3: '500元优惠券', t4: '2020.02.05' }
      ]

    }
  }
}
</script>

<style scope>
.top-box {
  text-align: center;
  background-color: #fff;
}
.tip-box {
  font-size: 15px;
  color: #999999;
  margin-top: 35px;
}
.code-box {
  font-size: 34px;
  color: #333333;
  line-height: 51px;
  margin-bottom: 30px;
}
.items-box {
  margin-top: 10px;
  background-color: #fff;
}
.items {
}
.items-m {
  padding: 15px 0;
  margin: 0 15px;
  border-bottom: 1px solid #ebedf0;
}
.items-m:last-child {
  border-bottom: none;
}
.avatar-box {
  width: 40px;
  height: 40px;
}
.avatar-box .avatar {
  width: 40px;
  height: 40px;
  background: seagreen;
  border-radius: 50%;
}
.tl {
  width: 171px;
  margin-left: 10px;
}
.tr .title-box,
.tr .sub-title-box {
  width: 124px;
}
.title-box,
.sub-title-box {
  width: 112px;
  font-size: 14px;
  color: #333333;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sub-title-box {
  font-size: 12px;
  color: #999999;
  line-height: 17px;
  margin-top: 3px;
}
</style>