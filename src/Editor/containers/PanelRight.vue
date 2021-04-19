/**
* Created by OXOYO on 2019/7/2.
*
* PanelRight 右侧面板
*/

<style scoped lang="less" rel="stylesheet/less"></style>

<template>
  <CardBox
    v-if="isEnablePanel"
    placement="right"
    position="left"
    :width="360"
    :title="$t('L10100')"
    @expand="toggleHandler"
  >
    <CardItem v-if="isEnableOptions" :title="$t('L10101')" :enableFold="true" :bold="true">
      <Options :editorConfig="editorConfig" :toolList="toolList" :currentItem="currentItem"></Options>
    </CardItem>
    <CardItem title="属性设置" :enableFold="true" :bold="true">
      <Details :editorConfig="editorConfig" :toolList="toolList" :currentItem="currentItem" :originDataObj='originDataObj' :eventItem='eventItem' :mode = 'mode'></Details>
    </CardItem>
  </CardBox>
</template>

<script>
  import CardBox from '../components/CardBox'
  import CardItem from '../components/CardItem'
  import Options from '../components/Options'
  import Details from '../containers/Details'

  export default {
    name: 'PanelRight',
    components: {
      CardBox,
      CardItem,
      Options,
      Details
    },
    props: {
      editorConfig: Object,
      toolList: Array,
      currentItem: Array,
      originDataObj: Object,
      eventItem: Object,
      mode: [String,Object]
    },
    computed: {
      infoPanel () {
        return this.$X.config.infoPanel
      },
      isEnableOptions () {
        return this.infoPanel.options.enable
      },
      isEnableNavigator () {
        return this.infoPanel.navigator.enable
      },
      isEnablePanel () {
        return this.isEnableOptions || this.isEnableNavigator
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
