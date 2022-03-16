<template>
  <div id="form">
    <p class="title">Create a new account</p>
    <p class="title1">Username</p>
    <p class="title2">Password</p>

    <input required ref="emailSignup" class="entry1" type="mail" placeholder="Enter your email adress"/>
    <input required ref="passwordSignup" class="entry2" type="password" placeholder="Enter your password"/>
    <p class="button">
      <ButtonForm msg="Register"/>
    </p>
    
  </div>
</template>

<script>

import bcrypt from 'bcryptjs'
import ButtonForm from './ButtonForm.vue'

export default {
  name: "SignupPage",
  components:{
    ButtonForm
  },
  methods:{
      getSignupForm(){
          this.user = this.$refs.emailSignup
          const pswd = this.encryptedPassword(this.$refs.passwordSignup)
          console.log(pswd)
          if(typeof(pswd) != String){
              alert("Impossible to create an account")
          } else {
              this.password = pswd
          }
      },
      encryptedPassword(password){
          bcrypt.hash(password, 10)
          .then(hash => {
              return hash
          })
          .catch(error => {
              return error
          })
      }
  }
};
</script>

<style>
#formSignup {
  height: 65vh;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 30% 25% 25% 20%;
  align-items: center;
}

.title {
  grid-column: 1 / 3;
  grid-row: 0 / 1;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  border-bottom: solid rgb(232, 78, 70) 1px;
}

.title1 {
  grid-column: 0;
  grid-row: 2;
  text-align: right;
  margin-right: 40px;
  font-size: 30px;
  color: #4b1e1e;
}

.title2 {
  grid-column: 0;
  grid-row: 3;
  text-align: right;
  margin-right: 40px;
  font-size: 30px;
  color: #4b1e1e;
}
.entry1 {
  grid-column: 2;
  grid-row: 2;
  width: 50%;
  font-size: 30px;
  border: 1px solid rgb(232, 78, 70);
  border-radius: 5px;
  padding: 10px;
  color: #4b1e1e;
}

.entry2 {
  grid-column: 2;
  grid-row: 3;
  width: 50%;
  font-size: 30px;
  border: 1px solid rgb(232, 78, 70);
  border-radius: 5px;
  padding: 10px;
  color: #4b1e1e;
}

.button{
  display: flex;
  grid-row: 4;
  grid-column: 1 / 3;
}
</style>
