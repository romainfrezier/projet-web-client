<template>
    <div id="all">
        <NavBar/>
        <router-link id="cross" to="/profil">✖️</router-link>
        <form id="itemForm" action="" @submit.prevent="sendDataItem()">
            <label for="itemName">Item Name</label>
            <input type="text" name="itemName" required v-model="item" placeholder="Enter the item name"/>
            <label for="usage">Usage (optional)</label>
            <input type="text" name="usage" v-model="usage" placeholder="Enter the usage (km)"/>
            <label for="sport">Sport</label>
            <select id="sport" v-model="sport">
              <option disabled value="">Choose...</option>
              <option v-for="sport in possibleSport" :key="sport.id" :value="sport.id">{{ sport.sportName }}</option>
            </select>
            <button type="submit" class="btn">Submit</button>
        </form>
        </div>
</template>

<script>
import axios from 'axios'
import Notiflix from 'notiflix'
import NavBar from '../components/AuthHeader.vue'
import router from '../router/index.js'

export default {
    name: 'ItemView',
    data(){
        return {
            possibleSport: [{}],
            usage: '',
            item: '',
            sport: '',
        }
    },
    components: {
        NavBar,
    },
    beforeMount(){
        this.getSports()
    },
    methods:{
        getSports(){
            axios.get(process.env.VUE_APP_API+"sports/"+localStorage.getItem("user").toString()+"/", 
                {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}}) 
            .then(response => {
                this.possibleSport = response.data
                })
            .catch(error =>{
                if(error.message.toString().includes('401')){
                    Notiflix.Notify.failure("Unauthorized...", {closeButton:true})
                } else if(error.toString().includes('500')){
                    Notiflix.Notify.failure("Server Error...", {closeButton:true})
                } else {
                    Notiflix.Notify.failure("An error occured", {closeButton:true})
                }
                console.log(error)
                })
        },
        
        async sendDataItem(){
            let usage
            if(this.usage == ""){
                usage = null
            } else {
                usage = this.usage
            }
            await axios.post(process.env.VUE_APP_API+"items/"+localStorage.getItem('user')+"/",
                {itemName: this.item, usage: usage, sportId: this.sport, user: localStorage.getItem('user')},
                {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                .then(response => {
                  console.log(response)
                  router.push('/profil')
                  Notiflix.Notify.success("Item created", {closeButton:true})
                })
                .catch(error =>{
                if(error.message.toString().includes('401')){
                    Notiflix.Notify.failure("Unauthorized...", {closeButton:true})
                } else if(error.toString().includes('500')){
                    Notiflix.Notify.failure("Server Error...", {closeButton:true})
                } else {
                    Notiflix.Notify.failure("An error occured", {closeButton:true})
                }
                console.log(error)
                })
        }
    }
}
</script>

<style scoped>
#all{
  height: 90vh;
}

#itemForm{
    height: 60%;
}

form{
  display: inline-flex;
  margin: auto;
  grid-row: 2;
  width: 50%;
  max-width: 600px;
  height: 70%;
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

select{
  color: #EEEEEE;
  background: transparent;
  border: 1px solid #FFD369;
  border-radius: 5px;
  font-size: 25px;
  margin-bottom: 40px;
}

label{
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
  color: #EEEEEE;
  background-color: transparent;
  border: 1px solid #FFD369;
  border-radius: 5px;
  text-align: center;
  margin: auto;
  margin-bottom: 10px;
  transition: 200ms;
  cursor: pointer;
}

form > button:hover {
  color: #FFD369;
}

#cross{
  margin: 10px;
  padding: 10px;
  font-size: 50px;
  text-decoration: none;
}

#cross:hover{
  cursor: pointer;
}
</style>