<template>
<div>
    <Visitors></Visitors>
    <Signup></Signup>
    <Footer></Footer>
</div>
    

</template>

<script>
import Visitors from '../components/VisitorsHead.vue'
import Footer from '../components/FooterAll.vue'
import Signup from '../components/SignupPage.vue'

export default {
  name: 'VisitorsView',
  components: {
    Visitors,
    Footer,
    Signup
  }
}
</script>
