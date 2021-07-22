/**
* Created by OXOYO on 2019/7/2.
*
* PanelLeft 左侧面板
*/

<style scoped lang="less" rel="stylesheet/less">
  .panel-left {
    width: 112px;
    left: 0px;
    background: #fff;
    overflow: hidden;
    box-sizing: border-box;
    display: inline-block;
    position: absolute;
    bottom: 0;
    top: 68px;
    -webkit-box-shadow: 0 0 2px 2px rgb(0 0 0 / 10%);
    z-index: 200;
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    box-shadow: 0px 0px 10px 5px;
    padding: 10px;
    .card-item {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
    }
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
  <div v-show = 'show' class="panel-left"  :width="250"  @expand="toggleHandler">
    <div class='panel-left_title'>元件库</div>
    <div class="panel-left_content">
    <div
      v-for="(item, index) in materials"
      :key="index"
      :title="$t(item.lang) || item.label"
      :enableFold="true"
      :bold="true"
    >
      <NodeElement
        v-for="(child, childIndex) in item.children.filter(target => target.enable)"
        :key="childIndex"
        :title="child.label"
        :info="child"
      >
      </NodeElement>
    </div>
    </div>
  </div>
</template>

<script>
  import NodeElement from '../components/NodeElement'

  export default {
    name: 'PanelLeft',
    components: {
      NodeElement
    },
    props: {
      materialList: Array,
      toolbarInfo: Object
    },
    mounted () {
      console.log(this.toolbarInfo)
    },
    computed: {
      materials () {
        return this.materialList
      },
      show () {
        if (this.toolbarInfo && this.toolbarInfo.item && this.toolbarInfo.item.icon) {
          return this.toolbarInfo.item.icon === '绘图模式'
        }
        return true
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
