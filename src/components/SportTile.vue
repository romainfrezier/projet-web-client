<template>
    <ul class="tiles"> 
        <li v-for="activity in activities" :key="activity.id" class="tile">
            <p class="name">{{ activity.activityName }} | {{ activity.sportName }}</p>
            <p class="date">{{ activity.date }}</p>
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
          axios.get(process.env.VUE_APP_API+"sports/"+activity.sport,
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
