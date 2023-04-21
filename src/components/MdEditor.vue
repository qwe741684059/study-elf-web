<template>
  <div id="vditor"></div>
</template>

<script>
import Vditor from 'vditor'
import "vditor/dist/index.css"
export default {
  name: "MdEditor",
  mounted() {
    this.myEditor = new Vditor('vditor', {
      value:'wysiwyg'
    })
  },
  data() {
    return {
      myEditor: {},
    }
  }
}
</script>

<style scoped>

</style>