"use client";

import { Button } from "@/components/Ui/button";
import { useCourseDetails } from "@/hooks/useCourseDetails";
import { Course } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import chevronRight from "../../../public/icons/chevronRight.svg";
import CourseBreadcrumbs from "../CourseBreadcrumbs";
import FavoriteButton from "../FavoriteButton";

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

  const breadCrumbs = [
    { label: "Cursos", href: "/courses" },
    { label: "Detalhes do curso" },
  ];

  return (
    <div className="pt-10">
      <CourseBreadcrumbs items={breadCrumbs} />

      <div className="bg-card border border-b-gray-200 p-4 rounded">
        <div className="flex justify-between items-start">
          <h1 className="text-xl font-bold mb-4 md:text-2xl">{course.title}</h1>

          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={handleFavoriteToggle}
          />
        </div>
        <p className="text-muted-foreground mb-6">{course.description}</p>

        <div className="flex flex-col items-start justify-between w-full sm:w-auto sm:flex-row">
          <div>
            <p className="text-xl font-bold">{formatPrice(course.price)}</p>
            {isPurchased ? (
              <>
                <p className="text-xs text-muted-foreground">
                  Você já possui este curso.
                </p>
                {dateJoined && (
                  <p className="text-xs text-muted-foreground">
                    data da adesão:{" "}
                    {formatDate(dateJoined, { dateStyle: "short" })}
                  </p>
                )}
              </>
            ) : (
              <p className="text-xs text-muted-foreground">
                Garanta seu acesso hoje
              </p>
            )}
          </div>

          {isPurchased ? (
            <Button
              asChild
              className="group transition-all duration-300 mt-3 w-full sm:w-auto sm:mt-0"
            >
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
              className="group transition-all duration-300  mt-3 w-full sm:w-auto sm:mt-0"
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
