<template>
  <div class="home">
    <user-info :openUserInfoMask="openUserInfoMask" @responseClose="responseClose" />
    <top-header @openUserInfo="openUserInfo" />
    <router-view />
  </div>
</template>

<script>
import TopHeader from '../components/TopHeader.vue';
import UserInfo from '../components/UserInfo.vue';

export default {
  name: "home",
  components: {
    TopHeader,
    UserInfo
  },
  data () {
    return {
      openUserInfoMask: false,
    }
  },
  methods: {
    openUserInfo () {
      this.openUserInfoMask = true
    },
    responseClose () {
      this.openUserInfoMask = false
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  padding-top: .55rem;
  position: relative;
}
</style>
