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
#headerAuth{
  position: sticky;
  top: 0;
}

nav {
  background-color: #222831;
  color: #EEEEEE;
  display: grid;
  grid-template-columns: 10% 90%;
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

#tab a.router-link-exact-active {
  color: #FFD369;
}
</style>
