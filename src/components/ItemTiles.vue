<template>
    <ul class="tiles"> 
        <li v-for="item in itemsAll" :key="item.id" class="tile">
            <div class="content">
              <p>{{ item.itemName }}</p>
              <p>{{ item.sport }}</p>
              <p>{{ item.usage }} km</p>
            </div>
            <div class="button">
              <button @click="deleteItem(item.id, item.itemName)" class="delete">🚮</button>
            </div>
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
            itemsAll: [{}]
        }
    },
    beforeMount(){
        this.getItems()
    },
    methods:{
        async getItems(){
            await axios.get(process.env.VUE_APP_API+"items/"+localStorage.getItem('user')+"/",
                {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                .then(response => {
                    this.itemsAll = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        deleteItem(id, name){
             Notiflix.Confirm.show(
            "Delete item",
            "Do you want to delete item named : "+name+" ?",
            "Yes",
            "No",
            () => {
                axios.delete(process.env.VUE_APP_API+"items/"+localStorage.getItem('user')+"/"+id+"/",
                    {headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}})
                    .then(response => {
                        Notiflix.Notify.success("Item " + name + " deleted with succes", {closeButton:true})
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
                Notiflix.Notify.info("Item " + name + " is not deleted", {closeButton:true})
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
  height: 20vh;
  margin-top: 10px;
  overflow-y: scroll;
  margin-bottom: 15px;
}

.tile{
  background-color: #22283180;
  margin: 10px;
  margin-bottom: 20px;
  padding: 5px;
  border: #222831 1px solid;
  border-radius: 10px;
  user-select: none;
  text-align: center;
  display: grid;
  grid-template-columns: 70% 30%;
}

.tile:hover{
  background-color: #393E46;
  cursor: pointer;
}

.content{
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  user-select: none;
  grid-column: 1;
}

.button{
  grid-column: 2;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.button > button{
  margin: auto;
  height: 60px;
  width: 60px;
  font-size: 30px;
  background-color: #22283180;
  border: #EEEEEE 1px solid;
  border-radius: 10px;
  transition: 200ms;
}

.button > button:hover{
  background-color: #EEEEEE80;
  font-size: 40px;
  cursor: pointer;
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