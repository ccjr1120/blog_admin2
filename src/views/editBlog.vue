<template>
  <div>
    <el-dialog :before-close="closeForm" title="博客基础信息" :visible.sync="dialogFormVisible">
      <el-form :model="blog" ref="blogInfoForm" :rules="rules">
        <el-form-item label="分类" prop="category" :label-width="formLabelWidth">
          <el-select
            v-model="blog.category"
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签(可自建)"
          >
            <el-option v-for="category in categoryList" :key="category" :value="category"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
          <el-input maxlength="24" show-word-limit v-model="blog.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            maxlength="64"
            show-word-limit
            v-model="blog.description"
            placeholder="选填"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkForm('blogInfoForm')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="mavonEditor">
      <mavon-editor @change="saveBlogCache" @save="saveBlog" v-model="blog.content" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      blog: {
        title: "",
        description: "",
        category: "",
        content: ""
      },
      formLabelWidth: "120px",
      categoryList: ["未分类"],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        category: [{ required: true, message: "请选择分类", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.dialogFormVisible = true;
    this.$axios.get("/common/categoryList").then(resp => {
      var data = resp.data;
      if (data.success) {
        this.categoryList = data.data;
      }
    });
  },
  methods: {
    saveBlogCache() {
      window.console.log(this.blogContent);
    },
    saveBlog() {
      this.$axios
        .post("/admin/blog", {
          category: this.blog.category,
          content: this.blog.content,
          description: this.blog.description,
          title: this.blog.title
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              message: "添加新博客成功",
              type: "success"
            });
            this.$router.push("/blogs");
          }
        });
    },
    checkForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    closeForm(done) {
      this.$confirm("你所有输入的信息都不会被保存，确认关闭？")
        .then(() => {
          done();
          this.$router.push("/manage");
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
.btn {
  float: right;
  padding-top: 6px;
  padding-right: 0px;
  padding-left: 16px;
}
</style>