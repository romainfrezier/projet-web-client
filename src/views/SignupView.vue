<template>
  <div>
    <Visitors></Visitors>
    <div id="content">
      <p id="title">Create a new account</p>
      <div id="form">
        <form action="" @submit.prevent="sendData()">
          <label for="username">Username</label>
          <input required type="text" name="username" v-model="username" placeholder="Enter your username"/>
          <label for="password">Password</label>
          <input required type="password" name="password" v-model="password" placeholder="Enter your password"/>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index.js";
import Visitors from "../components/VisitorsHead.vue";
import Notiflix from 'notiflix'

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  name: "VisitorsView",
  components: {
    Visitors,
  },
  methods: {
    sendData() {
      if (this.verifiyUsername(this.username) && this.verifiyPassword(this.password)){
        axios.post(process.env.VUE_APP_API+"signup/", {
          username: this.$CryptoJS.AES.encrypt(this.username,`${process.env.VUE_APP_KEY}`).toString(), 
          password: this.$CryptoJS.AES.encrypt(this.password,`${process.env.VUE_APP_KEY}`).toString()})
        .then(response => {
          Notiflix.Notify.success('Your account has been created ! Please login now !', {closeButton:true})
          console.log(response)
          router.push('/login')
        }).catch(error =>{
          if(error.message.toString().includes('400')){
            Notiflix.Notify.failure("This username is already used", {closeButton:true})
          } else if(error.toString().includes('500')){
            Notiflix.Notify.failure("Server Error...", {closeButton:true})
          } else {
            Notiflix.Notify.failure("An error occured", {closeButton:true})
          }
      })
      } else if (!this.verifiyUsername(this.username) && !this.verifiyPassword(this.password)){
        Notiflix.Notify.failure("Please enter a valid username.\nYour password must contain at least 8 characters, 1 number, 1 lowercase character, 1 uppercase character, no spaces and no special character", {closeButton:true})
      } else if (this.verifiyUsername(this.username) && !this.verifiyPassword(this.password)){
        Notiflix.Notify.failure("Your password must contain at least 8 characters, 1 number, 1 lowercase character, 1 uppercase character, no spaces and no special character", {closeButton:true})
      } else if (!this.verifiyUsername(this.username) && this.verifiyPassword(this.password)){
        Notiflix.Notify.failure("Please enter a valid username.", {closeButton:true})
      }
      
    },
    verifiyUsername(username){
      const re = /^(?=.*[a-z])[0-9a-zA-Z]{5,}\S$/
      return re.test(username)
    },
    verifiyPassword(password){
      const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}\S$/
      return re.test(password)
    }
  }
}
</script>

<style scoped>
#content{
  height: 75vh;
  display: grid;
  grid-template-rows: 20% 80%;
  align-items: center;
}

#title{
  width: 90%;
  margin: auto;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #393E46;
  border-bottom: solid #FFD369 1px;
}

#form{
  display: inline-flex;
  height: 100%;
}

form{
  margin: auto;
  grid-row: 2;
  width: 50%;
  max-width: 600px;
  height: 80%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #393E46;
  border: 2px solid #FFD369;
  border-radius: 10px;
}

input{
  margin-bottom: 40px;
  font-size: 2vh;
  color: #EEEEEE;
  border: 1px solid #FFD369;
  border-radius: 5px;
  padding: 10px;
  background-color: transparent;
}

label{
  font-size: 30px;
  font-weight: bold;
  border-bottom: solid 1px #FFD369;
  margin-bottom: 5px;
}

button {
  width: 150px;
  height: 40px;
  font-size: 25px;
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

button:hover{
  color: #FFD369;
}

</style>