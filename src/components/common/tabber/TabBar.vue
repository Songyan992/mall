<template>
  <div id='tab-bar'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  components:{

  }
}
</script>

<style>

#tab-bar{
  display: flex;
  background: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  box-shadow: 0px -1px 1px rgba(100, 100, 100, .2)
}
.tab-bar-item{
  flex: 1;
  /* text-align: center; */
  height: 49px;
  /* line-height: 49px; */
}
.tab-bar-item img{
  width: 25px;
  height: 25px;
}
</style>
