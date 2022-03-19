<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-view></router-view>
  </div>
</template>

<style>
@font-face {
  font-family: "LemonMilk";
  src: url('./assets/LEMONMILK-Regular.otf');
}

#app {
  font-family: LemonMilk, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #4b1e1e;
  width: 100%;
  height: 100%;
  background-image: url('./assets/background.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
