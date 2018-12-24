<template>
  <div class='footer'>
    <button class="btn-getAll"
            @click="getAllTickets">一键领取</button>
  </div>
</template>

<script>
import { getToken } from '@/utils/cache.js'
export default {
  components: {},
  props: {
    ids: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    getAllTickets() {
      let token = getToken()
      if (token) {
        this.$emit('hasLogin')
      } else {
        this.$emit('unLogin')
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.footer
  position fixed
  bottom 0
  left 0
  width 100%
  box-sizing border-box
  padding 20px
  background-color #fff
  z-index 1100

  .btn-getAll
    width 90%
    height 84px
    margin 0 auto
    font-size 30px
    line-height 84px
    color #f30101
    border 1px solid #f30101
    border-radius 10px
</style>
