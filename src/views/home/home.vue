<template>
  <div class="home">
    <home-nav-bar></home-nav-bar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box />
    <home-categories />

    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="'09.19'" :end-date="'09.20'"/>
    </div>

    <home-content/>
    <!-- <button @click="moreBtnClick">加载更多</button> -->

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import HomeNavBar from './cpns/home-nav-bar.vue'
import  HomeSearchBox from './cpns/home-search-box.vue'
import HomeCategories from './cpns/home-categories.vue'
import useHomeStore from "@/stores/modules/search.js"
import homeContent from './cpns/home-content.vue'
import useScroll from '@/hooks/useScroll'
import { computed } from '@vue/reactivity';
import SearchBar from "@/components/search-bar/search-bar.vue"


//发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
let currentPage = 1
homeStore.fetchHouselistData(currentPage)


//加载更多按钮模拟
// function moreBtnClick(){
  
//   currentPage++
//   homeStore.fetchHouselistData(currentPage)
// }

const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 搜索框显示的控制
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop > 100
// })
// 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360
})



</script>

<style lang="less" scoped>

.home {
  padding-bottom: 60px;
}

.banner{
  img{
    width:100%;
  }
}


.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>