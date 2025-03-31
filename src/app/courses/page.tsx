"use client";

import { CourseCard } from "@/components/CourseCard";
import { Input } from "@/components/REfect/input";
import { Toggle } from "@/components/REfect/toggle";
import { useCourseStore } from "@/stores/CourseStore";
import Image from "next/image";
import { useState } from "react";
import search from "../../../public/icons/search.svg";

const CoursesPage: React.FC = () => {
  const { courses, purchasedCourses } = useCourseStore();
  const [showAcquiredOnly, setShowAcquiredOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra os cursos com base nos dois critérios
  const filteredCourses = courses
    .filter(({ id, title }) => {
      const isAcquired = purchasedCourses.includes(id);

      // Verifica o termo de busca no título
      const matchesSearch = title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Aplica os filtros combinados
      return showAcquiredOnly ? isAcquired && matchesSearch : matchesSearch;
    })
    .sort(
      (a, b) =>
        Number(purchasedCourses.includes(b.id)) -
        Number(purchasedCourses.includes(a.id))
    );
  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold ">Conheça Nossos Cursos</h1>

      <div className="flex w-full gap-6 pt-10 mb-4 md:gap-4">
        <div className="w-full max-w-[368px]">
          <Input
            placeholder="Buscar cursos"
            onChange={(e) => setSearchTerm(e.target.value)}
            endIcon={<Image src={search} alt="Search" width={20} height={20} />}
          />
        </div>

        <Toggle
          variant={showAcquiredOnly ? "default" : "outline"}
          pressed={showAcquiredOnly}
          onPressedChange={setShowAcquiredOnly}
        >
          Adquiridos
        </Toggle>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          {showAcquiredOnly
            ? "Nenhum curso adquirido encontrado"
            : "Nenhum curso encontrado"}
        </p>
      )}
    </div>
  );
};

export default CoursesPage;
