"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/Ui/breadcrumb";
import { Button } from "@/components/Ui/button";
import { useCourseStore } from "@/stores/CourseStore";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReactPlayerProps from "react-player";

// Carrega o ReactPlayer apenas no client-side
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-black rounded-lg overflow-hidden" />
  ),
});

const CoursePlayer: React.FC = () => {
  const { courses, user, updateProgress } = useCourseStore();
  const [origin, setOrigin] = useState("");
  const params = useParams();
  const playerRef = useRef<ReactPlayerProps>(null);
  const { id } = params;
  const courseId = Number(id);

  const course = courses.find((c) => c.id === courseId);
  const videoId = user.courses.find(
    (item) => item.courseId === courseId
  )?.player;

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const handleProgress = (progress: { played: number }) => {
    updateProgress(courseId, progress.played * 100);
  };

  const handleContinue = () => {
    if (playerRef.current) {
      const internalPlayer = playerRef.current.getInternalPlayer();

      if (internalPlayer && typeof internalPlayer.playVideo === "function") {
        internalPlayer.playVideo();
      }
      // Vídeo local/HTML5
      else if (internalPlayer && typeof internalPlayer.play === "function") {
        internalPlayer.play();
      }
    }
  };

  const handleReset = () => {
    updateProgress(courseId, 0);

    if (playerRef.current) {
      // Volta para o início e pausa
      playerRef.current.seekTo(0, "seconds");

      // Controle específico para YouTube
      const internalPlayer = playerRef.current.getInternalPlayer();

      // Garante que o vídeo não auto-inicia
      if (internalPlayer && typeof internalPlayer.pauseVideo === "function") {
        internalPlayer.pauseVideo();
      }
    }
  };

  return (
    <div className="pt-10">
      <Breadcrumb className="mb-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/courses">Cursos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/courses/${id}`}>
              Detalhes do curso
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Player do Curso</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-xl font-semibold mb-4">{course?.title}</h1>
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <ReactPlayer
          ref={playerRef}
          url={
            videoId
              ? `https://www.youtube.com/watch?v=${videoId}`
              : "/sample-video.mp4"
          }
          width="100%"
          height="100%"
          controls
          onProgress={handleProgress}
          config={{
            youtube: {
              playerVars: {
                enablejsapi: 1,
                origin: origin,
              },
            },
          }}
        />
      </div>

      <div className="mt-6 flex gap-4 justify-end">
        <Button
          className="w-full sm:w-auto"
          fullWidth
          variant="outline"
          onClick={handleReset}
        >
          Reiniciar Curso
        </Button>
        <Button className="w-full sm:w-auto" fullWidth onClick={handleContinue}>
          Continuar Curso
        </Button>
      </div>
    </div>
  );
};

export default CoursePlayer;
