<template>
  <div>
    <el-container>
      <el-aside width="300px">
        <el-menu :default-active="index" background-color="#F5F5F5"  @select="onSelect">
          <el-menu-item index="1">
            <span>文档管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span>笔记管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span>课程表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span>备忘录</span>
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
        <div>
          <el-button class="close" icon="Close" @click="clickClose" text ></el-button>
        </div>
        <div v-if="alive" key="alive">

          <div v-if="index === '1' && alive" key="1">
            <el-card style="height: 750px; overflow: auto">
              <file-list></file-list>
            </el-card>
          </div>

          <div v-if="index === '2' && alive" key="1">

          </div>

          <div v-if="index === '3' && alive" key="3">
            <time-tables></time-tables>
          </div>

          <div v-if="index === '5' && alive" key="5">
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
                </template>
              </el-calendar>
            </el-card>
          </div>
        </div>

        <!-- 登录模块 -->
        <div v-if="index === '5' && !alive" key="login">
          <div class="login-form-wrapper">
            <el-form  ref="loginForm" :model="loginForm" :rules="rules" label-position="left" label-width="0px" class="login-form">
              <p class="login-form-title">Study-Elf 登录</p>
              <el-form-item prop="username" class="login-form-input">
                <el-input v-model="loginForm.username" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="password" class="login-form-input">
                <el-input v-model="loginForm.password" placeholder="密码" type="password" show-password></el-input>
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
import UserCard from "@/components/UserCard";
import store from "@/store";

export default {
  name: "MainControl",
  inject:['reload'],
  components:{
    UserCard,
    TimeTables,
    FileList,
  },
  computed: {
    ...mapState(["user"])
  },
  data() {
    return {
      defaultAvatar : "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      index: "5",
      alive: false,
      isRegister: false,
      loginForm:{
        username: '',
        password: '',
      },
      registerForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
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
    if (getToken()) {
      this.alive = true
      _this.$store.dispatch('GetInfo').then(function (resp) {
        // _this.isLogin = true
      })
    } else {
      _this.index = "5"
    }
    console.log(this.alive)
  },
  mounted() {
  },
  methods: {
    onSelect(index) {
      this.index = index
      const _this = this
      if (!getToken()) {
        this.index = "5"
      }
      if (getToken()) {
        _this.$store.dispatch('GetInfo').then(function (resp) {
        })
      } else {
        _this.index = "5"
      }

    },
    clickClose() {
      window.ipcRenderer.send('close-main-control')
    },
    Login() {
      const _this = this
      this.handleLogin()
      setTimeout(()=> {
        this.alive = true
        store.dispatch('GetInfo')
      },100)


    },
    handleLogin() {
      const _this = this
          this.loading = true
          _this.$store.dispatch('Login', this.loginForm).then((resp) => {
            Cookies.set('username', this.loginForm.username, { expires: Config.tokenCookieExpires })
            Cookies.set('password', this.loginForm.password, { expires: Config.tokenCookieExpires })
            this.loading = false
            // _this.isLogin = true
          }).catch(() => {
            this.loading = false
          })
    },
    handleRegister() {
      const _this = this
      const user = {
        username: _this.registerForm.username,
        password: _this.registerForm.password
      }
      register(user).then(function (resp) {
        _this.isRegister = false
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
      })
      setTimeout(()=> {
        this.alive = false
      },100)
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

.login-form {
  border-radius: 6px;
  padding: 25px 25px 5px 25px;
  position: relative;
  width: 385px;
  left: 30%;
  top: 200px;
  background-color: #eeeeee;
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


</style>