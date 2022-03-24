<template>
  <div id="all">
    <NavBar/>
    <div id="content">
      <User/>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/AuthHeader.vue";
import User from "../components/UserTiles.vue"

export default {
  name: "UsersView",
  components: {
    NavBar,
    User
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
