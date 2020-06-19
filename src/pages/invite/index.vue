<template>
  <div class="container van-hairline--top">
    <div class="top-box">
      <div class="tip-box">我的邀请码</div>
      <div class="code-box Oswald-Medium">{{detail.code}}</div>
    </div>
    <div class="items-box">
      <div class="items">
        <div v-for="(item,index) in dataList"
             :key="index"
             class="items-m clearfix">
          <div class="avatar-box fl">
            <img class="avatar"
                 :src="item.user.avatar || '/static/icons/nophoto.png'"
                 alt="">
          </div>
          <div class="tl fl">
            <div class="title-box PingFangSC-Medium">{{item.user.username}}</div>
            <div class="sub-title-box">{{item.user.mobile}}</div>
          </div>
          <div class="tr fl">
            <div class="title-box PingFangSC-Medium">奖励：{{item.del_price}}</div>
            <div class="sub-title-box">注册时间：{{item.ymdhms}}</div>
          </div>
        </div>
      </div>
    </div>
    <nomoreComponents tipBoxTop="54%"
                      tipSrc="ndingdan.png"
                      noTip="暂无归还记录"
                      :dataList="dataList"></nomoreComponents>
    <van-toast id="van-toast" />
  </div>
</template>
<script>
import moment from 'moment'
import { getMyCode } from '@/api/getData'
import Toast from '../../../static/vant/toast/toast'
import nomoreComponents from '@/components/nomore'
export default {
  data () {
    return {
      detail: null,
      dataList: null

    }
  },
  onLoad () {
    this.getMyCode()
  },
  components: {
    nomoreComponents
  },
  methods: {
    async getMyCode () {
      try {
        const res = await getMyCode()
        console.log(res)
        this.detail = res.data.data
        this.dataList = res.data.data.list
        let arr = res.data.data.list
        arr.forEach((item, key) => {
          item.ymdhms = moment(item.jointime * 1000).format('YYYY-MM-DD HH:mm:ss ')
        })
        this.detailList = arr
      } catch (error) {
        Toast.fail(error.data.msg)
      }
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
  /* background: seagreen; */
  border-radius: 50%;
}
.tl {
  width: 145px;
  margin-left: 10px;
}
.tr .title-box,
.tr .sub-title-box {
  width: 145px;
}
.title-box,
.sub-title-box {
  width: 112px;
  font-size: 14px;
  color: #333333;
  line-height: 20px;
  overflow: hidden;
  /* text-overflow: ellipsis;
  white-space: nowrap; */
}
.sub-title-box {
  font-size: 12px;
  color: #999999;
  line-height: 17px;
  margin-top: 3px;
}
</style>