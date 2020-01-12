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
        <img
          v-if="typeof listInfo.coverImgUrl !== 'undefined'"
          :src="listInfo.coverImgUrl+ '?' + new Date().getTime()"
          alt
          class="cover-img"
        />
        <div class="list-user-info">
          <p class="list-name">{{listInfo.name}}</p>
          <p class="list-user">
            <img :src="listInfo.creator.avatarUrl" alt class="user-avator" />
            <span class="user-name">{{listInfo.creator.nickname}}</span>
          </p>
          <p
            class="list-signature"
          >{{listInfo.description || listInfo.creator.signature | descFilter}}</p>
        </div>
      </div>
    </div>
    <div class="song-list-items">
      <div class="detail-header">
        <span class="songlist-total">
          全部歌单
          <i>（共{{listInfo.trackCount}}首）</i>
        </span>
        <span v-if="fromType === 'collection'" class="songlist-subed">
          <i></i>
          {{listInfo.subscribedCount | subCountFilter}}
        </span>
        <span v-else class="songlist-not-subed">
          <i></i>
          收藏（{{listInfo.subscribedCount}}）
        </span>
      </div>
      <div class="detail-list">
        <ul>
          <li v-for="(item, index) of listInfo.tracks" :key="item.id">
            <span class="list-index">{{index + 1}}</span>
            <div class="list-item">
              <p class="list-item-name">{{item.name}}</p>
              <p class="list-item-info">
                <span
                  v-for="(singer, idx) of item.ar"
                  :key="singer.id"
                >{{idx === 0 ? singer.name : `/${singer.name}`}}</span> -
                <span>{{item.al.name}}</span>
              </p>
            </div>
            <i class="list-more" @click="handleListMore(item)"></i>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom-tip-mask" :class="openMask ? 'open-mask' : ''" @click="handleTipMask"></div>
    <div
      class="bottom-tip-info"
      :class="openMask ? 'open-mask' : ''"
      ref="touchTip"
      @touchstart="tipTouchStart($event)"
      @touchmove="tipTouchMove($event)"
      @touchend="tipTouchEnd($event)"
    >
      <div class="tip-header">
        <img :src="bottomTipInfo.al.picUrl" alt />
        <div class="tip-name">
          <p>歌曲：{{ bottomTipInfo.name }}</p>
          <p class="tip-auth-name">
            <span
              v-for="(item, index) of bottomTipInfo.ar"
              :key="index"
            >{{ index === 0 ? item.name : `/${item.name}` }}</span>
          </p>
        </div>
      </div>
      <div class="tip-detail">
        <img src="../assets/images/bottom-tip-icon.svg" alt />
        <p>专辑：{{ bottomTipInfo.al.name }}</p>
      </div>
      <div class="tip-detail" v-for="(item, index) of detailInfo" :key="index">
        <img src="../assets/images/bottom-tip-icon.svg" alt />
        <p>{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import BackHeader from "../components/BackHeader.vue";
import { getImageColor } from "../assets/js/utils";
import { SONG_LIST } from "../fetch/api";
export default {
  name: "SongList",
  components: {
    BackHeader
  },
  data() {
    return {
      fromType: "",
      fromId: "",
      listInfo: {
        creator: {
          avatarUrl: ""
        },
        description: ""
      },
      isShowDesc: false,
      listDesc: "",
      openMask: false,
      bottomTipInfo: {
        name: "",
        ar: [
          {
            name: ""
          }
        ],
        al: {
          picUrl: ""
        }
      },
      detailInfo: [
        "下一首播放",
        "收藏到歌单",
        "下载",
        "分享",
        "设为铃声",
        "查看视频"
      ],
      iniClientY: 0
    };
  },
  created() {
    this.getArgs();
    this.getSongInfo();
  },
  methods: {
    getSongInfo() {
      SONG_LIST.getSongList({ id: this.fromId }).then(res => {
        if (res.code === 200) {
          this.listInfo = res.playlist;
          this.$nextTick(() => {
            let img = document.querySelector(".cover-img");
            getImageColor(img);
          });
        }
      });
    },
    getArgs() {
      let args = this.$route.params;
      this.fromType = args.from;
      this.fromId = args.id;
      if (args.desc !== "null") {
        this.isShowDesc = true;
        this.listDesc = args.desc;
      }
    },
    handleListMore(item) {
      if (!this.openMask) this.openMask = !this.openMask;
      this.bottomTipInfo = item;
      document.body.style.overflow = "hidden";
    },
    handleTipMask() {
      if (this.openMask) this.openMask = !this.openMask;
      setTimeout(() => {
        this.bottomTipInfo = {
          name: "",
          ar: [
            {
              name: ""
            }
          ],
          al: {
            picUrl: ""
          }
        };
      }, 400);
    },
    tipTouchStart(event) {
      let e;
      if (event.touches) {
        e = event.touches[0];
      } else {
        e = event;
      }
      this.iniClientY = e.clientY;
    },
    tipTouchMove(event) {
      let e = event.changedTouches[0];
      let changedY = e.clientY;
      let target = this.$refs.touchTip;
      if (changedY < this.iniClientY) {
        target.style.bottom = "0";
      } else {
        target.style.bottom = this.iniClientY - changedY + "px";
      }
      global.console.log("changed", changedY - this.iniClientY)
    },
    tipTouchEnd(event) {
      let e = event.changedTouches[0];
      let changedY = e.clientY;
      global.console.log("changed", this.iniClientY - changedY)
      if (changedY - this.iniClientY > 200) {
        this.handleTipMask();
        this.$refs.touchTip.style.bottom = "";
      } else {
        this.$refs.touchTip.style.bottom = "0";
      }
    }
  },
  filters: {
    descFilter(val) {
      if (val && val.length > 25) {
        return `${val.slice(0, 25)}...`;
      } else {
        return `${val}`;
      }
    },
    subCountFilter(val) {
      if (val && parseInt(val) >= 10000) {
        return `${(val / 1000).toFixed(2)}万`;
      } else {
        return `${val}`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.song-list {
  width: 100%;
  height: 100%;
  background-color: #302f89;
  position: relative;
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
          font-size: 0.08rem;
          color: #999999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 0.02rem;
        }
      }
    }
    padding-top: 0.55rem;
    .list-info {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      padding: 0.15rem 0.15rem 0.3rem 0.15rem;
      img.cover-img {
        min-width: 1.3rem;
        height: 1.3rem;
        border-radius: 0.07rem;
      }
      .list-user-info {
        height: 1.3rem;
        margin-left: 0.15rem;
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
            margin-left: 0.1rem;
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
    border-radius: 0.22rem 0.22rem 0 0;
    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.6rem;
      width: 100%;
      box-sizing: border-box;
      padding: 0 0.15rem;
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
        font-size: 0.13rem;
        color: #dddddd;
        i {
          display: inline-block;
          width: 0.28rem;
          height: 0.28rem;
          background: url("../assets/images/collected.svg") 50% 50% no-repeat;
          background-size: 100%;
          margin-right: 0.05rem;
        }
      }
      .songlist-not-subed {
        height: 0.46rem;
        background-color: #f72626;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.08rem;
        border-radius: 0.23rem;
        font-size: 0.13rem;
        color: #ffffff;
        i {
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          background: url("../assets/images/collecting.svg") 50% 50% no-repeat;
          background-size: 100%;
        }
      }
    }
    .detail-list {
      ul li {
        width: 100%;
        height: 0.7rem;
        box-sizing: border-box;
        padding: 0 0.15rem;
        display: flex;
        align-items: center;
        .list-index {
          width: 0.35rem;
          color: #aaaaaa;
        }
        .list-item {
          width: calc(100% - 0.5rem);
          box-sizing: border-box;
          padding-right: 0.1rem;
          .list-item-name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .list-item-info {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #aaaaaa;
            font-size: 0.12rem;
            margin-top: 0.05rem;
          }
        }
        .list-more {
          width: 0.15rem;
          height: 0.22rem;
          background: url("../assets/images/icon-dot_vertical.svg") 50% 50%
            no-repeat;
          background-size: 100%;
        }
      }
    }
  }
  .bottom-tip-mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all 0.4s linear;
    &.open-mask {
      background: rgba(0, 0, 0, 0.6);
      z-index: 99;
    }
  }
  .bottom-tip-info {
    width: 100%;
    height: 80%;
    background-color: #ffffff;
    position: fixed;
    bottom: -100%;
    left: 0;
    transition: bottom 0.4s linear;
    border-radius: 0.22rem 0.22rem 0 0;
    &.open-mask {
      bottom: 0;
      z-index: 999;
    }
    .tip-header {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 10px;
      border-bottom: 1px solid #f7f7f7;
      img {
        width: 17vw;
        height: 17vw;
        border-radius: 5px;
        margin-right: 0.15rem;
      }
      .tip-name {
        p {
          font-size: 16px;
        }
        p.tip-auth-name {
          margin-top: 2px;
          span {
            color: #aaaaaa;
            font-size: 13px;
          }
        }
      }
    }
    .tip-detail {
      width: 100%;
      height: 0.52rem;
      display: flex;
      align-items: center;
      padding: 0 10px;
      img {
        width: 0.25rem;
        height: 0.25rem;
        margin-right: 0.15rem;
      }
      p {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        &::after {
          content: "";
          display: block;
          width: 100%;
          height: 1px;
          background-color: #f7f7f7;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
}
</style>