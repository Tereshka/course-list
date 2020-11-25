<template>
  <div>
    <el-row>
      <SortPanel />
    </el-row>
    <el-row :gutter="12" type="flex" style="flex-wrap: wrap">
      <el-col v-for="course in sortedCourses" :key="course.id" :span="8">
        <Card :course="course" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

import Card from '~/components/Card.vue';
import SortPanel from '~/components/SortPanel.vue';

export default Vue.extend({
  components: {
    Card,
    SortPanel,
  },
  computed: {
    ...mapGetters(['courses', 'sortedCourses']),
  },
  created() {
    if (this.courses.length === 0) {
      this.fetchCourses();
    }
  },
  methods: {
    ...mapActions(['fetchCourses']),
  },
});
</script>
