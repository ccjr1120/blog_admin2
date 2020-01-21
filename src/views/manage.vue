<template>
  <el-container class="fillcontain">
    <el-aside>
      <el-row class="tac">
        <el-col style="width:100%" :span="12">
          <el-menu
            default-active="/manage"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            @select="selectRouter"
          >
            <el-menu-item index="/manage">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-notebook-2"></i>
                <span slot="title">文章列表</span>
              </template>
              <el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">分组查看</template>
                  <el-menu-item
                    v-for="category in categoryList"
                    :key="category.label"
                    @click="alterCategory(category.substring(16))"
                    :index="category"
                  >{{category.substring(16)}}</el-menu-item>
                </el-submenu>
                <el-menu-item @click="alterCategory(null)" index="/blogs">全部文章</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
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
          <el-popover placement="top" v-model="popoverVisible">
            <div style="text-align: right; margin: 0;">
              <el-button size="mini" type="text" @click="popoverVisible = false">个人简介</el-button>
              <br />
              <el-button type="text" size="mini" @click="logout">注销</el-button>
            </div>
            <el-avatar slot="reference" :size="40" :src="circleUrl"></el-avatar>
          </el-popover>
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
      currPage: "首页·数据展示",
      popoverVisible: false,
      categoryList: [],
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  created: function() {
    //验证是否已经登录
    this.$axios
      .get("/admin/user/isLogin")
      .then(resp => {
        if (!resp.data.data) {
          this.$store.commit("logout");
          this.$router.push("/login");
        }
      })
      .catch(() => {
        this.$store.commit("logout");
        this.$router.push("/login");
      });
    //获取分组列表
    this.$axios.get("/common/categoryList").then(resp => {
      var data = resp.data;
      if (data.success) {
        var categoryList = data.data;
        for(var i in categoryList){
          //为动态导航生成正确的router
          this.categoryList.push("/blogs/category/" + categoryList[i])
        }
      }
    });
  },
  methods: {
    selectRouter(key) {
      if (key === "/manage") {
        this.currPage = "首页·数据展示";
      } else if (key === "/blogs") {
        this.currPage = "博客列表";
      } else if (key === "/comments") {
        this.currPage = "评论列表";
      } else if (key === "/newBlog") {
        this.currPage = "新建博客";
      }
    },
    logout() {
      this.popoverVisible = false;
      this.$axios
        .get("/admin/user/logout")
        .then(() => {
          this.$store.commit("logout");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$store.commit("logout");
          this.$router.push("/login");
        });
    },
    alterCategory(name) {
      if (name != null) {
        this.currPage = "博客列表·" + name;
      }
      this.$store.commit("alterCategory", name);
    }
  }
};
</script>

<style lang="less" scrope>
@import "../style/mixin";

.el-header {
  background-color: #eff2f7;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
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