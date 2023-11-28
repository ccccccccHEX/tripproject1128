import {defineStore} from "pinia"
import {getHomeHotSuggests,getHomeCategories,getHomeHouselist} from "@/services/index.js"

const useHomeStore = defineStore("home",{
    state:() =>({
        hotSuggests:[],
        categories:[],
        currentPage:1,
        houselist:[]
    }),
    actions:{
        async fetchHotSuggestData(){
            const res =await getHomeHotSuggests()
            this.hotSuggests = res.data
        },
        async fetchCategoriesData(){
            const res = await getHomeCategories()
            this.categories = res.data
        },
        async fetchHouselistData(currentPage){
            const res = await getHomeHouselist(this.currentPage++)
            this.houselist.push(...res.data)
        }
    }
})

export default useHomeStore