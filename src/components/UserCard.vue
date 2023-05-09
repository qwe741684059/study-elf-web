<template>
  <div>
    <el-card style="width: 300px;" class="user-detail">
      <template #header>
        <div class="user-detail-header">
          <el-avatar :src="user!=null ? user.avatar : defaultUser.avatar" :size="60" @click="isUpdateAvatar = true"></el-avatar>
          <span class="user-detail-header-text">{{user != null ? user.nickname : "nickname"}}</span>
        </div>
      </template>
      <el-descriptions border :column="1">
        <el-descriptions-item label="用户名">
          {{user != null ? user.username : "username"}}
        </el-descriptions-item>
        <el-descriptions-item label="密码">
          <span type="password">************</span>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          <span type="password">{{user != null ? user.createTime: "2023-4-21"}}</span>
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



</template>

<script>
import {getToken} from "@/utils/auth";
import {updateAvatar, updateUser} from "@/api/user";
import {mapState} from "vuex";

export default {
  name: "UserCard",
  computed: {
    ...mapState(['user']),
  },
  props: {
    token:{}
  },

  created() {
    if (this.user != null) {
      this.defaultUser.avatar = this.user.avatar
      this.defaultUser.username = this.user.username
      this.defaultUser.nickname = this.user.nickname
      this.defaultUser.createTime = this.user.createTime
      this.defaultUser.userId = this.user.userId
      this.defaultUser.avatarPath = this.user.avatarPath
    }


  },
  data() {
    return {
      isUpdateAvatar: false,
      imageUrl: '',
      defaultUser: {
        avatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        nickname:'nickname',
        username:'username',
        createTime:'2023-4-21',
        password:'',
        userId:'',
        avatarPath:'',
      },
      headers: {
        Authorization: getToken()
      },
      userDetail:'',
      userForm:{
        nickname:''
      }
    }
  },
  methods: {
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
        window.ipcRenderer.send("reload")
      })
    },
    updateNickName() {
      const _this = this
      this.defaultUser.nickname = this.userForm.nickname
      updateUser(this.defaultUser).then(function (resp) {
        _this.isUpdateAvatar = false
      })
    }
  }
}
</script>

<style scoped>
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