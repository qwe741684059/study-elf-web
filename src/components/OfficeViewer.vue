<template>
  <div id="onlyOffice" style="height: 1000px"></div>
</template>


<script>


export default{
  name: 'ExampleComponent',
  data() {
    return {
      docEditor:null,
      option:{}
    }
  },
  created() {

  },
  mounted() {
    window.ipcRenderer.on('officeData', ((event, args) => {
      this.option = {
        fileType: args[0],
        title: args[1],
        url: args[2],
        documentType: args[3]
      }
      this.setEditor(this.option)
    }))


  },

  methods: {
    async setEditor(option) {
      let config = {
        document: {
          fileType:option.fileType,
          title:option.title,
          permissions: {
            edit:false
          },
          url:option.url
        },
        documentType: option.documentType
      }
      this.docEditor = new DocsAPI.DocEditor('onlyOffice', config)
    }
  }
}
</script>

<style scoped>


</style>