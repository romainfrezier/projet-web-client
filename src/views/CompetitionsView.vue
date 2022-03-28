<template>
  <div id="all">
    <NavBar />
    <div id="content">
      <CompetitionsTiles/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/AuthHeader.vue";
import CompetitionsTiles from "../components/CompetitionsTiles.vue"
import Footer from "../components/FooterAll.vue"


export default {
  name: "SportsView",
  components: {
    NavBar,
    CompetitionsTiles,
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
