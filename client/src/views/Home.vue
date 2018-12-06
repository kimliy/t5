<template>
<div class="home">
    <div class="container">
        <h1 class="title">欢迎来到波波服务</h1>
        <p class="lead">专注于麦乐香,做最好的自己!</p>
    </div>
</div>
</template>

<script>

    export default {
        name: 'home',
    }

</script>

<style scoped>
.home {
    width: 100%;
    height: 100%;
    background: url(../assets/home2.jpg) no-repeat;
    background-size: 100% 100%;
}
.container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 100px;
    background-color: rgba(0,0,0,.7);
    text-align: center;
    color: white;
}
.title {
    font-size: 30px;
}
.lead {
    margin: 50px;
    font-size: 22px;
}
</style>