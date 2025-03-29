import { CourseCard } from "@/components/Course";
import { courses } from "@/data/mock";

export default function CoursesPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          description={course.description}
          price={course.price}
        />
      ))}
    </div>
  );
}
