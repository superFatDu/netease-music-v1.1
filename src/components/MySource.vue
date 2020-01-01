<template>
  <div class="my-source">
    <div class="create-collects">
      <p class="block-title">创建的歌单<span class="block-sub-title">（{{createList.length}}）</span></p>
      <div class="list-items">
        <div class="list-item" v-for="(item, index) of createList" :key="index" @click="handleCollection(item)">
          <img src="" alt="" v-lazy="item.coverImgUrl">
          <div class="item-info">
            <p class="item name">{{item.name}}</p>
            <p class="item count">{{item.trackCount}}首</p>
          </div>
        </div>
      </div>
    </div>
    <div class="my-collects">
      <p class="block-title">收藏的歌单<span class="block-sub-title">（{{collectList.length}}）</span></p>
      <div class="list-items">
        <div class="list-item" v-for="(item, index) of collectList" :key="index" @click="handleCollection(item)">
          <img src="" alt="" v-lazy="item.coverImgUrl">
          <div class="item-info">
            <p class="item name">{{item.name}}</p>
            <p class="item count">{{item.trackCount}}首</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MY_SOURCE } from '../fetch/api'

export default {
  name: 'MySource',
  data () {
    return {
      createList: [],
      collectList: []
    }
  },
  methods: {
    ini () {
      MY_SOURCE.getMyList({uid: localStorage['uid']})
        .then(res => {
          if (res.code === 200) {
            for (let item of res.playlist) {
              if (item.subscribed) {
                this.collectList.push(item)
              } else {
                this.createList.push(item)
              }
            }
          }
        })
    },
    handleCollection(opt) {
      let id = opt.id;
      this.$router.push({
        path: `/songlist/collection/${id}/null`
      })
    }
  },
  created () {
    this.ini()
  }
}
</script>

<style lang="scss" scoped>
.my-source {
  color: #000000;
  padding: .15rem .15rem 0;
  .list-items {
    padding: .15rem 0;
    .list-item {
      display: flex;
      align-items: center;
      margin-bottom: .1rem;
      img {
        width: .6rem;
        height: .6rem;
        border-radius: .04rem;
      }
      .item-info {
        margin-left: .1rem;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        p {
          width: 100%;
          &:first-child {
            font-size: .16rem;
            margin-bottom: .05rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &:last-child {
            font-size: .12rem;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>