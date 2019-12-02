<template>
  <div class="back-header">
    <i class="back-btn" :class="showfff ? 'bg-fff' : 'bg-000'" @click="goBack"></i>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BackHeader',
  data() {
    return {
      showfff: false
    }
  },
  methods: {
    ini() {
      let path = this.$route.path;
      if (path.includes("search")) {
        this.showfff = false
      } else {
        this.showfff = true
      }
    },
    goBack() {
      this.$router.back()
    }
  },
  created() {
    this.ini()
  }
}
</script>

<style lang="scss" scoped>
.back-header {
  width: 100%;
  height: 0.55rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 0.15rem;
  .back-btn {
    display: inline-block;
    width: .27rem;
    height: .27rem;
    margin-right: .15rem;
    &.bg-fff {
      background: url("../assets/images/back-btn-fff.svg") 50% 50% no-repeat;
      background-size: 100%;
    }
    &.bg-000 {
      background: url("../assets/images/back-btn-000.svg") 50% 50% no-repeat;
      background-size: 100%;
    }
  }
}
</style>