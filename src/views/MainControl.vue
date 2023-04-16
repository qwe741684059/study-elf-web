<template>
  <div>
    <el-container>
      <el-aside width="300px">
        <el-menu default-active="1" background-color="#F5F5F5"  @select="onSelect">
          <el-menu-item index="1">
            <span>笔记管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span>文档管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span>课程表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span>备忘录</span>
          </el-menu-item>
          <div class="placeholder"></div>
          <el-menu-item>
            <div>
              <el-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
            </div>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main >
        <div v-if="index === '1'" key="1">
        </div>

        <div v-if="index === '3'" key="3">
          <time-tables></time-tables>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import TimeTables from "@/components/TimeTables";
export default {
  name: "MainControl",
  components:{
    TimeTables
  },
  data() {
    return {
      index: false
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    onSelect(index) {
      this.index = index
    }
  }
}
</script>

<style scoped>
.placeholder{
  height:570px;

}

</style>