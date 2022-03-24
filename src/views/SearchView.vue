<template>
    <div id="all">
        <NavBar/>
        <div id="content">

        </div>
    </div>
</template>

<script>
import NavBar from '../components/AuthHeader.vue'
export default {
    name: 'SearchView',
    components:{
        NavBar
    }
    
}
</script>

<style scoped>
#all{
    height: 90vh;
}

#content{
    height: 85%;
}
</style>