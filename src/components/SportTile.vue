<template>
<div>
  <div v-if="!form">
    <ul class="tiles" v-if="!form"> 
      <li v-for="sport in sports" :key="sport.id" class="tile" >
        <div class="content">
          <p>{{ sport.sportName }}</p>
          <p>Period : {{ sport.sportPeriod }}</p>
        </div>
          <div v-if="isAdmin" class="button">
            <button @click="writeSport(sport.id, sport.sportName, sport.sportPeriod)" class="write">✍️</button>
            <button @click="deleteSport(sport.id)" class="delete">🚮</button>
          </div> 
      </li>
    </ul> 
    <button v-if="isAdmin" class="add" @click="changeForm()">➕ Add</button>
  </div>
  
  <div id="addWriteForm" v-if="form">
      <p id="cross" @click="changeForm()">✖️</p>
      <form action="" @submit.prevent="sendData()">
        <label for="sportName">Sport Name</label>
        <input type="text" name="sportName" required v-model="sport" placeholder="Enter the sport name"/>
        <label for="period">Period</label>
        <input type="text" name="period" required v-model="period" placeholder="Enter the period (Summer, Winter...)"/>
        <button type="submit" class="btn">Submit</button>
      </form>
  </div>

</div>
  
</template>

<script>
import axios from 'axios';
import Notiflix from 'notiflix';

export default {
  name: 'SportTile',
  data(){
    return {
      sports: [{}],
      isAdmin: false,
      onScreen: true,
      form: false,
      id: '',
      sport: '',
      period: '',
      write: false
    }
  },
  beforeMount(){
    this.getSports()
  },
  methods:{
    async getSports(){
      await axios.get(process.env.VUE_APP_API+"sports/"+localStorage.getItem("user").toString()+"/", 
        {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}}) 
      .then(response => {
          this.sports = response.data
          if(localStorage.getItem("isAdmin") == "true"){
            this.isAdmin = true
          }
        })
      .catch(error =>{
          if(error.message.toString().includes('401')){
            Notiflix.Notify.failure("Unauthorized...", {closeButton:true})
          } else if(error.toString().includes('500')){
            Notiflix.Notify.failure("Server Error...", {closeButton:true})
          } else {
            Notiflix.Notify.failure("An error occured", {closeButton:true})
          }
          this.onScreen = false;
          console.log(error)
        })
    },
    deleteSport(id){
      Notiflix.Confirm.show(
        "Delete sport",
        "Do you want to delete user sport id : "+id+" ?",
        "Yes",
        "No",
        () => {
          axios.delete(process.env.VUE_APP_API+"sports/"+localStorage.getItem("user").toString()+"/"+id,
            {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
            .then(response => {
              Notiflix.Notify.success("Sport " + id + ". deleted with succes", {closeButton:true})
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
          Notiflix.Notify.info("Sport " + id + ". is not deleted", {closeButton:true})
        },
        { titleColor: "#ff5549", okButtonBackground: "#ff5549" })
    },
    writeSport(id, name, period){
      this.changeForm()
      this.write = true
      this.sport = name
      this.period = period
      this.id = id
    },
    changeForm(){
      this.form = !this.form
      this.sport = ''
      this.period = ''
    },
    sendData(){
      if(!this.write){
        if (this.verifiySport(this.sport) && this.verifiyPeriod(this.period)){
          Notiflix.Confirm.show(
          "Create sport",
          "Do you want to create this sport ?",
          "Yes",
          "No",
          () => {
            axios.post(process.env.VUE_APP_API+"sports/"+localStorage.getItem("user")+"/",{
                sportName: this.sport,
                sportPeriod: this.period
            },
            {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}}) 
            .then(response => {
                console.log(response)
                this.changeForm()
                setTimeout("location.reload(true)", 2000)
                Notiflix.Notify.success("Sport created !", {closeButton:true})
            })
            .catch(error => {
                if(error.message.toString().includes('401')){
                  Notiflix.Notify.failure("Unauthorized...", {closeButton:true})
                } else if(error.toString().includes('500')){
                  Notiflix.Notify.failure("Server Error...", {closeButton:true})
                } else {
                  Notiflix.Notify.failure("An error occured", {closeButton:true})
                }
                console.log(error)})},
          () => {
            Notiflix.Notify.info("Sport is not created", {closeButton:true})
          },
          { titleColor: "#ff5549", okButtonBackground: "#ff5549" })
        } else {
          return Error
        }  
      } else {
        if (this.verifiySport(this.sport) && this.verifiyPeriod(this.period)){
          Notiflix.Confirm.show(
          "Modify sport",
          "Do you want to modify this sport ?",
          "Yes",
          "No",
          () => {
            axios.put(process.env.VUE_APP_API+"sports/"+localStorage.getItem("user")+"/"+this.id+"/",{
                sportName: this.sport,
                sportPeriod: this.period
            },
            {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}}) 
            .then(response => {
                console.log(response)
                this.changeForm()
                setTimeout("location.reload(true)", 2000)
                Notiflix.Notify.success("Sport modified !", {closeButton:true})
            })
            .catch(error => {
                if(error.message.toString().includes('401')){
                  Notiflix.Notify.failure("Unauthorized...", {closeButton:true})
                } else if(error.toString().includes('500')){
                  Notiflix.Notify.failure("Server Error...", {closeButton:true})
                } else {
                  Notiflix.Notify.failure("An error occured", {closeButton:true})
                }
                console.log(error)})},
          () => {
            Notiflix.Notify.info("Sport is not modified", {closeButton:true})
          },
          { titleColor: "#ff5549", okButtonBackground: "#ff5549" })
        } else {
          return Error
        } 
      }
      
    },
    verifiySport(sport){
      const re = /^((?!DROP|SELECT|scrpit|js).){2,}\S$/
      return re.test(sport)
    },
    verifiyPeriod(period){
      const re = /^((?!DROP|SELECT|scrpit|js).){3,}\S$/
      return re.test(period)
    },
  }
}
</script>

<style scoped>

.tiles{
  height: 85%;
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

.add{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-right: 25%;
  margin-left: 25%;
  width: 50%;
  line-height: 35px;
  padding: 10px;
  border: #4b1e1e 1px solid;
  border-radius: 10px;
  background-color: rgba(194, 194, 194, 0.74);
}

.add:hover{
  cursor: pointer;
  align-items: center;
  background-color: rgba(139, 139, 139, 0.74);
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
