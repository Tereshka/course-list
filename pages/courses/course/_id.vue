<template>
  <div>
    <el-image
      style="width: 100%; height: 300px"
      :src="selectedCourse.image"
      fit="cover"
    >
      <div slot="placeholder" class="image-slot">
        <img src="~/assets/logo.svg" />
      </div>
    </el-image>
    <div class="section">
      <h1>{{ selectedCourse.name }}</h1>
      <div class="section-title">{{ selectedCourse.subtitle }}</div>
    </div>
    <div class="section">
      <h5 class="section-title">About:</h5>
      <div>{{ selectedCourse.description }}</div>
    </div>
    <div class="section">
      <h5 class="section-title">Price:</h5>
      <div>{{ `${selectedCourse.price}₽` }}</div>
    </div>
    <div class="section">
      <h5 class="section-title">Date of begin:</h5>
      <div>{{ renderData }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { Course } from '../../../typing/Course';

export default Vue.extend({
  computed: {
    ...mapGetters(['courses']),
    selectedCourse(): Course {
      return this.courses.find(
        (el: Course) => el.id === +this.$route.params.id
      );
    },
    renderData(): string {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      const date = new Date(this.selectedCourse.dateBegin);
      return date.toLocaleString('ru-RU', options);
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
