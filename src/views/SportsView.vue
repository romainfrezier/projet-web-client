<template>
  <div>
    <NavBar />
    <div id="content">
      <SportTiles/>
      <button class="add">➕ Add</button>
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
.add{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-right: 25%;
  margin-left: 25%;
  width: 50%;
  line-height: 35px;
  padding: 10px;
  border: #4b1e1e 1px solid;
  border-radius: 10px;
  background-color: rgba(194, 194, 194, 0.74);
}
</style>
