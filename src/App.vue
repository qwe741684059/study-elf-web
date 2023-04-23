<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>

</template>

<script>
export default {
  name: 'app',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      console.log("进来了")
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
