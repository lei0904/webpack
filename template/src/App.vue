<template>
  <div id="app">
    <transition :name="animate" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      animate: "left-fade"
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.meta.value === from.meta.value) {
        this.animate = "fade";
      } else if(to.meta.value > from.meta.value){
        this.animate = "left-fade";
      } else {
        this.animate = "right-fade";
      }
    }
  }
}
</script>

<style lang="scss">
@import "styles/style.scss";

#app {
  width: 100%;
  height: 100vh;
  background: #efefef;
  overflow: hidden;
}
</style>
