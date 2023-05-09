<template>
  <div >
    <el-container>
      <div class="mainControl-background" style="z-index: -1; position: absolute; opacity: 0.4">
        <sakura></sakura>
      </div>
      <el-aside width="300px">
        <el-menu :default-active="index" background-color="rgba(10,10,0,0.05)"  @select="onSelect">
          <el-menu-item index="1">
            <span style="font-size: 16px">文档管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span style="font-size: 16px">笔记管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span style="font-size: 16px">课程表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span style="font-size: 16px">备忘录</span>
          </el-menu-item>
          <div class="placeholder"></div>
          <el-menu-item index="5">
            <div class="avatar-wrapper">
              <el-avatar class="avatar-icon" :size="40"  :src="this.user != null ? this.user.avatar: defaultAvatar"></el-avatar>
              <span class="avatar-text">{{this.user != null ? this.user.nickname : "username"}}</span>
            </div>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main >
        <!-- 右上角关闭图标 -->
        <div >
          <el-button class="close" icon="Close" @click="clickClose" text style="z-index: 1000"></el-button>
        </div>
        <div v-if="this.alive === true" key="alive">

          <div v-if="index === '1' && this.alive===true" key="1">
            <el-card style="height: 750px; overflow: auto">
              <file-list></file-list>
            </el-card>
          </div>

          <div v-if="index === '2' && this.alive===true" key="1">
            <el-card  style="height: 750px; overflow: auto">
              <markdown-list></markdown-list>
            </el-card>

          </div>

          <div v-if="index === '3' && this.alive===true" key="3">
            <el-card style="position: relative;bottom: 40px">
              <time-tables ></time-tables>
            </el-card>

          </div>

          <div v-if="index === '4' && this.alive===true" key="3">
            <memorandum style="position: relative;bottom: 25px"></memorandum>
          </div>

          <div v-if="index === '5' && this.alive===true" key="5">
            <div>
              <el-card style="width: 300px;" class="user-detail">
                <template #header>
                  <div class="user-detail-header">
                    <el-avatar :src="this.user!=null ? this.user.avatar : defaultUser.avatar" :size="60" @click="isUpdateAvatar = true"></el-avatar>
                    <span class="user-detail-header-text">{{this.user != null ? this.user.nickname : "nickname"}}</span>
                  </div>
                </template>
                <el-descriptions border :column="1">
                  <el-descriptions-item label="用户名">
                    {{this.user != null ? this.user.username : "username"}}
                  </el-descriptions-item>
                  <el-descriptions-item label="密码">
                    <span type="password">************</span>
                  </el-descriptions-item>
                  <el-descriptions-item label="创建时间">
                    <span type="password">{{this.user != null ? this.user.createTime: "2023-4-21"}}</span>
                  </el-descriptions-item>
                </el-descriptions>
                <el-button type="info" class="edit-button" @click="onLogOut">注销</el-button>

                <el-dialog v-model="isUpdateAvatar" title="资料编辑" width="500" style="height: 300px">
                  <el-upload
                      class="avatar-uploader"
                      action="http://localhost:8181/user/updateAvatar"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :headers="headers"
                      accept=".jpg,.jpeg,.png"
                  >
                    <el-avatar v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">修改头像</el-icon>
                  </el-upload>
                  <el-form v-model="userForm" class="user-detail-form" >
                    <el-form-item label="昵称">
                      <el-input v-model="userForm.nickname"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" style="width: 100px;margin-left: 50px" @click="updateNickName">修改昵称</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </el-card>
            </div>

            <el-card class="calender">
              <el-calendar>
                <template #date-cell="{data}">
                  <span>
                    {{ data.day.split('-').slice(1).join('-') }}
                    <span v-if="timeList.indexOf(data.day) !== -1">
                      <el-icon size="25" >
                        <svg t="1682430380835" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7440" width="200" height="200"><path d="M511.3 874.9c-48.9 0-96.4-9.6-141.2-28.5-43.2-18.3-82-44.4-115.3-77.7-33.3-33.3-59.4-72.1-77.7-115.3-18.9-44.7-28.5-92.2-28.5-141.2 0-48.9 9.6-96.4 28.5-141.2 18.3-43.2 44.4-82 77.7-115.3 33.3-33.3 72.1-59.4 115.3-77.7 44.7-18.9 92.2-28.5 141.2-28.5 48.9 0 96.4 9.6 141.2 28.5 43.2 18.3 82 44.4 115.3 77.7 33.3 33.3 59.4 72.1 77.7 115.3 18.9 44.7 28.5 92.2 28.5 141.2 0 48.9-9.6 96.4-28.5 141.2-18.3 43.2-44.4 82-77.7 115.3-33.3 33.3-72.1 59.4-115.3 77.7-44.7 18.9-92.2 28.5-141.2 28.5z m0-665.4c-166.9 0-302.7 135.8-302.7 302.7 0 166.9 135.8 302.7 302.7 302.7 166.9 0 302.7-135.8 302.7-302.7 0-166.9-135.8-302.7-302.7-302.7zM128 313.8c-5.2 0-10.5-1.4-15.3-4.2-14.2-8.5-18.9-26.9-10.5-41.1 40.4-68 97.6-125.5 165.4-166.2 14.2-8.5 32.6-3.9 41.2 10.3 8.5 14.2 3.9 32.6-10.3 41.2-59.3 35.6-109.4 85.9-144.7 145.4-5.6 9.4-15.6 14.6-25.8 14.6zM897.5 312.9c-10.2 0-20.2-5.2-25.8-14.6-35.4-59.4-85.6-109.6-145-145.1-14.2-8.5-18.9-26.9-10.4-41.1 8.5-14.2 26.9-18.9 41.1-10.4 67.9 40.6 125.2 97.9 165.7 165.8 8.5 14.2 3.8 32.6-10.4 41.1-4.7 3-10 4.3-15.2 4.3z" fill="#515151" p-id="7441"></path><path d="M223.6 923.1c-7.7 0-15.4-2.9-21.2-8.8-11.7-11.7-11.7-30.7 0-42.4l96.4-96.4c11.7-11.7 30.7-11.7 42.4 0s11.7 30.7 0 42.4l-96.4 96.4c-5.8 5.9-13.5 8.8-21.2 8.8zM800.6 923.1c-7.7 0-15.4-2.9-21.2-8.8L683 817.9c-11.7-11.7-11.7-30.7 0-42.4s30.7-11.7 42.4 0l96.4 96.4c11.7 11.7 11.7 30.7 0 42.4-5.9 5.9-13.6 8.8-21.2 8.8z" fill="#515151" p-id="7442"></path><path d="M647.5 677.5c-7.6 0-15.3-2.9-21.1-8.7L490.2 533.5c-5.7-5.6-8.9-13.3-8.9-21.3V283.8c0-16.6 13.4-30 30-30s30 13.4 30 30v215.9l127.3 126.5c11.8 11.7 11.8 30.7 0.1 42.4-5.7 6-13.5 8.9-21.2 8.9z" fill="#515151" p-id="7443"></path></svg>
                      </el-icon>
                    </span>
                  </span>

                </template>
              </el-calendar>
            </el-card>
          </div>
        </div>

        <!-- 登录模块 -->
        <div v-if="index === '5' && !this.alive" key="login">
          <div class="login-form-wrapper">
            <el-form  ref="loginForm" :model="loginForm" :rules="rules" label-position="left" label-width="0px" class="login-form">
              <p class="login-form-title">Study-Elf 登录</p>
              <el-form-item prop="username" class="login-form-input" >
                <el-input v-model="loginForm.username" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="password" class="login-form-input">
                <el-input v-model="loginForm.password" placeholder="密码" type="password"></el-input>
              </el-form-item>
              <el-form-item class="login-form-button">
                <el-button @click="isRegister = true" type="info">注册</el-button>
                <el-button type="primary" @click="Login" :loading="loading">
                  <span v-if="!loading">登 录</span>
                  <span v-else>登 录 中...</span>
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-main>

      <!-- 注册弹出模块 -->
      <el-dialog v-model="isRegister" title="用户注册" width="30%" >
        <el-form :model="registerForm" ref="registerForm" :rules="rules">
          <el-form-item label="用户名" prop="username" label-width="70px">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" label-width="70px">
            <el-input type="password" v-model="registerForm.password" show-password></el-input>
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleRegister" size="small" :loading="loading">注册</el-button>
          </span>
        </template>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import TimeTables from "@/components/TimeTables";
import FileList from "@/components/FileList";
import Config from "@/settings"
import {getToken} from "@/utils/auth";
import {mapGetters, mapState} from "vuex";
import {register, updateUser} from "@/api/user";
import Cookies from "js-cookie";
import store from "@/store";
import MarkdownList from "@/components/MarkdownList";
import Memorandum from "@/components/Memorandum";
import {getTimeList} from "@/api/memorandum";
import Sakura from "@/components/sakura/Sakura";
import {ElMessage} from "element-plus";

export default {
  name: "MainControl",
  inject:['reload'],
  components:{
    TimeTables,
    FileList,
    MarkdownList,
    Memorandum,
    Sakura
  },
  computed: {
    ...mapState(["user","alive"])
  },
  data() {
    return {
      defaultAvatar : "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      index: "5",
      isRegister: false,
      timeList:[],
      loginForm:{
        username: '',
        password: '',
      },
      registerForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, min:6, max: 15, trigger: 'blur', message: '用户名应为6-15位' }],
        password: [{ required: true, min:6, max: 18, trigger: 'blur', message: '密码应为6-18位' }],
      },
      loading:false,

      defaultUser: {
        avatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        nickname:'nickname',
        username:'username',
        createTime:'2023-4-21',
        password:'',
        userId:'',
        avatarPath:'',
      },
      isUpdateAvatar: false,
      imageUrl: '',
      headers: {
        Authorization: getToken()
      },
      userDetail:'',
      userForm:{
        nickname:''
      },
      test: {},
    }
  },
  created() {
    const _this = this
    console.log("created方法的token："+getToken())
    if (getToken()) {
      console.log("created方法调用：有token")
      _this.$store.dispatch('setAlive')
      _this.$store.dispatch('GetInfo').then(function (resp) {
        getTimeList(_this.user.userId).then(function (resp) {
          _this.timeList = resp.data
        })

      })

    } else {
      _this.index = "5"
    }
  },
  mounted() {
  },
  methods: {
    onSelect(index) {
      this.$router.push("/mainControl")
      this.index = index
      const _this = this
      if (!getToken()) {
        this.index = "5"
      }
      if (this.index === "5" && this.alive === true) {
        console.log("进来了")
        getTimeList(_this.user.userId).then(function (resp) {
          _this.timeList = resp.data
          console.log(_this.timeList)
        })
      }

      // if (getToken()) {
      //   _this.$store.dispatch('GetInfo').then(function (resp) {
      //   })
      // } else {
      //   _this.index = "5"
      // }

    },
    clickClose() {
      window.ipcRenderer.send('close-main-control')
    },
    Login() {
      const _this = this
      this.handleLogin()
    },
    async handleLogin() {
      const _this = this
      this.loading = true
      await _this.$store.dispatch('Login', this.loginForm).then((resp) => {
        Cookies.set('username', this.loginForm.username, { expires: Config.tokenCookieExpires })
        Cookies.set('password', this.loginForm.password, { expires: Config.tokenCookieExpires })
        _this.loading = false
        console.log("进入login方法")
        if (getToken()) {
          _this.headers.Authorization = getToken()
          _this.loginForm = {}
          console.log("login完成：获得token")
          store.dispatch('GetInfo')
        }
        // _this.isLogin = true
      }).catch(() => {
        _this.loading = false
      })
    },
    handleRegister() {
      const _this = this
      const user = {
        username: _this.registerForm.username,
        password: _this.registerForm.password
      }
      register(user).then(function (resp) {
        if (resp.status === 200) {
          ElMessage({
            type: 'success',
            message: '注册成功',
          })
          _this.isRegister = false
          _this.registerForm = {}
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.isUpdateAvatar = false
      this.$store.dispatch('GetInfo')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isJPG && isLt2M;
    },
    onLogOut() {
      const _this = this
      this.$store.dispatch('LogOut').then(function (resp) {
        _this.imageUrl = ''
        console.log("登出后的token："+getToken())
      })
    },
    updateNickName() {
      const _this = this
      const user = {}
      user.nickname = this.userForm.nickname
      user.userId = this.user.userId
      user.username = this.user.username
      user.password = this.user.password
      user.avatar = this.user.avatar
      user.createTime = this.user.createTime
      user.avatarPath = this.user.avatarPath
      updateUser(user).then(function (resp) {
        _this.isUpdateAvatar = false
        window.ipcRenderer.send("reload")
      })
    }
  }
}
</script>

<style scoped>
.placeholder{
  height:540px;

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

.login-form {
  border-radius: 6px;
  padding: 25px 25px 5px 25px;
  position: relative;
  width: 385px;
  left: 30%;
  top: 200px;
  background-color: rgba(200,0,0,0.03);
}
.login-form-button {
  position: relative;
  left: 30%;
}
.login-form-title {
  margin: 0 auto 30px auto;
  color: #707070;
  text-align: center;
  font-size: 24px;
}

.calender {
  width: 800px;
  position: absolute;
  bottom: 110px;
}

.edit-button {
  margin-top: 10px;
  width: 100%;
}
.user-detail {
  position: relative;
  left: 73%;
}
.user-detail-header-text {
  position: relative;
  margin-left: 20px;
  color: #707070;
  bottom: 10px;
  font-size: 18px;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.user-detail-form {
  width: 250px;
  position: relative;
  left: 45%;
  bottom: 160px;
}
.mainControl-background {
}

</style>