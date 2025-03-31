"use client";

import { notFound } from "next/navigation";
import { CourseDetails } from "@/components/CourseDetails";
import { useCourseStore } from "@/stores/CourseStore";

export type CoursePageProps = {
  params: {
    id: string;
  };
};

const CoursePage: React.FC<CoursePageProps> = ({ params }) => {
  const { courses, user } = useCourseStore();
  const courseId = Number(params.id);
  const course = courses.find((c) => c.id === courseId);
  const courseUser = user.courses.find((u) => u.courseId === courseId);

  if (!course) notFound();

  return <CourseDetails course={course} dateJoined={courseUser?.dateJoined} />;
};

export default CoursePage;
