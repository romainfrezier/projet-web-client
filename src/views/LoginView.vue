<template>
  <div>
    <Visitors></Visitors>
    <div id="content">
      <p id="title">Login to your account</p>
      <div id="form">
        <form action="" @submit.prevent="sendData()">
          <label for="username">Username</label>
          <input type="text" name="username" required v-model="username" placeholder="Enter your username"/>
          <label for="password">Password</label>
          <input type="password" name="password" required v-model="password" placeholder="Enter your password"/>
          <button type="submit" class="btn from-center">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 
import router from '../router/index.js'
import Visitors from "../components/VisitorsHead.vue";
import { mapState } from 'vuex'

export default {
  data(){
    return {
      username: "",
      password: "",
    }
  },
  name: "VisitorsView",
  components: {
    Visitors,
  },
  methods:{
    async sendData(){
      if (this.verifiyUsername(this.username) && this.verifiyPassword(this.password)){
        await axios.post(process.env.VUE_APP_API+"login/", { 
          username: this.$CryptoJS.AES.encrypt(this.username, `${process.env.VUE_APP_KEY}`).toString(),
          password: this.$CryptoJS.AES.encrypt(this.password, `${process.env.VUE_APP_KEY}`).toString()
        })
        .then(response => {
          localStorage.setItem("user", this.$CryptoJS.AES.decrypt(response.data.userId, `${process.env.VUE_APP_KEY}`).toString(this.$CryptoJS.enc.Utf8))
          localStorage.setItem("isPremium", this.$CryptoJS.AES.decrypt(response.data.isPremium, `${process.env.VUE_APP_KEY}`).toString(this.$CryptoJS.enc.Utf8))
          localStorage.setItem("isAdmin", this.$CryptoJS.AES.decrypt(response.data.isAdmin, `${process.env.VUE_APP_KEY}`).toString(this.$CryptoJS.enc.Utf8))
          localStorage.setItem("token", response.data.token)
          router.push('/profil')
        })
        .catch(error => {
          alert(error)
        })
      } else if (!this.verifiyUsername(this.username) && !this.verifiyPassword(this.password)){
        return alert("Please enter a valid username and password.")
      } else if (this.verifiyUsername(this.username) && !this.verifiyPassword(this.password)){
        return alert("Please enter a valid password")
      } else if (!this.verifiyUsername(this.username) && this.verifiyPassword(this.password)){
        return alert("Please enter a valid username")
      }
      
    },
    verifiyUsername(username){
      const re = /^(?=.*[a-z])[0-9a-zA-Z]{5,}\S$/
      return re.test(username)
    },
    verifiyPassword(password){
      const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{7,}\S$/
      return re.test(password)
    }
  },
  computed:{
    ...mapState(['token', 'userId', 'isPremium', 'isAdmin'])
  }
};
</script>

<style scoped>
#content{
  height: 68vh;
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
  border-bottom: solid rgb(232, 78, 70) 1px;
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

button {
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

button:hover {
  height: 50px;
  margin-bottom: 5px;
}
</style>