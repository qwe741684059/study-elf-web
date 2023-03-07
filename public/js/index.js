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

    const scaleX = (innerWidth * 0.4) / model.width;
    const scaleY = (innerHeight * 0.8) / model.height;

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

    app.stage.addChild(model)
}

function draggable(model) {
    model.buttonMode = true;
    model.on("pointerdown", (e) => {
        model.dragging = true;
        model._pointerX = e.data.global.x - model.x;
        model._pointerY = e.data.global.y - model.y;
    });
    model.on("pointermove", (e) => {
        if (model.dragging) {
            model.position.x = e.data.global.x - model._pointerX;
            model.position.y = e.data.global.y - model._pointerY;
        }
    });
    model.on("pointerupoutside", () => (model.dragging = false));
    model.on("pointerup", () => (model.dragging = false));
}