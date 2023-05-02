<template>
  <div>
    <el-card style="width: 560px;height: 120px; margin: 10px ;display: flex; align-items: center;justify-content: center">
      <el-descriptions :column="1" >
        <el-descriptions-item label="模型路径">
          <el-input v-model="modelPath" style="width: 400px;" :disabled="disabled">
            <template #append>
              <el-button icon="Edit" @click="edit"> </el-button>
              <el-divider direction="vertical" style="margin-left: 15px;margin-right: 15px"></el-divider>
              <el-button icon="Check" @click="certain"></el-button>
            </template>
          </el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <div style="display: flex; align-items: center" >
            <span style="margin-right: 10px; width: 40px" >缩放</span>
            <el-slider v-model="modelSize" :step="0.05" :min="0.1" :max="2" style="width: 400px" @input="changeModel"></el-slider>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";



export default {
  name: "ConfigView",
  components: {

  },
  computed: {
    ...mapState(['model'])
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
      this.disabled = true
    },
    changeModel() {
      const _this = this
      console.log(this.model)

    }
  }
}
</script>

<style scoped>

</style>