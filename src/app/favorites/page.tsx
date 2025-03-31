"use client";

import { CourseCard } from "@/components/CourseCard";
import { useCourseStore } from "@/stores/CourseStore";

const CoursesPage: React.FC = () => {
  const { favorites, courses } = useCourseStore();
  const favoritesCourses = courses?.filter((course) =>
    favorites.includes(course.id)
  );
  return (
    <div className="pt-10">
      <h1 className="text-2xl font-bold mb-3">Cursos Favoritos</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-10">
        {favoritesCourses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
