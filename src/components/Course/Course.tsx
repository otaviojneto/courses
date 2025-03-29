"use client";

import { Button } from "@/components/ui/button";
import { useCourseStore } from "@/stores/CourseStore";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type Course = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export function CourseCard({ id, title, description, price }: Course) {
  const { purchasedCourses } = useCourseStore();

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          {purchasedCourses.includes(id) && (
            <Badge variant="secondary" className="ml-2">
              Adquirido
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-medium">R$ {price.toFixed(2)}</span>
          <Link href={`/courses/${id}`}>
            <Button size="sm">
              {purchasedCourses.includes(id) ? "Acessar" : "Detalhes"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
