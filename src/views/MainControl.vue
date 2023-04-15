<template>
  <div>
    <el-container>
      <el-aside width="300px">
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
      </el-aside>
      <el-main>
        <div>
          <div id="timetables"></div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Timetables from 'timetables'
export default {
  name: "MainControl",
  data() {
    return {
      timetables:[
        ['大学英语(Ⅳ)@10203','大学英语(Ⅳ)@10203','','','','','毛概@14208','毛概@14208','','','','选修'],
        ['','','信号与系统@11302','信号与系统@11302','模拟电子技术基础@16204','模拟电子技术基础@16204','','','','','',''],
        ['大学体育(Ⅳ)','大学体育(Ⅳ)','形势与政策(Ⅳ)@15208','形势与政策(Ⅳ)@15208','','','电路、信号与系统实验','电路、信号与系统实验','','','',''],
        ['','','','','电装实习@11301','电装实习@11301','','','','大学体育','大学体育',''],
        ['','','数据结构与算法分析','数据结构与算法分析','','','','','信号与系统','信号与系统','',''],
      ],
      timetableType: [
        [{index: '1',name: '8:30'}, 1],
        [{index: '2',name: '9:30'}, 1],
        [{index: '3',name: '10:30'}, 1],
        [{index: '4',name: '11:30'}, 1],
        [{index: '5',name: '12:30'}, 1],
        [{index: '6',name: '14:30'}, 1],
        [{index: '7',name: '15:30'}, 1],
        [{index: '8',name: '16:30'}, 1],
        [{index: '9',name: '17:30'}, 1],
        [{index: '10',name: '18:30'}, 1],
        [{index: '11',name: '19:30'}, 1],
        [{index: '12',name: '20:30'}, 1]
      ],
      week:['周一', '周二', '周三', '周四', '周五'],
      styles: {
        Gheight: 50,
        leftHandWidth: 50,
        palette: ['#ff6633', '#eeeeee']
      }
    }
  },
  created() {

  },
  mounted() {
    this.initTimeTable()
  },
  methods: {
    initTimeTable() {
      const highlightWeek = new Date().getDay()
      const timetable = new Timetables({
        el: '#timetables',
        timetables: this.timetables,
        week: this.week,
        timetableType: this.timetableType,
        highlightWeek: highlightWeek,
        gridOnClick: function (e) {
          alert(e.name + '  ' + e.week +', 第' + e.index + '节课, 课长' + e.length +'节')
          console.log(e)
        },
        styles: this.styles
      });
    }
  }
}
</script>

<style scoped>
.placeholder{
  height:450px;

}

</style>