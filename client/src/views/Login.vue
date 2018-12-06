<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">在线后台管理系统</span>
        <el-form
          :model="loginUser"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="60px"
          class="loginForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>

          <div class="tiparea">
              <p>还没有账号?立即<router-link to="/register">注册</router-link></p>
          </div>

        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  name: "login",
  components: {},
  data() {
    return {
     loginUser: {
        email: "",
        password: "",
      },
      rules: {
          email: [
              {
                  type: 'email',
                  required: true,
                  message: '请输入正确邮箱',
                  trigger: 'blur'
              }
          ],
          password: [
              {
                  required: true,
                  message: '密码不能为空',
                  trigger: 'blur'
              },
              {
                  min: 6,
                  max: 15,
                  message: '长度在6-15之间',
                  trigger: 'blur'
              }
          ],
      }
    };
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios
                .post('/api/users/login',this.loginUser)
                .then(res => {
                    //登录成功
                    // console.log(res)
                    //取到登录的token
                    const {token} = res.data;
                    //存到本地
                    localStorage.setItem('eleToken',token);
                    //解析token
                    const decoded = jwt_decode(token)
                    console.log(decoded)
                    //将解析后的token存到vuex中
                    this.$store.dispatch('setAuthenticated',!this.isEmpty(decoded))
                    this.$store.dispatch('setUser',decoded)
                     //登录成功后跳转到主页面
                    this.$router.push('/index')
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      isEmpty(value) {  //判断为空
        return (
          value === undefined ||
          value === null ||
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
        )
      }
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 35%;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #ccc
}
.submit_btn {
    width: 40%;
}
.tiparea {
    text-align: right;
    font-size: 12px;
    color: #333;
}
.tiparea p a {
    color: #0000cc;
    text-decoration: none;
}
</style>