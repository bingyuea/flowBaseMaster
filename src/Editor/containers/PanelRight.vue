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
  bottom: 0;
  top: 68px;
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
  <div class='panelRight' v-show="title">
    <div class='panelRight_title'>{{ title }}</div>
    <div class="panelRight_content">

      <div v-if='toolbarIcon' class="panelRight_content_item">
        <div v-for='(item,key) in toolbarIcon' :key='key'>


          <div v-if="item.parent === '短路计算' && item.icon === '三相接地短路'">
            <el-dropdown @command='(command) => handleCalc(item,command)'>
              <span class="el-dropdown-link">
                <img class='toolbarIcon'
                     :title="item.icon"
                     :src='item.icon ? require(`../../assets/images/toolbar/${item.icon}.png`) : ""'
                     alt=""/>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='CCS'>CCS标准</el-dropdown-item>
                <el-dropdown-item command='GJB'>GJB标准</el-dropdown-item>
                <el-dropdown-item command='GB'>GB标准</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <img v-else @click='handleCalc(item)' class='toolbarIcon'
               :title="item.icon"
               :src='item.icon ? require(`../../assets/images/toolbar/${item.icon}.png`) : ""'
               alt=""/>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PanelRight',
    props: {
      editorConfig: Object,
      toolList: Array,
      currentItem: Array,
      originDataObj: Object,
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
          return this.toolbarInfo.item.icon === '绘图模式' ? '' : this.toolbarInfo.item.icon
        }
        return ''
      }
    },
    methods: {
      toggleHandler (data) {
        const _t = this
        _t.$X.utils.bus.$emit('editor/panel/toggle', data)
      },
      handleCalc (item,command) {
        /* if (item.icon === '三相接地短路') {
         // 上传
         this.$emit('show', 'uploadShow')
         } */
        if (item.parent === '短路计算' && item.icon === '生成结果报告') {
          this.$emit('show', 'resultShow')
        }
        if (item.parent === '短路计算' && item.icon === '三相接地短路') {
          this.$emit('triggerTool', {
            context: 'ToolBar',
            data: 'upload',
            name: 'download',
            selected: 2,
            type: 'dropdown-list'
          })
        }
        // todo 不同的标准
        console.log(item,command)
      }
    }

  }
</script>
