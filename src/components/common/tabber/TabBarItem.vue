<template>
    <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive">
        <slot name="item-icon"></slot>
      </div>
      <div v-else>
        <slot name="item-icon-active"></slot>
      </div>
      <div :style="activeStyle">
        <slot name="item-text"></slot>
      </div>

    </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data(){
    return {
    }
  },
  methods:{
    // 切换路由
    itemClick(){
      this.$router.replace(this.path)
      console.log('itemClick')
    }
  },
  computed:{
    // 判断是否活跃状态
    isActive(){
      return this.$route.path.indexOf(this.path)!==-1
    },
    // 根据活跃状态改变颜色
    activeStyle(){
      return this.isActive?{color:this.activeColor}:{}
    }
  },
  components:{
  }
}
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 25px;
    height: 25px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  /* .active{
  } */
</style>
