<template>

  <el-dialog
    title="保存拓扑"
    :visible="show"
    :destroy-on-close='true'
    width="398px"
    @close='close'
  >
    <template>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="项目名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="版本">
          <el-input v-model="form.version"></el-input>
        </el-form-item>
      </el-form>

    </template>

    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>

  </el-dialog>

</template>

<script>
  import {
    uploadjson
  } from '../../../src/api/svg'
  export default {
    name: 'saveGUI',
    props: ['show', 'getJsonData', 'jsonData'],
    methods: {
      onSubmit () {
        console.log(this.jsonData)
        let params = {}
        let success = '保存成功'
        let fail = '保存失败'
        // 新增或者另存为
        if (Object.entries(this.jsonData).length) {
          // 另存为
          if (this.jsonData.action === 2) {
            params = this.jsonData
            success = '另存为成功'
            fail = '另存为失败'
          }
        } else {
          const jsonData = this.getJsonData()
          params = { jsonData, action: 0 }
        }
        uploadjson({ ...params, ...this.form }).then((res) => {
          this.$message.success(`${success}`)
          const topologyId = res.topologyId
          this.$emit('getTopologyId', topologyId)
          this.close()
        }).catch(() => {
          this.$message.error(`${fail}`)
        })
      },
      close () {
        this.$emit('update:show', false)
      }
    },
    data () {
      return {
        form: {
          userId: 1,
          projectId: 0
          // 0 新建 1覆盖 2 另存为
          /* action: '',
          name: '',
          version: '',
          jsonData: '' */
        }
      }
    }
  }
</script>

<style scoped>

</style>
