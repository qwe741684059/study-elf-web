<template>
  <div >
    <el-page-header @back="goBack">
      <template #content>
        <div style="height: 25px">
          <el-button type="primary" @click="addFileFolderDialogVisible = true">
            <el-icon ><FolderAdd></FolderAdd></el-icon>
            <span>fileFolder</span>
          </el-button>

          <el-dialog title="新建文件夹" v-model="addFileFolderDialogVisible">
            <el-form :model="fileForm">
              <el-form-item label="文件夹名称" prop="fileName" required>
                <el-input v-model="fileForm.fileName"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <el-button @click="addFileFolderDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addFileFolder">确 定</el-button>
            </template>
          </el-dialog>

          <el-upload
              action="http://localhost:8181/file/uploadFile"
              :show-file-list="false"
              :on-success="handleFileSuccess"
              :before-upload="beforeFileUpload"
              accept=".doc,.docx,.pdf,.txt"
              :data="{filePath: filePath, userId:user.userId}"
              style="position: relative;left: 140px;bottom: 31px"
          >
            <el-button type="primary"><el-icon><Upload/></el-icon>upload</el-button>
          </el-upload>
        </div>
      </template>

      <template #breadcrumb>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/mainControl' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="getBreadCrumb(item, index)" v-for="(item, index) in this.$route.params.filePath">{{item}}</el-breadcrumb-item>
<!--          <el-breadcrumb-item :to="{ path: '/mainControl/11111111/promotion list'}">promotion list</el-breadcrumb-item>-->
<!--          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>-->
        </el-breadcrumb>
      </template>
      <el-descriptions  :column="6" style="margin-top: 20px" >
        <el-descriptions-item v-for="(file, index) in fileList" :key="index"  :span="1" align="left" style="height: 100px" width="190">
          <div style="display: inline-flex;flex-direction: column; align-items: center;width: 150px;height: 100px;" class="myFile" :tabindex="index"  @keyup.delete="deleteHandle(file)">
            <el-icon  size="30" @dblclick="dbClick(file)">
              <svg v-if="file.fileType === 'fileFolder'" t="1682143232707" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1244" width="200" height="200"><path d="M918.673 883H104.327C82.578 883 65 867.368 65 848.027V276.973C65 257.632 82.578 242 104.327 242h814.346C940.422 242 958 257.632 958 276.973v571.054C958 867.28 940.323 883 918.673 883z" fill="#FFE9B4" p-id="1245"></path><path d="M512 411H65V210.37C65 188.597 82.598 171 104.371 171h305.92c17.4 0 32.71 11.334 37.681 28.036L512 411z" fill="#FFB02C" p-id="1246"></path><path d="M918.673 883H104.327C82.578 883 65 865.42 65 843.668V335.332C65 313.58 82.578 296 104.327 296h814.346C940.422 296 958 313.58 958 335.332v508.336C958 865.32 940.323 883 918.673 883z" fill="#FFCA28" p-id="1247"></path></svg>
              <svg v-if="file.fileType === 'txt'" t="1682221830925" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2686" width="200" height="200"><path d="M0 0h1024v1024H0z" fill-opacity="0" p-id="2687"></path><path d="M704 0H192c-38.4 0-64 25.6-64 64v320h576c38.4 0 64 25.6 64 64v416c0 38.4-25.6 64-64 64H128v32c0 38.4 25.6 64 64 64h768c38.4 0 64-25.6 64-64V320L704 0z" fill="#EAEAEA" p-id="2688"></path><path d="M704 0v256c0 38.4 25.6 64 64 64h256L704 0z" fill="#434854" p-id="2689"></path><path d="M768 320l256 256V320z" opacity=".1" p-id="2690"></path><path d="M704 832c0 19.2-12.8 32-32 32H32c-19.2 0-32-12.8-32-32V480c0-19.2 12.8-32 32-32h640c19.2 0 32 12.8 32 32v352z" fill="#A7A8FF" p-id="2691"></path><path d="M588.8 544h-128c-6.4 0-12.8 6.4-12.8 19.2s6.4 12.8 12.8 12.8H512v179.2c0 6.4 6.4 12.8 12.8 12.8s12.8-6.4 12.8-12.8V576h51.2c6.4 0 12.8-6.4 12.8-12.8s0-19.2-12.8-19.2z m-211.2 6.4c6.4-6.4 19.2-6.4 25.6-6.4 6.4 0 6.4 6.4 6.4 6.4v12.8l-51.2 83.2L416 736v12.8c0 6.4-6.4 6.4-6.4 12.8-12.8 6.4-19.2 6.4-25.6 0l-51.2-76.8-44.8 76.8c-6.4 6.4-12.8 6.4-25.6 6.4-6.4 0-6.4-6.4-6.4-6.4v-12.8l57.6-89.6-51.2-89.6v-12.8c0-6.4 6.4-6.4 6.4-6.4 6.4-6.4 19.2 0 25.6 6.4l44.8 70.4 38.4-76.8zM204.8 544c6.4 0 12.8 6.4 12.8 12.8s0 19.2-12.8 19.2H160v179.2c0 6.4-6.4 12.8-12.8 12.8s-19.2-6.4-19.2-12.8V576H76.8c-6.4 0-12.8-6.4-12.8-12.8s6.4-12.8 12.8-12.8h128z" fill="#FFFFFF" p-id="2692"></path></svg>
              <svg v-if="file.fileType === 'doc'" t="1682142791569" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3125" width="200" height="200"><path d="M901.632 926.72c0 12.8-5.12 25.088-14.336 34.304-9.216 9.216-21.504 14.336-34.304 14.336H170.496c-12.8 0-25.6-5.12-34.304-14.336-9.216-9.216-14.336-21.504-14.336-34.304V48.64c0-12.8 5.12-25.6 14.336-34.304C144.896 5.12 157.696 0 170.496 0h418.816c12.8 0 25.6 5.12 34.816 14.336l263.68 263.68c9.216 9.216 14.336 21.504 14.336 34.816V926.72z" fill="#EBECF0" p-id="3126"></path><path d="M901.632 926.72v48.64c0 12.8-5.12 25.6-14.336 34.304-9.216 9.216-21.504 14.336-34.304 14.336H170.496c-27.136 0-48.64-22.016-48.64-48.64V926.72c0 12.8 5.12 25.088 14.336 34.304 9.216 9.216 21.504 14.336 34.304 14.336h682.496c27.136 0 48.64-22.016 48.64-48.64z" fill="#C1C7D0" p-id="3127"></path><path d="M24.064 536.576h975.36v243.712c0 27.136-22.016 48.64-48.64 48.64H73.216c-12.8 0-25.6-5.12-34.304-14.336-9.216-9.216-14.336-21.504-14.336-34.816v-243.2z" fill="#003771" p-id="3128"></path><path d="M121.856 536.576V438.784L24.064 536.576h97.792z m779.776 0l1.024-97.792 97.28 97.792h-98.304z" fill="#00213F" p-id="3129"></path><path d="M901.632 312.832v6.656h-263.68c-27.136 0-48.64-22.016-48.64-48.64V0c12.8 0 25.6 5.12 34.816 14.336l264.192 263.68c8.704 9.216 13.824 21.504 13.312 34.816z" fill="#C1C7D0" p-id="3130"></path><path d="M296.448 769.536H215.552v-188.928h83.456c65.024 0.512 97.792 30.72 98.816 90.624-0.512 65.024-33.792 98.304-101.376 98.304zM276.992 624.64v100.864h13.312c29.696 0 44.032-16.896 44.032-51.2 2.048-35.84-12.8-52.224-45.056-49.152h-12.288zM511.488 574.976c62.464 2.56 95.744 35.84 99.84 98.816-2.56 62.976-35.84 95.744-99.84 98.816-63.488-2.048-96.768-35.328-98.816-99.84 3.584-61.44 36.352-94.208 98.816-97.792z m0 46.592c-23.552 0.512-35.84 17.92-36.864 52.224 1.536 35.84 13.824 53.76 36.864 54.272 24.576-0.512 37.376-18.944 37.888-54.272-1.024-34.816-13.824-52.224-37.888-52.224zM816.64 652.288h-58.368c-2.56-19.968-13.824-30.208-33.792-30.72-22.528 0.512-34.304 18.944-34.816 55.296 0 34.304 12.288 51.2 36.864 51.2 18.432 0 29.184-10.752 31.744-31.744h59.392c-6.656 48.64-36.864 74.24-90.624 76.288-64.512-2.048-97.792-34.816-99.84-97.792 3.584-62.464 34.816-95.744 94.72-99.84 57.344 1.024 88.576 26.624 94.72 77.312z" fill="#FFFFFF" p-id="3131"></path></svg>
              <svg v-if="file.fileType === 'docx'" t="1682143004229" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3273" width="200" height="200"><path d="M901.632 926.72c0 12.8-5.12 25.088-14.336 34.304-9.216 9.216-21.504 14.336-34.304 14.336H170.496c-12.8 0-25.6-5.12-34.304-14.336-9.216-9.216-14.336-21.504-14.336-34.304V48.64c0-12.8 5.12-25.6 14.336-34.304C144.896 5.12 157.696 0 170.496 0h418.816c12.8 0 25.6 5.12 34.816 14.336l263.68 263.68c9.216 9.216 14.336 21.504 14.336 34.816V926.72z" fill="#EBECF0" p-id="3274"></path><path d="M901.632 926.72v48.64c0 12.8-5.12 25.6-14.336 34.304-9.216 9.216-21.504 14.336-34.304 14.336H170.496c-27.136 0-48.64-22.016-48.64-48.64V926.72c0 12.8 5.12 25.088 14.336 34.304 9.216 9.216 21.504 14.336 34.304 14.336h682.496c27.136 0 48.64-22.016 48.64-48.64z" fill="#C1C7D0" p-id="3275"></path><path d="M24.064 536.576h975.36v243.712c0 27.136-22.016 48.64-48.64 48.64H73.216c-12.8 0-25.6-5.12-34.304-14.336-9.216-9.216-14.336-21.504-14.336-34.816v-243.2z" fill="#003771" p-id="3276"></path><path d="M121.856 536.576V438.784L24.064 536.576h97.792z m779.776 0l1.024-97.792 97.28 97.792h-98.304z" fill="#00213F" p-id="3277"></path><path d="M901.632 312.832v6.656h-263.68c-27.136 0-48.64-22.016-48.64-48.64V0c12.8 0 25.6 5.12 34.816 14.336l264.192 263.68c8.704 9.216 13.824 21.504 13.312 34.816z" fill="#C1C7D0" p-id="3278"></path><path d="M194.56 769.536H113.152v-188.928h83.456c65.024 0.512 97.792 30.72 98.816 90.624-0.512 65.024-33.792 98.304-100.864 98.304zM175.104 624.64v100.864h13.312c29.696 0 44.032-16.896 44.032-51.2 2.048-35.84-12.8-52.224-45.056-49.152h-12.288zM409.088 574.976c62.464 2.56 95.744 35.84 99.84 98.816-2.56 62.976-35.84 95.744-99.84 98.816-63.488-2.048-96.768-35.328-98.816-99.84 3.584-61.44 36.352-94.208 98.816-97.792z m0 46.592c-23.552 0.512-35.84 17.92-36.864 52.224 1.536 35.84 13.824 53.76 36.864 54.272 24.576-0.512 37.376-18.944 37.888-54.272-1.024-34.816-13.824-52.224-37.888-52.224zM714.24 652.288h-58.368c-2.56-19.968-13.824-30.208-33.792-30.72-22.528 0.512-34.304 18.944-34.816 55.296 0 34.304 12.288 51.2 36.864 51.2 18.432 0 29.184-10.752 31.744-31.744h59.392c-6.656 48.64-36.864 74.24-90.624 76.288-64.512-2.048-97.792-34.816-99.84-97.792 3.584-62.464 34.816-95.744 94.72-99.84 57.344 1.024 88.576 26.624 94.72 77.312zM826.368 715.776l-30.72 53.248h-69.632l66.56-98.816-60.416-90.112h70.144l26.624 48.128 27.648-48.128H926.72L861.184 670.72l64.512 98.816h-70.144l-29.184-53.76z" fill="#FFFFFF" p-id="3279"></path></svg>
              <svg v-if="file.fileType === 'xls'" t="1682143027727" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3421" width="200" height="200"><path d="M901.632 926.72c0 12.8-5.12 25.088-14.336 34.304-9.216 9.216-21.504 14.336-34.304 14.336H170.496c-12.8 0-25.6-5.12-34.304-14.336-9.216-9.216-14.336-21.504-14.336-34.304V48.64c0-12.8 5.12-25.6 14.336-34.304C144.896 5.12 157.696 0 170.496 0h418.816c12.8 0 25.6 5.12 34.816 14.336l263.68 263.68c9.216 9.216 14.336 21.504 14.336 34.816V926.72z" fill="#EBECF0" p-id="3422"></path><path d="M901.632 926.72v48.64c0 12.8-5.12 25.6-14.336 34.304-9.216 9.216-21.504 14.336-34.304 14.336H170.496c-27.136 0-48.64-22.016-48.64-48.64V926.72c0 12.8 5.12 25.088 14.336 34.304 9.216 9.216 21.504 14.336 34.304 14.336h682.496c27.136 0 48.64-22.016 48.64-48.64z" fill="#C1C7D0" p-id="3423"></path><path d="M24.064 536.576h975.36v243.712c0 27.136-22.016 48.64-48.64 48.64H73.216c-12.8 0-25.6-5.12-34.304-14.336-9.216-9.216-14.336-21.504-14.336-34.816v-243.2z" fill="#47B347" p-id="3424"></path><path d="M121.856 536.576V438.784L24.064 536.576h97.792z m779.776 0l1.024-97.792 97.28 97.792h-98.304z" fill="#2A932A" p-id="3425"></path><path d="M901.632 312.832v6.656h-263.68c-27.136 0-48.64-22.016-48.64-48.64V0c12.8 0 25.6 5.12 34.816 14.336l264.192 263.68c8.704 9.216 13.824 21.504 13.312 34.816z" fill="#C1C7D0" p-id="3426"></path><path d="M330.752 715.776l-30.72 53.248H229.888l66.56-98.816-60.416-90.624h69.632l26.624 48.128 27.648-48.128H430.08L365.568 670.72 430.08 769.536H360.448l-29.696-53.76zM600.064 769.536H452.096v-188.928h62.464v144.896h85.504v44.032zM782.848 634.88h-58.368c-0.512-6.144-3.584-10.24-9.216-12.288-3.584-2.56-8.704-4.096-15.36-4.096-13.824 0-20.48 3.584-20.48 11.264 0 6.656 12.288 13.312 36.864 19.456 48.128 11.776 72.192 31.744 72.192 59.392-1.536 41.984-30.72 62.976-88.576 63.488-50.176-2.048-78.336-22.528-84.48-61.44h59.392c2.048 6.656 5.632 11.776 10.24 15.36 4.608 2.56 10.752 4.096 17.408 4.096 17.92 0 26.624-4.608 26.624-13.312 0-7.68-11.776-13.824-35.84-19.456-48.64-11.776-73.216-32.256-73.216-61.44 1.536-38.912 28.672-59.392 81.408-60.416 48.128 0.512 75.264 19.968 81.408 59.392z" fill="#FFFFFF" p-id="3427"></path></svg>
              <svg v-if="file.fileType === 'xlsx'" t="1682143057835" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3569" width="200" height="200"><path d="M901.632 926.72c0 12.8-5.12 25.088-14.336 34.304-9.216 9.216-21.504 14.336-34.304 14.336H170.496c-12.8 0-25.6-5.12-34.304-14.336-9.216-9.216-14.336-21.504-14.336-34.304V48.64c0-12.8 5.12-25.6 14.336-34.304C144.896 5.12 157.696 0 170.496 0h418.816c12.8 0 25.6 5.12 34.816 14.336l263.68 263.68c9.216 9.216 14.336 21.504 14.336 34.816V926.72z" fill="#EBECF0" p-id="3570"></path><path d="M901.632 926.72v48.64c0 12.8-5.12 25.6-14.336 34.304-9.216 9.216-21.504 14.336-34.304 14.336H170.496c-27.136 0-48.64-22.016-48.64-48.64V926.72c0 12.8 5.12 25.088 14.336 34.304 9.216 9.216 21.504 14.336 34.304 14.336h682.496c27.136 0 48.64-22.016 48.64-48.64z" fill="#C1C7D0" p-id="3571"></path><path d="M24.064 536.576h975.36v243.712c0 27.136-22.016 48.64-48.64 48.64H73.216c-12.8 0-25.6-5.12-34.304-14.336-9.216-9.216-14.336-21.504-14.336-34.816v-243.2z" fill="#47B347" p-id="3572"></path><path d="M121.856 536.576V438.784L24.064 536.576h97.792z m779.776 0l1.024-97.792 97.28 97.792h-98.304z" fill="#2A932A" p-id="3573"></path><path d="M901.632 312.832v6.656h-263.68c-27.136 0-48.64-22.016-48.64-48.64V0c12.8 0 25.6 5.12 34.816 14.336l264.192 263.68c8.704 9.216 13.824 21.504 13.312 34.816z" fill="#C1C7D0" p-id="3574"></path><path d="M228.352 715.776l-30.72 53.248H127.488L194.56 670.72l-60.416-90.624h69.632l26.624 48.128 27.648-48.128H327.68L263.168 670.72 327.68 769.536H258.048l-29.696-53.76zM497.664 769.536H349.696v-188.928h62.464v144.896h85.504v44.032zM680.448 634.88h-58.368c-0.512-6.144-3.584-10.24-9.216-12.288-3.584-2.56-8.704-4.096-15.36-4.096-13.824 0-20.48 3.584-20.48 11.264 0 6.656 12.288 13.312 36.864 19.456 48.128 11.776 72.192 31.744 72.192 59.392-1.536 41.984-30.72 62.976-88.576 63.488-50.176-2.048-78.336-22.528-84.48-61.44h59.392c2.048 6.656 5.632 11.776 10.24 15.36 4.608 2.56 10.752 4.096 17.408 4.096 17.92 0 26.624-4.608 26.624-13.312 0-7.68-11.776-13.824-35.84-19.456-48.64-11.776-73.216-32.256-73.216-61.44 1.536-38.912 28.672-59.392 81.408-60.416 48.128 0.512 75.264 19.968 81.408 59.392zM796.672 715.776l-30.72 53.248H696.32l66.56-98.816-60.416-90.624h70.144l26.624 48.128 27.648-48.128h69.632L831.488 670.72l64.512 98.816h-69.632l-29.696-53.76z" fill="#FFFFFF" p-id="3575"></path></svg>
              <svg v-if="file.fileType === 'pdf'" t="1682143077182" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3713" width="200" height="200"><path d="M901.630597 926.725072v48.637464a47.543715 47.543715 0 0 1-14.33749 34.299975 48.466214 48.466214 0 0 1-34.312474 14.337489H170.493641c-26.86248 0-48.637464-21.774984-48.637464-48.637464v-48.637464c0.1625 26.79998 21.849984 48.474964 48.637464 48.637464h682.499492c26.86248 0 48.637464-21.774984 48.637464-48.637464z" fill="#C1C7D0" p-id="3714"></path><path d="M121.856177 536.575363v-97.799927L24.06875 536.575363h97.787427z m779.77442 0l1.024999-97.799927 97.274927 97.799927h-98.299926z" fill="#D30000" p-id="3715"></path><path d="M631.768297 21.975746l-7.637494-7.637494 0 0 7.649994 7.637494zM898.218099 293.413044a47.849964 47.849964 0 0 1 3.399998 19.424986h0.0125v6.649995H637.943293c-26.86248 0-48.637464-21.774984-48.637464-48.637464V0.000762H170.493641A47.581215 47.581215 0 0 0 136.193667 14.325752a47.549965 47.549965 0 0 0-14.33749 34.312474v878.086846a48.489964 48.489964 0 0 0 14.33749 34.299975 47.543715 47.543715 0 0 0 34.299974 14.337489h682.499492c26.78748-0.1625 48.462464-21.837484 48.637464-48.637464h0.512499V312.83803c0.0375-6.737495-1.324999-13.33749-3.924997-19.424986z" fill="#EBECF0" p-id="3716"></path><path d="M637.943293 319.488025h263.687304v-6.649995h-0.0125a47.849964 47.849964 0 0 0-3.399998-19.424986 47.768714 47.768714 0 0 0-9.912493-15.387489L631.768297 21.975746l-7.649994-7.637494A49.667463 49.667463 0 0 0 589.305829 0.000762v270.849799c0 26.86248 21.774984 48.637464 48.637464 48.637464z" fill="#C1C7D0" p-id="3717"></path><path d="M323.231027 619.500301c-5.549996-4.474997-14.424989-6.712495-26.62498-6.712495h-24.724982v56.299958h26.84998c21.874984 0 32.812476-9.312493 32.812476-27.924979 0-9.962493-2.774998-17.187487-8.312494-21.662484z m180.887366-5.187496h-32.199976v135.949899h34.024974c22.687483 0 39.69997-5.674996 51.037462-17.012487 11.337492-11.337492 17.012487-28.049979 17.012488-50.124963s-6.024996-38.812471-18.087487-50.812462c-12.049991-11.999991-29.324978-17.999987-51.799961-17.999987z" fill="#FF1D1D" p-id="3718"></path><path d="M24.58125 536.575363v243.199819a48.726214 48.726214 0 0 0 14.337489 34.812474 47.543715 47.543715 0 0 0 34.299974 14.337489h877.574347c26.86248 0 48.637464-21.774984 48.637464-48.637464V536.575363H24.58125z m353.499736 137.249898c-2.212498 3.824997-4.887496 7.324995-7.999994 10.537492-4.749996 4.912496-10.537492 9.112493-17.399987 12.574991-11.337492 5.749996-25.349981 8.624994-42.037468 8.624993h-38.762472v83.774938h-53.71246V576.175333h89.874934c24.612482 0 43.837467 5.674996 57.674957 17.012488 13.83749 11.349992 20.749985 27.33748 20.749984 47.987464 0 12.112491-2.799998 22.987483-8.387494 32.649976z m220.737336 87.362435h-0.0125c-20.199985 18.762486-49.362463 28.149979-87.512435 28.149979h-93.08743V576.175333h89.887433c25.837481 0 47.887464 4.474997 66.14995 13.42499s31.962476 21.462484 41.12497 37.537473c9.149993 16.074988 13.73749 34.437474 13.737489 55.087458 0 33.874975-10.099992 60.199955-30.287477 78.962442z m206.512346-146.874891l-86.212436 0.0125v46.537465h86.212436v38.449972h-86.212436v90.024933h-53.71246V576.175333h139.924896v38.137472z" fill="#FF1D1D" p-id="3719"></path><path d="M352.681005 696.937744c-11.349992 5.749996-25.362481 8.624994-42.037468 8.624993 16.687488 0 30.699977-2.874998 42.037468-8.624993zM370.080992 684.362753c3.112498-3.212498 5.787496-6.712495 7.999994-10.537492-2.212498 3.824997-4.899996 7.324995-7.999994 10.537492zM418.205957 576.175333h0.0125v213.162342h-0.0125z" fill="#FFFFFF" p-id="3720"></path></svg>
            </el-icon>
            <p style="user-select: none; text-align: center;width: 150px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap" @dblclick="dbClickName(file)">{{file.fileName}}</p>
          </div>
        </el-descriptions-item>
      </el-descriptions>

    </el-page-header>
    <el-dialog title="修改名称" v-model="editNameDialog">
      <el-form :model="clickFile.fileName">
        <el-form-item label="文件夹名称" required>
          <el-input v-model="clickFile.fileName"></el-input>
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
import {addFile, deleteFile, selectFileListByFilePath, updateFile} from "@/api/file";
import {ElMessage} from "element-plus";

export default {
  name: "FileList",
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
    const _this = this
    this.init()
  },
  data() {
    return {
      fileForm:{},
      clickFile:{},
      editNameDialog:false,
      addFileFolderDialogVisible:false,
      filePath:'',
      fileFolderList: [],
      documentList: [],
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
      for (let i = 0; i < this.fileFolderList.length; i++) {
        if (this.fileFolderList[i].fileName === this.clickFile.fileName) {
          ElMessage({
            type: 'info',
            message: '文件夹名已存在',
          })
          return;
        }
      }

      updateFile(this.clickFile).then(() => {
        _this.editNameDialog = false
        _this.getFileList()
      })
    },
    dbClickName(file) {
      if (file.fileType === 'fileFolder') {
        this.clickFile.fileId = file.fileId
        this.clickFile.userId = file.userId
        this.clickFile.fileType = file.fileType
        this.clickFile.filePath = file.filePath
        this.clickFile.serverPath = file.serverPath
        this.clickFile.readPath = file.readPath
        this.editNameDialog = true
      } else {

      }

    },
    dbClick(file) {
      console.log("双击了")
      let path = file.filePath
      path = path+"/"+file.fileName
      if (file.fileType === 'fileFolder') {
        this.$router.push(path).then(function () {
        })
      } else {
        let documentType = 'word'

        window.ipcRenderer.send('openOffice',file.fileType,file.fileName,file.readPath, documentType)
      }
    },
    addFileFolder() {
      const _this = this
      let path = "/mainControl"
      for (let i = 0; i <this.$route.params.filePath.length ; i++) {
        path = path + "/" + this.$route.params.filePath[i]
      }
      console.log(path)
      const file = {
        userId:this.user.userId,
        fileType: 'fileFolder',
        fileName: this.fileForm.fileName,
        filePath: path,
      }
      for (let i = 0; i < this.fileFolderList.length; i++) {
        if (this.fileFolderList[i].fileName === file.fileName) {
          ElMessage({
            type: 'info',
            message: '文件夹名已存在',
          })
          return;
        }
      }
      addFile(file).then(function (resp) {
        _this.addFileFolderDialogVisible = false
        ElMessage({
          type: 'success',
          message: '成功',
        })
        _this.getFileList()
      })
    },
    handleFileSuccess() {
      this.getFileList()
      ElMessage({
        type: 'success',
        message: '成功',
      })
    },
    beforeFileUpload(data) {

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
      selectFileListByFilePath(filePathVO).then(function (resp) {
        _this.fileFolderList = resp.data.fileFolder
        _this.documentList = resp.data.document
        _this.fileList = _this.fileFolderList.concat(_this.documentList)
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
      deleteFile(file).then(() => {
        _this.getFileList()
      })
    }

  }
}
</script>

<style>
.myFile:focus{
  border-radius: 10px;
  background-color: #66b1ff;
}
</style>