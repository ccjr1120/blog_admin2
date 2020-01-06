<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="评论ID" width="180"></el-table-column>
    <el-table-column prop="date" label="日期" width="180"></el-table-column>
    <el-table-column prop="blogTitle" label="博客标题"></el-table-column>
    <el-table-column prop="content" label="评论内容"></el-table-column>
    <el-table-column fixed="right" label="操作" width="200">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">回复</el-button>
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
          id: "1",
          date: "2016-05-02",
          content: "comment",
          blogTitle: "why the sun alwas here?"
        }
      ]
    };
  }
};
</script>

<style>
</style>