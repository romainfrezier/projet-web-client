<template>
  <div>
    <Visitors></Visitors>
    <div id="ad">
      <img id="ad-image" src="../assets/visitors.png" alt="ad" />
    </div>
  </div>
</template>

<script>
import Visitors from "../components/VisitorsHead.vue";

export default {
  name: "VisitorsView",
  components: {
    Visitors,
  },
};
</script>

<style scoped>
#ad {
  height: 68vh;
  display: flex;
}
#ad-image {
  max-height: 100%;
  max-width: 100%;
  margin: auto;
}
</style>