<template>
  <div id="headerVisitor">
    <div id="title"><router-link to="/">MyActivitiz</router-link></div>
    <nav>
      <router-link to="/about">About</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Signup</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'VisitorsPage',
}
</script>

<style scoped>

#headerVisitor{
  height: 20vh;
}

nav {
  margin-top: 0px;
  padding: 40px;
  background-color: rgb(232, 78, 70);
  text-align: right;
  color: #cbd3dc;

}

#title {
  width: 100%;
  font-size: 40px;
  border-bottom: solid black 1px;
  margin-bottom: 5px;
  color: #4b1e1e;
  text-align: center;
}

#title a {
  text-decoration: none;
  color: #4b1e1e;
  user-select: none;
}

nav a {
  margin-left: 30px;
  font-size: 20px;
  font-weight: bold;
  color: #cbd3dc;
  text-align: right;
  text-decoration: none;
  border: #4b1e1e solid 1px;
  border-radius: 5px;
  padding: 20px;
  user-select: none;
}

nav a.router-link-exact-active {
  color: #4b1e1e;
}
</style>
