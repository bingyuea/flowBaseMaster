/**
* Created by OXOYO on 2019/7/2.
*
* PanelRight 右侧面板
*/

<style scoped lang="less" rel="stylesheet/less">
  .panelRight {
    width: 100px;
    right: 0px;
    background: #fff;
    overflow: hidden;
    box-sizing: border-box;
    display: inline-block;
    position: absolute;
    top: 84px;
    height: 500px;
    -webkit-box-shadow: 0 0 2px 2px rgb(0 0 0 / 10%);
    z-index: 200;
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    box-shadow: 0px 0px 10px 5px;
    padding: 10px;

    &_title {
      font-size: 16px;
      text-align: center;
      border-bottom: 1px solid #000000;
    }

    &_content {
      height: calc(100% - 30px);
      overflow-y: auto;

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 5px rgb(78 78 78 / 20%);
        background: hsla(0, 0%, 79%, .8);
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &_item {
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      .toolbarIcon {
        width: 35px;
        height: 35px;
        margin-top: 15px;
        padding: 2px;
        background-size: cover;
        border: 1px solid transparent;

        &:hover {
          border-color: rgba(0, 0, 0, .1);
          cursor: pointer;
        }
      }
    }
  }
</style>

<template>
  <div class='panelRight'>
    <div class='panelRight_title'>{{title}}</div>
    <div class="panelRight_content">

      <div v-if='toolbarIcon' class="panelRight_content_item">
        <img v-for='(item,key) in toolbarIcon' :key='key' class='toolbarIcon'
             :src='item.icon ? require(`../../assets/images/toolbar/${item.icon}.png`) : ""'
             alt=""/>
      </div>
      <PanelLeft v-else :materialList='materialList'></PanelLeft>
    </div>

  </div>
</template>

<script>
  import PanelLeft from './PanelLeft'

  export default {
    name: 'PanelRight',
    components: {
      PanelLeft
    },
    props: {
      editorConfig: Object,
      toolList: Array,
      currentItem: Array,
      originDataObj: Object,
      eventItem: Object,
      toolbarInfo: Object,
      materialList: Array
    },
    computed: {
      toolbarIcon () {
        if (this.toolbarInfo && this.toolbarInfo.item && this.toolbarInfo.item.child) {
          return this.toolbarInfo.item.child
        }
        return null
      },
      title () {
        if (this.toolbarInfo && this.toolbarInfo.item && this.toolbarInfo.item.icon) {
          return this.toolbarInfo.item.icon === '绘图模式' ? '元件库' : this.toolbarInfo.item.icon
        }
        return '元件库'
      }
    },
    methods: {
      toggleHandler (data) {
        const _t = this
        _t.$X.utils.bus.$emit('editor/panel/toggle', data)
      }
    }
  }
</script>
