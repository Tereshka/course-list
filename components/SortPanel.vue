<template>
  <div>
    <el-radio-group v-model="sortOrder">
      <el-radio-button label="price asc">Price ↑</el-radio-button>
      <el-radio-button label="price desc">Price ↓</el-radio-button>
      <el-radio-button label="date asc">Date Begin ↑</el-radio-button>
      <el-radio-button label="date desc">Date Begin ↓</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import { SET_SORT_ORDER } from '../store/index';

export default Vue.extend({
  data() {
    return {
      sortOrder: 'date asc',
    };
  },
  watch: {
    sortOrder() {
      this[SET_SORT_ORDER](this.sortOrder);
    },
  },
  methods: {
    ...mapMutations([SET_SORT_ORDER]),
  },
});
</script>
