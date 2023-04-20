<template>
  <div>
    <el-button class="close" icon="Close" @click="clickClose" text ></el-button>
  </div>
</template>

<script>
export default {
  name: "Close",
  methods: {
    clickClose() {
      window.ipcRenderer.send('close-main-control')
    },
  }
}
</script>

<style scoped>
.close{
  position: relative;
  left: 97%;
  bottom: 20px;
  font-size: 25px;
  color: #606060;
}
</style>