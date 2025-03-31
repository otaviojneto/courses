import { render, screen } from "@testing-library/react";
import CourseCard from "./CourseCard";
import { useCourseStore } from "@/stores/CourseStore";

// Mock das dependências
jest.mock("@/stores/CourseStore");
jest.mock("next/link", () => ({
  __esModule: true,
  default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} />
  ),
}));

const mockUseCourseStore = useCourseStore as jest.MockedFunction<
  typeof useCourseStore
>;

describe("CourseCard", () => {
  const mockCourse = {
    id: 1,
    title: "Curso de React Avançado",
    description: "Aprenda React com projetos práticos e conceitos avançados",
  };

  beforeEach(() => {
    mockUseCourseStore.mockReturnValue({
      purchasedCourses: [],
      favorites: [],
      toggleFavorite: jest.fn(),
    });
  });

  it("deve exibir corretamente as informações do curso", () => {
    render(<CourseCard {...mockCourse} />);

    expect(screen.getByText(mockCourse.title)).toBeInTheDocument();
    expect(screen.getByText(mockCourse.description)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/courses/${mockCourse.id}`
    );
  });

  it('deve mostrar o badge "Adquirido" quando o curso foi comprado', () => {
    mockUseCourseStore.mockReturnValue({
      purchasedCourses: [mockCourse.id],
      favorites: [],
      toggleFavorite: jest.fn(),
    });

    render(<CourseCard {...mockCourse} />);

    expect(screen.getByText("Adquirido")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/courses/${mockCourse.id}/player`
    );
  });

  it("deve aplicar classes de hover corretamente", () => {
    const { container } = render(<CourseCard {...mockCourse} />);

    const card = container.firstChild;
    expect(card).toHaveClass("hover:scale-[1.02]");
    expect(card).toHaveClass("hover:shadow-lg");
  });
});
