import * as PIXI from 'pixi.js'
import  { Live2DModel } from "pixi-live2d-display";

window.PIXI = PIXI

export async function main() {
    const app = new PIXI.Application({
        view: document.getElementById('canvas'),
        autoStart: true,
        resizeTo: window,
        backgroundColor: 0x333333
    })

    const model = await Live2DModel.from('model/shizuku/shizuku.model.json')

    const scaleX = (innerWidth * 0.8) / model.width;
    const scaleY = (innerHeight * 0.8) / model.height;

    model.scale.set(Math.min(scaleX, scaleY));
    model.y = innerHeight * 0.1;

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