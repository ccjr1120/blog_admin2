<template>
  <el-container class="fillcontain">
    <el-aside>
      <el-row class="tac">
        <el-col style="width:100%" :span="12">
          <el-menu
            default-active="/manage"
            class="el-menu-vertical-demo"
            background-color="rgb(50, 64, 87)"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            @select="selectRouter"
          >
            <el-menu-item index="/manage">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/blogs">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">文章列表</span>
            </el-menu-item>
            <el-menu-item index="/comments">
              <i class="el-icon-s-comment"></i>
              <span slot="title">评论列表</span>
            </el-menu-item>
            <el-menu-item index="/newBlog">
              <i class="el-icon-edit"></i>
              <span slot="title">新建文章</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <el-header height="56px">
        {{currPage}}
        <div style="float:right; margin-top:10px">
          <el-avatar :size="40" :src="circleUrl"></el-avatar>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      currPage: "首页",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },

  methods: {
    selectRouter(key) {
      if (key === "/manage") {
        this.currPage = "首页";
      } else if (key === "/blogs") {
        this.currPage = "博客列表";
      } else if (key === "/comments") {
        this.currPage = "评论列表";
      } else if (key === "/newBlog") {
        this.currPage = "新建博客";
      }
    }
  }
};
</script>

<style lang="less" scrope>
@import "../style/mixin";

.el-header {
  background-color: #EFF2F7;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: rgb(50, 64, 87);
  color: #333;
}

.el-main {
  color: #333;
  line-height: 40px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>