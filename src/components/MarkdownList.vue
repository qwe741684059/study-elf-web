<template>
  <div >
    <el-page-header @back="goBack">
      <template #content>
        <div style="height: 25px">
          <el-button type="primary" @click="addFileFolderDialogVisible = true">
            <el-icon ><FolderAdd></FolderAdd></el-icon>
            <span>Add</span>
          </el-button>

          <el-dialog title="新建" v-model="addFileFolderDialogVisible">
            <el-form :model="fileForm">
              <el-form-item label="名称" required>
                <el-input v-model="fileForm.fileName"></el-input>
              </el-form-item>
              <el-form-item label="类型" required>
                <el-select v-model="fileForm.fileType" placeholder="请选择类型">
                  <el-option key="fileFolder" label="fileFolder" value="fileFolder"></el-option>
                  <el-option key="markdown" label="markdown" value="markdown"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <template #footer>
              <el-button @click="addFileFolderDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addMarkdown">确 定</el-button>
            </template>
          </el-dialog>

        </div>
      </template>

      <template #breadcrumb>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/mainControl' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="getBreadCrumb(item, index)" v-for="(item, index) in this.$route.params.filePath">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <el-descriptions  :column="6" style="margin-top: 20px ; ">
        <el-descriptions-item v-for="(file, index) in fileList" :key="index"  :span="1" align="left" style="height: 100px" width="190" >
          <div style="display: inline-flex;flex-direction: column; align-items: center;width: 150px;height: 100px;" class="markdown" :tabindex="index"  @keyup.delete="deleteHandle(file)">
            <el-icon size="30" @dblclick="dbClick(file)">
              <svg v-if="file.markdownType === 'fileFolder'" t="1682143232707" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1244" width="200" height="200"><path d="M918.673 883H104.327C82.578 883 65 867.368 65 848.027V276.973C65 257.632 82.578 242 104.327 242h814.346C940.422 242 958 257.632 958 276.973v571.054C958 867.28 940.323 883 918.673 883z" fill="#FFE9B4" p-id="1245"></path><path d="M512 411H65V210.37C65 188.597 82.598 171 104.371 171h305.92c17.4 0 32.71 11.334 37.681 28.036L512 411z" fill="#FFB02C" p-id="1246"></path><path d="M918.673 883H104.327C82.578 883 65 865.42 65 843.668V335.332C65 313.58 82.578 296 104.327 296h814.346C940.422 296 958 313.58 958 335.332v508.336C958 865.32 940.323 883 918.673 883z" fill="#FFCA28" p-id="1247"></path></svg>
              <svg v-if="file.markdownType === 'markdown'" t="1682228068463" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3306" width="200" height="200"><path d="M840.32 249.6c0-7.04 5.76-14.08 12.8-14.08H928c7.04 0 12.8 6.4 12.8 14.08v49.28h15.36V249.6c0-16-12.8-28.8-27.52-28.8h-75.52c-15.36 0-27.52 13.44-27.52 28.8v49.28h15.36V249.6z" fill="#00ABE0" p-id="3307"></path><path d="M940.8 298.88h-116.48v7.68c0 4.48 3.2 7.68 7.68 7.68h115.84c4.48 0 7.68-3.2 7.68-7.68v-7.68H940.8zM600.96 407.04H238.08c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h362.88c4.48 0 7.68 3.2 7.68 7.68 0 3.84-3.84 7.68-7.68 7.68zM600.96 509.44H238.08c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h362.88c4.48 0 7.68 3.2 7.68 7.68 0 3.84-3.84 7.68-7.68 7.68zM600.96 611.84H238.08c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h362.88c4.48 0 7.68 3.2 7.68 7.68s-3.84 7.68-7.68 7.68z" fill="#211D1C" p-id="3308"></path><path d="M266.24 369.28h-1.28c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h1.28c4.48 0 7.68 3.2 7.68 7.68s-3.2 7.68-7.68 7.68zM541.44 369.28h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68s-3.84 7.68-7.68 7.68z m-34.56 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68s-3.2 7.68-7.68 7.68z m-34.56 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68s-3.2 7.68-7.68 7.68z m-33.92 0H435.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68s-3.84 7.68-7.68 7.68z m-34.56 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68s-3.2 7.68-7.68 7.68z m-34.56 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68s-3.2 7.68-7.68 7.68z m-33.92 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68-0.64 4.48-3.84 7.68-7.68 7.68z m-34.56 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68s-3.84 7.68-7.68 7.68zM574.08 369.28h-1.28c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h1.28c4.48 0 7.68 3.2 7.68 7.68s-3.2 7.68-7.68 7.68zM266.24 471.68h-1.28c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h1.28c4.48 0 7.68 3.2 7.68 7.68s-3.2 7.68-7.68 7.68zM541.44 471.68h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68s-3.84 7.68-7.68 7.68z m-34.56 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68s-3.2 7.68-7.68 7.68z m-34.56 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68s-3.2 7.68-7.68 7.68z m-33.92 0H435.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68s-3.84 7.68-7.68 7.68z m-34.56 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68s-3.2 7.68-7.68 7.68z m-34.56 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68s-3.2 7.68-7.68 7.68z m-33.92 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68s-3.84 7.68-7.68 7.68z m-34.56 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68s-3.84 7.68-7.68 7.68zM574.08 471.68h-1.28c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h1.28c4.48 0 7.68 3.2 7.68 7.68s-3.2 7.68-7.68 7.68zM266.24 574.72h-1.28c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h1.28c4.48 0 7.68 3.2 7.68 7.68 0 3.84-3.2 7.68-7.68 7.68zM541.44 574.72h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68 0 3.84-3.84 7.68-7.68 7.68z m-34.56 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68 0 3.84-3.2 7.68-7.68 7.68z m-34.56 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68 0 3.84-3.2 7.68-7.68 7.68z m-33.92 0H435.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68 0 3.84-3.84 7.68-7.68 7.68z m-34.56 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68 0 3.84-3.2 7.68-7.68 7.68z m-34.56 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68 0 3.84-3.2 7.68-7.68 7.68z m-33.92 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68-0.64 3.84-3.84 7.68-7.68 7.68z m-34.56 0h-3.2c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h3.2c4.48 0 7.68 3.2 7.68 7.68 0 3.84-3.84 7.68-7.68 7.68zM574.08 574.72h-1.28c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h1.28c4.48 0 7.68 3.2 7.68 7.68 0 3.84-3.2 7.68-7.68 7.68z" fill="#00ABE0" p-id="3309"></path><path d="M676.48 941.44H84.48c-4.48 0-7.68-3.2-7.68-7.68v-94.72c0-4.48 3.2-7.68 7.68-7.68s7.68 3.2 7.68 7.68v87.04h584.96c16.64 0 30.08-13.44 30.08-30.08V158.72c0-16.64-13.44-30.08-30.08-30.08H92.16v92.16c0 4.48-3.2 7.68-7.68 7.68s-7.68-3.2-7.68-7.68V120.96c0-4.48 3.2-7.68 7.68-7.68h592c24.96 0 45.44 20.48 45.44 45.44V896c0 24.96-20.48 45.44-45.44 45.44z" fill="#211D1C" p-id="3310"></path><path d="M687.36 968.32h-576c-4.48 0-7.68-3.2-7.68-7.68s3.2-7.68 7.68-7.68h576c16.64 0 46.08-15.36 46.08-46.08V185.6c0-13.44-8.96-25.6-22.4-29.44-3.84-1.28-6.4-5.12-5.12-8.96 1.28-3.84 5.12-6.4 8.96-5.12 19.84 5.12 33.92 23.68 33.92 44.16v720.64c0 39.04-36.48 61.44-61.44 61.44zM84.48 808.96c-4.48 0-7.68-3.2-7.68-7.68v-157.44c0-4.48 3.2-7.68 7.68-7.68s7.68 3.2 7.68 7.68v157.44c0 3.84-3.84 7.68-7.68 7.68zM84.48 613.76c-4.48 0-7.68-3.2-7.68-7.68V448.64c0-4.48 3.2-7.68 7.68-7.68s7.68 3.2 7.68 7.68v157.44c0 3.84-3.84 7.68-7.68 7.68zM84.48 418.56c-4.48 0-7.68-3.2-7.68-7.68V259.2c0-4.48 3.2-7.68 7.68-7.68s7.68 3.2 7.68 7.68v151.68c0 4.48-3.84 7.68-7.68 7.68zM149.12 285.44c-16 0-31.36-8.96-39.04-22.4-1.92-3.84-0.64-8.32 2.56-10.24 3.84-1.92 8.32-0.64 10.24 2.56 5.12 9.6 15.36 15.36 26.24 15.36 16.64 0 30.08-13.44 30.08-30.08s-13.44-30.08-30.08-30.08c-10.88 0-21.12 5.76-26.24 15.36-1.92 3.84-7.04 5.12-10.24 2.56-3.84-1.92-5.12-7.04-2.56-10.24 8.32-14.08 23.04-23.04 39.68-23.04 24.96 0 45.44 20.48 45.44 45.44s-20.48 44.8-46.08 44.8zM149.12 475.52c-16 0-31.36-8.96-39.04-22.4-1.92-3.84-0.64-8.32 2.56-10.24 3.84-1.92 8.32-0.64 10.24 2.56 5.12 9.6 15.36 15.36 26.24 15.36 16.64 0 30.08-13.44 30.08-30.08s-13.44-30.08-30.08-30.08c-10.88 0-21.12 5.76-26.24 15.36-1.92 3.84-7.04 5.12-10.24 2.56-3.84-1.92-5.12-7.04-2.56-10.24 8.32-14.08 23.04-23.04 39.68-23.04 24.96 0 45.44 20.48 45.44 45.44s-20.48 44.8-46.08 44.8zM149.76 670.72c-16 0-31.36-8.96-39.68-22.4-1.92-3.84-0.64-8.32 2.56-10.24 3.84-1.92 8.32-0.64 10.24 2.56 5.12 9.6 15.36 15.36 26.24 15.36 16.64 0 30.08-13.44 30.08-30.08s-13.44-30.08-30.08-30.08c-10.88 0-21.12 5.76-26.24 15.36-1.92 3.84-7.04 5.12-10.24 2.56-3.84-1.92-5.12-7.04-2.56-10.24 8.32-14.08 23.04-23.04 39.68-23.04 24.96 0 45.44 20.48 45.44 45.44 0 24.32-20.48 44.8-45.44 44.8z" fill="#211D1C" p-id="3311"></path><path d="M149.76 865.28c-16 0-31.36-8.96-39.68-22.4-1.92-3.84-0.64-8.32 2.56-10.24 3.84-1.92 8.32-0.64 10.24 2.56 5.12 9.6 15.36 15.36 26.24 15.36 16.64 0 30.08-13.44 30.08-30.08s-13.44-30.08-30.08-30.08c-10.88 0-21.12 5.76-26.24 15.36-1.92 3.84-7.04 5.12-10.24 2.56-3.84-1.92-5.12-7.04-2.56-10.24 8.32-14.08 23.04-23.04 39.68-23.04 24.96 0 45.44 20.48 45.44 45.44 0 24.96-20.48 44.8-45.44 44.8zM111.36 968.32c-1.92 0-3.84-0.64-5.12-1.92l-26.88-26.88c-3.2-3.2-3.2-7.68 0-10.88s7.68-3.2 10.88 0l26.88 26.88c3.2 3.2 3.2 7.68 0 10.88-1.92 0.64-3.84 1.92-5.76 1.92z" fill="#211D1C" p-id="3312"></path><path d="M890.24 918.4c-3.2 0-5.76-1.92-7.04-5.12l-58.24-153.6c-1.28-3.84 0.64-8.32 4.48-9.6 3.84-1.28 8.32 0.64 9.6 4.48l51.2 135.04 51.2-135.04c1.28-3.84 5.76-5.76 9.6-4.48 3.84 1.28 5.76 5.76 4.48 9.6l-58.24 153.6c-0.64 3.2-3.84 5.12-7.04 5.12z" fill="#00ABE0" p-id="3313"></path><path d="M913.92 850.56c-1.92 0-3.84-0.64-5.12-1.92-8.32-7.04-28.8-7.04-37.12 0-3.2 2.56-7.68 2.56-10.88-0.64-2.56-3.2-2.56-7.68 0.64-10.88 14.08-12.8 43.52-12.8 57.6 0 3.2 2.56 3.2 7.68 0.64 10.88-1.28 1.92-3.84 2.56-5.76 2.56z" fill="#00ABE0" p-id="3314"></path><path d="M867.2 764.8c-4.48 0-7.68-3.2-7.68-7.68V341.76c0-4.48 3.2-7.68 7.68-7.68s7.68 3.2 7.68 7.68v415.36c0 4.48-3.84 7.68-7.68 7.68zM913.92 764.8c-4.48 0-7.68-3.2-7.68-7.68V341.76c0-4.48 3.2-7.68 7.68-7.68s7.68 3.2 7.68 7.68v415.36c0 4.48-3.2 7.68-7.68 7.68z" fill="#211D1C" p-id="3315"></path><path d="M948.48 764.8h-115.84c-4.48 0-7.68-3.2-7.68-7.68V341.76c0-4.48 3.2-7.68 7.68-7.68h115.84c4.48 0 7.68 3.2 7.68 7.68v415.36c0 4.48-3.2 7.68-7.68 7.68z m-108.16-15.36H940.8V349.44h-101.12v400z" fill="#211D1C" p-id="3316"></path><path d="M832.64 334.08c-1.28 0-1.92-0.64-1.92-1.92v-16c0-1.28 0.64-1.92 1.92-1.92 4.48 0 7.68-3.2 7.68-7.68s-3.2-7.68-7.68-7.68c-9.6 0-17.28 7.68-17.28 17.28v16c0 9.6 7.68 17.28 17.28 17.28 4.48 0 7.68-3.2 7.68-7.68s-3.84-7.68-7.68-7.68zM948.48 298.88c-4.48 0-7.68 3.2-7.68 7.68s3.2 7.68 7.68 7.68c1.28 0 1.92 0.64 1.92 1.92v16c0 1.28-0.64 1.92-1.92 1.92-4.48 0-7.68 3.2-7.68 7.68s3.2 7.68 7.68 7.68c9.6 0 17.28-7.68 17.28-17.28v-16c0-9.6-7.68-17.28-17.28-17.28z" fill="#211D1C" p-id="3317"></path><path d="M130.56 266.24h-62.08c-14.72 0-26.24-12.16-26.24-26.24s12.16-26.24 26.24-26.24h62.08c14.72 0 26.24 12.16 26.24 26.24 0 14.72-11.52 26.24-26.24 26.24z m-62.08-37.76c-6.4 0-11.52 5.12-11.52 11.52s5.12 11.52 11.52 11.52h62.08c6.4 0 11.52-5.12 11.52-11.52s-5.12-11.52-11.52-11.52h-62.08zM130.56 456.32h-62.08c-14.72 0-26.24-12.16-26.24-26.24 0-14.72 12.16-26.24 26.24-26.24h62.08c14.72 0 26.24 12.16 26.24 26.24 0 14.08-11.52 26.24-26.24 26.24z m-62.08-37.76c-6.4 0-11.52 5.12-11.52 11.52s5.12 11.52 11.52 11.52h62.08c6.4 0 11.52-5.12 11.52-11.52s-5.12-11.52-11.52-11.52h-62.08zM130.56 651.52h-62.08c-14.72 0-26.24-12.16-26.24-26.24 0-14.72 12.16-26.24 26.24-26.24h62.08c14.72 0 26.24 12.16 26.24 26.24 0.64 14.08-11.52 26.24-26.24 26.24z m-62.08-37.76c-6.4 0-11.52 5.12-11.52 11.52s5.12 11.52 11.52 11.52h62.08c6.4 0 11.52-5.12 11.52-11.52s-5.12-11.52-11.52-11.52h-62.08zM130.56 846.72h-62.08c-14.72 0-26.24-12.16-26.24-26.24 0-14.72 12.16-26.24 26.24-26.24h62.08c14.72 0 26.24 12.16 26.24 26.24 0.64 14.08-11.52 26.24-26.24 26.24z m-62.08-37.76c-6.4 0-11.52 5.12-11.52 11.52s5.12 11.52 11.52 11.52h62.08c6.4 0 11.52-5.12 11.52-11.52s-5.12-11.52-11.52-11.52h-62.08z" fill="#00ABE0" p-id="3318"></path></svg>
            </el-icon>
            <p style="user-select: none; text-align: center;width: 150px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap" @dblclick="dbClickName(file)">{{file.markdownName}}</p>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-page-header>

    <el-dialog title="修改名称" v-model="editNameDialog">
      <el-form :model="clickFile.markdownName">
        <el-form-item label="文件名称" required>
          <el-input v-model="clickFile.markdownName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="editFileFolder">确 定</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import {mapState} from "vuex";
import {addFile, selectFileListByFilePath, updateFile} from "@/api/file";
import {deleteMarkdown, insertMarkdown, selectMarkdownByPath, updateMarkdown} from "@/api/markdown";
import {ElMessage} from "element-plus";
export default {
  name: "markdownList",
  computed: {
    ...mapState(['user'])
  },
  watch: {
    $route() {
      const _this = this
      this.init()
    }
  },
  created() {
    this.init()
  },
  data() {
    return {
      fileForm:{},
      editNameDialog:false,
      clickFile: {},
      addFileFolderDialogVisible:false,
      filePath:'',
      fileFolderList: [],
      markdownList: [],
      fileList: []
    }
  },
  methods: {
    cancelEdit() {
      this.clickFile = {}
      this.editNameDialog = false
    },
    editFileFolder() {
      const _this = this
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].markdownName === this.clickFile.markdownName && this.fileList[i].markdownType === this.clickFile.markdownType) {

          ElMessage({
            type: 'info',
            message: '文件名已存在',
          })
          return;
        }
      }
      console.log(this.clickFile)
      updateMarkdown(this.clickFile).then(() => {
        _this.editNameDialog = false
        _this.getFileList()
      })
    },
    dbClickName(file) {
      this.clickFile.markdownId = file.markdownId
      this.clickFile.userId = file.userId
      this.clickFile.content = file.content
      this.clickFile.markdownPath = file.markdownPath
      this.clickFile.markdownType = file.markdownType
      console.log(file)
      this.editNameDialog = true

    },
    dbClick(file) {
      console.log("双击了")
      let path = file.markdownPath
      path = path+"/"+file.markdownName
      if (file.markdownType === 'fileFolder') {
        this.$router.push(path).then(function () {
        })
      } else {
        window.ipcRenderer.send('openMarkdown',file.content, file.markdownId, file.userId, file.markdownName, file.markdownPath, file.markdownType)
      }
    },
    addMarkdown() {
      const _this = this
      let path = "/mainControl"
      for (let i = 0; i <this.$route.params.filePath.length ; i++) {
        path = path + "/" + this.$route.params.filePath[i]
      }
      console.log(path)
      const file = {
        userId:this.user.userId,
        markdownType: this.fileForm.fileType,
        markdownName: this.fileForm.fileName,
        markdownPath: path,
      }
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].markdownName === file.markdownName && this.fileList[i].markdownType === file.markdownType) {
          ElMessage({
            type: 'info',
            message: '文件名已存在',
          })
          return;
        }
      }
      insertMarkdown(file).then(function (resp) {
        _this.addFileFolderDialogVisible = false
        _this.getFileList()
        ElMessage({
          type: 'success',
          message: '成功',
        })
      })
    },

    getFilePath() {
      let path = "/mainControl"
      for (let i = 0; i <this.$route.params.filePath.length ; i++) {
        path = path + "/" + this.$route.params.filePath[i]
      }
      this.filePath = path
    },
    getFileList() {
      const _this = this
      const filePathVO = {
        filePath: this.filePath,
        userId: this.user.userId
      }
      selectMarkdownByPath(filePathVO).then(function (resp) {

        _this.fileFolderList = resp.data.fileFolder
        _this.markdownList = resp.data.markdown
        _this.fileList = _this.fileFolderList.concat(_this.markdownList)
      })
    },
    init() {
      this.getFilePath();
      this.getFileList()
    },
    getBreadCrumb(item, index) {
      let path = "/mainControl"
      for (let i = 0; i < index; i++) {
        path = path + "/" + this.$route.params.filePath[i]
      }
      return {path: path}
    },
    goBack() {
      this.$router.go(-1)
    },
    deleteHandle(file) {
      const _this = this
      deleteMarkdown(file).then(() => {
        _this.getFileList()
      })
    }

  }
}
</script>

<style scoped>
.markdown:focus {
  border-radius: 10px;
  background-color: #66b1ff;
}
</style>