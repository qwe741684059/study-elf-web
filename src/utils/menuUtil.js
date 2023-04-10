import { BrowserWindow } from "electron";
import {win} from "@/background";

export function openMainControl() {
    const mainControlWindow = new BrowserWindow( {
        parent: win,
        show: false,
        webPreferences: {
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
        }
    } )
    mainControlWindow.maximize()
    mainControlWindow.loadURL('http://localhost:8080/mainControl').then()
    mainControlWindow.once('ready-to-show', () => {
        mainControlWindow.show()
    })

}