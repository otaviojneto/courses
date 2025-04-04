"use client";

import CourseBreadcrumbs from "@/components/CourseBreadcrumbs";
import FavoriteButton from "@/components/FavoriteButton";
import { Button } from "@/components/Ui/button";
import { useCourseDetails } from "@/hooks/useCourseDetails";
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
  const params = useParams();
  const { id } = params;
  const courseId = Number(id);
  const { courses, user, updateProgress } = useCourseStore();
  const { handleFavoriteToggle, isFavorite } = useCourseDetails(courseId);
  const [origin, setOrigin] = useState("");
  const playerRef = useRef<ReactPlayerProps>(null);

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
  const breadCrumbs = [
    { label: "Cursos", href: "/courses" },
    { label: "Detalhes do curso", href: `/courses/${id}` },
    { label: "Player do Curso" },
  ];

  return (
    <div className="pt-10">
      <CourseBreadcrumbs items={breadCrumbs} />

      <div className="flex justify-between items-start">
        <h1 className="text-xl font-semibold mb-4">{course?.title}</h1>

        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={handleFavoriteToggle}
        />
      </div>
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
