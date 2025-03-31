import { useCourseStore } from "@/stores/CourseStore";
import { useToast } from "@/hooks/useToast";

export const useCourseDetails = (courseId: number) => {
  const { purchasedCourses, toggleFavorite, favorites } = useCourseStore();
  const { toast } = useToast();

  const isPurchased = purchasedCourses.includes(courseId);
  const isFavorite = favorites.includes(courseId);

  const handleFavoriteToggle = () => {
    toggleFavorite(courseId);
    toast({
      title: isFavorite ? "Removido dos Favoritos" : "Adicionado aos Favoritos",
      description: isFavorite
        ? "O curso foi removido da sua lista de favoritos."
        : "Agora você pode encontrar este curso na página de favoritos do seu menu.",
    });
  };

  return { isPurchased, isFavorite, handleFavoriteToggle };
};
