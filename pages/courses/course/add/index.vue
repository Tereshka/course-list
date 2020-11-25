<template>
  <div>
    <h1>Add new course</h1>
    <CourseForm :course="null" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import CourseForm from '~/components/CourseForm.vue';

export default Vue.extend({
  components: {
    CourseForm,
  },
});
</script>

<style>
h1 {
  margin: 0 20px 20px 20px;
}
</style>
