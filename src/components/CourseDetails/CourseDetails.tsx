"use client";

import { Button } from "@/components/ui/button";
import { useCourseDetails } from "@/hooks/useCourseDetails";
import { Course } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import favorireHeart from "../../../public/icons/heartFavorite.svg";
import favorireHeartOutlined from "../../../public/icons/heartFavoriteOutlined.svg";
import chevronRight from "../../../public/icons/chevronRight.svg";
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
  const { handleFavoriteToggle, isFavorite, isPurchased } = useCourseDetails(
    course.id
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
            <BreadcrumbPage>Detalhes do curso</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-card border border-b-gray-200 p-4 rounded">
        <div className="flex justify-between items-start">
          <h1 className="text-xl font-bold mb-4 md:text-2xl">{course.title}</h1>
          <button
            onClick={handleFavoriteToggle}
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
            <Button asChild className="group transition-all duration-300">
              <Link href={`/courses/${course.id}/player`}>
                Continuar Estudando
                <Image
                  width={10}
                  height={10}
                  src={chevronRight}
                  alt="chevron"
                  className="ml-1 inline-block transition-all duration-300 group-hover:translate-x-1 group-active:translate-x-2"
                />
              </Link>
            </Button>
          ) : (
            <Button
              className="group transition-all duration-300"
              onClick={() => alert("compar curso")}
            >
              Comprar Curso
              <Image
                className="ml-1 inline-block transition-all duration-300 group-hover:translate-x-1 group-active:translate-x-2"
                src={chevronRight}
                width={10}
                height={10}
                alt="chevron"
              />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
