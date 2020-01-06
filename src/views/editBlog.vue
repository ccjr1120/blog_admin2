<template>
  <div>
    <div class="mavonEditor">
      <mavon-editor
      @change="saveBlogCache"
      @save="saveBlog"
       v-model="blogContent" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blogContent: ""
    };
  },
  methods: {
    saveBlogCache(){
      window.console.log(this.blogContent)
    },
    saveBlog() {
      alert(this.blogContent);
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