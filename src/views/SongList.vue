<template>
  <div class="song-list">
    <div class="list-header">
      <back-header class="list-back-header">
        <div class="list-header-info">
          <p class="header-name">歌单</p>
          <p class="header-recommend" v-if="isShowDesc">{{listDesc}}</p>
        </div>
      </back-header>
      <div class="list-info">
        <img v-if="typeof listInfo.coverImgUrl !== 'undefined'" :src="listInfo.coverImgUrl+ '?' + new Date().getTime()" alt="" class="cover-img">
        <div class="list-user-info">
          <p class="list-name">{{listInfo.name}}</p>
          <p class="list-user"><img :src="listInfo.creator.avatarUrl" alt="" class="user-avator"><span class="user-name">{{listInfo.creator.nickname}}</span></p>
          <p class="list-signature">{{listInfo.description || listInfo.creator.signature | descFilter}}</p>
        </div>
      </div>
    </div>
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
      listInfo: {},
      isShowDesc: false,
      listDesc: ""
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
            let img = document.querySelector(".cover-img");
            getImageColor(img);
          })
        }
      })
    },
    getArgs() { 
      let args = this.$route.params;
      this.fromType = args.from;
      this.fromId = args.id;
      if (args.desc !== "null") {
        this.isShowDesc = true;
        this.listDesc = args.desc;
      }
    }
  },
  filters: {
    descFilter (val) {
      if (val.length > 25) {
        return `${val.slice(0, 25)}...`
      } else {
        return `${val}`
      }  
    }
  }
}
</script>

<style lang="scss" scoped>
.song-list {
  width: 100%;
  height: 100%;
  background: linear-gradient(#111d67, #996cfa);
  .list-header {
    .list-back-header {
      .list-header-info {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        p.header-name {
          width: 100%;
          color: #ffffff;
        }
        p.header-recommend {
          font-size: .08rem;
          color: #999999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: .05rem;
        }
      }
    }
    .list-info {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      padding: 0.15rem;
      img.cover-img {
        min-width: 35vw;
        height: 35vw;
        border-radius: .07rem;
      }
      .list-user-info {
        height: 35vw;
        margin-left: .15rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .list-name {
          color: #ffffff;
          font-weight: bold;
        }
        .list-user {
          display: flex;
          align-items: center;
          img {
            width: 8vw;
            height: 8vw;
            border-radius: 50%;
          }
          span {
            color: #bbbbbb;
            font-size: 12px;
            margin-left: .1rem;
          }
        }
        .list-signature {
          color: #bbbbbb;
          font-size: 12px;
        }
      }
    }
  }
}
</style>