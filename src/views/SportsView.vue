<template>
  <div>
    <NavBar />
    <div id="content"></div>
    <Footer />
  </div>
</template>

<script>
import NavBar from "../components/AuthHeader.vue";
import Footer from "../components/FooterAll.vue";

export default {
  name: "SportsView",
  components: {
    NavBar,
    Footer,
  },
};
</script>

<style scoped>
#content {
  height: 65vh;
}
</style>
