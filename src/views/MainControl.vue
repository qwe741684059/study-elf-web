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
          <el-menu-item index="login">
            <div class="avatar-wrapper">
              <el-avatar class="avatar-icon" :size="40"  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
              <span class="avatar-text">username</span>
            </div>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main >
        <div>
          <el-button class="close" icon="Close" @click="clickClose" text ></el-button>
        </div>

        <div v-if="index === '1'" key="1">
          <file-list></file-list>
        </div>

        <div v-if="index === '3'" key="3">
          <time-tables></time-tables>
        </div>
      </el-main>

      <el-dialog v-model="isLoginMenuPopUp" title="用户登录" width="30%">
        <el-form :model="loginForm" ref="loginForm" label-position="right" label-width="70">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isLoginMenuPopUp = false" size="small">注册</el-button>
            <el-button type="primary" @click="isLoginMenuPopUp = false">登录</el-button>
          </span>
        </template>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import TimeTables from "@/components/TimeTables";
import FileList from "@/components/FileList";

export default {
  name: "MainControl",
  components:{
    TimeTables,
    FileList
  },
  data() {
    return {
      index: "1",
      isLoginMenuPopUp: false,
      loginForm:{
        username: '',
        password: '',
      },
      rules: {

      }
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    onSelect(index) {
      this.index = index
      if (index === 'login') {
        this.isLoginMenuPopUp = true
      }
    },
    clickClose() {
      window.ipcRenderer.send('close-main-control')
    },

  }
}
</script>

<style scoped>
.placeholder{
  height:570px;

}

.close{
  position: relative;
  left: 97%;
  bottom: 20px;
  font-size: 25px;
  color: #606060;
}
.avatar-wrapper {
}
.avatar-icon {
  position: relative;
  right: 10%;
  bottom: 5px;
}
.avatar-text {
  text-align: center;
  font-size: 16px;
  color: #484848;
  letter-spacing: 1px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>