<template>
  <div id='home'>
    <nav-bar class="home-nav"> <div slot="center">购物街</div></nav-bar>
    <scroll class="content"
     ref='scroll'
     :probe-type="3"
     :pull-up-load="true"
     @scroll="contentScroll"
     @pullingUp="loadMore">
      <home-swiper :banners='banners'></home-swiper>
      <home-recommend :recommend='recommend'></home-recommend>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']"
      @tabClick='tabClick'></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import HomeRecommend from "./childComps/HomeRecommend"
import FeatureView from "./childComps/FeatureView"

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/betterscroll/Scroll"
import BackTop from "components/content/backtop/BackTop"

import {getHomeMultidata,getHomeGoods} from "network/home"


export default {
  name: 'Home',
  components:{
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners:[],
      recommend:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:false
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
    /**
     * 事件相关方法
     */
    tabClick(index){
      switch(index){
        case 0:
          this.currentType='pop'
          break;
        case 1:
          this.currentType='new'
          break;
        case 2:
          this.currentType='sell'
          break;
      }
    },
    backTop(){
      console.log("====backTop===");
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      this.isShowBackTop=-position.y > 1000
    },
    loadMore(){
      console.log("====监听上拉事件===")
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.refresh()
    },

    /**
     * 网络请求相关
     */
    getHomeMultidata(){
    // 请求多个接口数据
      getHomeMultidata().then((result) => {
        // console.log('===result==',result)
        this.banners=result.data.banner.list
        this.recommend=result.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page =this.goods[type].page+1
      getHomeGoods(type,page).then((result) => {
        // console.log('===result==',result)
        this.goods[type].list.push(...result.data.list)
        this.goods[type].page+=1
        this.$refs.scroll.finishPullUp()
      }).catch((err) => {

      });
    }

  },

  created(){
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control{
  /* position: sticky; */
  top: 44px;
  background: #fff;
  /* z-index: 9; */
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content{
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 44px
} */
</style>

