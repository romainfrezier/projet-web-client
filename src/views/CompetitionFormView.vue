<template>
  <div id="all">
    <NavBar />
    <router-link id="cross" to="/competitions">✖️</router-link>
    <form action="" @submit.prevent="sendData()">
        <label for="competName">Competition Name</label>
        <input type="text" name="competName" required v-model="competName" placeholder="Enter the competition name"/>
        <label for="sport" class="sport">Sport</label>
        <select id="sport" v-model="sport">
            <option disabled value="">Choose...</option>
            <option v-for="sport in possibleSport" :key="sport.id" :value="sport.id">{{ sport.sportName }}</option>
        </select>
        <label for="date">Date</label>
        <Datepicker id="date" v-model="date" :format="dateFormat" :monthChangeOnScroll="false" :enableTimePicker="false" autoApply utc></Datepicker>
        <label class="place" for="place">Place</label>
        <input type="text" name="place" required v-model="place" placeholder="Enter the competition place"/>
        <button type="submit" class="btn">Submit</button>
      </form>
  </div>
</template>

<script>
import axios from "axios";
import Notiflix from "notiflix";
import NavBar from "../components/AuthHeader.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
import router from "../router/index.js";

export default {
  name: "ItemView",
  setup() {
    const dateCalendar = ref(new Date());
    const dateFormat = (dateCalendar) => {
      const day = dateCalendar.getDate();
      const month = dateCalendar.getMonth() + 1;
      const year = dateCalendar.getFullYear();
      return `${year}-${month}-${day}`;
    };
    return {
      dateCalendar,
      dateFormat,
    };
  },
  data() {
    return {
      possibleSport: [{}],
      competName: "",
      sport: "",
      date: "",
      place: "",
    };
  },
  components: {
    NavBar,
    Datepicker,
  },
  beforeMount() {
    this.getSports();
    this.getValues();
  },
  methods: {
    async getValues() {
      if (this.$route.params.id != 0) {
        const user = localStorage.getItem("user").toString();
        await axios.get(process.env.VUE_APP_API + "competitions/" + user + "/"+this.$route.params.id, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,}})
            .then((response) => {
                this.competName = response.data[0].competName
                this.sport = response.data[0].sport
                this.date = response.data[0].competDate
                this.place = response.data[0].place
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },
    getSports() {
      axios.get(process.env.VUE_APP_API +"sports/" +localStorage.getItem("user").toString() +"/",
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
            .then((response) => {
                this.possibleSport = response.data;
                })
            .catch((error) => {
                if (error.message.toString().includes("401")) {
                    Notiflix.Notify.failure("Unauthorized...", { closeButton: true });
                } else if (error.toString().includes("500")) {
                    Notiflix.Notify.failure("Server Error...", { closeButton: true });
                } else {
                    Notiflix.Notify.failure("An error occured", { closeButton: true });
                }
                console.log(error);
            });
    },
    sendData(){
        if (this.verifiyCompet(this.competName) && this.verifiyPlace(this.place)){
          Notiflix.Confirm.show(
          "Create competition",
          "Do you want to create this competition ?",
          "Yes",
          "No",
          () => {
            axios.post(process.env.VUE_APP_API+"competitions/"+localStorage.getItem("user")+"/",{
                competName: this.competName,
                sport: this.sport,
                competDate: this.date.split("T")[0],
                place: this.place
            },
            {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}}) 
            .then(response => {
                console.log(response)
                router.push("/competitions")
                Notiflix.Notify.success("Competition created !", {closeButton:true})
            })
            .catch(error => {
                if(error.message.toString().includes('401')){
                  Notiflix.Notify.failure("Unauthorized...", {closeButton:true})
                } else if(error.toString().includes('500')){
                  Notiflix.Notify.failure("Server Error...", {closeButton:true})
                } else if (error.toString().includes("400")) {
                    Notiflix.Notify.failure("Still fields to fill...", { closeButton: true });
                } else {
                  Notiflix.Notify.failure("An error occured", {closeButton:true})
                }
                console.log(error)})},
          () => {
            Notiflix.Notify.info("Competition is not created", {closeButton:true})
          },
          { titleColor: "#ff5549", okButtonBackground: "#ff5549" })
        } else {
          Notiflix.Notify.warning('Little rascal...')
        }
    },
    verifiyCompet(compet){
      const re = /^((?!DROP|SELECT|scrpit|js).){2,}\S$/
      return re.test(compet)
    },
    verifiyPlace(place){
      const re = /^((?!DROP|SELECT|scrpit|js).){2,}\S$/
      return re.test(place)
    },
  },
};
</script>

<style scoped>
#all {
  height: 90vh;
}

#competForm {
  height: 60%;
}

form {
  display: inline-flex;
  margin: auto;
  grid-row: 2;
  width: 50%;
  max-width: 600px;
  height: 60%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #222831;
  border: 2px solid #ffd369;
  border-radius: 10px;
  overflow-y: scroll;
}

input {
  margin-bottom: 40px;
  font-size: 2vh;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  padding: 10px;
  color: #eeeeee;
  background-color: transparent;
}

select, option {
  color: #eeeeee;
  background: transparent;
  border: 1px solid #eeeeee;
  font-size: 20px;
  margin-bottom: 40px;
}

.place{
  margin-top: 40px;
}

label {
  font-size: 30px;
  font-weight: bold;
  border-bottom: solid 1px #ffd369;
  margin-bottom: 5px;
}

form > button {
  width: 150px;
  height: 40px;
  font-size: 25px;
  font-weight: bold;
  color: #eeeeee;
  background-color: transparent;
  border: 1px solid #ffd369;
  border-radius: 5px;
  text-align: center;
  margin: auto;
  margin-bottom: 10px;
  transition: 200ms;
  cursor: pointer;
}

form > button:hover {
  color: #ffd369;
}

#cross {
  margin: 10px;
  padding: 10px;
  font-size: 50px;
  text-decoration: none;
}

#cross:hover {
  cursor: pointer;
}

.dp__theme_light {
  --dp-background-color: transparent;
  --dp-text-color: #eeeeee;
  --dp-hover-color: #eeeeee;
  --dp-hover-text-color: #eeeeee;
  --dp-hover-icon-color: #eeeeee;
  --dp-primary-color: #222831;
  --dp-primary-text-color: #eeeeee;
  --dp-secondary-color: #222831;
  --dp-border-color: #eeeeee;
  --dp-menu-border-color: #ffd369;
  --dp-border-color-hover: #eeeeee;
  --dp-disabled-color: #222831;
  --dp-scroll-bar-background: #222831;
  --dp-scroll-bar-color: #222831;
  --dp-success-color: #32c682;
  --dp-success-color-disabled: #32c682;
  --dp-icon-color: #ffd369;
  --dp-danger-color: #ff5549;
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