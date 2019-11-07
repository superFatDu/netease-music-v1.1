<template>
  <div class='top-header'>
    <ul>
      <li v-for="(item, index) of topList" :key="index">
        <i v-if="item.type === 'icon'" :class="[item.type,item.name]"  @click="handleTop(item, index)"></i>
        <span v-if="item.type === 'text'" :class="[item.type, index === actived ? 'active' : '']" @click="handleTop(item,index)">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'TopHeader',
    data () {
      return {
        topList: [
          {
            type: 'icon',
            name: 'icon-menu',
            path: ''
          },
          {
            type: 'text',
            name: '我的',
            path: '/home/my'
          },
          {
            type: 'text',
            name: '发现',
            path: '/home/find'
          },
          {
            type: 'text',
            name: '云村',
            path: ''
          },
          {
            type: 'icon',
            name: 'icon-search',
            path: '/search'
          }
        ],
        actived: 2
      }
    },
    methods: {
      ini () {
        let path = this.$route.path;
        path.includes('my') ? this.actived = 1 : path.includes('find') ? this.actived = 2 : '';
      },
      handleTop (opt, idx) {
        switch (idx) {
          case 0:
            break;
          case 1:
          case 2:
          case 3:
            this.actived = idx;
            this.$router.push({
              path: opt.path
            })
            break;
          case 4:
            this.$router.push({
              path: opt.path
            })
            break;  
        }
      }
    },
    created () {
      this.ini();
    }
  }
</script>

<style lang='scss' scoped>
.top-header {
  height: .55rem;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      i {
        display: inline-block;
        width: .27rem;
        height: .27rem;
        &.icon-menu {
          background: url("../assets/images/menu.svg") 50% 50% no-repeat;
          background-size: 100%;
        }
        &.icon-search {
          width: .23rem;
          height: .23rem;
          background: url("../assets/images/search.svg") 50% 50% no-repeat;
          background-size: 100%;
        }
      }
      span {
        font-size: .17rem;
        color: #2c2c2c;
        transition: all .25s ease;
        &.active {
          font-weight: bold;
          font-size: .2rem;
        }
      }
    }
  }
}
</style>