'use strict'

import path from 'path'
import {app, BrowserWindow, ipcMain, Menu, nativeImage, protocol, Tray} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'
import {openMainControl} from "@/utils/menuUtil";

const isDevelopment = process.env.NODE_ENV !== 'production'

let win = null
let tray
let configWindow = null

// 菜单模板
const menuTemplate = [
  {
    label: '主面板',
    click: openMainControl
  },
  {
    label: '设置',
    click: openConfig
  },
  {
    label: '隐藏',
    click: hidden
  }

];


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    frame: false,
    transparent: true,
    fullscreen: true,
    webPreferences: {
      preload:path.join(__dirname, 'preload.js'),
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    await win.loadURL('app://./index.html')
  }
  win.setAlwaysOnTop(true, 'screen-saver')
  win.setSkipTaskbar(true)
  ipcMain.on('set-ignore-mouse-events', (event, ...args) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win.setIgnoreMouseEvents(...args)
  })

  const menu = Menu.buildFromTemplate(menuTemplate);
  ipcMain.on('menu', (ev, arg) => {
    menu.popup({
      window: win
    });
  })

  // 获得静态资源路径
  ipcMain.on("getModelPath", (event, val) => {
    event.returnValue = path.join(app.getAppPath(), '/../src/config.json')
  })

  ipcMain.on("config-relaunch", (event, val) => {
    win.reload()
  })

  ipcMain.on('close-main-control', (event, ...args) => {
    let win = BrowserWindow.fromWebContents(event.sender)
    win.close()
    win = null
  })
  ipcMain.on('reload', (event, ...args) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win.reload()
  })
  let officeWindow = null
  ipcMain.on('openOffice',(event, ...args) => {
    console.log("打开Office")
    if (officeWindow) {
      officeWindow.close()
      officeWindow = null
    }
      officeWindow = new BrowserWindow( {
        show: false,
        // fullscreen:true,
        // resizable:false,
        webPreferences: {
          preload:path.join(__dirname, 'preload.js'),
          nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
          contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
        }
      } )
      officeWindow.loadURL('http://localhost:8080/office').then()
      officeWindow.on('close', () => {
        officeWindow = null
      })
      officeWindow.once('ready-to-show', () => {
        officeWindow.webContents.send('officeData',args)
        officeWindow.show()
      })

  })

  let markdownWindow = null
  ipcMain.on('openMarkdown',(event, ...args) => {
    console.log("打开markdown")
    if (markdownWindow) {
      markdownWindow.close()
      markdownWindow = null
    }
    markdownWindow = new BrowserWindow( {
      show: false,
      // fullscreen:true,
      // resizable:false,
      webPreferences: {
        preload:path.join(__dirname, 'preload.js'),
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
      }
    } )
    markdownWindow.loadURL('http://localhost:8080/markdown').then()
    markdownWindow.on('close', () => {
      markdownWindow = null
    })
    markdownWindow.once('ready-to-show', () => {
      markdownWindow.webContents.send('markdownData',args)
      markdownWindow.show()
    })

  })




}


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()

})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  await createWindow()

})
app.whenReady().then(() => {
  let dir = path.join(app.getAppPath(), '/../src/assets/logo.png')
  const icon = nativeImage.createFromPath(dir)
  tray = new Tray(icon)
  tray.setToolTip('This is my application')
  tray.setTitle('This is my title')
  let menu = Menu.buildFromTemplate(([
    {label: '打开', click:show},
    {label: '关闭', click: app.quit}
  ]))
  tray.setContextMenu(menu)
  tray.on('double-click', () => {
    setTimeout(() => {
      win.show()
    },300)
  })
})



// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}


function show() {
  win.show()
  win.setSkipTaskbar(true)
}

function hidden() {
  win.hide()
  win.setSkipTaskbar(true)
}

function openConfig() {
  if (configWindow !== null) {
    configWindow.focus()
  } else {
    configWindow = new BrowserWindow({
      height:230,
      width: 600,
      webPreferences: {
        preload:path.join(__dirname, 'preload.js'),
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
      }
    })
    configWindow.loadURL("http://localhost:8080/config")
    configWindow.on('close', () => {
      configWindow = null
    })
    configWindow.once('ready-to-show', () => {
      configWindow.show()
    })
    // configWindow.on('blur', () => {
    //   configWindow.close()
    //   configWindow = null
    // })

  }

}