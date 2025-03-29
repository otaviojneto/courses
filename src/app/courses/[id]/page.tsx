import { notFound } from "next/navigation";
import { CourseDetails } from "@/components/CourseDetails";
import { courses } from "@/data/mock";

export default async function CoursePage({
  params,
}: {
  params: { id: string };
}) {
  const courseId = Number(params.id);
  const course = courses.find((c) => c.id === courseId);

  if (!course) notFound();

  return <CourseDetails course={course} />;
}
