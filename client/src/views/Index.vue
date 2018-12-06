<template>
<div class="index">
    <head-nav/>
    <left-menu/>
    <div class="right-container">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import HeadNav from '../components/HeadNav'
import LeftMenu from '../components/LeftMenu'
    export default {
        name: 'index',
        components: {
            HeadNav,
            LeftMenu
        }
    }

</script>

<style scoped>
.index {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #324057;
}
.right-container {
    position: relative;
    top: -400px;
    left: 180px;
    width: calc(100% - 180px);
    height: calc(100% - 71px);
    overflow: auto;
}
</style>