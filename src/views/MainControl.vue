<template>
  <div>
    <el-container>
      <el-aside width="300px">
        <el-menu :default-active="index" background-color="#F5F5F5"  @select="onSelect">
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
          <el-menu-item index="5">
            <div class="avatar-wrapper">
              <el-avatar class="avatar-icon" :size="40"  :src="user != null ? user.avatar: defaultAvatar"></el-avatar>
              <span class="avatar-text">{{user != null ? user.username : "username"}}</span>
            </div>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main >
        <!-- 右上角关闭图标 -->
        <div>
          <el-button class="close" icon="Close" @click="clickClose" text ></el-button>
        </div>
        <div v-if="isLogin">

        </div>

        <div v-if="index === '1'" key="1">
          <el-card style="height: 750px; overflow: auto">
            <file-list></file-list>
          </el-card>
        </div>

        <div v-if="index === '3'" key="3">
          <time-tables></time-tables>
        </div>

        <div v-if="index === '5'" key="5">
          <el-card style="width: 300px;" class="user-detail">
            <template #header>
              <div class="user-detail-header">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="60"></el-avatar>
                <span class="user-detail-header-text">username</span>
              </div>

            </template>
            <el-descriptions border column="1">
              <el-descriptions-item label="用户名">
                心随风飘扬
              </el-descriptions-item>
              <el-descriptions-item label="密码">
                <span type="password">************</span>
              </el-descriptions-item>
              <el-descriptions-item label="创建时间">
                <span type="password">2022-2-22</span>
              </el-descriptions-item>
            </el-descriptions>
            <el-button type="primary" class="edit-button">编辑</el-button>
          </el-card>

          <el-card class="calender">
            <el-calendar>
              <template #date-cell="{data}">
              </template>
            </el-calendar>
          </el-card>


        </div>

<!--        &lt;!&ndash; 登录模块 &ndash;&gt;-->
<!--        <div v-if="index === '5' && !isLogin" >-->
<!--          <div class="login-form-wrapper">-->
<!--            <el-form  ref="loginForm" :model="loginForm" :rules="rules" label-position="left" label-width="0px" class="login-form">-->
<!--              <p class="login-form-title">Study-Elf 登录</p>-->
<!--              <el-form-item prop="username" class="login-form-input">-->
<!--                <el-input v-model="loginForm.username" placeholder="账号"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item prop="password" class="login-form-input">-->
<!--                <el-input v-model="loginForm.password" placeholder="密码" type="password" show-password></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item class="login-form-button">-->
<!--                <el-button @click="isRegister = true" type="info">注册</el-button>-->
<!--                <el-button type="primary" @click="handleLogin" :loading="loading">-->
<!--                  <span v-if="!loading">登 录</span>-->
<!--                  <span v-else>登 录 中...</span>-->
<!--                </el-button>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--          </div>-->
<!--        </div>-->
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
import {mapState} from "vuex";
import {register} from "@/api/user";
import Cookies from "js-cookie";


export default {
  name: "MainControl",
  components:{
    TimeTables,
    FileList,
  },
  computed: {
    ...mapState(["user"])
  },
  data() {
    return {
      defaultAvatar : "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      index: "1",
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
      isLogin:false,
    }
  },
  created() {
    const _this = this
    if (getToken()) {
      _this.$store.dispatch('GetInfo').then(function (resp) {
        _this.isLogin = true
      })
    } else {
      _this.index = "5"
    }
  },
  mounted() {
  },
  methods: {
    onSelect(index) {
      this.index = index
      const _this = this
      if (getToken()) {
        _this.$store.dispatch('GetInfo').then(function (resp) {
          _this.isLogin = true
        })
      } else {
        // _this.index = "5"
      }

    },
    clickClose() {
      window.ipcRenderer.send('close-main-control')
    },
    handleLogin() {
      const _this = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          _this.$store.dispatch('Login', this.loginForm).then((resp) => {
            Cookies.set('username', this.loginForm.username, { expires: Config.tokenCookieExpires })
            Cookies.set('password', this.loginForm.password, { expires: Config.tokenCookieExpires })
            this.loading = false
            _this.isLogin = true
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log("error submit")
          return false
        }
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
.edit-button {
  margin-top: 10px;
  width: 100%;
}
.user-detail {
  position: relative;
  left: 73%;
}
.calender {
  width: 800px;
  position: relative;
  bottom: 305px;
}
.user-detail-header-text {
  position: relative;
  margin-left: 20px;
  color: #707070;
  bottom: 10px;
  font-size: 18px;
}



</style>