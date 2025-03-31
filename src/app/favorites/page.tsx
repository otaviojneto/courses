"use client";

import { CourseCard } from "@/components/CourseCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useCourseStore } from "@/stores/CourseStore";
import Image from "next/image";
import Link from "next/link";
import heart from "../../../public/icons/heartFavoriteOutlined.svg";

const CoursesPage: React.FC = () => {
  const { favorites, courses } = useCourseStore();
  const favoritesCourses = courses?.filter((course) =>
    favorites.includes(course.id)
  );
  return (
    <div className="pt-10">
      <Breadcrumb className="mb-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/courses">Cursos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Favotitos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold mb-3">Cursos Favoritos</h1>
      {favoritesCourses.length > 0 ? (
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
      ) : (
        <div className="text-center space-y-4 mt-12">
          <p className="text-muted-foreground text-lg">
            Sua lista de favoritos está vazia!
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <p className="text-sm text-muted-foreground/80">
              Explore nossos cursos e salve seus favoritos clicando no{" "}
            </p>
            <Image width={16} height={16} src={heart} alt="heart" />
          </div>
          <Button asChild variant="default">
            <Link href="/courses">Explorar Cursos</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
