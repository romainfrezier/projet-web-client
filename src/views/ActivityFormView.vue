<template>
  <div id="all">
    <NavBar />
    <router-link id="cross" to="/profil">✖️</router-link>
    <form id="activityForm" action="" @submit.prevent="sendDataSport()">
      <label for="activityName">Activity Name</label>
      <input
        type="text"
        name="activityName"
        required
        v-model="activity"
        placeholder="Enter the activity name"
      />
      <label for="item">Item (optional)</label>
      <select id="item" v-model="item">
        <option disabled value="">Choose...</option>
        <option v-for="item in itemsAll" :key="item.id" :value="item.id">
          {{ item.itemName }}
        </option>
      </select>
      <label for="date">Date</label>
      <Datepicker id="date" v-model="date" :format="dateFormat" :monthChangeOnScroll="false" :enableTimePicker="false" autoApply utc></Datepicker>
      <label for="sport" class="sport">Sport</label>
      <select id="sport" v-model="sport">
        <option disabled value="">Choose...</option>
        <option v-for="sport in possibleSport" :key="sport.id" :value="sport.id">{{ sport.sportName }}</option>
      </select>
      <label for="distance">Distance in km (optional)</label>
      <input type="number" name="distance" v-model="distance" min="0" max="150" />
      <label for="height">Height difference in m (optional)</label>
      <input type="number" name="height" v-model="height" min="1" max="6000" />
      <label for="time">Time in min (optional)</label>
      <input type="number" name="time" v-model="time" min="1" max="900" />
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
  name: "ActivityFromView",
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
      item: "",
      activity: "",
      sport: "",
      date: "",
      itemsAll: [{}],
      distance: '',
      height: '',
      time: '',
    };
  },
  components: {
    NavBar,
    Datepicker,
  },
  beforeMount() {
    this.getSports();
    this.getItems();
    this.getValues();
  },
  methods: {
    async getValues() {
      if (this.$route.params.id != 0) {
        const user = localStorage.getItem("user").toString();
        await axios.get(process.env.VUE_APP_API + "activities/" + user + "/"+this.$route.params.id, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,}})
            .then((response) => {
                this.activity = response.data[0].activityName
                this.sport = response.data[0].sportId
                this.item = response.data[0].item
                this.date = response.data[0].date
                axios.get(process.env.VUE_APP_API+"statValues/"+localStorage.getItem('user')+"/activity/"+this.$route.params.id,
                    {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                    .then(response => {
                        response.data.forEach(stat => {
                            if(stat.stat == 'time'){
                                this.time += parseInt(stat.value)
                            }
                            if(stat.stat == 'distance'){
                                this.distance += parseInt(stat.value)
                            }
                            if(stat.stat == 'height'){
                                this.height += parseInt(stat.value)
                            }
                        })
                        if(this.distance != 0.0 && this.time != 0.0){
                            this.speed += parseInt(this.distance)/(parseInt(this.time)/60).toFixed(2)
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })})
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
    async getItems() {
        await axios.get(process.env.VUE_APP_API +"items/" +localStorage.getItem("user") +"/",
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
            .then((response) => {
                this.itemsAll = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    async sendDataSport() {
      await axios.post(process.env.VUE_APP_API +"activities/" +localStorage.getItem("user") +"/",
          {
            activityName: this.activity,
            item: this.item,
            sportId: this.sport,
            date: this.date.split("T")[0],
          },
          {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
        .then((response) => {
            if (this.distance != "") {
                axios.post(process.env.VUE_APP_API +"statValues/" +localStorage.getItem("user") +"/distance/",
                {activity: response.data.id,value: this.distance},
                {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            if (this.time != "") {
                axios.post(process.env.VUE_APP_API +"statValues/" +localStorage.getItem("user") +"/time",
                {activity: response.data.id,value: this.time},
                {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            if (this.height != "") {
                axios.post(process.env.VUE_APP_API +"statValues/" +localStorage.getItem("user") +"/height",
                {activity: response.data.id,value: this.height,},
                {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,},})
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            console.log(response.data);
            router.push("/profil");
            Notiflix.Notify.success("Activity created", { closeButton: true });
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
  },
};
</script>

<style scoped>
#all {
  height: 90vh;
}

#activityForm {
  height: 60%;
}

form {
  display: inline-flex;
  margin: auto;
  grid-row: 2;
  width: 50%;
  max-width: 600px;
  height: 70%;
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

select,
option {
  color: #eeeeee;
  background: transparent;
  border: 1px solid #eeeeee;
  font-size: 20px;
  margin-bottom: 40px;
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

.sport {
  margin-top: 40px;
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