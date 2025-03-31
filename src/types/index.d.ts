export type Course = {
  id: number;
  title: string;
  description: string;
  price: number;
  created_at: string;
};

export type User = {
  id: number;
  name: string;
  courses: Courses[];
};

type Courses = {
  courseId: number;
  dateJoined: string;
  player?: string;
};
