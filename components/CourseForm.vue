<template>
  <el-form
    ref="courseForm"
    :model="courseForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="courseForm.name"></el-input>
    </el-form-item>
    <el-form-item label="Subtitle" prop="subtitle">
      <el-input v-model="courseForm.subtitle"></el-input>
    </el-form-item>
    <el-form-item label="Description" prop="description">
      <el-input
        v-model="courseForm.description"
        type="textarea"
        :rows="5"
      ></el-input>
    </el-form-item>
    <el-form-item label="Price" prop="price">
      <el-input
        v-model="courseForm.price"
        type="number"
        controls-position="right"
        :min="0"
        :max="100000"
      >
        <template slot="prepend">₽</template>
      </el-input>
    </el-form-item>
    <el-form-item label="Date of Begin" prop="dateBegin">
      <el-date-picker
        v-model="courseForm.dateBegin"
        type="date"
        placeholder="Pick a date"
        style="width: 100%"
        value-format="yyyy-MM-dd"
        format="dd.MM.yyyy"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="Image" prop="image">
      <el-input v-model="courseForm.image"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">{{
        buttonText
      }}</el-button>
      <el-button @click="resetForm()">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { mapGetters, mapActions } from 'vuex';

import { Course, CourseFormData } from '../typing/Course';

export default Vue.extend({
  name: 'CourseForm',
  props: {
    course: {
      type: Object,
      default: null,
    } as PropOptions<Course>,
  },
  data(): CourseFormData {
    return {
      courseForm: {
        name: (this.course && this.course.name) || '',
        subtitle: (this.course && this.course.subtitle) || '',
        description: (this.course && this.course.description) || '',
        price: (this.course && this.course.price) || 0,
        dateBegin:
          (this.course && new Date(this.course.dateBegin)) || new Date(),
        image: (this.course && this.course.image) || '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input Course name',
            trigger: 'blur',
          },
        ],
        subtitle: [
          {
            required: true,
            message: 'Please input Course subtitle',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: 'Please input Course description',
            trigger: 'blur',
          },
        ],
        dateBegin: [
          {
            // type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(['courses']),
    selectedCourse(): Course {
      return this.courses.find(
        (el: Course) => el.id === +this.$route.params.id
      );
    },
    buttonText(): string {
      return this.course ? 'Update' : 'Create';
    },
  },
  methods: {
    ...mapActions(['addNewCourse', 'updateSelectedCourse']),
    submitForm() {
      this.$refs.courseForm.validate((valid: any) => {
        if (valid) {
          if (this.course && this.course.id) {
            this.updateSelectedCourse({
              id: this.course.id,
              ...this.courseForm,
            });
          } else {
            this.addNewCourse(this.courseForm);
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.courseForm.resetFields();
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
