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
  height: 200px;
  overflow-y: auto;

  .el-form-item {
    margin-bottom: 5px;
  }

  .el-form-details-list{
    .el-form-item__label{
      position: absolute;
      left: 30px;
    }
    ::v-deep .el-form-item__content{
      margin-left: 0 !important;
      padding-left: 100px;
    }
  }
}
</style>

<template>
  <div class="nodeDetails">
    <el-form :model="form" label-width="100px">

      <el-form-item label="设备名称" prop="name" class='el-form-details'>
        <el-input disabled v-model="currentShape"></el-input>
      </el-form-item>

      <el-form-item label="设备类型" prop="tagName" class='el-form-details'>
        <el-select
          v-model="form.tagName"
          :disabled="preview"
          style='width:100%'
          clearable
        >
          <el-option
            v-for="item in tagNameList"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="模型类型" prop="modelName" class='el-form-details'>
        <el-select
          v-model="form.modelName"
          :disabled="preview"
          style='width:100%'
          clearable
        >
          <el-option
            v-for="item in modelNameList"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="视在功率" prop="name" class='el-form-details'>
        <el-input disabled placeholder='请输入视在功率' v-model="test1"></el-input>
      </el-form-item>

      <el-form-item label="额定功率" prop="name" class='el-form-details'>
        <el-input disabled placeholder='请输入额定功率' v-model="test2"></el-input>
      </el-form-item>

      <el-form-item v-for='(item,key) in paramList' :key='key' :prop="item.name" class='el-form-details el-form-details-list'>
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
          <template v-if='item.unit' slot="append">{{ item.unit }}</template>
        </el-input>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

  export default {
    data () {
      return {
        form: {
          tagName: '',
          modelName: ''
        },
        test1: '',
        test2: '',
        paramList: [],
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
      },
      eventItem: {
        type: Object,
        default: () => {
          return {
            _cfg: {
              currentShape: ''
            }
          }
        }
      }
    },
    methods: {
      onSubmit () {
        // this.$X.utils.bus.$emit('submit', { form: this.form, paramList: this.paramList })
        const _t = this
        if (_t.currentItem.length) {
          const model = _t.currentItem[0]
          const params = { form: this.form, paramList: this.paramList, originId: this.originDataObj.originId || '' }
          if (!model.params || JSON.stringify(model.params) !== JSON.stringify(params)) {
            _t.currentItem[0].model.params = {}
            _t.currentItem[0].model.params = params
          }
        }
        console.log(this.form, this.paramList)
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
            this.paramList = params.paramList
          } else {
            this.watchFlag = false
            _t.form = {}
            _t.paramList = []
          }
        },
        deep: true
      },
      modelList: {
        handler (val) {
          if (val && val.paramList && !this.watchFlag) {
            this.paramList = this.modelList.paramList
          } else {
            this.paramList = []
          }
        },
        deep: true
      },
      mode (val) {
        this.preview = val === 'preview'
      }
    },
    computed: {
      originData () {
        return this.originDataObj.originData || []
      },
      tagNameList () {
        return this.originData.map(item => {
          return {
            label: item.tagName,
            value: item.tagName
          }
        })
      },
      tagModelList () {
        if (this.form.tagName && this.originData.length) {
          return this.originData.filter(item =>
            item.tagName === this.form.tagName
          )[0] || {}
        } else {
          return {}
        }
      },
      modelNameList () {
        if (this.tagModelList && this.tagModelList.tagModel) {
          return this.tagModelList.tagModel.map(item => {
            return {
              label: item.modelName,
              value: item.modelName
            }
          })
        }
        return []
      },
      modelList () {
        if (this.form.modelName && this.tagModelList.tagModel && this.tagModelList.tagModel.length) {
          return this.tagModelList.tagModel.filter(item =>
            item.modelName === this.form.modelName
          )[0] || {}
        } else {
          return {}
        }
      },
      currentShape () {
        if (this.eventItem._cfg && this.eventItem._cfg.currentShape) {
          return this.eventItem._cfg.currentShape
        } else {
          return '--'
        }
      }
    }
  }
</script>
