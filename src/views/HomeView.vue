<template>
<div>
    <NavBar/>
    <div id="contenu"></div>
    <Footer/>
</div>
    
</template>

<script>
import NavBar from "../components/AuthHeader.vue";
import Footer from "../components/FooterAll.vue"

export default {
  name: "VisitorsView",
  components: {
    NavBar,
    Footer
  },
};
</script>

<style>
#contenu{
  height: 65vh;
}
</style>
