<template>
  <div id="form">
    <p class="title">Login to your account</p>
    <p class="title1">Username</p>
    <p class="title2">Password</p>

    <input class="entry1" type="mail" placeholder="Enter your email adress"/>
    <input class="entry2" type="password" placeholder="Enter your password"/>
    <p class="button">
      <ButtonForm msg="Login"/>
    </p>
    
  </div>
</template>

<script>
import ButtonForm from './ButtonForm.vue'

export default {
  name: "LoginPage",
  components:{
    ButtonForm
  }
};
</script>

<style>
#form {
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
