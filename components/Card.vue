<template>
  <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card">
    <div class="image-wrapper">
      <el-image class="card-cover" :src="course.image" fit="contain">
        <div slot="placeholder" class="image-slot">
          <img src="../assets/logo.svg" />
        </div>
      </el-image>
      <div class="icons">
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          @click="handleEdit()"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="handleDelete()"
        ></el-button>
      </div>
    </div>
    <div style="padding: 14px">
      <el-row>
        <el-col :span="20">
          <NuxtLink :to="`/courses/course/${course.id}`" class="title">
            <h2>{{ course.name }}</h2>
          </NuxtLink>
        </el-col>
        <el-col :span="4">
          <el-tag type="" effect="dark">
            {{ `${course.price}₽` }}
          </el-tag>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <span>{{ course.subtitle }}</span>
      <div class="bottom clearfix time">
        <time>{{ renderData }}</time>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { mapMutations } from 'vuex';
import { REMOVE_COURSE } from '../store';
import { Course } from '../typing/Course';

export default Vue.extend({
  name: 'Card',
  props: {
    course: {
      type: Object,
      required: true,
    } as PropOptions<Course>,
  },
  computed: {
    renderData(): string {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      const date = new Date(this.course.dateBegin);
      return date.toLocaleString('ru-RU', options);
    },
  },
  methods: {
    ...mapMutations([REMOVE_COURSE]),
    handleEdit() {
      this.$router.push({
        path: `/courses/course/edit/${this.course.id}`,
      });
    },
    handleDelete() {
      this[REMOVE_COURSE](this.course.id);
    },
  },
});
</script>

<style>
.card {
  margin: 20px;
}
.image-wrapper {
  position: relative;
}
.card-cover {
  width: 100%;
  display: block;
}
.icons {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
}
.title {
  text-decoration: none;
  color: #409eff;
}
.time {
  color: #aaaaaa;
  font-style: italic;
  text-align: right;
  margin-top: 5px;
}
</style>
