<template>
  <div id="headerVisitor">
    <div id="title"><router-link to="/profil">Poly'Activitiz</router-link></div>
    <nav>
      <div id="status">
        <p>{{ status }}</p>
      </div>
      <div id="tab">
        <div class="admin"></div>
        <router-link class="Admin" to="/users">Users</router-link>
        <router-link to="/sports">Sports</router-link>
        <router-link class="Premium" to="/competitions">Competitions</router-link>
        <router-link to="/profil">My Profile</router-link>
        <router-link to="/">Logout</router-link>
      </div>
      
    </nav>
  </div>
</template>

<script>
export default {
  name: 'VisitorsPage',
  data(){
    return {
      status:''
    }
  },
  beforeMount(){
    this.getStatus()
  },
  methods:{
    getStatus(){
      if(localStorage.getItem("isAdmin")){
        this.status = "Admin"
      } else if (localStorage.getItem("isPremium")){
        this.status = "Premium"
      } else {
        this.status = "Classic"
      }
    }
  }
}
</script>

<style scoped>

#headerVisitor{
  height: 20vh;
}

nav {
  background-color: rgb(232, 78, 70);
  color: #cbd3dc;
  display: grid;
  grid-template-columns: 10% 90%;
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
  margin-top: 10%;
  margin-left: 30px;
  font-size: 20px;
  font-weight: bold;
  color: #cbd3dc;
  text-decoration: none;
  border: #4b1e1e solid 1px;
  border-radius: 5px;
  padding: 20px;
  user-select: none;
}

#tab a.router-link-exact-active {
  color: #4b1e1e;
}
</style>
