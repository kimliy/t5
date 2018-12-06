<template>
<div class="me">
    <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="8">
            <div class="user">
                <img :src="user.avatar" class="avatar" alt="">
            </div>
        </el-col>

        <el-col :span="16">
            <div class="userinfo">
                <div class="user-item">
                    <i class="el-icon-message"></i>
                    <span>{{user.name}}</span>
                </div>
                <div class="user-item">
                    <i class="el-icon-setting"></i>
                    <span>{{user.identity == 'manager'? '管理员':'普通员工'}}</span>
                </div>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>

    export default {
        name: 'me',
        computed: {
            user() {
                return this.$store.getters.user
            }
        }
    }

</script>

<style scoped>
.me {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #eee;
}
.row-bg {
    width: 100%;
    height: 100%;
}
.user {
    text-align: center;
    position: relative;
    top: 30%;
}
.user img {
    width: 150px;
    border-radius: 50%;
}
.userinfo {
    height: 100%;
    background-color: #eee ;
}
.user-item {
    position: relative;
    top: 30%;
    padding: 26px;
    font-size: 20px;
    font-weight: 550;
}
.user-item span {
    padding-left: 8px;
}
</style>