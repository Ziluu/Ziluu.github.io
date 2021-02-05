<template>
  <div class="login-wrapper">
    <div class="login">
      <h1>登录</h1>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        class="loginForm"
      >
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox
            label="记住密码"
            v-model="loginForm.checked"
          ></el-checkbox>
        </el-form-item>
        <el-form-item
          style="display: flex;
    justify-content: space-around;"
        >
          <el-button
            :loading="isLoading"
            type="primary"
            @click="submitForm(loginForm)"
            style="margin-top:100px"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      isLoading: false,
      loginForm: {
        username: "",
        password: "",
        checked: false,
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {
    //存储在localStorage中的布尔值会转化为字符串，此处将字符串转化为布尔
    if (eval(localStorage.getItem("checked"))) {
      this.loginForm.checked = eval(localStorage.getItem("checked"));
      this.loginForm.username = localStorage.getItem("username");
      this.loginForm.password = localStorage.getItem("password");
    }
  },
  methods: {
    //点击登录按钮
    async submitForm(loginForm) {
      this.isLoading = true;
      //登录
      let res = await this.$http.post("/api/user/login", {
        username: loginForm.username,
        password: loginForm.password,
      });
      //登录成功
      if (res.data.code == 1) {
        this.$message({
          message: res.data.message,
          type: "success",
        });
        //存储用户名作为登录的凭据(替代token)
        sessionStorage.setItem("username", loginForm.username);
        //获取【保存密码】的状态,决定是否把用户信息存储至本地
        if (loginForm.checked) {
          localStorage.setItem("checked", loginForm.checked);
          localStorage.setItem("username", loginForm.username);
          localStorage.setItem("password", loginForm.password);
        } else {
          localStorage.removeItem("checked");
          localStorage.removeItem("username");
          localStorage.removeItem("password");
        }
        this.isLoading = false;
        this.$router.push("/home");
      } else {
        {
          this.$message({
            message: res.data.message,
            type: "error",
          });
        }
      }
    },
  },
};
</script>
<style lang="scss">
.loginForm {
  margin-top: 70px;
}
html {
    background-color: #e4d8c0;

  height: 100%;
  width: 100%;

  body {

    height: 100%;
    width: 100%;
    .login-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      .login {
        height: 80%;
        width: 56%;
        // background-size:contain;
        background: url("../../public/login.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        // background:  ;
        h1 {
          margin-top: 50px;
          text-align: center;
          line-height: 50px;
          font-size: 28px;
          margin-bottom: 30px;
        }
        input {
          background-color: transparent;
          border: deeppink 1px solid;
        }
        .login-form {
          width: 500px;
          height: 400px;
          box-sizing: border-box;
          border-radius: 8px;
          box-shadow: 1px 1px 15px #eee;
          padding: 30px;

          button {
            width: 100%;
            position: fixed;
            bottom: 10%;
          }
        }
      }
    }
  }
}</style
>>
