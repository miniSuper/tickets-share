<template>
  <div class='share'>
    <my-header></my-header>
    <div class="tickets-box">
      <ticket v-for="ticket in tickets"
              :key="ticket.coupon_id"
              :data="ticket"
              @onGetTicket="getOneTicket"></ticket>
    </div>
    <my-footer :ids="idsAll"
               @unLogin="loginToGetAllTicket"
               @hasLogin="getAllTicket"></my-footer>
    <van-popup v-model="popupShow">
      <div class="pop-wrapper">
        <i class="icon-close"
           @click="popupShow =false">
        </i>
        <h4 class="pop-title">我要领券</h4>
        <div class="pop-body">
          <input class="username"
                 v-model="username"
                 type="text"
                 placeholder="请输入您的手机号码/邮箱号码">
          <input class="password"
                 v-model="password"
                 type="text"
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
        <button class="btn-submit">注册并领取</button>
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
  getTicketHasLogin
} from '@/api/ticket'
import { Toast } from 'vant'
import { mapGetters } from 'vuex'
export default {
  components: { MyHeader, MyFooter, Ticket },
  data() {
    return {
      tickets: [
        {
          coupon_id: '900',
          coupon_name: '要测明细',
          percent: '0.00',
          desc:
            '用券说明:<br/>1.客户端限制:PC|WAP|众包助手...<br/>2.券类型:<br/>3.使用范围分类:<br/>',
          money: 50,
          max_money: 0,
          time_start_use: '2018-12-01 17:14',
          time_end_use: '2018-12-31 17:14',
          enough: 0,
          coupon_type: '0',
          use_time: '0',
          is_over: 0,
          status: 2,
          rule: '满0.00元减10.00,最高可抵用0元。'
        },
        {
          coupon_id: '910',
          coupon_name: '要测明细',
          percent: '0.00',
          desc:
            '用券说明:<br/>1.客户端限制:PC|WAP|众包助手...<br/>2.券类型:<br/>3.使用范围分类:<br/>',
          money: 50,
          max_money: 0,
          time_start_use: '2018-12-01 17:14',
          time_end_use: '2018-12-31 17:14',
          enough: 0,
          coupon_type: '0',
          use_time: '0',
          is_over: 0,
          status: 2,
          rule: '满0.00元减10.00,最高可抵用0元。'
        },
        {
          coupon_id: '920',
          coupon_name: '要测明细',
          percent: '0.00',
          desc:
            '用券说明:<br/>1.客户端限制:PC|WAP|众包助手...<br/>2.券类型:<br/>3.使用范围分类:<br/>',
          money: 50,
          max_money: 0,
          time_start_use: '2018-12-01 17:14',
          time_end_use: '2018-12-31 17:14',
          enough: 0,
          coupon_type: '0',
          use_time: '0',
          is_over: 0,
          status: 2,
          rule: '满0.00元减10.00,最高可抵用0元。'
        },
        {
          coupon_id: '930',
          coupon_name: '要测明细',
          percent: '0.00',
          desc:
            '用券说明:<br/>1.客户端限制:PC|WAP|众包助手...<br/>2.券类型:<br/>3.使用范围分类:<br/>',
          money: 50,
          max_money: 0,
          time_start_use: '2018-12-01 17:14',
          time_end_use: '2018-12-31 17:14',
          enough: 0,
          coupon_type: '0',
          use_time: '0',
          is_over: 0,
          status: 2,
          rule: '满0.00元减10.00,最高可抵用0元。'
        }
      ],
      idsAll: '990,991,992,993,994,995,996,997,998,999',
      idsToGet: '',
      popupShow: false,
      registerPopupShow: false,
      currentTicketId: 0,
      username: '',
      password: '',
      mobile: 13068775963,
      code: '',
      codeHasSend: false
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    getOneTicket(ticketId) {
      this.popupShow = true
      this.currentTicketId = ticketId
      console.log(ticketId)
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
            Toast.success(res.msg.r)
          }
        })
        .catch(err => console.log(err))
    },
    initTicketList() {
      let data = {
        do: 'coupon',
        view: 'share_list',
        coupon_ids: this.idsAll
      }
      getTicketList(data)
        .then(res => {
          if (res.status === 1) {
            this.tickets = res.data
          }
        })
        .catch(err => console.log(err))
    },
    loginAndGetTicket() {
      let data = {
        coupon_ids: this.idsToGet,
        txt_account: this.username,
        pwd_password: this.password
      }
      getTicketUnLogin(data)
        .then(res => {
          if (res.status === 1) {
            this.tickets = res.data
          }
        })
        .catch(err => console.log(err))
    },
    loginToGetAllTicket() {
      this.idsToGet = this.idsAll
      this.popupShow = true
    },
    getAllTicket() {
      this.idsToGet = this.idsAll
      getTicketHasLogin(this.idsToGet)
    }
  },
  created() {
    this.initTicketList()
  }
}
</script>

<style lang='stylus' scoped>
.share
  .tickets-box
    width 710px
    margin 20px auto

  .pop-wrapper
    position relative
    width 600px

    .icon-close
      position absolute
      right 20px
      top 20px
      display block
      width 50px
      height 50px
      background #fff url('/static/images/icon_close.png') no-repeat center center
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
