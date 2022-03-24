<template>
<div id="all1">
  <div v-if="!form" class="content1">
    <ul class="tiles" v-if="!form"> 
      <li v-for="sport in sports" :key="sport.id" class="tile" >
        <div class="content">
          <p>{{ sport.sportName }}</p>
          <p>Period : {{ sport.sportPeriod }}</p>
        </div>
          <div v-if="isAdmin" class="button">
            <button @click="writeSport(sport.id, sport.sportName, sport.sportPeriod)" class="write">✍️</button>
            <button @click="deleteSport(sport.id, sport.sportName)" class="delete">🚮</button>
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
        <select name="period" id="period" v-model="period">
          <option disabled value="">Choose...</option>
          <option value="Winter">Winter</option>
          <option value="Summer">Summer</option>
          <option value="Summer/Winter">Summer & Winter</option>
        </select>
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
    getSports(){
      axios.get(process.env.VUE_APP_API+"sports/"+localStorage.getItem("user").toString()+"/", 
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
    deleteSport(id, name){
      Notiflix.Confirm.show(
        "Delete sport",
        "Do you want to delete sport named : "+name+" ?",
        "Yes",
        "No",
        () => {
          axios.delete(process.env.VUE_APP_API+"sports/"+localStorage.getItem("user").toString()+"/"+id,
            {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
            .then(response => {
              Notiflix.Notify.success("Sport " + name + " deleted with succes", {closeButton:true})
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
          Notiflix.Notify.info("Sport " + name + ". is not deleted", {closeButton:true})
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
  height: 90%;
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
