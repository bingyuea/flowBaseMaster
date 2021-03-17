/**
* Created by OXOYO on 2019/7/2.
*
* NodeElement 节点元素
*/

<style scoped lang="less" rel="stylesheet/less">
  .node-element {
    text-align: center;
    margin: 2px;
    border: 1px solid transparent;

    &:hover {
      border-color: rgba(0, 0, 0, .1);
      cursor: move;
    }
    .content {
      display: inline-block;
      width: 100%;
      height: 100%;

      .icon {
        left: 1px;
        top: 1px;
        text-align: center;
        width: 100%;
        height: 30px;
        display: block;
        position: relative;
        overflow: hidden;
      }
    }
  }
</style>

<template>
  <div
    class="node-element"
    :style="elementStyle"
    @mousedown="handleMouseDown"
  >
    <div class="content" :title="title">
      <img class="icon" :src="info.img" />
      <div>{{info.label}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NodeElement',
    props: {
      title: {
        type: String,
        required: true
      },
      info: {
        type: Object,
        required: true,
        default () {
          return {
            type: 'circle',
            label: 'circle',
            enable: true,
            width: 40,
            height: 40,
            anchorPoints: [ [0, 0], [0, 1], [1, 0], [1, 1] ],
            svg: ``
          }
        }
      },
      width: {
        type: Number,
        default: 40
      },
      height: {
        type: Number,
        default: 60
      }
    },
    computed: {
      elementStyle () {
        const _t = this
        const style = {}
        if (_t.width) {
          // style.width = _t.width + 'px'
        }
        if (_t.height) {
          style.height = _t.height+ 'px'
        }
        return style
      }
    },
    methods: {
      handleMouseDown (event) {
        const _t = this
        _t.$X.utils.bus.$emit('editor/add/node', _t.info)
      }
    }
  }
</script>
