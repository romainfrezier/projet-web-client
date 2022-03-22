<template>
    <ul class="tiles"> 
        <li v-for="item in items" :key="item.id" class="tile" @click="deleteItem(item.id)">
            <p class="content">{{ item.itemName }} | {{ item.sport }}</p>
            <p class="content">{{ item.usage }}</p>
        </li>
    </ul>
</template>

<script>
import axios from 'axios';
import Notiflix from 'notiflix'

export default {
    name:'ItemTiles',
    data(){
        return {
            items: [{}]
        }
    },
    beforeMount(){
        this.getItems()
    },
    methods:{
        getItems(){
            axios.get(process.env.VUE_APP_API+"items/"+localStorage.getItem('user')+"/",
                {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                .then(response => {
                    console.log(response.data)
                    this.items = response.data
                    this.items.forEach(item => {
                        console.log(item.sport)
                        axios.get(process.env.VUE_APP_API+"sports/"+localStorage.getItem("user").toString()+"/"+item.sport,
                            {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                            .then(response => {
                            item.sport = response.data[0].sportName
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                })
        },
        deleteItem(id){
             Notiflix.Confirm.show(
            "Delete item",
            "Do you want to delete item with id : "+id+" ?",
            "Yes",
            "No",
            () => {
                axios.delete(process.env.VUE_APP_API+"items/"+localStorage.getItem('user')+"/"+id+"/",
                    {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                    .then(response => {
                        Notiflix.Notify.success("Item " + id + ". deleted with succes", {closeButton:true})
                        setTimeout("location.reload(true)", 2000)
                        console.log(response)
                    })
                    .catch(error =>{
                        if(error.message.toString().includes('401')){
                            Notiflix.Notify.failure("Unauthorized...", {closeButton:true})
                        } else if(error.toString().includes('500')){
                            Notiflix.Notify.failure("Server Error...", {closeButton:true})
                        } else {
                            Notiflix.Notify.failure("An error occured", {closeButton:true})
                        }
                        console.log(error)})
            },
            () => {
                Notiflix.Notify.info("Item " + id + ". is not deleted", {closeButton:true})
            },
            { titleColor: "#ff5549", okButtonBackground: "#ff5549" })
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
  height: 22vh;
  margin-top: 10px;
  overflow-y: scroll;
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
  cursor: pointer;
}

.content{
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  user-select: none;
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