/**
* Created by OXOYO on 2019/7/2.
*
* PanelRight 右侧面板
*/

<style scoped lang="less" rel="stylesheet/less">

.el-tabs {
  height: 100%;

  .content {
    .toolbarIcon {
      width: 25px;
      height: 25px;
      display: inline-block;
      background-size: cover;
      margin-right: 5px;
    }
  }
}
</style>

<template>
  <CardBox
    v-if="isEnablePanel"
    placement="right"
    position="left"
    :width="360"
    :title="$t('L10100')"
    @expand="toggleHandler"
  >

    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="元件设备" name="first">
        <PanelLeft :devices='materialList'></PanelLeft>
        <CardItem v-if="isEnableOptions" :title="$t('L10101')" :enableFold="true" :bold="true">
          <Options :editorConfig="editorConfig" :toolList="toolList" :currentItem="currentItem"></Options>
        </CardItem>
      </el-tab-pane>
      <el-tab-pane label="配置" name="second">
        <CardItem title="属性设置" :enableFold="true" :bold="true">
          <Details :editorConfig="editorConfig" :toolList="toolList" :currentItem="currentItem"
                   :originDataObj='originDataObj' :eventItem='eventItem'></Details>
        </CardItem>
      </el-tab-pane>
      <el-tab-pane :label="toolbarInfo && toolbarInfo.item && toolbarInfo.item.icon" name="three">
        <div class="content" title="title" v-if='toolbarInfo.item && toolbarInfo.item.child'>
<!--          <img v-for='(item,key) in toolbarInfo.item.child' :key='key' class='toolbarIcon'
               :src='item.icon ? require(`../../../assets/images/toolbar/${item.icon}.png`) : ""' alt=""/>-->
        </div>
      </el-tab-pane>
    </el-tabs>

  </CardBox>
</template>

<script>
  import CardBox from '../components/CardBox'
  import CardItem from '../components/CardItem'
  import Options from '../components/Options'
  import Details from '../containers/Details'
  import PanelLeft from './PanelLeft'

  export default {
    name: 'PanelRight',
    components: {
      CardBox,
      CardItem,
      Options,
      Details,
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
      },
      activeName: {
        get () {
          if (Object.entries(this.toolbarInfo).length) return 'three'
          return 'first'
        },
        set (val) {
          return val
        }
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
