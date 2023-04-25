<template>
  <div >
    <el-card style="overflow: auto!important; height: 780px">
      <template #header>
        <div style="align-items: center;justify-content: space-between;display: flex">
          <span style="font-size: 20px">备忘录</span>
          <el-button type="primary" @click="showAdd = true">新增备忘录</el-button>
        </div>
      </template>

      <el-timeline>
        <el-timeline-item v-for="(item, index) in futureList" :timestamp="item.memorandumTime" placement="top" type="primary" :key="index">
          <el-card>
            <div style="align-items: center;justify-content: space-between;display: flex">
              <span style="white-space: pre-wrap">{{item.memorandumContent}}</span>
              <el-button-group>
                <el-button type="primary" @click="clickUpdate(item)" icon="Edit">修改</el-button>
                <el-button type="primary" @click="clickDelete(item)" icon="Delete">删除</el-button>
              </el-button-group>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-divider><span style="color: #9c9c9c;">以下为已经过去时间的内容</span></el-divider>

      <el-timeline>
        <el-timeline-item v-for="(item, index) in pastList" :timestamp="item.memorandumTime" placement="top" type="primary" :key="index">
          <el-card >
            <div style="align-items: center;justify-content: space-between;display: flex">
              <span style="white-space: pre-wrap">{{item.memorandumContent}}</span>
              <el-button-group>
                <el-button type="primary" @click="clickUpdate(item)" icon="Edit">修改</el-button>
                <el-button type="primary" @click="clickDelete(item)" icon="Delete">删除</el-button>
              </el-button-group>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <el-dialog v-model="showAdd" title="新增备忘录" >
      <el-form v-model="memorandumForm">
        <el-form-item label="时间">
          <el-date-picker v-model="memorandumForm.memorandumTime" type="datetime" placeholder="选择需要备忘的时间"></el-date-picker>
        </el-form-item>

        <el-form-item label="内容">
          <el-input v-model="memorandumForm.memorandumContent" type="textarea"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAdd = false">取消</el-button>
          <el-button type="primary" @click="handleAddMemorandum">
           确定
          </el-button>
       </span>
      </template>
    </el-dialog>

    <el-dialog v-model="showUpdate" title="修改备忘录" >
      <el-form v-model="memorandum">
        <el-form-item label="时间">
          <el-date-picker v-model="memorandum.memorandumTime" type="datetime" placeholder="选择需要备忘的时间"></el-date-picker>
        </el-form-item>

        <el-form-item label="内容">
          <el-input v-model="memorandum.memorandumContent" type="textarea"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showUpdate = false">取消</el-button>
          <el-button type="primary" @click="updateMemorandumHandle">
           确定
          </el-button>
       </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import {addMemorandum, deleteMemorandum, selectMemorandumList, updateMemorandum} from "@/api/memorandum";
import {mapState} from "vuex";
import {withScopeId} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "Memorandum",
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.getMemorandumList()
  },
  data() {
    return {
      showAdd:false,
      showUpdate:false,
      memorandumForm:{},
      futureList:[],
      pastList:[],
      memorandum:{}
    }
  },
  methods: {
    handleAddMemorandum() {
      const _this = this
      _this.memorandumForm.userId = _this.user.userId
      addMemorandum(this.memorandumForm).then(() => {
        _this.getMemorandumList()
        _this.showAdd = false
      })
    },
    getMemorandumList() {
      const _this = this
      selectMemorandumList(this.user.userId).then(function (resp) {
        _this.futureList = resp.data.futureList
        _this.pastList = resp.data.pastList
      })
    },
    clickUpdate(item) {
      this.memorandum = item
      this.showUpdate = true
    },
    clickDelete(item) {
      const _this = this
      ElMessageBox.confirm(
          '是否删除备忘录?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      )
          .then(() => {
            _this.deleteMemorandumHandle(item)
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消',
            })
          })
    },
    deleteMemorandumHandle(item) {
      const _this = this
      deleteMemorandum(item).then(() => {
        _this.getMemorandumList()
      })
    },
    updateMemorandumHandle() {
      const _this = this
      updateMemorandum(this.memorandum).then(() => {
        _this.getMemorandumList()
        _this.showUpdate = false
      })
    }

  }
}
</script>

<style scoped>

</style>