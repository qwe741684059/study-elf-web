<template>
  <div>
    <el-card style="width: 600px">
      <el-descriptions :column="1">
        <el-descriptions-item label="模型路径">
          <el-input v-model="modelPath" style="width: 400px;">
            <template #append>
              <el-button-group>
                <el-button icon="Edit"></el-button>
                <el-button icon="Check"></el-button>
              </el-button-group>
            </template>
          </el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <div style="display: flex; align-items: center" >
            <span style="margin-right: 10px; width: 40px">缩放</span>
            <el-slider v-model="modelSize" :step="0.05" max="2" style="width: 400px"></el-slider>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "ConfigView",
  data() {
    return {
      modelSize:'',
      modelPath:'',
    }
  }
}
</script>

<style scoped>

</style>