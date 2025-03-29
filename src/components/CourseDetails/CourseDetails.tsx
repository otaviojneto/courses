"use client";

import { Button } from "@/components/ui/button";
import { useCourseStore } from "@/stores/CourseStore";
import Link from "next/link";
import { Course } from "@/types";

export function CourseDetails({ course }: { course: Course }) {
  const { purchasedCourses, togglePurchase } = useCourseStore();
  const isPurchased = purchasedCourses.includes(course.id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-muted-foreground mb-6">{course.description}</p>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold">R$ {course.price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">
              {isPurchased
                ? "Você já possui este curso"
                : "Garanta seu acesso hoje"}
            </p>
          </div>

          {isPurchased ? (
            <Button asChild>
              <Link href={`/courses/${course.id}/player`}>
                Continuar Estudando
              </Link>
            </Button>
          ) : (
            <Button onClick={() => togglePurchase(course.id)}>
              Comprar Curso
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
