/**
* Created by OXOYO on 2019/7/2.
*
* PanelLeft 左侧面板
*/

<style scoped lang="less" rel="stylesheet/less">
  .panel-left {
    .card-item {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
    }
  }
</style>

<template>
  <div class="panel-left"  :width="250"  @expand="toggleHandler">
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
</template>

<script>
  import CardItem from '../components/CardItem'
  import NodeElement from '../components/NodeElement'

  export default {
    name: 'PanelLeft',
    components: {
      CardItem,
      NodeElement
    },
    props: {
      materialList: Array
    },
    data () {
      return {}
    },
    computed: {
      materials () {
        return this.materialList
      }
    },
    mounted () {
      console.log(this.materialList)
    },
    methods: {
      toggleHandler (data) {
        const _t = this
        _t.$X.utils.bus.$emit('editor/panel/toggle', data)
      }
    }
  }
</script>
