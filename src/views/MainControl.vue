<template>
  <div style="height: 100%;">
    <el-container>
      <el-aside width="400px">
        <el-menu default-active="1" >
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

        <div>


        </div>
      </el-aside>
      <el-main></el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "MainControl",
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.placeholder{
  height:450px;

}
</style>