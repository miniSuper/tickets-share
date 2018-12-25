<template>
  <div class='share'>
    <my-header title="赠送优惠券"></my-header>
    <div class="banner">
      <img class="logo"
           src="@/assets/images/logo.png"
           alt="">
      <div class="content">
        <h3 class="title">点击领取您的券包吧</h3>
        <div class="subTitle"><span class="theme">花非官方</span> 赠送给您<span class="theme"
                v-text="ticketNum"></span>张优惠券</div>
      </div>
    </div>
    <div class="tickets-box">
      <ticket v-for="ticket in tickets"
              :key="ticket.coupon_id"
              :data="ticket"
              @onGetTicket="getOneTicket"></ticket>
    </div>
    <my-footer :ids="idsAll"
               @unLogin="getAllTicketUnLogin"
               @hasLogin="getAllTicketHasLogin"></my-footer>
    <van-popup v-model="loginPopupShow">
      <div class="pop-wrapper">
        <i class="icon-close"
           @click="loginPopupShow =false">
        </i>
        <h4 class="pop-title">我要领券</h4>
        <div class="pop-body">
          <input class="username"
                 v-model="username"
                 type="text"
                 placeholder="请输入您的手机号码/邮箱号码">
          <input class="password"
                 v-model="password"
                 type="password"
                 placeholder="请输入您的账户密码">
          <div class="tips"
               @click="registerPopupShow= true">还没有账户？赶紧注册一个!</div>
        </div>
        <button class="btn-submit"
                @click="loginAndGetTicket">立即领取</button>
      </div>
    </van-popup>
    <van-popup v-model="registerPopupShow">
      <div class="pop-wrapper  pop-register">
        <i class="icon-close"
           @click="registerPopupShow =false">
        </i>
        <h4 class="pop-title">注册</h4>
        <div class="pop-body">
          <input class="username"
                 v-model="mobile"
                 type="text"
                 placeholder="请输入您的手机号码">
          <div class="mobile-wrapper">
            <input class="code"
                   v-model="code"
                   type="text"
                   placeholder="请输入短信验证码">
            <span class="sendCode"
                  @click="sendAuthCode">获取验证码</span>
          </div>
          <div class="tips"><span v-show="codeHasSend">验证码已发送至您的手机!</span></div>
        </div>
        <button class="btn-submit"
                @click="register">注册并领取</button>
      </div>
    </van-popup>
    <van-popup v-model="successPopupShow">
      <div class="pop-wrapper">
        <img src="@/assets/images/success.png"
             alt="">
        <i class="icon-close"
           @click="successPopupShow = false">
        </i>
        <button class="btn-openApp"
                @click="openApp">打开APP</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import MyHeader from '@/components/Header'
import Ticket from '@/components/Ticket'
import MyFooter from '@/components/Footer'
import {
  getTicketList,
  getAuthCode,
  getTicketUnLogin,
  getTicketHasLogin,
  registerToGetTicket
} from '@/api/ticket'
import { Toast } from 'vant'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { MyHeader, MyFooter, Ticket },
  data() {
    return {
      tickets: [],
      idsAll: '500,600,700,800,900',
      idsToGet: '',
      loginPopupShow: false,
      registerPopupShow: false,
      successPopupShow: false,
      username: '',
      password: '',
      mobile: 13068775963,
      code: '',
      codeHasSend: false
    }
  },
  computed: {
    ...mapGetters(['token']),
    ticketNum() {
      return this.tickets.length
    }
  },
  methods: {
    ...mapActions(['saveToken']),
    // 点击 某一个优惠券 的 立即领取按钮  领取单个优惠券
    refresh() {
      this.initTicketList()
    },
    getOneTicket(ticketId) {
      this.idsToGet = ticketId
      if (this.token) {
        this.idsToGet = this.idsAll
        let data = {
          coupon_ids: this.idsToGet,
          time: Date.parse(new Date()) / 1000
        }
        getTicketHasLogin(data)
          .then(res => {
            if (res.status === 1) {
              this.successPopupShow = true
            }
          })
          .catch(err => console.log(err))
      } else {
        this.loginPopupShow = true
      }
    },
    sendAuthCode() {
      let data = {
        mobile: this.mobile,
        type: 'get_coupon'
      }
      getAuthCode(data)
        .then(res => {
          if (res.status === 1) {
            this.codeHasSend = true
            Toast.success('验证码已发送至您的手机!')
          } else {
            Toast.fail(res.msg.r)
          }
        })
        .catch(err => console.log(err))
    },
    initTicketList() {
      let data = {
        do: 'coupon',
        view: 'share_list',
        coupon_ids: this.idsAll,
        from_uid: '',
        time: Date.parse(new Date()) / 1000
      }
      getTicketList(data)
        .then(res => {
          if (res.status === 1) {
            this.tickets = res.data
            console.log(res.data)
          }
        })
        .catch(err => console.log(err))
    },
    // 登录 并 领取优惠券
    loginAndGetTicket() {
      let data = {
        do: 'login',
        type: 'get_coupon',
        coupon_ids: this.idsToGet,
        txt_account: this.username,
        pwd_password: this.password,
        time: Date.parse(new Date()) / 1000
      }
      getTicketUnLogin(data)
        .then(res => {
          if (res.status === 1) {
            this.loginPopupShow = false
            this.successPopupShow = true
            this.username = ''
            this.mobile = ''
          }
        })
        .catch(err => console.log(err))
    },
    // 还未登录 登录并一键领取全部优惠券
    getAllTicketUnLogin() {
      this.idsToGet = this.idsAll
      this.loginPopupShow = true
    },
    // 已经登录  一键获取全部优惠券
    getAllTicketHasLogin() {
      this.idsToGet = this.idsAll
      let data = {
        coupon_ids: this.idsToGet,
        time: Date.parse(new Date()) / 1000
      }
      getTicketHasLogin(data)
        .then(res => {
          if (res.status === 1) {
            this.successPopupShow = true
          }
        })
        .catch(err => console.log(err))
    },
    register() {
      // 注册并领取优惠券
      let data = {
        type: 'get_coupon',
        mobile: this.mobile,
        code: this.code,
        coupon_ids: this.idsToGet,
        time: Date.parse(new Date()) / 1000
      }
      registerToGetTicket(data)
        .then(res => {
          console.log(res)
          if (res.status === 1) {
            Toast(res.msg.r)
            this.registerPopupShow = false
          } else {
            Toast.fail(res.msg.r)
          }
        })
        .catch(err => console.log(err))
    },
    openApp() {
      alert('打开APP')
    }
  },
  created() {
    this.initTicketList()
  }
}
</script>

<style lang='stylus' scoped>
.share
  padding-bottom 134px

  .banner
    display flex
    flex-flow row nowrap
    justify-content flex-start
    padding 40px
    padding-bottom 30px

    .logo
      width 110px
      height 110px
      margin-right 40px

    .content
      flex 1
      text-align left
      display flex
      flex-flow column nowrap
      justify-content center

      .title
        font-size 36px
        line-height 40px
        color #000000

      .subTitle
        font-size 26px
        line-height 40px
        color #545454

        .theme
          color #f84e4e

  .tickets-box
    width 710px
    margin 20px auto

  .pop-wrapper
    position relative
    width 600px
    min-height 414px

    .icon-close
      position absolute
      right 20px
      top 20px
      display block
      width 50px
      height 50px
      background #fff url('~@/assets/images/icon_close.png') no-repeat center center
      background-size contain

    .pop-title
      font-size 50px
      line-height 150px
      font-weight bold

    .pop-body
      width 80%
      margin 0 auto

      .username, .password, .mobile, .code
        box-sizing border-box
        width 100%
        height 90px
        padding-left 20px
        border-radius 4px
        color #000
        background-color #efefef
        margin-bottom 20px

      .tips
        text-align left
        height 24px
        font-size 22px
        color #f93d04

    .btn-submit
      display block
      width 80%
      height 90px
      font-size 30px
      font-weight bold
      margin 50px auto
      border-radius 4px
      background-color #f84e4e
      color #fff

    .btn-openApp
      position absolute
      width 90%
      height 80px
      line-height 80px
      bottom 52px
      left 30px
      font-weight bold
      color #fff
      background-color #f84e4e
      font-size 30px
      opacity 0

  .pop-register
    .mobile-wrapper
      position relative
      width 100%

      .sendCode
        position absolute
        right 10px
        top 13px
        color #f93d04
        padding 20px
        font-weight normal
        border 1px solid #f93d04
        border-radius 4px
</style>
