<template>
  <div>
    <NavBar />
    <div id="content">
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
      </div>
      <div id="setting">
        <p class="title">⚙️ Settings</p>
        <div id="buttons">
          <button id="del">Delete Account</button>
          <button id="prem">{{ this.premium }} Premium Access</button>
          <button @click="logout()" id="logout">Log out</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/AuthHeader.vue";
import ActivityTiles from "../components/ActivityTiles.vue"
import router from "../router/index";

export default {
  name: "ProfilView",
  components: {
    NavBar,
    ActivityTiles,
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
      if (localStorage.getItem("isPremium") == "true"){
        this.premium = "Leave"
      }
      else{
        this.premium = "Get"
      }
    }, 
    logout(){
      localStorage.clear()
      router.push('/')
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
}

#prem:hover{
  border: 3px solid gold;
  background-color: gold;
  font-size: 27px;
}

#logout:hover{
  border: 3px solid rgb(77, 109, 214);
  background-color: rgb(77, 109, 214);
  font-size: 27px;
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
</style>
