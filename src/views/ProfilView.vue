<template>
  <div id="all">
    <NavBar />
    <div v-if="!isForm" id="content">
      <div id="activity">
        <p class="title">🏆 My Activities</p>
          <ActivityTiles/>
          <button class="add">➕ Add</button>
      </div>
      <div id="stat">
        <p class="title">📶 My Stats</p>
      </div>
      <div id="item">
        <p class="title">🎿 My Items</p>
        <p v-if="!isPremium" id="ad">This section will be available if you subscribe to premium access</p>
        <div v-if="isPremium">
          <ItemTiles/>
          <button @click="changeFormItem()" class="add">➕ Add</button>
        </div>
      </div>
      <div id="setting">
        <p class="title">⚙️ Settings</p>
        <div id="buttons">
          <button id="del" @click="delAccount()">Delete Account</button>
          <button id="prem" @click="changePrem()">{{ this.premium }} Premium Access</button>
          <button @click="logout()" id="logout">Log out</button>
        </div>
      </div>
    </div>

    <div id="itemForm" v-if="isForm && isItem">
      <p id="cross" @click="changeFormItem()">✖️</p>
      <form action="" @submit.prevent="sendDataItem()">
        <label for="itemName">Item Name</label>
        <input type="text" name="itemName" required v-model="item" placeholder="Enter the item name"/>
        <label for="usage">Usage</label>
        <input type="text" name="usage" v-model="usage" placeholder="Enter the usage (optionnal)"/>
        <label for="sport">Sport</label>
        <select id="sport" v-model="sport">
          <option disabled value="">Choose...</option>
          <option v-for="sport in sports" :key="sport.id" :value="sport.id">{{ sport.sportName }}</option>
        </select>
        <button type="submit" class="btn">Submit</button>
      </form>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import Notiflix from 'notiflix'
import NavBar from "../components/AuthHeader.vue";
import ActivityTiles from "../components/ActivityTiles.vue"
import ItemTiles from "../components/ItemTiles.vue"
import router from "../router/index";

export default {
  name: "ProfilView",
  components: {
    NavBar,
    ActivityTiles,
    ItemTiles
  },
  data(){
    return {
      premium:'',
      isPremium: false,
      isForm: false,
      isItem: false,
      isActivity: false,
      item: '',
      usage: '',
      sport:'',
      sports: [{}],
    }
  },
  beforeMount(){
    this.btnPremium()
    this.getSports()
  },
  methods:{
    btnPremium(){
      if (localStorage.getItem("isPremium") == "true"){
        this.premium = "Leave"
        this.isPremium = true
      }
      else{
        this.premium = "Get"
      }
    },
    getSports(){
      axios.get(process.env.VUE_APP_API+"sports/"+localStorage.getItem("user").toString()+"/", 
        {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}}) 
      .then(response => {
          this.sports = response.data
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
    changeFormItem(){
      this.isForm = !this.isForm
      this.isItem = !this.isItem
      this.item = ''
      this.usage = ''
    },
    sendDataItem(){
      let usage
      if(this.usage == ""){
        usage = null
      } else {
        usage = this.usage
      }
      axios.post(process.env.VUE_APP_API+"items/"+localStorage.getItem('user')+"/",
        {itemName: this.item, usage: usage, sport: this.sport, user: localStorage.getItem('user')},
        {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
        .then(response => {
          console.log(response)
          this.changeFormItem()
          Notiflix.Notify.success("Item created", {closeButton:true})
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
};
</script>

<style scoped>
#content {
  height: 68vh;
  display: grid;
  grid-template-rows: 60% 40%;
  grid-template-columns: 40% 30% 30%;
  overflow-y: scroll;
}

#all{
  height: 100%;
}

.title{
  font-size: 20px;
  line-height: 60px;
  margin: 0px ;
  text-align: center;
  border-bottom: solid 2px #4b1e1e;
  background-color: rgba(232, 78, 70, 0.65);
  user-select: none;
  cursor: default;
}

#activity{
  grid-column: 1;
  grid-row: 1 / 3;
  background-color: rgba(219, 219, 219, 0.74);
  margin: 10px;
  border: solid 3px #4b1e1e;
  border-radius: 10px;
}

#stat{
  grid-column: 2;
  grid-row: 1;
  background-color: rgba(219, 219, 219, 0.74);
  margin: 10px;
  border: solid 3px #4b1e1e;
  border-radius: 10px;
}

#item{
  grid-column:  3;
  grid-row: 1;
  background-color: rgba(219, 219, 219, 0.74);
  margin: 10px;
  border: solid 3px #4b1e1e;
  border-radius: 10px;
}

#setting{
  grid-column: 2 / 4;
  grid-row: 2;
  background-color: rgba(219, 219, 219, 0.74);
  margin: 10px;
  border: solid 3px #4b1e1e;
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
  color: #4b1e1e;
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

#ad{
  background-color: goldenrod;
  width: 50%;
  padding: 10px;
  margin: auto;
  margin-top: 20%;
  text-align: center;
  transform: rotate(-30deg);
}

#itemForm{
  height: 67vh;
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

select{
  color: #4b1e1e;
  border: 1px solid rgb(232, 78, 70);
  border-radius: 5px;
  font-size: 25px;
  margin-bottom: 40px;
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
</style>
