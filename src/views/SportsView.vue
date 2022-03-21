<template>
  <div>
    <NavBar />
    <div id="content">
      <SportTiles/>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/AuthHeader.vue";
import SportTiles from "../components/SportTile.vue"

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
  height: 68vh;
}


</style>
