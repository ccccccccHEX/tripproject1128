<template>
  <div class="city">
    <div class="top">
      <van-search shape="round"
    v-model="searchValue"
     placeholder="城市/区域/位置"
     show-action
     @cancel="cancelClick"
      />

      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="2">
        <template v-for="(value,key) in allCities " :key = "key">
            <van-tab :title="value.title" :name="key"></van-tab>
        
        </template>
        </van-tabs>
    </div>

    <div class="content">
      <template v-for="(value,key,index) in allCities" >
        <city-group v-show="tabActive === key" :group-data="value"/>
      </template>
     
    </div>

  </div>
</template>

<script setup>
import {computed , ref} from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from "@/stores/modules/city"
import {storeToRefs} from 'pinia'
import CityGroup from "./cpns/city-group.vue"

const router = useRouter()

const searchValue = ref("")

function cancelClick(){
    router.back()
}

const tabActive = ref()

const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

const currentGroup = computed(()=>allCities.value[tabActive.value])







</script>

<style lang="less" scoped>
 .city{

   .top{
    position: relative;
    z-index: 9;
   }


    .content{
      height : calc(100vh - 98px);
      overflow-y: auto;
    }



 }
</style>