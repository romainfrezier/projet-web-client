<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-view></router-view>
  </div>
</template>

<style>
html{
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
