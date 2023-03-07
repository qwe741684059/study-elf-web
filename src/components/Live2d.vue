<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import { main } from "../../public/js";

export default {
  name: "Live2d",
  mounted() {
    this.$nextTick(() => {
      main().then()
    })
  }
}
</script>

<style scoped>

</style>