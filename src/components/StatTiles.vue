<template>
<div>
    <ul v-if="!isDetail" class="tiles"> 
        <li v-for="stat in stats" :key="stat.id" class="tile">
            <div class="content">
                <p>{{ stat.statName }}</p>
            </div>
            <div class="button">
              <button @click="seeStat()" class="see">👀</button>
            </div>
        </li>
    </ul>
</div>
    
</template>

<script>
// import axios from 'axios';
// import Notiflix from 'notiflix'

export default {
    name:'StatTiles',
    data(){
        return {
            stats: [{statName:"Distance"}, {statName:"Height difference"}, {statName:"Time"}, {statName:"Speed"}],
            isDetail: false,
        }
    },
    methods:{

    }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

.tiles{
    height: 32vh;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
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