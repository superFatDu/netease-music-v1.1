<template>
  <div class="index-swipper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for='(item,index) in banners' :key='index' class="swiper-slide">
          <div class="iSlide">
            <img class="img" :src="item.pic">
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import { SWIPPER_BANNER } from '../fetch/api'
import Swiper from 'swiper'

export default {
  name: 'IndexSwipper',
  data () {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true,
        autoplay: true,
        effect : 'fade',
        fadeEffect: {
          crossFade: true
        }
      },
      banners: []
    }
  },
  methods: {
    initSwipper () {
      this.swiper = new Swiper('.swiper-container', {
        loopAdditionalSlides: 1,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination"
        },
        observer: true,
        observeParents: true
      });
    }
  },
  created () {
    SWIPPER_BANNER.getBanner({ type: 1 })
      .then(res => {
        if (res.code === 200) {
          this.banners = res.banners;
          this.$nextTick(() => {
            this.initSwipper()
          })
        }
      })
  }
}
</script>

<style lang="scss">
.index-swipper {
  width: 100%;
  border-radius: .1rem;
  overflow: hidden;
  .swiper-container {
    img {
      width: 100%;
    }
  }
}
.swiper-pagination-bullet-active {
  background: #d21e1e;
}
</style>