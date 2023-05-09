<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import { main } from "../../public/js";
import * as PIXI from 'pixi.js'
import  { Live2DModel } from "pixi-live2d-display";
import fs from "fs";

export default {
  name: "Live2d",
  mounted() {
    const _this = this
    this.$nextTick(() => {
      _this.createModel().then(() => {
        _this.$store.dispatch('setModel', _this.model)
      })
    })
  },
  data() {
    return {
      model:null,
      app: null
    }
  },
  methods: {

    async createModel() {
      let configPath = window.ipcRenderer.sendSync('getModelPath')
      let data = fs.readFileSync(configPath)
      data = JSON.parse(data)

      this.app = new PIXI.Application({
        view: document.getElementById('canvas'),
        autoStart: true,
        backgroundAlpha: 0,
        resizeTo: window
      })
      // this.model = await Live2DModel.from('model/shizuku/shizuku.model.json')
      this.model = await Live2DModel.from(data.path)
      // const scaleX = (innerWidth * 0.2) / this.model.width;
      // const scaleY = (innerHeight * 0.4) / this.model.height;

      // this.model.scale.set(Math.min(scaleX, scaleY));
      this.model.scale.set(data.scale);
      this.model.y = innerHeight * 0.1;

      draggable(this.model)

      this.model.on("hit", (hitAreas) => {
        if (hitAreas.includes("body")) {
          this.model.motion("flick_head")
        }
        if (hitAreas.includes("head")) {
          this.model.expression();
        }
      })
      this.model.on('pointerover', onModelOver)
      this.model.on('pointerout', onModelOut)
      this.model.on("rightclick", onModelRightClick)

      this.app.stage.addChild(this.model)

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
        window.ipcRenderer.send('set-ignore-mouse-events', false)
      }

      function onModelOut() {
        this.isOver = false;
        console.log("离开模型")
        window.ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
      }

      function onModelRightClick() {
        window.ipcRenderer.send('menu')
      }

    },

  }

}
</script>

<style scoped>

</style>