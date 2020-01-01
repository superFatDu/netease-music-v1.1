<template>
  <div class="recommend-list">
    <p class="block-title">推荐歌单</p>
    <div class="list-items">
      <div class="list-item" v-for="(item, index) of list" :key="index" @click="handleList(item)">
        <div class="img-box">
          <img :src="item.picUrl" alt="">
          <span class="play-count">{{item.playCount | playFilter}}</span>
        </div>
        <span class="item-name">{{item.name | nameFilter}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { FIND_SOURCE } from '../fetch/api';

export default {
  name: 'RecommendList',
  data () {
    return {
      list: []
    }
  },
  methods: {
    ini () {
      FIND_SOURCE.getRecommendList({ 
        limit: 6
       })
       .then(res => {
         if (res.code === 200) {
           this.list = res.result;
         }
       })
    },
    handleList(opt) {
      let id = opt.id;
      let desc = opt.copywriter;
      this.$router.push({
        path: `/songlist/collection/${id}/${desc}`
      })
    }
  },
  created () {
    this.ini()
  },
  filters: {
    playFilter (val) {
      return `${Math.floor(val / 10000)}万`
    },
    nameFilter (val) {
      if (val.length > 15) {
        return `${val.slice(0, 15)}...`
      } else {
        return `${val}`
      }  
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-list {
  border-top: 1px solid #f7f7f7;
  padding: .15rem .15rem 0;
  height: 7rem;
  .list-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: .15rem;
    .list-item {
      margin-bottom: .15rem;
      .img-box {
        width: 1rem;
        height: 1rem;
        border-radius: .07rem;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .play-count {
          position: absolute;
          top: .05rem;
          right: .05rem;
          color: #ffffff;
          font-size: .11rem;
          &::after {
            content: '';
            display: block;
            width: .12rem;
            height: .12rem;
            background: url("../assets/images/play-count.svg") 50% 50% no-repeat;
            background-size: 100%;
            position: absolute;
            top: 50%;
            left: -.12rem;
            transform: translateY(-50%);
          }
        }
      }
      .item-name {
        display: inline-block;
        width: 1rem;
        font-size: .12rem;
        margin-top: .05rem;
      }
    }
  }
}
</style>