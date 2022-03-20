<template>
  <div>
    <NavBar />
    <div id="content"></div>
  </div>
</template>

<script>
import NavBar from "../components/AuthHeader.vue";

export default {
  name: "SportsView",
  components: {
    NavBar,
  },
};
</script>

<style scoped>
#content {
  height: 68vh;
}
</style>
