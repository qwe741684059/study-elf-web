import { BrowserWindow, ipcMain } from "electron";
import path from "path";


export function openMainControl() {
    const mainControlWindow = new BrowserWindow( {
        show: false,
        fullscreen:true,
        frame:false,
        resizable:false,
        webPreferences: {
            preload:path.join(__dirname, 'preload.js'),
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
        }
    } )
    mainControlWindow.loadURL('http://localhost:8080/mainControl').then()
    mainControlWindow.once('ready-to-show', () => {
        mainControlWindow.show()
    })
    ipcMain.on('close-main-control', (event, ...args) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        win.close()
    })
    ipcMain.on('reload', (event, ...args) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        win.reload()
    })
}