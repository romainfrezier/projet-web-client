<template>
  <div class="all">
    <div v-if="!form" class="contentAll">
      <ul class="tiles" v-if="onScreen"> 
        <li v-for="user in users" :key="user.id" class="tile" >
          <div class="content">
            <p id="name">{{ user.id }}. {{ user.username }}</p>
            <p>Admin : {{ user.isAdmin }}</p>
            <p>Premium : {{ user.isPremium }}</p> 
          </div>
          <div class="button">
            <button @click="writeUser(user.id, user.username, user.isPremium, user.isAdmin)" class="write">✍️</button>
            <button @click="deleteUser(user.id, user.username)" class="delete">🚮</button>
          </div> 
        </li>
      </ul>
    </div>
    <div id="WriteForm" v-if="form">
      <p id="cross" @click="changeForm()">✖️</p>
      <form action="" @submit.prevent="sendData()">
        <label for="username">Username</label>
        <input type="text" name="username" required v-model="username" placeholder="Enter the username"/>
        <label for="premium">Premium</label>
        <input type="checkbox" name="premium" v-model="isPremium"/>
        <label for="admin">Admin</label>
        <input type="checkbox" name="admin" v-model="isAdmin"/>
        <button type="submit" class="btn">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Notiflix from 'notiflix'

export default {
  name: 'UserTile',
  data(){
    return {
      users: [{}],
      onScreen: true,
      form: false,
      id: '',
      username: '',
      isAdmin: false,
      isPremium: false
    }
  },
  beforeMount(){
    this.getUsers()
  },
  methods:{
    getUsers(){
      axios.get(process.env.VUE_APP_API+"users/"+localStorage.getItem("user").toString()+"/", 
        {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}}) 
      .then(response => {
          this.users = response.data
        })
      .catch(error =>{
          if(error.message.toString().includes('401')){
            Notiflix.Notify.failure("Unauthorized...", {closeButton:true})
          } else if(error.toString().includes('500')){
            Notiflix.Notify.failure("Server Error...", {closeButton:true})
          } else {
            Notiflix.Notify.failure("An error occured", {closeButton:true})
          }
          this.onScreen = false
          console.log(error)
        })
    },
    deleteUser(id, name){
      Notiflix.Confirm.show(
        "Delete user",
        "Do you want to delete user with username : "+name+" ?",
        "Yes",
        "No",
        () => {
          axios.delete(process.env.VUE_APP_API+"users/"+localStorage.getItem("user").toString()+"/"+id,
            {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
            .then(response => {
              Notiflix.Notify.success("User " + name + " deleted with succes", {closeButton:true})
              setTimeout("location.reload(true)", 2000)
              console.log(response)
              })
            .catch(error =>{
              if(error.message.toString().includes('401')){
                Notiflix.Notify.failure("Unauthorized...", {closeButton:true})
              } else if(error.toString().includes('500')){
                Notiflix.Notify.failure("Server Error...", {closeButton:true})
              } else {
                Notiflix.Notify.failure("An error occured", {closeButton:true})
              }
              console.log(error)})
        },
        () => {
          Notiflix.Notify.info("User " + name + " is not deleted", {closeButton:true})
        },
        {titleColor: "#ff5549", okButtonBackground: "#ff5549"}
        )
    },
    changeForm(){
      this.form = !this.form
    },
    verifiyUsername(username){
      const re = /^(?=.*[a-z])[0-9a-zA-Z]{5,}\S$/
      return re.test(username)
    },
    async writeUser(id, username, isPremium, isAdmin){
      this.isAdmin = isAdmin
      this.isPremium = isPremium
      this.username = username
      this.id = id
      this.changeForm()
    },
    sendData(){
      if (this.verifiyUsername(this.sport)){
        Notiflix.Confirm.show(
        "Modify user",
        "Do you want to modify this user ?",
        "Yes",
        "No",
        () => {
        axios.put(process.env.VUE_APP_API+"users/"+localStorage.getItem("user")+"/"+this.id+"/",{
            username: this.username,
            isAdmin: this.isAdmin,
            isPremium: this.isPremium
        },
        {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}}) 
        .then(response => {
            console.log(response)
            this.username = ''
            this.isPremium = false,
            this.isAdmin = false,
            this.id = ''
            this.changeForm()
            setTimeout("location.reload(true)", 2000)
            Notiflix.Notify.success("User modified !", {closeButton:true})
        })
        .catch(error =>{
              if(error.message.toString().includes('401')){
                Notiflix.Notify.failure("Unauthorized...", {closeButton:true})
              } else if(error.toString().includes('500')){
                Notiflix.Notify.failure("Server Error...", {closeButton:true})
              } else {
                Notiflix.Notify.failure("An error occured", {closeButton:true})
              }
              console.log(error)})
        },
        () => {
          Notiflix.Notify.info("User is not modified", {closeButton:true})
        },
        {titleColor: "#ff5549", okButtonBackground: "#ff5549"})
      } else {
        return Error
      }  
    }
  }
}
</script>

<style scoped>

.tiles{
  height: 100%;
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  margin: 20px;
}

.all{
  height: 100%;
}

.contentAll{
  height: 100%;
}

.tile{
  margin: auto;
  margin-bottom: 20px;
  padding: 10px;
  width: 45%;
  border: #222831 1px solid;
  border-radius: 10px;
  background-color: #22283180;
  display: grid;
  grid-template-columns: 70% 30%;
}

#name{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
}

.tile:hover{
  background-color: #393E46;
  cursor: default;
}

.content{
  grid-column: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content p{
  user-select: none;
  margin-bottom: 5px;
}

.button{
  grid-column: 2;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.button > button{
  margin: auto;
  height: 60px;
  width: 60px;
  font-size: 30px;
  background-color: #22283180;
  border: #EEEEEE 1px solid;
  border-radius: 10px;
  transition: 200ms;
}

.button > button:hover{
  background-color: #EEEEEE80;
  font-size: 40px;
  cursor: pointer;
}

#WriteForm{
  height: 100%;
  width: 100%;
}

form{
  grid-row: 2;
  width: 100%;
  height: 70%;
  max-width: 600px;
  display: flex;
  margin: auto;
  flex-direction: column;
  padding: 15px;
  background-color: #222831;
  border: 2px solid #FFD369;
  border-radius: 10px;
}

input{
  margin-bottom: 40px;
  font-size: 2vh;
  border: 1px solid #EEEEEE;
  border-radius: 5px;
  padding: 10px;
  color: #EEEEEE;
  background-color: rgba(255, 255, 255, 0.517);
}

label{
  display: flex;
  font-size: 30px;
  font-weight: bold;
  border-bottom: solid 1px #FFD369;
  margin-bottom: 5px;
}

form > button {
  width: 150px;
  height: 40px;
  font-size: 25px;
  font-weight: bold;
  background-color: transparent;
  border: 1px solid #FFD369;
  color: #EEEEEE;
  border-radius: 5px;
  text-align: center;
  margin: auto;
  margin-bottom: 10px;
  transition: 200ms;
  cursor: pointer;
}

form > button:hover {
  height: 50px;
  margin-bottom: 5px;
}

#cross{
  margin: 10px;
  padding: 10px;
  font-size: 50px;
}

#cross:hover{
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background: #22283180;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
</style>
