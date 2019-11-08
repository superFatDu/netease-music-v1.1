<template>
  <div class="login">
    <div class="login-hello">
      <p>哈啰，</p>
      <p>开启你的音乐时光吧！</p>
    </div>
    <div class="login-form">
      <div class="form-items">
        <div class="form-item" v-for="(item, index) of formTitles" :key="index">
          <span>{{item}}</span>
          <input type="text" v-if="index === 0" v-model="loginAccount">
          <input type="password" v-if="index === 1" v-model="loginPwd">
        </div>
        <div class="login-btn">
          <i @click="handleLogin"></i>
        </div>
      </div>
    </div>
    <div class="pre-loading" v-show="preLoadingShow">
      <i></i>
      <span>超级无敌杜小胖 x cHeNg5</span>
    </div>
  </div>
</template>

<script>
import { LOG_IN } from '../fetch/api'

export default {
  name: 'login',
  data () {
    return {
      formTitles: ["账号", "密码"],
      loginAccount: "",
      loginPwd: "",
      preLoadingShow: true
    }
  },
  methods: {
    isLogin () {
      setTimeout(() => {
        if(typeof localStorage["uid"] === "undefined") {
          this.preLoadingShow = false;
        } else {
          this.$router.push({
            path: "/home/find"
          })
        }
      }, 3000)
    },
    handleLogin () {
      let param = {
        phone: this.loginAccount,
        password: this.loginPwd
      }
      LOG_IN.login(param)
        .then(res => {
          if (res.code === 200) {
            localStorage["uid"] = res.account.id;
            this.$router.push({
              path: "/home/find"
            })
          }
        })
    } 
  },
  created () {
    this.isLogin();
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/images/login_bg.jpg") 50% 50% no-repeat;
  background-size: 110%;
  position: relative;
  .login-hello {
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20vw;
    // align-items: center;
    p {
      font-size: .21rem;
      font-weight: bold;
      letter-spacing: .02rem;
      line-height: .4rem;
      &:first-child {
        font-size: .2rem;
      }
    }
  }
  .login-form {
    height: 70vh;
    background-color: #ffffff;
    border-radius: .45rem .45rem 0 0;
    .form-items {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 20vw 10vw 10vw;
      .form-item {
        line-height: 7vh;
        position: relative;
        margin-bottom: 5vh;
        display: flex;
        align-items: center;
        &:last-child {
          margin-bottom: 0; 
        }
        span {
          font-size: .14rem;
          display: inline-block;
          height: 7vh;
          line-height: 7vh;
          color: #979797;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
        input {
          width: 100%;
          height: 7vh;
          box-sizing: border-box;
          border-bottom: 1px solid #e7e7e7;
          color: #979797;
          padding-left: .45rem;
          font-size: .16rem;
          &:focus {
            border-bottom: 1px solid #c7c7c7;
            
          }
        }
      }
    }
    .login-btn {
      margin-top: 7vh;
      text-align: center;
      i {
        display: inline-block;
        width: 30vw;
        height: 14vw;
        border-radius: 7vw;
        background: #1a154f url("../assets/images/login_btn.svg") 50% 50% no-repeat;
        background-size: 17%;
      }
    }
  }
  .pre-loading {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    i {
      display: inline-block;
      width: 100vw;
      height: 100vw;
      background: url("../assets/images/loading.gif") 50% 50% no-repeat;
      background-size: 100%; 
    }
    span {
      position: absolute;
      left: 50%;
      bottom: .2rem;
      transform: translateX(-50%);
      color: #1a154f;
      font-size: .12rem;
      font-weight: bold;
      letter-spacing: .01rem;
    }
  }
}
</style>
