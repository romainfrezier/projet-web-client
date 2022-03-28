<template>
<div id="all1" v-if="isPremium">
  <div v-if="!form" class="content1">
    <ul class="tiles" v-if="!form"> 
      <li v-for="compet in compets" :key="compet.id" class="tile" >
        <div class="content">
          <p>{{ compet.competName }}</p>
          <p>Sport : {{ compet.sportName }}</p>
          <p>Date : {{ compet.competDate.split('T')[0] }}</p>
          <p>Place : {{ compet.place }}</p>
        </div>
          <div class="button">
            <button @click="edit(compet.id)" class="write">✏️</button>
            <button @click="deleteCompet(compet.id, compet.competName)" class="delete">🚮</button>
          </div> 
      </li>
    </ul> 
    <button class="add" @click="create()">➕ Add</button>
  </div>

</div>
  
</template>

<script>
import axios from 'axios';
import Notiflix from 'notiflix';
import router from '../router/index.js'

export default {
  name: 'SportTile',
  data(){
    return {
      possibleSport: [{}],
      compets: [{}],
      isPremium: false,
      form: false,
      id: '',
      competName: '',
      sport: '',
      date: '',
      write: false
    }
  },
  beforeMount(){
    this.getCompets()
    this.getStatus()
  },
  methods:{
    getStatus(){
      if(localStorage.getItem('isAdmin') == 'true' || localStorage.getItem('isPremium') == 'true'){
        this.isPremium = true
      }
    },
    async getCompets(){
      const user = localStorage.getItem("user").toString()
      await axios.get(process.env.VUE_APP_API+"competitions/"+user+"/", 
        {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}}) 
        .then(response => {
          this.compets = response.data
          this.compets.forEach(compet => {
            axios.get(process.env.VUE_APP_API+"sports/"+user+"/"+compet.sport,
             {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
             .then(response => {
               compet.sportName = response.data[0].sportName
             })
             .catch(error => {
                 console.log(error)
             })
         })
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteCompet(id, name){
      Notiflix.Confirm.show(
        "Delete competition",
        "Do you want to delete competition named : "+name+" ?",
        "Yes",
        "No",
        () => {
          axios.delete(process.env.VUE_APP_API+"competitions/"+localStorage.getItem("user").toString()+"/"+id,
            {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
            .then(response => {
              Notiflix.Notify.success("Competition " + name + " deleted with succes")
              setTimeout("location.reload(true)", 2000)
              console.log(response)
              })
            .catch(error =>{
              if(error.message.toString().includes('401')){
                Notiflix.Notify.failure("Unauthorized...")
              } else if(error.toString().includes('500')){
                Notiflix.Notify.failure("Server Error...")
              } else {
                Notiflix.Notify.failure("An error occured")
              }
              console.log(error)})
          },
        () => {
          Notiflix.Notify.info("Competition " + name + " is not deleted")
        },
        { titleColor: "#ff5549", okButtonBackground: "#ff5549" })
    },
    edit(id){
      const path = "/competitions/form/"+id
      router.push(path)
    },
    create(){
      router.push('/competitions/form/0')
    }
  }
}
</script>

<style scoped>

.tiles{
  height: 80%;
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  margin: 20px;
}

#all1{
  height: 100%;
}

.content1{
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

.add{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-right: 25%;
  margin-left: 25%;
  width: 50%;
  line-height: 35px;
  padding: 10px;
  border: #393E46 1px solid;
  border-radius: 10px;
  background-color: #22283180;
}

.add:hover{
  cursor: pointer;
  align-items: center;
  background-color: #222831;
  color: #FFD369;
}

#addWriteForm{
  height: 100%;
}

form{
  display: inline-flex;
  margin: auto;
  grid-row: 2;
  width: 50%;
  max-width: 600px;
  height: 400px;
  display: flex;
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
  background-color: transparent;
}

label{
  font-size: 30px;
  font-weight: bold;
  border-bottom: solid 1px #FFD369;
  margin-bottom: 5px;
}

select{
  color: #EEEEEE;
  background: transparent;
  border: 1px solid #EEEEEE;
  border-radius: 5px;
  font-size: 25px;
  margin-bottom: 40px;
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
