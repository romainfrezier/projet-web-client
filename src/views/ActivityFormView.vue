<template>
    <div id="all">
        <NavBar/>
        <router-link id="cross" to="/profil">✖️</router-link>
        <form id="activityForm" action="" @submit.prevent="sendDataSport()">
            <label for="activityName">Activity Name</label>
            <input type="text" name="activityName" required v-model="activity" placeholder="Enter the activity name"/>
            <label for="item">Item (optional)</label>
            <select id="item" v-model="item">
                <option disabled value="">Choose...</option>
                <option v-for="item in itemsAll" :key="item.id" :value="item.id">{{ item.itemName }}</option>
            </select>
            <label for="date">Date</label>
            <Datepicker id="date" v-model="date" :format="dateFormat" :monthChangeOnScroll="false" :enableTimePicker="false" autoApply utc></Datepicker>
            <label for="sport" class="sport">Sport</label>
            <select id="sport" v-model="sport">
                <option disabled value="">Choose...</option>
                <option v-for="sport in possibleSport" :key="sport.id" :value="sport.id">{{ sport.sportName }}</option>
            </select>
            <label for="distance">Distance in km (optional)</label>
            <input type="number" name="distance" v-model="distance" min="0" max="150">
            <label for="height">Height difference in m (optional)</label>
            <input type="number" name="height" v-model="height" min="5" max="5000">
            <label for="time">Time (optional)</label>
            <input type="time" name="time" v-model="time">
            <button type="submit" class="btn">Submit</button>
        </form>
        </div>
</template>

<script>
import axios from 'axios'
import Notiflix from 'notiflix'
import NavBar from '../components/AuthHeader.vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
import router from '../router/index.js'

export default {
    name: 'ItemView',
    setup(){
        const dateCalendar = ref(new Date());
        const dateFormat = dateCalendar => {
            const day = dateCalendar.getDate();
            const month = dateCalendar.getMonth() + 1;
            const year = dateCalendar.getFullYear();
            return `${year}-${month}-${day}`;
        }
        return {
            dateCalendar,
            dateFormat,
        }
    },
    data(){
        return {
            possibleSport: [{}],
            item: '',
            activity: '',
            sport: '',
            date: '',
            itemsAll: [{}],
            time:'',
            height: '',
            distance: '',
        }
    },
    components: {
        NavBar,
        Datepicker
    },
    beforeMount(){
        this.getSports()
        this.getItems()
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
        async getItems(){
            await axios.get(process.env.VUE_APP_API+"items/"+localStorage.getItem('user')+"/",
                {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                .then(response => {
                    this.itemsAll = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async sendDataSport(){
            await axios.post(process.env.VUE_APP_API+"activities/"+localStorage.getItem('user')+"/",
                {
                    activityName: this.activity, 
                    item: this.item, 
                    sportId: this.sport, 
                    date: this.date.split('T')[0],
                    time: this.date.split('T')[0]+"T"+this.time,
                    distance: this.distance,
                    height: this.height
                },
                {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                .then(response => {
                    console.log(response)
                    router.push('/profil')
                    Notiflix.Notify.success("Activity created", {closeButton:true})
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

#activityForm{
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
  overflow-y: scroll;
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

select, option {
  color: #EEEEEE;
  background: transparent;
  border: 1px solid #EEEEEE;
  font-size: 20px;
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

.sport{
    margin-top: 40px;
}

.dp__theme_light {
    --dp-background-color: transparent;
    --dp-text-color: #EEEEEE;
    --dp-hover-color: #EEEEEE;
    --dp-hover-text-color: #EEEEEE;
    --dp-hover-icon-color: #EEEEEE;
    --dp-primary-color: #222831;
    --dp-primary-text-color: #EEEEEE;
    --dp-secondary-color: #222831;
    --dp-border-color: #EEEEEE;
    --dp-menu-border-color: #FFD369;
    --dp-border-color-hover: #EEEEEE;
    --dp-disabled-color: #222831;
    --dp-scroll-bar-background: #222831;
    --dp-scroll-bar-color: #222831;
    --dp-success-color: #32c682;
    --dp-success-color-disabled: #32c682;
    --dp-icon-color: #FFD369;
    --dp-danger-color: #ff5549;
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