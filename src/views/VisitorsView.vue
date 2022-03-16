<template>
  <div>
    <Visitors></Visitors>
    <div id="ad">
      <img id="ad-image" src="../assets/visitors.png" alt="ad" />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Visitors from "../components/VisitorsHead.vue";
import Footer from "../components/FooterAll.vue";

export default {
  name: "VisitorsView",
  components: {
    Visitors,
    Footer,
  },
};
</script>

<style>
#ad {
  height: 65vh;
  margin-bottom: 10px;
  display: flex;
}
#ad-image {
  max-height: 100%;
  max-width: 100%;
  margin: auto;
}
</style>