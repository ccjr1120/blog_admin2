<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="bid" label="博客ID" width="180"></el-table-column>
    <el-table-column prop="category" label="分类" width="180"></el-table-column>
    <el-table-column prop="createDate" label="创建日期" width="180"></el-table-column>
    <el-table-column prop="title" label="博客标题"></el-table-column>
    <el-table-column fixed="right" label="操作" width="200">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          bid: "1",
          category: "未分类",
          createDate: "2016-05-02",
          title: "why the sun alwas here?"
        }
      ]
    };
  },
  created: function() {
    this.getBlogList();
  },
  watch: {
    $route(to, from) {
      window.console.log(from);
      this.getBlogList();
    }
  },
  methods: {
    getBlogList() {
      var category = this.$store.state.category;
      if (category != null) {
        this.$axios.get("common/blogList/" + category).then(resp => {
          var data = resp.data;
          if (data.success) {
            this.tableData = data.data;
          }
        });
      } else {
        this.$axios.get("admin/blogList").then(resp => {
          var data = resp.data;
          if (data.success) {
            this.tableData = data.data;
          }
        });
      }
    }
  }
};
</script>