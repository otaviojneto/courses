"use client";

import { Button } from "@/components/ui/button";
import { useCourseStore } from "@/stores/CourseStore";
import { Course } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import favorireHeart from "../../../public/icons/heartFavorite.svg";
import favorireHeartOutlined from "../../../public/icons/heartFavoriteOutlined.svg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export type CourseDetailsProps = {
  course: Course;
  dateJoined?: string;
};

const CourseDetails: React.FC<CourseDetailsProps> = ({
  course,
  dateJoined,
}) => {
  const { purchasedCourses, toggleFavorite, favorites } = useCourseStore();
  const isPurchased = purchasedCourses.includes(course.id);
  const isFavorite = favorites.includes(course.id);

  return (
    <div className="pt-10">
      <Breadcrumb className="mb-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/courses">Cursos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detalhes do curso</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-card border border-b-gray-200 p-4 rounded">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
          <button
            onClick={() => toggleFavorite(course.id)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Image
              width={24}
              height={24}
              src={isFavorite ? favorireHeart : favorireHeartOutlined}
              className="cursor-pointer"
              alt="favorite"
            />
          </button>
        </div>
        <p className="text-muted-foreground mb-6">{course.description}</p>

        <div className="flex items-start justify-between">
          <div>
            <p className="text-xl font-bold">{formatPrice(course.price)}</p>
            {isPurchased ? (
              <>
                <p className="text-xs text-muted-foreground">
                  Você já possui este curso.
                </p>
                <p className="text-xs text-muted-foreground">
                  data da adesão:{" "}
                  {dateJoined && formatDate(dateJoined, { dateStyle: "short" })}
                </p>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">
                Garanta seu acesso hoje
              </p>
            )}
          </div>

          {isPurchased ? (
            <Button asChild>
              <Link href={`/courses/${course.id}/player`}>
                Continuar Estudando
              </Link>
            </Button>
          ) : (
            <Button onClick={() => alert("compar curso")}>Comprar Curso</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
