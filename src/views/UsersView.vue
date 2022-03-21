<template>
  <div>
    <NavBar/>
    <div id="content">
      <User/>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/AuthHeader.vue";
import User from "../components/UserTile.vue"

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
  height: 68vh;
}
</style>
