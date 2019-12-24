<template>
  <div class="login_page fillcontain">
    <section class="form_contianer">
      <div class="manage_tip">
        <p>博客后台管理系统</p>
      </div>
      <el-form>
        <el-form-item>
          <el-input v-model="username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="password"  placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLoginForm" class="submit_btn">登录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  created(){
    if(this.$store.state.isLogin){
        this.$router.push('/manage')
    }
  },
  methods:{
    submitLoginForm:function(){
      if(this.username == "admin" && this.password == "admin"){
        this.$store.commit("login")
        this.$router.push('/manage')
      }
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
  .wh(320px, 210px);
  .ctp(320px, 210px);
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