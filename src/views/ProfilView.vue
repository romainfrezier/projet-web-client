<template>
  <div id="all">
    <NavBar />
    <div id="content">
      <div id="activity">
        <p class="title">🏆 My Activities</p>
        <ActivityTiles/>
        <button class="add"><router-link to="/activityForm">➕ Add</router-link></button>
      </div>
      <div id="stat">
        <p class="title">📶 My Stats</p>
        <StatTiles/>
      </div>
      <div id="item">
        <p class="title">🎿 My Items</p>
        <p v-if="!isPremium" id="ad">This section will be available if you subscribe to premium access</p>
        <div v-if="isPremium">
          <ItemTiles/>
          <button class="add"><router-link to="/item">➕ Add</router-link></button>
        </div>
      </div>
      <div id="setting">
        <p class="title">⚙️ Settings</p>
        <div id="buttons">
          <button id="del" @click="delAccount()">Delete Account 🚮</button>
          <button id="prem" @click="changePrem()">{{ this.premium }} Premium Access 💳</button>
          <button @click="logout()" id="logout">Log out 💤</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Notiflix from 'notiflix'
import NavBar from "../components/AuthHeader.vue";
import ActivityTiles from "../components/ActivityTiles.vue"
import ItemTiles from "../components/ItemTiles.vue"
import StatTiles from "../components/StatTiles.vue"
import router from "../router/index";

export default {
  name: "ProfilView",
  components: {
    NavBar,
    ActivityTiles,
    ItemTiles,
    StatTiles
  },
  data(){
    return {
      premium:'',
      isPremium: false,
      isAdmin: false,
    }
  },beforeMount(){
    this.btnPremium()
    this.admin()
  },
  methods:{
    admin(){
      if (localStorage.getItem("isAdmin") == "true"){
        this.isAdmin = true
      }
    },
    btnPremium(){
      if (localStorage.getItem("isPremium") == "true"){
        this.premium = "Leave"
        this.isPremium = true
      }
      else{
        this.premium = "Get"
      }
    }, 
    logout(){
      localStorage.clear()
      router.push('/')
    },
    changePrem(){
      if(this.premium == 'Leave'){
        Notiflix.Confirm.show(
                "Premium Access",
                "Do you want to leave your premium access ?",
                "Yes",
                "No",
                () => {          
                  axios.put(process.env.VUE_APP_API+"users/"+localStorage.getItem("user").toString()+"/"+localStorage.getItem("user").toString()+"/",
                    {isPremium: false},
                    {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                    .then(response => {
                      Notiflix.Notify.success("Premium subscription leaved with succes", {closeButton:true})
                      setTimeout("location.reload(true)", 2000)
                      console.log(response)
                      localStorage.setItem("isPremium", "false")})
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
                  Notiflix.Notify.info("Premium subscription is still alive", {closeButton:true})
                },
                { titleColor: "goldenrod", okButtonBackground: "goldenrod" })
      } else if (this.premium == "Get"){
        Notiflix.Confirm.show(
                "Premium Access",
                "Do you want to get your premium access for $5 (fake)?",
                "Yes",
                "No",
                () => {          
                  axios.put(process.env.VUE_APP_API+"users/"+localStorage.getItem("user").toString()+"/"+localStorage.getItem("user").toString()+"/",
                    {isPremium: true},
                    {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                    .then(response => {
                      Notiflix.Notify.success("Premium subscription successfully obtained", {closeButton:true})
                      setTimeout("location.reload(true)", 2000)
                      console.log(response)
                      localStorage.setItem("isPremium", "true")})
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
                  Notiflix.Notify.info("Premium subscription is still available", {closeButton:true})
                },
                { titleColor: "goldenrod", okButtonBackground: "goldenrod" })
      }
    },
    delAccount(){
      Notiflix.Confirm.show(
        "Delete account",
        "Do you want to delete your account ? This action is final and you cannot go back.",
        "Yes",
        "No",
        () => {          
          axios.delete(process.env.VUE_APP_API+"users/"+localStorage.getItem("user").toString()+"/"+localStorage.getItem("user").toString()+"/",
            {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
            .then(response => {
              Notiflix.Notify.success("Your account has been deleted...", {closeButton:true})
              setTimeout(router.push('/'), 2000)
              console.log(response)
              localStorage.setItem("isPremium", "true")})
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
          Notiflix.Notify.info("Your account is still alive", {closeButton:true})
        },
        { titleColor: "#ff5549", okButtonBackground: "#ff5549" })
    },
  }
};
</script>

<style scoped>
#content {
  height: 70vh;
  display: grid;
  grid-template-rows: 60% 40%;
  grid-template-columns: 40% 30% 30%;
  overflow-y: scroll;
}

#all{
  height: 90vh;
}

.title{
  font-size: 20px;
  line-height: 60px;
  margin: 0px ;
  text-align: center;
  border-bottom: solid 2px #FFD369;
  border-radius: 7px;
  background-color: #393E46;
  user-select: none;
  cursor: default;
}

#activity{
  grid-column: 1;
  grid-row: 1 / 3;
  background-color: #EEEEEE80;
  margin: 10px;
  border: solid 3px #FFD369;
  border-radius: 10px;
}

#stat{
  grid-column: 2;
  grid-row: 1;
  background-color: #EEEEEE80;
  margin: 10px;
  border: solid 3px #FFD369;
  border-radius: 10px;
}

#item{
  grid-column:  3;
  grid-row: 1;
  background-color: #EEEEEE80;
  margin: 10px;
  border: solid 3px #FFD369;
  border-radius: 10px;
}

#setting{
  grid-column: 2 / 4;
  grid-row: 2;
  background-color: #EEEEEE80;
  margin: 10px;
  border: solid 3px #FFD369;
  border-radius: 10px;
}

#buttons{
  display: flex;
  width: 100%;
  height: 70%;
}

#buttons > button{
  margin: auto;
  font-family: LemonMilk, Avenir, Helvetica, Arial, sans-serif;
  font-size: 25px;
  color: #222831;
  width: 30%;
  height: 80%;
  padding: 10px;
  border-radius: 10px;
  background-color: transparent;
}

#del{
  border: red 2px solid;
}
#prem{
  border: goldenrod 2px solid;
}
#logout{
  border: rgb(77, 109, 214) 2px solid;
}

#del:hover{
  border: 3px solid red;
  background-color: red;
  font-size: 27px;
  cursor: pointer;
}

#prem:hover{
  border: 3px solid gold;
  background-color: gold;
  font-size: 27px;
  cursor: pointer;
}

#logout:hover{
  border: 3px solid rgb(77, 109, 214);
  background-color: rgb(77, 109, 214);
  font-size: 27px;
  cursor: pointer;
}

.add{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-right: 25%;
  margin-left: 25%;
  margin-bottom: 10px;
  width: 50%;
  padding: 10px;
  border: #393E46 1px solid;
  border-radius: 10px;
  background-color: #22283180;
  text-decoration: none;
  color: #222831;
}

.add > a {
  text-decoration: none;
  color: #222831;
  height: 100%;
  width: 100px;
}

.add > a:hover {
  color: #FFD369;
}

.add:hover{
  cursor: pointer;
  align-items: center;
  background-color: #222831;
  color: #FFD369;
}

#ad{
  background-color: goldenrod;
  width: 50%;
  padding: 10px;
  margin: auto;
  margin-top: 20%;
  text-align: center;
  transform: rotate(-30deg);
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
