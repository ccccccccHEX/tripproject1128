<template>
  <div class="search-box">
    <!-- 当前位置 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick">{{currentCity.cityName}}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>
  

<!-- 入住离店 -->
  <div class="section date-range bottom-gray-line " @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </div>
    <van-calendar
     v-model:show="showCalendar"
     type="range"
      @confirm="onConfirm"
      color="#ff9854" 
      :round="false"
      />

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>



        <!-- 热门建议 -->
        <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div 
          class="item"
          :style="{ color: item.tagText.color, background: item.tagText.background.color }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>


    <!-- 搜索按钮 -->
    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>


  </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import { useRouter } from 'vue-router';
import useCityStore from "@/stores/modules/city"
import {storeToRefs} from 'pinia'
import {formatMonthDay,getDiffDays} from "@/utils/format_date.js"
import useHomeStore from "@/stores/modules/search.js"
import useMainStore from '@/stores/modules/main';





//当前位置信息获取
function positionClick(){
    navigator.geolocation.getCurrentPosition((res)=>{
        console.log("获取位置成功：",res)
    },err => {
        console.log("获取位置失败：",res)
    }
    )
}

//跳转到自选地区信息页面
const router = useRouter()
function cityClick(){
    router.push("/city")
}


//获取 从地区信息页面 传到store上的信息
const cityStore = useCityStore()
const { currentCity} = storeToRefs(cityStore)

//默认进店离店时间
const mainStore = useMainStore()
const {startDate,endDate } = storeToRefs(mainStore)

const startDateStr  = computed(()=>formatMonthDay(startDate.value))
const endDateStr  = computed(()=>formatMonthDay(endDate.value))

// const stayCount = ref(1)
const stayCount = ref(getDiffDays(startDate.value,endDate.value))

//选择进店离店时间
const showCalendar = ref(false)
function onConfirm(value){
  // startDate.value = formatMonthDay(value[0])
  // endDate.value = formatMonthDay(value[1])
  // stayCount.value  = getDiffDays(value[1],value[0])

  const selectStartDate = value[0]
  const selectEndDate = value[1]

  mainStore.startDate = selectStartDate
  mainStore.endDate = selectEndDate

  stayCount.value  = getDiffDays(selectEndDate,selectStartDate)

  showCalendar.value = false
}

//热门建议
const homeStore = useHomeStore()
const {hotSuggests} = storeToRefs(homeStore)



// 搜索按钮

function searchBtnClick(){
  router.push({
    path:"/search",
    query:{
      startDate:startDate.value,
      endDate:endDate.value,
      currentCity:currentCity.value.cityName
    }
  })
}













</script>

<style lang="less" scoped>
.search-box{
  --van-calendar-popup-height:100%;
}
.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.location{
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city{
    flex: 1;
  }

  .position{
    width: 74px;
    display: flex;
    align-items: center;
    .text{
      
      font-size: 12px;
    }


    img{
      position: relative;
      bottom: 2px;
      margin-left: 5px;
      width: 15px;
      height: 15px;
    }
  }
}

.price-counter {
  .start {
    border-right: 1px solid  var(--line-color);
  }
}


.hot-suggests {
  margin: 10px 0;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}

</style>