<template>
  <div>
    <el-card style="width: 560px;height: 150px; margin: 10px ;display: flex; align-items: center;justify-content: center">
      <el-descriptions :column="1" >
        <el-descriptions-item label="模型路径">
          <el-input v-model="modelPath" style="width: 400px;" :disabled="disabled">
            <template #append>
              <el-button icon="Edit" @click="edit"> </el-button>
            </template>
          </el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <div style="display: flex; align-items: center" >
            <span style="margin-right: 10px; width: 40px" >缩放</span>
            <el-slider v-model="modelSize" :step="0.05" :min="0.1" :max="2" style="width: 400px"></el-slider>
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <el-button icon="Check" @click="certain" style="width: 100%" type="primary"></el-button>
    </el-card>

  </div>
</template>

<script>

import fs from "fs";

export default {
  name: "ConfigView",

  created() {
    let configPath = window.ipcRenderer.sendSync('getModelPath')
    let data = fs.readFileSync(configPath)
    data = JSON.parse(data)
    this.modelSize = data.scale
    this.modelPath = data.path
  },
  data() {
    return {
      modelSize:0.2,
      modelPath:'',
      disabled: true,
    }
  },
  methods: {
    edit() {
      this.disabled = false
    },
    certain() {
      let config ={
        path: this.modelPath,
        scale: this.modelSize
      }
      let configPath = window.ipcRenderer.sendSync('getModelPath')
      fs.writeFileSync(configPath, JSON.stringify(config))
      window.ipcRenderer.send('config-relaunch')
      this.disabled = true
    },
    changeModel() {
    }
  }
}
</script>

<style scoped>

</style>