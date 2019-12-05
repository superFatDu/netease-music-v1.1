<template>
  <div class="song-list">
    <div class="list-header">
      <back-header>

      </back-header>
      <div class="list-info">
        <img v-if="typeof listInfo.coverImgUrl !== 'undefined'" :src="listInfo.coverImgUrl+ '?' + new Date().getTime()" alt="" class="cover-img">
      </div>
    </div>
    <canvas id="myCanvas"></canvas>
  </div>
</template>

<script>
import BackHeader from '../components/BackHeader.vue'
import { getImageColor } from '../assets/js/utils'
import { SONG_LIST } from '../fetch/api'
export default {
  name: 'SongList',
  components: {
    BackHeader
  },
  data() {
    return {
      fromType: '',
      fromId: '',
      listInfo: {}
    }
  },
  created() {
    this.getArgs();
    this.getSongInfo()
  },
  methods: {
    getSongInfo() {
      SONG_LIST.getSongList({id: this.fromId}).then(res => {
        if (res.code === 200) {
          this.listInfo = res.playlist;
          this.$nextTick(() => {
            let canvas = document.querySelector("#myCanvas");
            let img = document.querySelector(".cover-img");
            getImageColor(canvas, img);
          })
        }
      })
    },
    getArgs() { 
      let args = this.$route.params;
      this.fromType = args.from;
      this.fromId = args.id;
    }
  }
}
</script>

<style lang="scss" scoped>
.song-list {
  width: 100%;
  height: 100%;
  .list-header {
    .list-info {
      img {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>