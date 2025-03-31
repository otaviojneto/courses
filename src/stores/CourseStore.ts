import { user, courses } from "@/data/mock";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CourseProgress = {
  courseId: number;
  progress: number;
};

type CourseStore = {
  user: typeof user;
  courses: typeof courses;
  favorites: number[];
  purchasedCourses: number[];
  courseProgress: CourseProgress[];
  togglePurchase: (courseId: number) => void;
  updateProgress: (courseId: number, progress: number) => void;
  toggleFavorite: (courseId: number) => void;
};

export const useCourseStore = create<CourseStore>()(
  persist(
    (set) => ({
      user: user,
      courses: courses,
      purchasedCourses: user.courses.map((c) => c.courseId),
      courseProgress: [],
      favorites: [],

      // Método para alternar favoritos
      toggleFavorite: (courseId: number) =>
        set((state) => ({
          favorites: state.favorites.includes(courseId)
            ? state.favorites.filter((id) => id !== courseId)
            : [...state.favorites, courseId],
        })),

      // Mantem os outros métodos existentes
      togglePurchase: (courseId) =>
        set((state) => ({
          purchasedCourses: state.purchasedCourses.includes(courseId)
            ? state.purchasedCourses.filter((id) => id !== courseId)
            : [...state.purchasedCourses, courseId],
        })),

      updateProgress: (courseId, progress) =>
        set((state) => ({
          courseProgress: state.courseProgress.some(
            (c) => c.courseId === courseId
          )
            ? state.courseProgress.map((c) =>
                c.courseId === courseId ? { ...c, progress } : c
              )
            : [...state.courseProgress, { courseId, progress }],
        })),
    }),
    // Nome da chave no localStorage
    {
      name: "course-storage",
    }
  )
);
