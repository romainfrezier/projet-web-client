<template>
  <div id="headerAuth">
    <div id="title"><router-link to="/profil">Poly'Activitiz</router-link></div>
    <nav>
      <div id="status">
        <p>{{ status }}</p>
      </div>
      <div id="tab">
        <input type="text" name="searchBar" v-model="search" placeholder="🔎 Search an activity by name..." @keypress.enter="searchActivity()">
        <router-link v-if="isAdmin" to="/users">👨‍💻 Users</router-link>
        <router-link v-if="this.status == 'Admin' || this.status == 'Premium'" to="/competitions">🏁 Competitions</router-link>
        <router-link to="/sports">⚽️ Sports 🎾</router-link>
        <router-link to="/profil">🙋‍♂️ My Profile</router-link>
      </div>
      <div id="burger">
        <input type="checkbox" id="btnBurger" style="display: none;"/>
        <label for="btnBurger">
          <p id="close">≡</p>
          <p id="open">✕</p> 
          <div id="tabBurger">
            <input type="text" name="searchBar" v-model="search" placeholder="🔎 Search an activity by name..." @keypress.enter="searchActivity()">
            <router-link v-if="isAdmin" to="/users">👨‍💻 Users</router-link>
            <router-link v-if="this.status == 'Admin' || this.status == 'Premium'" to="/competitions">🏁 Competitions</router-link>
            <router-link to="/sports">⚽️ Sports 🎾</router-link>
            <router-link to="/profil">🙋‍♂️ My Profile</router-link>
          </div>
        </label>
      </div>
    </nav>
  </div>
</template>

<script>
import Notiflix from 'notiflix'

export default {
  name: 'AuthHeader',
  data(){
    return {
      status:'',
      isAdmin: false,
      search: '',
    }
  },
  beforeMount(){
    this.getStatus()
  },
  methods:{
    getStatus(){
      if(localStorage.getItem("isAdmin") == "true"){
        this.status = "Admin"
        this.isAdmin = true
      } else if (localStorage.getItem("isPremium") == "true"){
        this.status = "Premium"
      } else {
        this.status = "Classic"
      } 
    },
    searchActivity(){
      if(this.search != ''){
        const path = '/search/'+this.search
        this.search = ''
        location.replace(path)
      }
      else{Notiflix.Notify.info('You need to search something...')}
    }
  }
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
  background-color: #222831;
  color: #EEEEEE;
  display: grid;
  grid-template-columns: 10% 90%;
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

#status{
  grid-column: 0;
  display: flex;
  user-select: none;
  cursor: default;
}

#status p{
  margin: auto;
  font-size: 30px;
  padding-left: 20px;
}

#tab a.router-link-exact-active {
  color: #FFD369;
}
</style>
