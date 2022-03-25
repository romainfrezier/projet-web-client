<template>
    <div id="all">
        <NavBar/>
        <div id="content">
            <div v-if="!isEmpty">
                <ul class="tiles" v-if="!isDetail"> 
                    <li v-for="(activity) in this.activities" :key="activity.id" class="tile">
                        <div class="content">
                            <p>{{ activity.activityName }}</p>
                            <p>{{ activity.sportName }}</p>
                            <p>{{ activity.date }}</p>
                        </div>
                        <div class="button">
                            <button @click="seeActivity(activity.id, activity.activityName, activity.sportName, activity.date, activity.item)" class="see">👀</button>
                            <button @click="deleteActivity(activity.id, activity.activityName)" class="delete">🚮</button>
                            <button @click="edit(activity.id)">✏️</button>
                        </div>
                    </li>
                </ul>
                <div v-if="isDetail" class="detail">
                    <p class="cross" @click="changeDetail()">✖️</p>
                    <p class="title">{{ name }}</p>
                    <div class="desc">
                        <p>Your {{ sport }} activity on {{ date }} :</p>
                        <p v-if="(this.stats.distance != 0.0)">📏 Distance : {{ this.stats.distance }} km</p>
                        <p v-if="(this.stats.time != 0.0)">⏱ Time : {{ this.stats.time }} minutes</p>
                        <p v-if="(this.stats.speed != 0.0)">🏎 Average speed : {{ this.stats.speed }} km/h</p>
                        <p v-if="(this.stats.height != 0.0)">⛰ Height difference : +{{ this.stats.height }} m</p>
                        <p v-if="(this.item)">🎿 Item used : {{ this.item }}</p>
                    </div>
                </div>
            </div>
            <div class="message" v-if="isEmpty">
                <p>No activities found with this name...</p>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/AuthHeader.vue'
import axios from 'axios'
import Notiflix from 'notiflix'
import router from '../router/index.js'

export default {
    name: 'SearchView',
    components:{
        NavBar
    },
    data(){
        return {
            activities: [{}],
            isEmpty: true,
            isDetail: false,
            stats:{distance: 0.0, height: 0.0, time: 0.0, speed: 0.0},
            name:'',
            item: '',
            date:'',
            sport:'',
        }
    },
    beforeMount(){
        this.getActivity()
    },
    methods:{
        async getActivity(){
            const user = localStorage.getItem("user").toString()
            await axios.get(process.env.VUE_APP_API+"activities/"+user+"/name/"+this.$route.params.name+"/", 
            {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}}) 
            .then(response => {
                let i = 0
                console.log(response.data)
                this.activities = response.data
                this.activities.forEach(activity => {
                    axios.get(process.env.VUE_APP_API+"sports/"+user+"/"+activity.sportId,
                    {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                    .then(response => {
                        activity.sportName = response.data[0].sportName
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    i ++
                })
                if(i > 0){
                    this.isEmpty = false
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        deleteActivity(id, name){
            Notiflix.Confirm.show(
                "Delete activity",
                "Do you want to delete activity named : "+name+" ?",
                "Yes",
                "No",
                () => {
                axios.delete(process.env.VUE_APP_API+"activities/"+localStorage.getItem('user')+"/"+id,
                    {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                    .then(response => {
                        Notiflix.Notify.success("Activity " + name + " deleted with succes", {closeButton:true})
                        setTimeout("router.push('/profil')", 2000)
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
                Notiflix.Notify.info("Activity " + name + " is not deleted", {closeButton:true})
                },
                { titleColor: "#ff5549", okButtonBackground: "#ff5549" }
            )
        },
        async seeActivity(id, name, sport, date, item){
            this.name = name
            this.sport = sport
            this.date = date
            this.stats = {distance: 0.0, height: 0.0, time: 0.0, speed: 0.0}
            await axios.get(process.env.VUE_APP_API+"statValues/"+localStorage.getItem('user')+"/activity/"+id,
                {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                .then(response => {
                response.data.forEach(stat => {
                    if(stat.stat == 'time'){
                    this.stats.time += parseInt(stat.value)
                    }
                    if(stat.stat == 'distance'){
                    this.stats.distance += parseInt(stat.value)
                    }
                    if(stat.stat == 'height'){
                    this.stats.height += parseInt(stat.value)
                    }
                })
                if(this.stats.distance != 0.0 && this.stats.time != 0.0){
                    this.stats.speed = (this.stats.distance/(this.stats.time/60)).toFixed(2)
                }
                if(this.item != ''){
                    axios.get(process.env.VUE_APP_API+"items/"+localStorage.getItem('user')+"/"+item,
                    {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                    .then(response => {
                        this.item = response.data.itemName
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
                this.changeDetail()
                })
                .catch(error => {console.log(error)})
        },
        changeDetail(){
            this.isDetail = !this.isDetail
        },
        edit(id){
            const path = "/activityForm/"+id
            router.push(path)
        },

    }
    
}
</script>

<style scoped>
#all{
    height: 90vh;
}

.content{
    height: 85%;
}

ul {
  list-style: none;
  padding: 0;
}

.tiles{
  margin-top: 10px;
  overflow-y: scroll;
  height: 50vh;
  margin-bottom: 15px;
}

.tile{
  background-color: #22283180;
  margin: 10px;
  margin-bottom: 20px;
  padding: 5px;
  border: #222831 1px solid;
  border-radius: 10px;
  user-select: none;
  text-align: center;
  display: grid;
  grid-template-columns: 60% 40%;
  cursor: default;
}

.tile:hover{
  background-color: #393E46;
}

.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  user-select: none;
  grid-column: 1;
}

.content > p {
  margin: auto;
}

.detail{
    background-color: #393E4680;
    border: #222831 1px solid;
    height: 35vh;
    border-radius: 10px;
    margin: 10px;
    text-align: center;
    display: grid;
    grid-template-rows: 40% 60%;
    cursor: default;
}

.title{
    grid-row: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 30px;
    border-bottom: solid 1px #FFD369;
    width: 80%;
    margin-left: 10%;
    text-align: center;
}

.cross{
    margin-top: 30px;
    width: 10%;
    margin-left: 45%;
    font-size: 30px;
    cursor: pointer;
}

.desc{
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-row: 2;
}

.desc > p {
  margin: auto;
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

.button > button > a{
  text-decoration: none;
}

.button > button:hover{
  background-color: #EEEEEE80;
  font-size: 40px;
  cursor: pointer;
}

.message{
  display: flex;
  background: #22283180;
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