"use client";

import { Button } from "@/components/ui/button";
import { useCourseStore } from "@/stores/CourseStore";
import { useRouter, useParams } from "next/navigation";
import ReactPlayer from "react-player";

export default function CoursePlayer() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const courseId = Number(id);
  const { courses, updateProgress } = useCourseStore();
  const course = courses.find((c) => c.id === courseId);

  const handleProgress = (progress: { played: number }) => {
    updateProgress(courseId, progress.played * 100);
  };

  if (!course) {
    router.push("/not-found");
    return null;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          ← Voltar para o curso
        </Button>
      </div>

      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <ReactPlayer
          url="/sample-video.mp4"
          width="100%"
          height="100%"
          controls
          onProgress={handleProgress}
        />
      </div>

      <div className="mt-6 flex gap-4 justify-end">
        <Button variant="outline" onClick={() => updateProgress(courseId, 0)}>
          Reiniciar Curso
        </Button>
        <Button onClick={() => router.push("/")}>Concluir</Button>
      </div>
    </div>
  );
}
