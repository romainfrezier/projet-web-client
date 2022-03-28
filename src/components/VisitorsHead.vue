<template>
  <div id="headerVisitor">
    <div id="title"><router-link to="/">Poly'Activitiz</router-link></div>
    <nav>
      <div id="tab">
        <router-link to="/about">ℹ️ About</router-link>
        <router-link to="/login">🔑 Login</router-link>
        <router-link to="/signup">📝 Signup</router-link>
      </div>
      <div id="burger">
        <input type="checkbox" id="btnBurger" style="display: none;"/>
        <label for="btnBurger">
          <p id="close">≡</p>
          <p id="open">✕</p> 
          <div id="tabBurger">
            <router-link to="/about">ℹ️ About</router-link>
            <router-link to="/login">🔑 Login</router-link>
            <router-link to="/signup">📝 Signup</router-link>
          </div>
        </label>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'VisitorsPage',
}
</script>

<style scoped>
@media screen and (max-width: 1330px) {
  #tab{
    display: none;
  }

  #open{
    display: none;
  }

  #tabBurger{
    display: none;
  }

  #burger{
    display: block;
    text-align: right;
    padding-right: 30px;
    padding-top: 20px;
    position: relative;
    right: 0;
    user-select: none;
  }

  #close{
    font-size: 50px;
    display: flex;
    width: 40px;
    cursor: pointer;
    margin-left: 75vw;
  }

  #burger > label > #open {
    font-size: 50px;
    width: 40px;
    cursor: pointer;
    margin-left: 75vw;
  }

  #btnBurger:checked + label > #close{
    display: none;
  }

  #btnBurger:checked + label > #open{
    display: block;
  }
  
  #btnBurger:checked + label > #tabBurger{
    display: flex;
    flex-direction: column;
    position: relative;
    top: 50px;
    width: 70%;
    height: 100%;
    padding: 50px;
    text-decoration: none;
    background-color: #222831;
    border: #FFD369 1px solid;
    border-radius: 10px;
  }

  #btnBurger:checked + label > #tabBurger > a{
    text-decoration: none;
    color: #EEEEEE;
    margin: auto;
    height: 50px;
  }

  input{
    width: 70%;
    background-color: transparent;
    color: #EEEEEE;
    margin: auto;
    border: #FFD369 1px solid;
    border-radius: 5px;
    padding: 10px;
    font-size: 10px;
  }
}

@media screen and (min-width: 1330px) {
  #burger{
    display: none;
  }
  #tab{
  grid-column: 2;
  text-align: right;
  padding: 40px;
}

#tab a {
  margin: auto;
  margin-right: 0px;
  margin-left: 30px;
  font-size: 100%;
  font-weight: bold;
  color: #EEEEEE;
  text-decoration: none;
  border: #FFD369 solid 1px;
  border-radius: 5px;
  padding: 20px;
  user-select: none;
}

  input{
    font-size: 20px;
    height: 40%;
    width: 25%;
    margin-right: 0px;
    margin-left: 30px;
    font-weight: bold;
    color: #EEEEEE;
    background-color: transparent;
    text-decoration: none;
    border: #FFD369 solid 1px;
    border-radius: 5px;
    padding: 20px;
  }
}

nav {
  margin-top: 0px;
  padding: 40px;
  background-color: #222831;
  text-align: right;
  color: #EEEEEE;
  height: 15vh;
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

nav a.router-link-exact-active {
  color: #FFD369;
}
</style>
