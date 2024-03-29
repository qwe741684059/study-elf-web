import { BrowserWindow, ipcMain } from "electron";
import path from "path";



export function openMainControl() {
    const _this = this
    let mainControlWindow
    if (mainControlWindow) {
        mainControlWindow.show()
    } else {
        mainControlWindow = new BrowserWindow( {
            show: false,
            frame:false,
            resizable:false,
            webPreferences: {
                preload:path.join(__dirname, 'preload.js'),
                nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
                contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
            }
        } )
        mainControlWindow.loadURL('http://localhost:8080/mainControl').then()
        mainControlWindow.on('close', () => {
            mainControlWindow = null
        })
        mainControlWindow.once('ready-to-show', () => {
            mainControlWindow.maximize()
            mainControlWindow.show()
        })

    }

}