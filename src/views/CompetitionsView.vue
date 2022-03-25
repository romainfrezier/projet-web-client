<template>
  <div id="all">
    <NavBar />
    <div id="content">
      <CompetitionsTiles/>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/AuthHeader.vue";
import CompetitionsTiles from "../components/CompetitionsTiles.vue"

export default {
  name: "SportsView",
  components: {
    NavBar,
    CompetitionsTiles
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
