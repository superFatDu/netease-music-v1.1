<template>
  <div class="find-source">
    <index-swipper />
    <div class="find-selector-items">
      <div class="find-selector-item" v-for="(item, index) of selectorList" :key="index">
        <div class="item-icon" :class="item.type">
          <span v-if="item.type === 'daily-recommend'">{{getToday()}}</span>
        </div>
        <div class="item-text">{{item.name}}</div>
      </div>
    </div>
    <recommend-list />
  </div>
</template>

<script>
import IndexSwipper from '../components/IndexSwipper.vue'
import RecommendList from '../components/RecommendList.vue'

export default {
  name: 'FindSource',
  components: {
    IndexSwipper,
    RecommendList
  },
  data () {
    return {
      selectorList: [
        {
          type: 'daily-recommend',
          name: '每日推荐'
        },
        {
          type: 'song-list',
          name: '歌单'
        },
        {
          type: 'rank-list',
          name: '排行榜'
        },
        {
          type: 'radio',
          name: '电台'
        }
      ]
    }
  },
  methods: {
    getToday () {
      return new Date().getDate();
    }
  }
}
</script>

<style lang="scss" scoped>
.find-source {
  .find-selector-items {
    display: flex;
    justify-content: space-between;
    margin: .15rem 0;
    padding: 0 .15rem;
    box-sizing: border-box;
    .find-selector-item {
      width: .5rem;
      .item-icon {
        width: 100%;
        height: .5rem;
        color: #ffffff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: .12rem;
        box-sizing: border-box;
        &.daily-recommend {
          background: #dd3939 url("../assets/images/daily_canendar.svg") 50% 50% no-repeat;
          background-size: 70%;
        }
        &.song-list {
          background: #dd3939 url("../assets/images/music.svg") 50% 50% no-repeat;
          background-size: 60%;
        }
        &.rank-list {
          background: #dd3939 url("../assets/images/ranklist.svg") 50% 50% no-repeat;
          background-size: 60%;
        }
        &.radio {
          background: #dd3939 url("../assets/images/radio.svg") 50% 50% no-repeat;
          background-size: 60%;
        }
      }
      .item-text {
        margin-top: .05rem;
        color: #333333;
        text-align: center;
        font-size: .12rem;
      }
    }
  }
}
</style>