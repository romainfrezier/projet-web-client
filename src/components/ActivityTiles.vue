<template>
    <ul class="tiles"> 
        <li v-for="activity in activities" :key="activity.id" class="tile">
            <p class="content">{{ activity.activityName }} | {{ activity.sportName }}</p>
            <p class="content">{{ activity.date }}</p>
        </li>
    </ul>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ActivityTiles',
  data(){
    return {
      premium:'',
      activities: [{}],
    }
  },
  beforeMount(){
    this.getActivities()
  },
  methods:{
    getActivities(){
      const user = localStorage.getItem("user").toString()
      axios.get(process.env.VUE_APP_API+"activities/"+user+"/", 
        {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}}) 
      .then(response => {
        this.activities = response.data
        this.activities.forEach(activity => {
          console.log(activity.sport)
          axios.get(process.env.VUE_APP_API+"sports/"+localStorage.getItem("user").toString()+"/"+activity.sport,
            {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
            .then(response => {
              activity.sportName = response.data[0].sportName
              console.log(this.activities)
            })
            .catch(error => {
                console.log(error)
            })
        })
        })
      .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

.tiles{
  margin-top: 10px;
  overflow-y: scroll;
  height: 70%;
  margin-bottom: 15px;
}

.tile{
  background-color: rgba(232, 78, 70, 0.65);
  margin: 10px;
  margin-bottom: 20px;
  padding: 5px;
  border: #4b1e1e 1px solid;
  border-radius: 10px;
  user-select: none;
  text-align: center;
}

.tile:hover{
  background-color: rgba(160, 53, 47, 0.65);
}

.content{
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  user-select: none;
  cursor: default;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background: #4b1e1e;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
</style>
