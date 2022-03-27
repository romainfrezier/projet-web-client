<template>
  <div>
    <Visitors></Visitors>
    <div id="about">
      <div class="part1">
        <p class="title">Personnal Presentation</p>
        <p class="content">
          &emsp; Hello everyone, my name is Romain, and I am a student in third
          year of engineering school at Polytech Montpellier in the IT sector
          and Management.<br>
          &emsp; I have been a big sports enthusiast since I was very young, and I like
          particularly mountain sports such as skiing, hiking or
          both at the same time!<br>
          &emsp; During my year at Polytech, a web project was organized and we
          had to create a site entirely, and that's how I created Poly-Activitiz!
        </p>
        <p class="title">Contact Me</p>
        <p class="content">
          &emsp; If you have a question, or a remark on this site, you can contact me
          at the following address: poly.activitiz@gmail.com and I will try 
          to answer as soon as possible.<br>
          &emsp; You can also find my work on GitHub by clicking on
          <a href="https://github.com/romainfrz" style="color: #393E46;">this link</a> !
        </p>
      </div>
      <div class="part2">
        <p class="title">Web Site Presentation</p>
        <p class="content">
          &emsp; This website is the result of long hours of work. The objective is to 
          allow all athletes, whether professional or not, to be able to follow 
          their sports activities. <br>
          &emsp; Through the management of activities, athletes will be able to consult 
          their statistics, specific to each activity, or more generally. <br>
          &emsp; By subscribing to the Premium subscription, users will also be able to 
          manage their equipment, because we know that it is important to keep 
          equipment in good condition.<br>
          &emsp; Premium users will also be able to follow the competitions offered by 
          other users, in order to be always up to date with the latest news.<br>
          Many ideas are still being developed, so be sure to follow the evolution 
          of this application, and I'm sure you will be satisfied with the result!
        </p>
      </div>  
    </div>
  </div>
</template>

<script>
import Visitors from "../components/VisitorsHead.vue";

export default {
  name: "VisitorsView",
  components: {
    Visitors,
  },
};
</script>
<style scoped>

#about {
  display: grid;
  grid-template-columns: 50% 50%;
  vertical-align: middle;
  height: 75vh;
  color: #393E46;
}

.part1{
  grid-column: 0;
  padding: 20px;
  margin-bottom: 10px;
  overflow-y: overlay;
}

.part2{
  grid-column: 2;
  padding: 20px;
  margin-bottom: 10px;
  overflow-y: overlay;
}

.title {
  margin-top: 60px;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: bold;
  border-bottom: solid 1px #FFD369;
  user-select: none;
  cursor: default;
}

.content {
  text-align: justify;
  font-size: 20px;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background: #393E46;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
</style>