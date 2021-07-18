<template>
  <el-dialog
    title="上传文件"
    :visible="show"
    :destroy-on-close='true'
    width="398px"
    @close = 'close'
  >
    <el-upload
      class="upload-demo"
      drag
      :on-change="onFileChange"
      :on-error="onError"
      :on-success="onUploaded"
      :action="action"
      v-loading="loading"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传8M以内的文件</div>
    </el-upload>

    <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'upload',
    props: ['show'],
    data () {
      return {
        loading: false
      }
    },
    computed: {
      action () {
        return 'file/upload'
      }

    },
    methods: {
      onFileChange (file) {
        // const type = file.raw.type

        /* if (type !== 'image/jpeg' && type !== 'image/png') {
          this.$message.error('上传图片必须为png或者jpeg格式')
          return
        } */

        const isLt2M = file.size / 1024 / 1024 < 8
        if (!isLt2M) {
          this.$message.error('上传图片不能超过 8MB!')
          return
        }
        this.fileList = file.status === 'fail' ? [] : [file]
      },
      onUploaded (res) {
        console.log(res)
      },
      async onError (res) {
        this.loading = false
        this.$message.error(`上传失败,请重选后重新上传`)
        await this.$nextTick()
      },
      close () {
        this.$emit('update:show', false)
      }
    }
  }
</script>

<style scoped>

</style>
