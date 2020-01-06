<template>
  <div class="mavonEditor">
    <mavon-editor v-model="value"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      handbook: "#### how to use mavonEditor in nuxt.js"
    };
  }
};
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>