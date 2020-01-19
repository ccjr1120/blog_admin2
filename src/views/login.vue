<template>
  <div class="login_page fillcontain">
    <section class="form_contianer">
      <div class="manage_tip">
        <p>博客后台管理系统</p>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" maxlength="8" show-word-limit></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" show-password maxlength="16"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "用户名不能小于两个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "密码不能小于两个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    if (this.$store.state.isLogin) {
      this.$router.push("/manage");
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var username = this.loginForm.username;
          var password = this.loginForm.password;
          this.$axios
            .post("/admin/user/login", {
              username: username,
              password: password
            })
            .then(resp => {
              if (resp.data.success) {
                this.$store.commit("login");
                this.$router.push("/manage");
                this.$message({
                  message: "登录成功",
                  type: "success"
                });
              } else {
                this.$message.error(resp.data.msg);
              }
            })
            .catch(err => {
              this.$message.error("登录出错," + err);
            });
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
.login_page {
  background-color: #324057;
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p {
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer {
  .wh(320px, 170px);
  .ctp(380px, 210px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}
</style>