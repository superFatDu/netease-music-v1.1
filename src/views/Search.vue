<template>
  <div class="search">
    <div class="top-header">
      <back-header>
        <input type="text" class="search-info" v-model="searchInfo" :placeholder="searchDefault">
        <i class="search-btn"></i>
      </back-header>
    </div>
    <div class="search-history"></div>
    <div class="search-hot">
      <p class="hot-title">热搜榜</p>
      <table>
        <tr v-for="(item, index) of hotList" :key="item.searchWord">
          <td>{{index + 1}}</td>
          <td>
            <p>{{item.searchWord}}<span :class="{'hot': item.iconType === 1, 'new': item.iconType === 2}">{{item.iconType === 1 ? 'HOT' : item.iconType === 2 ? 'NEW' : ''}}</span></p>
            <p>{{item.content}}</p>
          </td>
          <td>{{item.score}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import BackHeader from '../components/BackHeader.vue'
import { SEARCH } from '../fetch/api'
export default {
  name: 'Search',
  components: {
    BackHeader
  },
  data() {
    return {
      searchInfo: '',
      searchDefault: '',
      hotList: []
    }
  },
  methods: {
    ini() {
      this.getDefault()
      this.getHotList()
    },
    getDefault() {
      SEARCH.getSearchDefault().then(res => {
        if (res.code === 200) {
          this.searchDefault = res.data.showKeyword;
        }
      })
    },
    getHotList() {
      SEARCH.getHotList().then(res => {
        if (res.code === 200) {
          this.hotList = res.data;
        }
      })
    }
  },
  created() {
    this.ini()
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  box-sizing: border-box;
  padding-top: .55rem;
  .top-header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #ffffff;
    .search-info {
      flex: 1;
      height: 70%;
      box-sizing: border-box;
      border-bottom: 1px solid #333;
      font-size: 16px;
      color: #333;
    }
    .search-btn {
      display: inline-block;
      width: .33rem;
      height: .33rem;
      background: url("../assets/images/back-search.svg") 50% 50% no-repeat;
      background-size: 100%;
      margin-left: .15rem;
    }
  }
  .search-hot {
    width: 100%;
    box-sizing: border-box;
    padding: 0 .15rem;
    .hot-title {
      font-size: 14px;
      font-weight: bold;
      margin: .2rem 0 .1rem 0;
    }
    table {
      width: 100%;
      table-layout: fixed;
      tr {
        height: .8rem;
        td {
          &:first-child {
            width: .4rem;
            color: #999999;
          }
          &:last-child {
            color: #c7c7c7;
            width: .7rem;
            text-align: right;
          }
          p {
            &:first-child {
              font-size: 16px;
              padding-bottom: .05rem;
              span {
                font-style: italic;
                margin-left: .07rem;
                &.hot {
                  color: red;
                  font-weight: bold;
                }
                &.new {
                  color: green;
                  font-weight: bold;
                }
              }
            }
            &:last-child {
              color: #c7c7c7;
              overflow: hidden;
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
        &:nth-child(1) td:nth-child(1),
        &:nth-child(2) td:nth-child(1),
        &:nth-child(3) td:nth-child(1) {
          color: red;
        }
        &:nth-child(1) td:nth-child(2) p:first-child,
        &:nth-child(2) td:nth-child(2) p:first-child,
        &:nth-child(3) td:nth-child(2) p:first-child {
          font-weight: bold;
        }
      }
    }
  }
}
</style>