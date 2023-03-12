
import * as PIXI from 'pixi.js'
import  { Live2DModel } from "pixi-live2d-display";


window.PIXI = PIXI

let app = null

export async function main() {

    app = new PIXI.Application({
        view: document.getElementById('canvas'),
        autoStart: true,
        backgroundAlpha: 0,
        resizeTo: window
    })

   const model = await Live2DModel.from('model/shizuku/shizuku.model.json')

    const scaleX = (innerWidth * 0.2) / model.width;
    const scaleY = (innerHeight * 0.4) / model.height;

    model.scale.set(Math.min(scaleX, scaleY));

    model.y = innerHeight * 0.1;

    draggable(model)

    model.on("hit", (hitAreas) => {
        if (hitAreas.includes("body")) {
            model.motion("flick_head")
        }
        if (hitAreas.includes("head")) {
            model.expression();
        }
    })
    model.on('pointerover', onModelOver)
    model.on('pointerout', onModelOut)
    model.on("rightclick", onModelRightClick)
    app.stage.addChild(model)
}

function draggable(model) {
    model.buttonMode = true;
    model.on("mousedown", (e) => {
        model.dragging = true;
        model._pointerX = e.data.global.x - model.x;
        model._pointerY = e.data.global.y - model.y;
    });
    model.on("mousemove", (e) => {
        if (model.dragging) {
            model.position.x = e.data.global.x - model._pointerX;
            model.position.y = e.data.global.y - model._pointerY;
        }
    });
    model.on("mouseoutside", () => (model.dragging = false));
    model.on("mouseup", () => (model.dragging = false));

}

function onModelOver() {
    this.isOver = true;
    console.log("经过模型")
    // window.ipcRenderer.send('set-ignore-mouse-events', false)
}

function onModelOut() {
    this.isOver = false;
    console.log("离开模型")
    // window.ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
}

function onModelRightClick() {
    window.ipcRenderer.send('menu')
}