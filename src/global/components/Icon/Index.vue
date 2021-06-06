/**
* Created by OXOYO on 2019/5/29.
*
* Icon
*/

<style scoped lang="less" rel="stylesheet/less">
  .icon {
    display: flex;
    align-items: center;
    height: 100%;
    .iconfont {}
    .label {}
    .toolbarIcon {
      width: 16px;
      height: 16px;
      display: inline-block;
      background-size: cover;
    }
  }
</style>

<template>
  <div class="icon" :title="title">
    <div v-if="iconfont" class="iconfont" :class="[iconfont ? 'xfv-icon-' + iconfont : '']"></div>
    <img v-else-if="img" class  = 'toolbarIcon' :src='require(`../../../assets/images/toolbar/${img}.png`)' alt=""/>
    <div v-else class="label">{{ label }}</div>
  </div>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      iconfont: String,
      img: String,
      label: String,
      title: String
    }
  }
</script>
