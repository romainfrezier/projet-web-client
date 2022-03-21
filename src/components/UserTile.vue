<template>
  <div class="tiles">
    <div v-if="!form">
      <ul class="tiles" v-if="onScreen"> 
        <li v-for="user in users" :key="user.id" class="tile" >
          <div class="content">
            <p id="name">{{ user.id }}. {{ user.username }}</p>
            <p>Admin : {{ user.isAdmin }}</p>
            <p>Premium : {{ user.isPremium }}</p> 
          </div>
            <div class="button">
              <button @click="writeUser(user.id, user.username, user.isPremium, user.isAdmin)" class="write">✍️</button>
              <button @click="deleteUser(user.id)" class="delete">🚮</button>
            </div> 
        </li>
      </ul>
    </div>
    <div id="WriteForm" v-if="form">
      <p id="cross" @click="changeForm()">✖️</p>
      <form action="" @submit.prevent="sendData()">
        <label for="username">Username</label>
        <input type="text" name="username" required v-model="username" placeholder="Enter the sport name"/>
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
      .catch(error => {
          this.onScreen = false
          console.log(error)
        })
    },
    deleteUser(id){
      if(confirm("Do you want to delete user with id : "+id)==true){
        axios.delete(process.env.VUE_APP_API+"users/"+localStorage.getItem("user").toString()+"/"+id,
        {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
        .then(response => {console.log(response)})
        .catch(error => {console.log(error)})
        location.reload()
      }
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
    async sendData(){
      if (this.verifiyUsername(this.sport)){
        await axios.put(process.env.VUE_APP_API+"users/"+localStorage.getItem("user")+"/"+this.id+"/",{
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
            location.reload()
        })
        .catch(error => {
            alert(error)
        })
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
}

.tile{
  margin: auto;
  margin-bottom: 20px;
  padding: 10px;
  width: 40%;
  border: #4b1e1e 1px solid;
  border-radius: 10px;
  background-color: rgba(232, 78, 70, 0.65);
  display: grid;
  grid-template-columns: 70% 30%;
}

#name{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
}

.tile:hover{
  background-color: rgba(160, 53, 47, 0.65);
  cursor: default;
}

.content{
  grid-column: 0;
}

.content p{
  user-select: none;
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
  background-color: rgba(240, 248, 255, 0.377);
  border: #4b1e1e 1px solid;
  border-radius: 10px;
  transition: 200ms;
}

.button > button:hover{
  background-color: rgba(240, 248, 255, 0.582);
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
  background-color: rgba(219, 219, 219, 0.8);
  border: 2px solid rgb(232, 78, 70);
  border-radius: 10px;
}

input{
  margin-bottom: 40px;
  font-size: 2vh;
  border: 1px solid rgb(232, 78, 70);
  border-radius: 5px;
  padding: 10px;
  color: #4b1e1e;
  background-color: rgba(255, 255, 255, 0.517);
}

label{
  display: flex;
  font-size: 30px;
  font-weight: bold;
  color: #4b1e1e;
  border-bottom: solid 1px rgb(232, 78, 70);
  margin-bottom: 5px;
}

form > button {
  width: 150px;
  height: 40px;
  font-size: 25px;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgb(232, 78, 70);
  color: #4b1e1e;
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
  color: #4b1e1e;
  font-size: 50px;
}

#cross:hover{
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background: #4b1e1e;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
</style>
