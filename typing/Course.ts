export type Course = {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  dateBegin: Date;
  image: string;
};

export type CourseForm = {
  name: string;
  subtitle: string;
  description: string;
  price: number;
  dateBegin: Date;
  image: string;
};

export type CourseFormData = {
  courseForm: CourseForm;
  rules: Object;
};
