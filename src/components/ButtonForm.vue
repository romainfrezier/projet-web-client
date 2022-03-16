<template>
    <button type="submit">{{ msg }}</button>
</template>

<script>
export default {
    name: "ButtonForm",
    props:{
        msg: String
    }
}
</script>

<style>
button{
    width: 150px;
    height: 40px;
    font-size: 25px;
    background-color: white;
    border: 1px solid rgb(232, 78, 70);
    border-radius: 5px;
    text-align: center;
    margin: auto;
    transition: 200ms;
    cursor: pointer;
}

button:hover{
    height: 50px;
}
</style>