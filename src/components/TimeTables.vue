<template>
  <div>
    <el-button type="primary" @click="showDialog = true" class="course-button">新增课程</el-button>
    <el-divider></el-divider>
    <div id="timetables"></div>


    <el-dialog
      v-model="showDialog"
      title="新增课程"
    >
      <el-form :model="courseForm" label-width="100" :rules="rules">
        <el-form-item label="课程名" prop="courseName">
          <el-input v-model="courseForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="星期" prop="courseDay">
          <el-select v-model="courseForm.courseDay">
            <el-option label="星期一" :value="1"></el-option>
            <el-option label="星期二" :value="2"></el-option>
            <el-option label="星期三" :value="3"></el-option>
            <el-option label="星期四" :value="4"></el-option>
            <el-option label="星期五" :value="5"></el-option>
            <el-option label="星期六" :value="6"></el-option>
            <el-option label="星期日" :value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始课节" prop="courseStart">
          <el-select v-model="courseForm.courseStart">
            <el-option label="第1节" :value="1"></el-option>
            <el-option label="第2节" :value="2"></el-option>
            <el-option label="第3节" :value="3"></el-option>
            <el-option label="第4节" :value="4"></el-option>
            <el-option label="第5节" :value="5"></el-option>
            <el-option label="第6节" :value="6"></el-option>
            <el-option label="第7节" :value="7"></el-option>
            <el-option label="第8节" :value="8"></el-option>
            <el-option label="第9节" :value="9"></el-option>
            <el-option label="第10节" :value="10"></el-option>
            <el-option label="第11节" :value="11"></el-option>
            <el-option label="第12节" :value="12"></el-option>
            <el-option label="第13节" :value="13"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程课时" prop="courseLength">
          <el-select v-model="courseForm.courseLength">
            <el-option label="1节" :value="1"></el-option>
            <el-option label="2节" :value="2" v-if="courseForm.courseStart<13"></el-option>
            <el-option label="3节" :value="3" v-if="courseForm.courseStart<12"></el-option>
            <el-option label="4节" :value="4" v-if="courseForm.courseStart<11"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="clickAddCourse">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="showControl" title="课程操作" width="17%" style="height: 180px">
      <div style="margin-left: 20px">
        <p style="bottom: 30px;font-size: 16px;position: relative"> 请选择所需要的功能</p>
        <el-button type="danger" @click="clickDelete" icon="Delete" style="position: relative;bottom: 20px">删除</el-button>
        <el-button type="primary" @click="clickEdit" icon="Edit" style="position: relative;bottom: 20px">修改</el-button>
      </div>

    </el-dialog>

    <el-dialog
        v-model="showEdit"
        title="修改"
    >
      <el-form :model="editForm" label-width="100" :rules="rules">
        <el-form-item label="课程名" prop="courseName">
          <el-input v-model="editForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="星期" prop="courseDay">
          <el-select v-model="editForm.courseDay">
            <el-option label="星期一" :value="1"></el-option>
            <el-option label="星期二" :value="2"></el-option>
            <el-option label="星期三" :value="3"></el-option>
            <el-option label="星期四" :value="4"></el-option>
            <el-option label="星期五" :value="5"></el-option>
            <el-option label="星期六" :value="6"></el-option>
            <el-option label="星期日" :value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始课节" prop="courseStart">
          <el-select v-model="editForm.courseStart">
            <el-option label="第1节" :value="1"></el-option>
            <el-option label="第2节" :value="2"></el-option>
            <el-option label="第3节" :value="3"></el-option>
            <el-option label="第4节" :value="4"></el-option>
            <el-option label="第5节" :value="5"></el-option>
            <el-option label="第6节" :value="6"></el-option>
            <el-option label="第7节" :value="7"></el-option>
            <el-option label="第8节" :value="8"></el-option>
            <el-option label="第9节" :value="9"></el-option>
            <el-option label="第10节" :value="10"></el-option>
            <el-option label="第11节" :value="11"></el-option>
            <el-option label="第12节" :value="12"></el-option>
            <el-option label="第13节" :value="13"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程课时" prop="courseLength">
          <el-select v-model="editForm.courseLength">
            <el-option label="1节" :value="1"></el-option>
            <el-option label="2节" :value="2" v-if="editForm.courseStart<13"></el-option>
            <el-option label="3节" :value="3" v-if="editForm.courseStart<12"></el-option>
            <el-option label="4节" :value="4" v-if="editForm.courseStart<11"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEdit = false">取消</el-button>
        <el-button type="primary" @click="handleEdit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Timetables from 'timetables'
import {mapState} from "vuex";
import {addCourse, deleteCourse, selectCourseList, updateCourse} from "@/api/course";
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  name: "TimeTables",
  inject:['reload'],
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    this.getCourse()
    this.initTimeTable()
  },
  data() {
    return {
      showDialog:false,
      showControl:false,
      showEdit: false,
      editForm:{},
      rawCourse:{},
      rules:{
        courseName: [{required: true, message: '请输入课程名', trigger:'blur'}],
        courseDay: [{required: true, message: '请选择星期', trigger:'change'}],
        courseStart: [{required: true, message: '请选择起始课节', trigger:'change'}],
        courseLength: [{required: true, message: '请选择课程课时', trigger:'change'}],
      },
      courseForm:{},
      timeTable: {},
      clickCourse:{},
      timetables:[
        ['','','','','','','','','','','','',''],
        ['','','','','','','','','','','','',''],
        ['','','','','','','','','','','','',''],
        ['','','','','','','','','','','','',''],
        ['','','','','','','','','','','','',''],
        ['','','','','','','','','','','','',''],
        ['','','','','','','','','','','','',''],
      ],
      timetableType: [
        [{index: '1',name: '8:00'}, 1],
        [{index: '2',name: '8:55'}, 1],
        [{index: '3',name: '10:00'}, 1],
        [{index: '4',name: '10:55'}, 1],
        [{index: '5',name: '11:50'}, 1],
        [{index: '6',name: '14:00'}, 1],
        [{index: '7',name: '14:55'}, 1],
        [{index: '8',name: '16:00'}, 1],
        [{index: '9',name: '16:55'}, 1],
        [{index: '10',name: '17:50'}, 1],
        [{index: '11',name: '19:20'}, 1],
        [{index: '12',name: '20:15'}, 1],
        [{index: '13',name: '21:00'}, 1]
      ],
      week:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      styles: {
        Gheight: 50,
        leftHandWidth: 50,
        palette: ['#ff6633', '#eeeeee']
      }
    }
  },
  methods: {
    initTimeTable() {
      const _this = this
      let highlightWeek = new Date().getDay()
      if (highlightWeek === 0) {
        highlightWeek = 7
      }
      this.timeTable = new Timetables({
        el: '#timetables',
        timetables: this.timetables,
        week: this.week,
        timetableType: this.timetableType,
        highlightWeek: highlightWeek,
        gridOnClick: function (e) {
          if (e.name !== '') {
            _this.clickCourse = e
            _this.showControl = true
          }

        },
        styles: this.styles
      });
    },
    clickAddCourse() {
      this.courseForm.userId = this.user.userId
      const _this = this
      for (let i = 0; i < this.courseForm.courseLength; i++) {
        if(this.timetables[this.courseForm.courseDay - 1][this.courseForm.courseStart-1+i] !== '') {
          ElMessage({
            type: 'info',
            message: '时间段内已有课程',
          })
          return;
        }
      }
      if (this.timetables[this.courseForm.courseDay - 1][this.courseForm.courseStart - 2] === this.courseForm.courseName
          || this.timetables[this.courseForm.courseDay - 1][this.courseForm.courseStart - 1 + this.courseForm.courseLength ] === this.courseForm.courseName) {
        ElMessage({
          type: 'info',
          message: '检测到可以与相同课程合并，请删除课程后重新添加',
        })
        return;
      }

      addCourse(this.courseForm).then(function (resp) {
        _this.getCourse()
        _this.showDialog = false
      })
    },
    async getCourse() {
      const _this = this
      const weekLength = this.week.length
      const timeLength = this.timetableType.length
      for (let i = 0; i < weekLength; i++) {
        for (let j = 0; j < timeLength; j++) {
          this.timetables[i][j] = ''
        }
      }
      await selectCourseList(this.user.userId).then(function (resp) {
        for (let i = 0; i < resp.data.length; i++) {
          for (let j = 0; j < resp.data[i].courseLength; j++) {
            _this.timetables[resp.data[i].courseDay-1][resp.data[i].courseStart+j-1] = resp.data[i].courseName
          }
        }
        let highlightWeek = new Date().getDay()
        if (highlightWeek === 0) {
          highlightWeek = 7
        }
        _this.timeTable.setOption({
          timetables: _this.timetables,
          week: _this.week,
          timetableType: _this.timetableType,
        })
      })
    },
    clickDelete() {
      const _this = this
      _this.showControl = false
      ElMessageBox.confirm(
          '是否删除课程?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      )
          .then(() => {
            _this.deleteCourseHandle()
            _this.showControl = false
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消',
            })
          })
    },
    deleteCourseHandle() {
      const _this = this
      let course = {
        userId: _this.user.userId,
        courseName:_this.clickCourse.name,
        courseDay:_this.week.indexOf(_this.clickCourse.week)+1,
        courseStart:_this.clickCourse.index,
        courseLength:_this.clickCourse.length
      }
      deleteCourse(course).then(function (resp) {
        // for (let i = 0; i < course.courseLength; i++) {
        //   _this.timetables[course.courseDay-1][course.courseStart-1+i] = ''
        // }
        _this.getCourse()
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        })
      })
    },
    clickEdit() {

      const _this = this
      _this.showControl = false
      _this.editForm = {
        userId: _this.user.userId,
        courseName:_this.clickCourse.name,
        courseDay:_this.week.indexOf(_this.clickCourse.week)+1,
        courseStart:_this.clickCourse.index,
        courseLength:_this.clickCourse.length
      }
      _this.rawCourse = {
        userId: _this.user.userId,
        courseName:_this.clickCourse.name,
        courseDay:_this.week.indexOf(_this.clickCourse.week)+1,
        courseStart:_this.clickCourse.index,
        courseLength:_this.clickCourse.length
      }
      _this.showEdit = true
    },
    handleEdit() {
      const _this = this
      console.log(_this.rawCourse)
      console.log(_this.editForm)

      if (this.editForm.courseDay !== this.rawCourse.courseDay) {
        for (let i = 0; i < this.editForm.courseLength; i++) {
          if(this.timetables[this.editForm.courseDay - 1][this.editForm.courseStart-1+i] !== '') {
            ElMessage({
              type: 'info',
              message: '时间段内已有课程',
            })
            return;
          }
        }
      } else {
        for (let i = 0; i < this.editForm.courseLength; i++) {
          if(this.timetables[this.editForm.courseDay - 1][this.editForm.courseStart-1+i] !== ''
              &&
              this.timetables[this.editForm.courseDay - 1][this.editForm.courseStart-1+i] !==  _this.rawCourse.courseName ) {
            ElMessage({
              type: 'info',
              message: '时间段内已有课程',
            })
            return;
          }
        }
      }

      if (this.editForm.courseDay === this.rawCourse.courseDay &&  (this.editForm.courseStart >= this.rawCourse.courseStart || this.editForm.courseStart <= this.rawCourse.courseStart +this.rawCourse.courseLength -1 ) ) {

      } else {
        if (this.timetables[this.editForm.courseDay - 1][this.editForm.courseStart - 2] === this.editForm.courseName
            || this.timetables[this.editForm.courseDay - 1][this.editForm.courseStart - 1 + this.editForm.courseLength ] === this.editForm.courseName) {
          ElMessage({
            type: 'info',
            message: '检测到可以与相同课程合并，请删除课程后重新修改',
          })
          return;
        }
      }

       updateCourse(_this.rawCourse, _this.editForm).then(() => {
        _this.showControl = false
        _this.showEdit = false
        _this.getCourse()
      })
    }
  }
}
</script>

<style scoped>
  .course-button{

  }
</style>