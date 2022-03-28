<template>
  <div id="headerVisitor">
    <div id="title"><router-link to="/">Poly'Activitiz</router-link></div>
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

nav {
  margin-top: 0px;
  padding: 40px;
  background-color: #222831;
  text-align: right;
  color: #EEEEEE;

}

#title {
  width: 100%;
  font-size: 40px;
  border-bottom: solid #222831 1px;
  margin-bottom: 5px;
  color: #222831;
  text-align: center;
}

#title a {
  text-decoration: none;
  color: #222831;
  user-select: none;
}

nav a {
  margin-left: 30px;
  font-size: 20px;
  font-weight: bold;
  color: #EEEEEE;
  text-align: right;
  text-decoration: none;
  border: #FFD369 solid 1px;
  border-radius: 5px;
  padding: 20px;
  user-select: none;
}

nav a.router-link-exact-active {
  color: #FFD369;
}
</style>
