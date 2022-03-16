<template>
<div>
    <NavBar/>
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
