<template>
  <ul class="tiles" v-if="onScreen"> 
    <li v-for="user in users" :key="user.id" class="tile" >
      <div class="content">
        <p>{{ user.id }}. {{ user.username }}</p>
        <p>Admin : {{ user.isAdmin }}</p>
        <p>Premium : {{ user.isPremium }}</p> 
      </div>
        <div class="button">
          <button class="write">✍️</button>
          <button class="delete">🚮</button>
        </div> 
    </li>
  </ul>   
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserTile',
  data(){
    return {
      users: [{}],
      onScreen: true,
    }
  },
  beforeMount(){
    this.getUsers()
  },
  methods:{
    async getUsers(){
      await axios.get(process.env.VUE_APP_API+"users/"+localStorage.getItem("user").toString()+"/", 
        {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}}) 
      .then(response => {
          this.users = response.data
        })
      .catch(error => {
          this.onScreen = false
          console.log(error)
        })
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

button{
  margin: auto;
  height: 60px;
  width: 60px;
  font-size: 30px;
  background-color: rgba(240, 248, 255, 0.377);
  border: #4b1e1e 1px solid;
  border-radius: 10px;
  transition: 200ms;
}

button:hover{
  background-color: rgba(240, 248, 255, 0.582);
  font-size: 40px;
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
