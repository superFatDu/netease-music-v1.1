<template>
  <div
    class="user-info"
    :class="{'open-mask': openMask}"
    @touchmove.prevent
    @touchstart.stop="menuMoveStart($event)"
    @touchend.stop="menuMoveEnd($event)"
  >
    <div class="user-wrapper">
      <div class="basic-info">
        <div class="basic-user">
          <img :src="userInfo.profile.backgroundUrl" alt="" class="user-bg">
          <img :src="userInfo.profile.avatarUrl" alt="" class="user-avator">
          <div class="user-detail">
            <span class="user-name">{{userInfo.profile.nickname}}</span>
            <i class="user-level">Lv.{{userInfo.level}}</i>
            <span class="user-sign-in" @click="handleSignIn"> <i></i>签到</span>
          </div>
        </div>
        <div class="basic-operates"></div>
      </div>
      <div class="fixed-footer">
        <div class="logout-btn" @click="handleLogout">
          <i></i>
          <span>退出</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { USER_INFO } from "@/fetch/api"

export default {
  name: "UserInfo",
  props: {
    openUserInfoMask: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      openMask: false,
      startX: 0,
      endX: 0,
      userInfo: {}
    };
  },
  methods: {
    ini() {
      let uid = localStorage['uid']
      USER_INFO.getUserDetail({ uid }).then(res => {
        if (res.code ===200) {
          this.userInfo = res;
        }
      })
    },
    menuMoveStart(e) {
      this.startX = e.touches[0].clientX;
    },
    menuMoveEnd(e) {
      this.endX = e.changedTouches[0].clientX;
      if (this.startX - this.endX > 60) {
        this.openMask = false;
        this.$emit("responseClose");
      }
    },
    handleLogout() {
      USER_INFO.logout().then(res => {
        if (res.code === 200) {
          localStorage.removeItem('uid');
          this.$router.push({
            path: '/'
          })
        }
      })
    },
    handleSignIn() {
      USER_INFO.signIn().then(res => {
        if (res.code === 200) {
          alert(`签到成功，经验+${res.point   }`)
        }
      })
    }
  },
  created() {
    this.ini()
  },
  watch: {
    openUserInfoMask: {
      handler: function(val) {
        this.openMask = val;
      },
      immediate: true
    }
  }
};
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
  transition: all 0.5s ease;
  &.open-mask {
    background: rgba(0, 0, 0, 0.5);
    transition: all 0.5s ease;
    z-index: 9999;
    .user-wrapper {
      left: 0;
    }
  }
  .user-wrapper {
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    position: absolute;
    top: 0;
    left: -100vw;
    transition: all 0.5s ease;
    .basic-info {
      .basic-user {
        width: 100vw;
        height: 30vh;
        box-sizing: border-box;
        padding: 0 8vw 2vh 8vw;
        background-color: #3ca4ef7d;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: relative;
        .user-bg {
          width: 100vw;
          height: 30vh;
          position: absolute;
          top: 0;
          left: 0;
        }
        .user-name {
          color: #ffffff;
          font-weight: bold;
        }
        .user-avator {
          width: 8vh;
          height: 8vh;
          border-radius: 50%;
          margin-bottom: 2vh;
          z-index: 1;
        }
      }
      .user-detail {
        display: flex;
        justify-content: space-between;
        z-index: 1;
        .user-level {
          padding: 4px 7px;
          color: #666666;
          background-color: #f3f6ff;
          border-radius: 12px;
          font-size: .12rem;
        }
        .user-sign-in {
          display: flex;
          align-items: center;
          padding: 4px 7px;
          border-radius: 12px;
          color: #ffffff;
          font-size: 12px;
          background-color: #ec2f2f;
          i {
            display: inline-block;
            width: 17px;
            height: 17px;
            background: url("../assets/images/sign-in.svg") 50% 50% no-repeat;
            background-size: 100%;
          }
        }
      }
    }
    .fixed-footer {
      width: 100vw;
      height: .45rem;
      box-sizing: border-box;
      padding: 0 .1rem;
      position: absolute;
      bottom: 0;
      left: 0;
      box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.5);
      .logout-btn {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        i {
          display: inline-block;
          width: .24rem;
          height: .24rem;
          background: url("../assets/images/logout.svg") 50% 50% no-repeat;
          background-size: 100%;
          margin-right: 3px;
        }
      }
    }
  }
}
</style>