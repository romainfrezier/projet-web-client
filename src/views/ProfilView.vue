<template>
  <div>
    <NavBar />
    <div id="content">
      <div id="activity">
        <p class="title">My Activities</p>
      </div>
      <div id="stat">
        <p class="title">My Stats</p>
      </div>
      <div id="item">
        <p class="title">My Items</p>
      </div>
      <div id="setting">
        <p class="title">Settings</p>
        <div id="buttons">
          <button id="del">Delete Account</button>
          <button id="prem">{{ this.premium }} Premium Access</button>
          <button id="change">Change username</button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from "../components/AuthHeader.vue";
import Footer from "../components/FooterAll.vue";

export default {
  name: "ProfilView",
  components: {
    NavBar,
    Footer,
  },
  data(){
    return {
      premium:'',
    }
  },
  beforeMount(){
    this.btnPremium()
  },
  methods:{
    btnPremium(){
      console.log(localStorage.getItem("isPremium"))
      if (localStorage.getItem("isPremium")){
        this.premium = "Leave"
      }
      else{
        this.premium = "Get"
      }
    }
  }
};
</script>

<style scoped>
#content {
  height: 65vh;
  display: grid;
  grid-template-rows: 60% 40%;
  grid-template-columns: 40% 30% 30%;
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
  transition: all 400ms;
}

#del{
  border-color: red;
}
#prem{
  border-color: gold;
}
#change{
  border-color: rgb(77, 109, 214);
}

#del:hover{
  border: 3px solid red;
  background-color: red;
  font-size: 27px;
}

#prem:hover{
  border: 3px solid gold;
  background-color: gold;
  font-size: 27px;
}

#change:hover{
  border: 3px solid rgb(77, 109, 214);
  background-color: rgb(77, 109, 214);
  font-size: 27px;
}
</style>
