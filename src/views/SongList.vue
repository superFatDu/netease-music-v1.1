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
    <div class="song-list-items">
      <div class="detail-header">
        <span class="songlist-total">播放全部<i>（共{{listInfo.trackCount}}首）</i></span>
        <span v-if="fromType === 'collection'" class="songlist-subed"><i></i> {{listInfo.subscribedCount | subCountFilter}}</span>
        <span v-else class="songlist-not-subed"><i></i> 收藏（{{listInfo.subscribedCount}}）</span>
      </div>
      <div class="detail-list">
        <ul>
          <li v-for="(item, index) of listInfo.tracks" :key="item.id">
            <span class="list-index">{{index + 1}}</span>
            <div class="list-item">
              <p class="list-item-name">{{item.name}}</p>
              <p class="list-item-info">
                <span v-for="(singer, idx) of item.ar" :key="singer.id">{{idx === 0 ? singer.name : `/${singer.name}`}}</span> - <span>{{item.al.name}}</span>
              </p>
            </div>
            <i class="list-more"></i>
          </li>
        </ul>
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
      listInfo: {
        creator: {
          avatarUrl: ""
        },
        description: ""
      },
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
      if (val && val.length > 25) {
        return `${val.slice(0, 25)}...`
      } else {
        return `${val}`
      }  
    },
    subCountFilter(val) {
      if (val && parseInt(val) >= 10000) {
        return `${(val / 1000).toFixed(2)}万`
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
  background-color: #302f89;
  .list-header {
    .list-back-header {
      position: fixed;
      top: 0;
      left: 0;
      background-color: #302f89;
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
          margin-top: .02rem;
        }
      }
    }
    padding-top: .55rem;
    .list-info {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      padding: 0.15rem .15rem .3rem .15rem;
      img.cover-img {
        min-width: 1.3rem;
        height: 1.3rem;
        border-radius: .07rem;
      }
      .list-user-info {
        height: 1.3rem;
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
            color: #aaaaaa;
            font-size: 12px;
            margin-left: .1rem;
          }
        }
        .list-signature {
          color: #aaaaaa;
          font-size: 10px;
        }
      }
    }
  }
  .song-list-items {
    width: 100%;
    min-height: calc(100% - 2.3rem);
    background-color: #ffffff;
    border-radius: .22rem .22rem 0 0;
    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: .6rem;
      width: 100%;
      box-sizing: border-box;
      padding: 0 .15rem;
      .songlist-total {
        i {
          color: #aaaaaa;
          font-size: 12px;
          font-weight: normal;
        }
      }
      .songlist-subed {
        height: 0.46rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .13rem;
        color: #dddddd;
        i {
          display: inline-block;
          width: .28rem;
          height: .28rem;
          background: url("../assets/images/collected.svg") 50% 50% no-repeat;
          background-size: 100%;
          margin-right: .05rem;
        }
      }
      .songlist-not-subed {
        height: 0.46rem;
        background-color: #f72626;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 .08rem;
        border-radius: .23rem;
        font-size: .13rem;
        color: #ffffff;
        i {
          display: inline-block;
          width: .2rem;
          height: .2rem;
          background: url("../assets/images/collecting.svg") 50% 50% no-repeat;
          background-size: 100%;
        }
      }
    }
    .detail-list {
      ul li {
        width: 100%;
        height: .7rem;
        box-sizing: border-box;
        padding: 0 .15rem;
        display: flex;
        align-items: center;
        .list-index {
          width: .35rem;
          color: #aaaaaa;
        }
        .list-item {
          width: calc(100% - .5rem);
          box-sizing: border-box;
          padding-right: .1rem;
          .list-item-name{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .list-item-info {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #aaaaaa;
            font-size: .12rem;
            margin-top: .05rem;
          }
        }
        .list-more {
          width: .15rem;
          height: .22rem;
          background: url("../assets/images/icon-dot_vertical.svg") 50% 50% no-repeat;
          background-size: 100%;
          
        }
      }
    }
  }
}
</style>