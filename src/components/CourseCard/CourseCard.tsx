"use client";

import { Button } from "@/components/ui/button";
import { useCourseStore } from "@/stores/CourseStore";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export type Course = {
  id: number;
  title: string;
  description: string;
};

const CourseCard: React.FC<Course> = ({ id, title, description }) => {
  const { purchasedCourses } = useCourseStore();
  const subscribed = purchasedCourses.includes(id);
  const linkSubscribed = subscribed
    ? `/courses/${id}/player`
    : `/courses/${id}`;

  return (
    <div className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 h-full transform-gpu hover:scale-[1.02] hover:z-10 hover:shadow-lg relative">
      <div className="p-4 flex flex-col gap-2 h-full">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold pr-2 line-clamp-2" title={title}>
            {title}
          </h3>
          {subscribed && (
            <Badge variant="secondary" className="shrink-0">
              Adquirido
            </Badge>
          )}
        </div>

        <div className="flex-1 min-h-[60px]">
          <p
            className="text-sm text-muted-foreground line-clamp-3"
            title={description}
          >
            {description}
          </p>
        </div>

        <div className="mt-2">
          <Link href={linkSubscribed} className="inline-block w-full">
            <Button size="sm" variant="default">
              Acessar Curso
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
