<template>
  <div>
    <h1>Edit the selected course</h1>
    <CourseForm :course="selectedCourse" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { Course } from '~/typing/Course';

import CourseForm from '~/components/CourseForm.vue';

export default Vue.extend({
  components: {
    CourseForm,
  },
  computed: {
    ...mapGetters(['courses']),
    selectedCourse(): Course {
      return this.courses.find(
        (el: Course) => el.id === +this.$route.params.id
      );
    },
  },
});
</script>

<style>
.section {
  margin: 20px;
}
.section-title {
  color: #666666;
  text-transform: uppercase;
  font-style: italic;
}
</style>
