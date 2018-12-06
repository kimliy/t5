<template>
  <div>
    <header class="header">
      <el-row>
        <el-col :span="6" class="logo-container">
          <img src="../assets/logo.png" class="logo" alt>
          <span class="title">波波在线维护系统</span>
        </el-col>
        <el-col :span="6" class="user">
          <div class="userinfo">
            <img
              :src="user.avatar"
              class="avatar"
              alt
            >
            <div class="welcome">
              <p class="name comename">欢迎</p>
              <p class="name avatarname">{{user.name}}</p>
            </div>
            <span class="username">
              <!-- 下拉菜单 -->
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="info">个人信息</el-dropdown-item>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
        </el-col>
      </el-row>
    </header>
  </div>
</template>

<script>
export default {
  name: "",
  computed: {
      user() {
          return this.$store.getters.user
      }
  },
  methods: {
      handleCommand(item) {
        //   console.log(item)
        if(item === "info") {
            this.showInfoList()
        } else if(item === "logout") {
            this.logout()
        }
      },
      showInfoList() {
          // console.log('点击了个人信息')
          this.$router.push('/me')
      },
      logout() {
        //   console.log('点击了退出')
        //清除token,store和跳转页面
        localStorage.removeItem('eleToken')
        this.$store.dispatch('clearCurrentState')
        this.$router.push('/login')
      }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin: 0 5px 0 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 20px;
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  padding: 0 5px;
  vertical-align: middle;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>