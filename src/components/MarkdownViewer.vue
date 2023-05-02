<template>
  <el-scrollbar height="100%">
    <div id="vditor"></div>
  </el-scrollbar>

</template>

<script>
import Vditor from "vditor";
import 'vditor/dist/index.css'
import {selectMarkdownByMarkdownId, updateMarkdown} from "@/api/markdown";
import { ElNotification } from 'element-plus'
export default {
  name: "markdownViewer",
  data() {
    return {
      markdownEditor: {},
      markdown:{}
    }
  },
  mounted() {
    const _this = this

    window.ipcRenderer.on('markdownData', ((event, args) => {
      selectMarkdownByMarkdownId(args[1]).then((resp) => {
        _this.markdown = resp.data
        console.log(_this.markdown)
      }, setTimeout(()=> {
        _this.markdownEditor = new Vditor('vditor', {
          typewriterMode:true,
          value:_this.markdown.content,
          counter: { //计数
            enable: true,
            type:"markdown"
          },
          preview: { //预览设置
            delay: 1000,
            hljs: {
              style: 'github',
              lineNumber:true
            }
          },
          tab:'\t', //tab键
          toolbarConfig: {
            pin: true //是否固定工具栏
          },
          cache: {
            enable: false
          },
          mode:'wysiwyg',
          toolbar : [
            'emoji',
            'headings',
            'bold',
            'italic',
            'strike',
            'link',
            '|',
            'list',
            'ordered-list',
            'check',
            'outdent',
            'indent',
            '|',
            'quote',
            'line',
            'code',
            'inline-code',
            'insert-before',
            'insert-after',
            '|',
            'upload',
            {
              name:'save',
              hotkey:'⌘s',
              icon:'<svg t="1682234389680" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7021" width="200" height="200"><path d="M814.805 128a51.179 51.179 0 0 1 51.179 51.179V844.01a51.179 51.179 0 0 1-51.179 51.157H201.173a51.179 51.179 0 0 1-51.178-51.157V179.179A51.179 51.179 0 0 1 201.173 128h613.654zM329.024 434.837a51.093 51.093 0 0 1-51.179-51.093V179.157h-76.672v664.854h613.76V179.179H738.22v204.48a51.179 51.179 0 0 1-51.179 51.178H329.024z m0-51.093h357.995V179.157H329.024v204.587z m357.91 204.501a25.557 25.557 0 1 1 0.085 51.072H329.024a25.536 25.536 0 1 1 0-51.072h357.91z" fill="#333333" p-id="7022"></path></svg>',
              tipPosition:'s',
              tip:'保存',
              click(event, vditor) {
                _this.save()
              }
            },
            'table',
            '|',
            'undo',
            'redo',
            '|',
            'edit-mode',
            'content-theme',
            'code-theme',
            'export',
            {
              name: 'more',
              toolbar: [
                'fullscreen',
                'both',
                'preview',
              ],
            }],
        })
      },100))
      // _this.markdown.markdownId = args[1]
      // _this.markdown.userId = args[2]
      // _this.markdown.markdownName = args[3]
      // _this.markdown.content = args[0]
      // _this.markdown.markdownPath = args[4]
      // _this.markdown.markdownType = args[5]


    }))

  },

  methods: {
    save() {
      console.log(this.markdown)
      this.markdown.content = this.markdownEditor.getValue()
      updateMarkdown(this.markdown).then(function (resp) {
        ElNotification({
          title:'Success',
          message:'保存成功',
          type:'success',
          duration:2000
        })
      })
    }
  }
}
</script>

<style scoped>

</style>