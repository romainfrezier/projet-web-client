<template>
<div>
    <ul v-if="!isDetail" class="tiles"> 
        <li v-for="stat in stats" :key="stat.id" class="tile">
            <div class="content">
                <p>{{ stat.statName }}</p>
            </div>
            <div class="button">
              <button @click="seeStat(stat.statName)" class="see">👀</button>
            </div>
        </li>
    </ul>

    <div v-if="isDetail" class="detail">
        <p class="cross" @click="changeDetail()">✖️</p>
        <p class="title">{{ stat }}</p>
        <div id="totals">
            <p v-if="(this.stat == 'Distance')">Total : {{ sum }} km</p>
            <p v-if="(this.stat == 'Time')">Total : {{ sum }} minutes</p>
            <p v-if="(this.stat == 'Height difference')">Total : +{{ sum }} m</p>
            <p v-if="(this.stat == 'Speed')">Average speed : {{ sum }} km/h</p>
        </div>
    </div>
</div>
    
</template>

<script>
import axios from 'axios'
// import Notiflix from 'notiflix'

export default {
    name:'StatTiles',
    data(){
        return {
            stats: [{statName:"Distance"}, {statName:"Height difference"}, {statName:"Time"}, {statName:"Speed"}],
            isDetail: false,
            stat: "",
            sum: 0.0,
            sumForSpeed:0.0,
        }
    },
    methods:{
        async seeStat(name){
            this.changeDetail()
            this.stat = name
            this.sum = 0.0
            this.sumForSpeed = 0.0
            const user = localStorage.getItem('user')
            if (name == "Distance"){
                await axios.get(process.env.VUE_APP_API+"statValues/"+user+"/distance",
                {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                .then(response => {
                    console.log(response)
                    response.data.forEach(stat => {
                        this.sum += parseInt(stat.value)
                    })
                })
                .catch(error => {console.log(error)})
            }
            if (name == "Time"){
                await axios.get(process.env.VUE_APP_API+"statValues/"+user+"/time",
                {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                .then(response => {
                    console.log(response)
                    response.data.forEach(stat => {
                        this.sum += parseInt(stat.value)
                    })
                })
                .catch(error => {console.log(error)})
            }
            if (name == "Height difference"){
                await axios.get(process.env.VUE_APP_API+"statValues/"+user+"/height",
                {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                .then(response => {
                    console.log(response)
                    response.data.forEach(stat => {
                        this.sum += parseInt(stat.value)
                    })
                })
                .catch(error => {console.log(error)})
            }
            if (name == "Speed"){
                await axios.get(process.env.VUE_APP_API+"statValues/"+user+"/time",
                {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                    .then(response => {
                        response.data.forEach(stat => {
                            this.sum += parseInt(stat.value)
                        })
                    })
                    .catch(error => {console.log(error)})
                await axios.get(process.env.VUE_APP_API+"statValues/"+user+"/distance",
                {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                    .then(response => {
                        response.data.forEach(stat => {
                            this.sumForSpeed += parseInt(stat.value)
                        })
                    })
                    .catch(error => {console.log(error)})
                console.log(this.sum)
                console.log(this.sumForSpeed)
                this.sum = (parseInt(this.sumForSpeed)/(parseInt(this.sum)/60)).toFixed(2) 

            }
        },
        changeDetail(){
            this.isDetail = !this.isDetail
        }
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

.tiles{
    height: 30vh;
  margin-top: 10px;
  overflow-y: scroll;
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
  grid-template-columns: 70% 30%;
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

.detail{
    background-color: #393E4680;
    border: #222831 1px solid;
    height: 15vh;
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

#totals{
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-row: 2;
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