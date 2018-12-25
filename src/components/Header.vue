<template>
  <div class='header'>
    <span class="back"
          @click="back">返回</span>
    {{title}}
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: '标题名称'
    }
  },
  data() {
    return {}
  },
  methods: {
    back() {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang='stylus' scoped>
.header
  position relative
  width 750px
  height 100px
  line-height 100px
  font-size 36px
  color #fff
  background #f84e4e url('~@/assets/images/arrow_left.png') no-repeat left center
  background-size 26px 48px
  background-position-x 30px

  .back
    position absolute
    left 0
    top 0
    width 120px
    height 100px
    opacity 0
</style>
