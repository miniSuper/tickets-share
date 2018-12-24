<template>
  <div class='ticket'>
    <div class="face-side">
      <div class="face-left">
        <p class="value-box">
          ￥<span class="value">{{data.money}}</span>
        </p>
        <p class="rule">
          {{data.rule}}
        </p>
      </div>
      <div class="face-right">
        <h6 class="ticket-title">{{data.coupon_name}}</h6>
        <div class="date">
          <p>有效期至</p>
          <p>{{data.time_end_use}}</p>
        </div>
        <button class="btn-get"
                @click="getTicket">
          立即领取
        </button>
      </div>
    </div>
    <div class="detail">
      <div ref="infoFold"
           class="info-fold">
        <span>
          详细信息
        </span>
        <i :class="iconState"
           class="icon-detail icon-toggle"
           @click="toggleTicketInfo">
        </i>
      </div>
      <div ref="infoMore"
           :class="infoMore"
           class="info-open"
           v-html="data.desc"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default() {
        return {
          coupon_id: '990',
          coupon_name: '要测明细',
          percent: '0.00',
          desc:
            '用券说明:<br/>1.客户端限制:PC|WAP|众包助手...<br/>2.券类型:<br/>3.使用范围分类:<br/>',
          money: 0,
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
      }
    }
  },
  data() {
    return {
      isTicketDetailShow: false
    }
  },
  computed: {
    infoMore() {
      return this.isTicketDetailShow ? '' : 'hidden'
    },
    iconState() {
      return this.isTicketDetailShow ? '' : 'up'
    }
  },
  methods: {
    openPopup() {},
    toggleTicketInfo() {
      console.log('click')
      this.isTicketDetailShow = !this.isTicketDetailShow
    },
    getTicket() {
      this.$emit('onGetTicket', this.data.coupon_id)
    }
  }
}
</script>

<style lang='stylus' scoped>
.ticket
  width 100%
  margin-bottom 20px
  border-radius 4px
  background-color #fff

  .face-side
    display flex
    border-bottom 1px dashed #f1ccd8

    .face-left
      flex-basis 226px
      color #f84e4e
      background-color #fff1ee

      .value-box
        font-size 0.3rem

        .value
          display inline-block
          font-size 68px
          font-weight bold
          margin 0 auto
          padding 20px 0 10px 0

      .rule
        padding 0 16px 16px 16px
        line-height 30px
        font-size 20px

    .face-right
      flex 1
      position relative
      padding-left 36px

      .ticket-title
        font-size 36px
        line-height 90px
        text-align left
        font-weight bold

      .date
        text-align left
        font-size 24px
        line-height 34px

      .btn-get
        position absolute
        right 40px
        bottom 20px
        border 1px solid #f84e4e
        color #f84e4e
        font-size 22px
        line-height 22px
        padding 12px 20px
        border-radius 30px

  .detail
    position relative
    min-height 56px
    line-height 56px
    font-size 24px
    padding-left 40px
    text-align left

    &:before
      position absolute
      top -12px
      left -12px
      content ''
      background-color #efefef
      display block
      width 24px
      height 24px
      border-radius 12px

    &:after
      position absolute
      top -12px
      right -12px
      content ''
      background-color #efefef
      display block
      width 24px
      height 24px
      border-radius 12px

    .info-fold
      position relative

      .icon-toggle
        position absolute
        top 20px
        right 20px
        display inline-block
        width 20px
        height 20px
        background #fff url('/static/images/arrow_down.png') no-repeat center center
        transform rotate(0)
        transition 0.3s all ease

        &.up
          transform rotate(180deg)
          transition 0.3s all ease

    .info-open
      transition 0.3s all ease
</style>
