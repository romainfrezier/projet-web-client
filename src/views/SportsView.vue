<template>
  <div id="all">
    <NavBar />
    <div id="content">
      <SportTiles/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "../components/AuthHeader.vue";
import SportTiles from "../components/SportTiles.vue"
import Footer from "../components/FooterAll.vue"

export default {
  name: "SportsView",
  components: {
    NavBar,
    SportTiles,
    Footer
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
