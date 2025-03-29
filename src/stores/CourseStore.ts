import { user, courses } from "@/data/mock";
import { create } from "zustand";

type CourseProgress = {
  courseId: number;
  progress: number;
};

type CourseStore = {
  user: typeof user;
  courses: typeof courses;
  purchasedCourses: number[];
  courseProgress: CourseProgress[];
  togglePurchase: (courseId: number) => void;
  updateProgress: (courseId: number, progress: number) => void;
};

export const useCourseStore = create<CourseStore>((set) => ({
  user: user,
  courses: courses,
  purchasedCourses: user.courses.map((c) => c.courseId), // [1, 3, 5]
  courseProgress: [],

  togglePurchase: (courseId) =>
    set((state) => ({
      purchasedCourses: state.purchasedCourses.includes(courseId)
        ? state.purchasedCourses.filter((id) => id !== courseId)
        : [...state.purchasedCourses, courseId],
    })),

  updateProgress: (courseId, progress) =>
    set((state) => ({
      courseProgress: state.courseProgress.some((c) => c.courseId === courseId)
        ? state.courseProgress.map((c) =>
            c.courseId === courseId ? { ...c, progress } : c
          )
        : [...state.courseProgress, { courseId, progress }],
    })),
}));
