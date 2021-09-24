<template>
  <div class="longin">
    <div class="login_box">
      <div class="input">
        <el-form ref="form" :model="form" label-width="300px">
          <el-form-item label="用户名">
            <el-input v-model="form.user"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="button">
        <el-button type="primary" @click="login('form')">登陆</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        user: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
        axios.post("http://hello-app.test/api/auth/login",{
            user: this.form.user,
            password: this.form.password
        }).then((res)=>{
            localStorage.setItem("access_token",res.data.access_token)
            console.log(localStorage.getItem("access_token"));
            this.$router.push('home')
        })

    },
    resetForm() {
     Object.assign(this.$data.form, this.$options.data().form);
    },
  },
};
</script>

<style lang="css" scoped>
.login_box {
  width: 450px;
  height: 300px;
  background-color: rgb(19, 152, 230);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
}
.input {
  position: relative;
  right: 30%;
  top: 25%;
}
.button {
  position: relative;
  left: 35%;
  top: 30%;
  display: flex;
  width: 450px;
}
</style>