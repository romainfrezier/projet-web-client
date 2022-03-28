<template>
  <div id="all">
    <NavBar/>
    <div id="content">
      <User/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "../components/AuthHeader.vue";
import User from "../components/UserTiles.vue"
import Footer from "../components/FooterAll.vue"

export default {
  name: "UsersView",
  components: {
    NavBar,
    User,
    Footer,
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
