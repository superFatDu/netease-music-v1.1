<template>
  <div class="home">
    <top-header />
    <router-view />
  </div>
</template>

<script>
import TopHeader from '../components/TopHeader.vue';

export default {
  name: "home",
  components: { TopHeader }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  padding: 0 .15rem;
  box-sizing: border-box;
}  
</style>
