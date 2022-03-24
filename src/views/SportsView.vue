<template>
  <div id="all">
    <NavBar />
    <div id="content">
      <SportTiles/>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/AuthHeader.vue";
import SportTiles from "../components/SportTiles.vue"

export default {
  name: "SportsView",
  components: {
    NavBar,
    SportTiles
  },
};
</script>

<style scoped>
#content {
  height: 80%;
}

#all{
  height: 90vh;
}
</style>
