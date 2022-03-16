<template>
<div>
    <Visitors></Visitors>
    <Login></Login>
    <Footer></Footer>
</div>
    

</template>

<script>
import Visitors from '../components/VisitorsHead.vue'
import Footer from '../components/FooterAll.vue'
import Login from '../components/LoginPage.vue'

export default {
  name: 'VisitorsView',
  components: {
    Visitors,
    Footer,
    Login
  }
}
</script>