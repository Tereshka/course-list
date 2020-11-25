<template>
  <el-container>
    <el-header>
      <NuxtLink :to="'/courses'" class="title">
        <p><i class="el-icon-notebook-1"></i>List of courses</p>
      </NuxtLink>
      <el-button type="success" @click="handleAddCourse"
        >Add new course</el-button
      >
    </el-header>
    <el-divider></el-divider>
    <el-main>
      <Nuxt />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    handleAddCourse() {
      this.$router.push({
        path: '/courses/course/add',
      });
    },
  },
});
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.el-header {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
