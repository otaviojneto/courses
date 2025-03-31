import { renderHook, act } from "@testing-library/react";
import { useCourseDetails } from "./useCourseDetails";
import { useCourseStore } from "@/stores/CourseStore";
import { useToast } from "@/hooks/useToast";

jest.mock("@/stores/CourseStore");
jest.mock("@/hooks/useToast");

const mockUseCourseStore = useCourseStore as jest.MockedFunction<
  typeof useCourseStore
>;
const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;

describe("useCourseDetails", () => {
  const courseId = 123;
  const mockToggleFavorite = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    // Reseta os mocks antes de cada teste
    jest.clearAllMocks();

    mockUseCourseStore.mockReturnValue({
      purchasedCourses: [123, 456],
      favorites: [789],
      toggleFavorite: mockToggleFavorite,
    });

    mockUseToast.mockReturnValue({
      toast: mockToast,
      dismiss: jest.fn(),
      toasts: [],
    });
  });

  it("deve retornar o estado correto para um curso não comprado e não favorito", () => {
    const { result } = renderHook(() => useCourseDetails(courseId));

    expect(result.current.isPurchased).toBe(true);
    expect(result.current.isFavorite).toBe(false);
  });

  it("deve chamar toggleFavorite e mostrar toast ao alternar favoritos", () => {
    const { result } = renderHook(() => useCourseDetails(courseId));

    act(() => {
      result.current.handleFavoriteToggle();
    });

    expect(mockToggleFavorite).toHaveBeenCalledWith(courseId);

    expect(mockToast).toHaveBeenCalledWith({
      title: "Adicionado aos Favoritos",
      description: expect.stringContaining(
        "Agora você pode encontrar este curso"
      ),
    });

    mockUseCourseStore.mockReturnValueOnce({
      purchasedCourses: [123],
      favorites: [123],
      toggleFavorite: mockToggleFavorite,
    });

    const { result: result2 } = renderHook(() => useCourseDetails(courseId));

    act(() => {
      result2.current.handleFavoriteToggle();
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: "Removido dos Favoritos",
      description: expect.stringContaining("O curso foi removido"),
    });
  });

  it("deve refletir corretamente o estado de curso comprado", () => {
    const { result } = renderHook(() => useCourseDetails(456)); // ID existente na lista de comprados

    expect(result.current.isPurchased).toBe(true);
    expect(result.current.isFavorite).toBe(false);
  });
});
