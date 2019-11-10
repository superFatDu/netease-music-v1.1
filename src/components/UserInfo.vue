<template>
  <div class="user-info" :class="{'open-mask': openMask}" @touchmove.prevent @touchstart.stop="menuMoveStart($event)" @touchend.stop="menuMoveEnd($event)">
    <div class="user-wrapper">
      <div class="basic-info">
        123
      </div>
      <div class="fixed-footer"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserInfo',
    props: {
      openUserInfoMask: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        openMask: false,
        startX: 0,
        endX: 0
      }
    },
    methods: {
      menuMoveStart (e) {
        this.startX = e.touches[0].clientX;
      },
      menuMoveEnd (e) {
        this.endX = e.changedTouches[0].clientX;
        if (this.startX - this.endX > 60) {
          this.openMask = false
          this.$emit("responseClose")
        }
      }
    },
    watch: {
      openUserInfoMask: {
        handler: function(val) {
          this.openMask = val
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
.user-info {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background: raba(0, 0, 0, 0);
  transition: all .5s ease;
  &.open-mask {
    background: rgba(0, 0, 0, .5);
    transition: all .5s ease;
    z-index: 9999;
    .user-wrapper {
      left: 0;
    }
  }
  .user-wrapper {
    width: 82vw;
    height: 100vh;
    background: #ffffff;
    position: absolute;
    top: 0;
    left: -82vw;
    transition: all .5s ease;
  }
}
</style>