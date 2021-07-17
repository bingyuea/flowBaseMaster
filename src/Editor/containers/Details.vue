/**
* Created by OXOYO on 2019/7/1.
*
*/

<style scoped lang="less" rel="stylesheet/less">
  .nodeDetails {
    width: calc(100% - 20px);
    box-sizing: content-box;
    padding: 0 10px;
    padding-top: 10px;
    height: 500px;
    overflow-y: auto;

    .el-form-item {
      margin-bottom: 5px;
    }

    .el-tabs__content {
      .el-tab-pane {
        height: 440px;
        overflow: auto;
      }
    }

  }
</style>

<template>
  <div class="nodeDetails">
    <el-tabs v-model='activeName'>
      <el-tab-pane :label="objKey" :name="objKey" v-for="(list,objKey) in originData" :key='objKey'>
        <el-form :model="form" label-width="100px" label-position="top">

          <el-form-item label="idx" prop="idx" class='el-form-details'>
            <el-input disabled v-model="idx"></el-input>
          </el-form-item>

          <el-form-item v-for='(item,key) in list' :key='key' :prop="item.name"
                        class='el-form-details el-form-details-list'>
              <div :label="item.name" :prop="item.name" class='el-form-item__label'>
                {{ item.name }}
                <el-tooltip slot="label" v-show='item.description' effect="dark" :content="item.description"
                            placement="top">
                  <i
                    class="el-icon-question el-input__icon"
                  >
                  </i>
                </el-tooltip>
              </div>

              <el-input :disabled="preview" v-model="item.defaultValue" :placehold='item.description'>
                <template slot="append">{{ item.unit }}</template>
              </el-input>

          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        activeName: 'CCS',
        form: {
          idx: ''
        },
        originData: {},
        firstItem: null,
        watchFlag: false,
        preview: false
      }
    },
    name: 'Details',
    props: {
      editorConfig: Object,
      mode: [String, Object],
      toolList: Array,
      currentItem: Array,
      originDataObj: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      onSubmit () {
        const _t = this
        if (_t.currentItem.length) {
          const model = _t.currentItem[0]
          const params = {
            form: { ...this.form, name: this.currentShape, sheetName: this.sheetName },
            originData: this.originData,
            originId: this.originDataObj.originId || ''
          }
          if (!model.params || JSON.stringify(model.params) !== JSON.stringify(params)) {
            _t.currentItem[0].model.params = {}
            _t.currentItem[0].model.params = params
          }
        }
        console.log(this.form, this.originData, '--------------')
        // 广播事件
        _t.$X.utils.bus.$emit('editor/currentItem/update', _t.currentItem)
      }
    },
    watch: {
      currentItem: {
        handler (val) {
          const _t = this
          // 取第一个节点
          _t.firstItem = val[0]
          if (_t.firstItem && _t.firstItem.model.params) {
            const params = JSON.parse(JSON.stringify(_t.firstItem.model.params))
            this.watchFlag = true
            this.form = params.form
            this.$set(this, 'originData', params.originData)
          } else {
            this.watchFlag = false
            _t.form = {}
            _t.originData = {}
          }
        },
        deep: true
      },
      originDataObj: {
        handler (val) {
          if (val && !this.watchFlag) {
            this.originData = val.originData
          }
        },
        deep: true,
        immediate: true
      },
      mode (val) {
        this.preview = val === 'preview'
      }
    },
    computed: {
      idx () {
        const idx = JSON.parse(this.originDataObj.model).idx
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.form.idx = idx
        return idx
      },
      currentShape () {
        const model = JSON.parse(this.originDataObj.model)
        if (model.name) return model.name
        return '--'
      },
      sheetName () {
        const model = JSON.parse(this.originDataObj.model)
        if (model.sheetName) return model.sheetName
        return '--'
      }
    }
  }
</script>
