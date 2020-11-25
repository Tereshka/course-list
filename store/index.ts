import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Course, CourseForm } from 'typing/Course';
import { StoreType } from 'typing/index';
import dataJSON from 'assets/data.json';

const SET_COURSES = 'SET_COURSES';
export const REMOVE_COURSE = 'REMOVE_COURSE';
export const ADD_COURSE = 'ADD_COURSE';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const SET_SORT_ORDER = 'SET_SORT_ORDER';

export const state = (): StoreType => ({
  courses: [],
  sortOrder: 'date asc',
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  courses: (state) => state.courses,
  sortedCourses: (state) => sortCourses(state),
};

export const mutations: MutationTree<RootState> = {
  SET_COURSES: (state, value: Course[]) => (state.courses = value),
  REMOVE_COURSE: (state, value: number) =>
    (state.courses = state.courses.filter((el) => el.id !== value)),
  ADD_COURSE: (state, value: Course) => state.courses.push(value),
  UPDATE_COURSE: (state, value: Course) => {
    const newCourses = state.courses.map((item) => {
      if (item.id !== value.id) {
        return item;
      }
      return {
        ...item,
        ...value,
      };
    });
    state.courses = newCourses;
  },
  SET_SORT_ORDER: (state, value: string) => (state.sortOrder = value),
};

export const actions: ActionTree<RootState, RootState> = {
  fetchCourses({ commit }) {
    const courses = dataJSON;
    commit(SET_COURSES, courses);
  },
  addNewCourse({ commit, state }, value: CourseForm) {
    const id = Math.max(...state.courses.map((el) => el.id)) + 1;
    const image =
      value.image === ''
        ? `https://placeimg.com/640/480/tech?t=${id}`
        : value.image;
    const newCourse: Course = { ...value, id, image };
    commit(ADD_COURSE, newCourse);
    this.$router.push({
      path: `/courses/course/${id}`,
    });
  },
  updateSelectedCourse({ commit }, value: Course) {
    commit(UPDATE_COURSE, value);
    this.$router.push({
      path: `/courses/course/${value.id}`,
    });
  },
};

const sortCourses = (state: RootState) => {
  const newCourses = [...state.courses];
  const [field, order] = state.sortOrder.split(' ');
  if (field === 'price') {
    if (order === 'asc') {
      return newCourses.sort((a: Course, b: Course) => a.price - b.price);
    }
    return newCourses.sort((a: Course, b: Course) => b.price - a.price);
  }
  if (field === 'date') {
    if (order === 'asc') {
      return newCourses.sort(
        (a: Course, b: Course) =>
          new Date(a.dateBegin).getTime() - new Date(b.dateBegin).getTime()
      );
    }
    return newCourses.sort(
      (a: Course, b: Course) =>
        new Date(b.dateBegin).getTime() - new Date(a.dateBegin).getTime()
    );
  }
}
