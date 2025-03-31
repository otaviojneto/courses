import { useCourseDetails } from "@/hooks/useCourseDetails";
import { Course } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseDetails from "./CourseDetails";

jest.mock("@/hooks/useCourseDetails");
jest.mock("@/utils/formatDate");
jest.mock("@/utils/formatPrice");
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

const mockUseCourseDetails = useCourseDetails as jest.MockedFunction<
  typeof useCourseDetails
>;
const mockFormatDate = formatDate as jest.MockedFunction<typeof formatDate>;
const mockFormatPrice = formatPrice as jest.MockedFunction<typeof formatPrice>;

const mockCourse: Course = {
  id: 1,
  title: "Curso de React Avançado",
  description: "Aprenda React com projetos práticos",
  price: 29900,
  created_at: "2023-01-15",
};

describe("CourseDetails", () => {
  beforeEach(() => {
    mockUseCourseDetails.mockReturnValue({
      handleFavoriteToggle: jest.fn(),
      isFavorite: false,
      isPurchased: false,
    });

    mockFormatPrice.mockReturnValue("R$ 299,00");
    mockFormatDate.mockReturnValue("01/01/2024");
  });

  it("deve renderizar o breadcrumb corretamente", () => {
    render(<CourseDetails course={mockCourse} />);

    expect(screen.getByText("Cursos")).toHaveAttribute("href", "/courses");
    expect(screen.getByText("Detalhes do curso")).toBeInTheDocument();
  });

  it("deve exibir informações do curso corretamente", () => {
    render(<CourseDetails course={mockCourse} />);

    expect(screen.getByText(mockCourse.title)).toBeInTheDocument();
    expect(screen.getByText(mockCourse.description)).toBeInTheDocument();
    expect(screen.getByText("R$ 299,00")).toBeInTheDocument();
  });

  it("deve mostrar botão de continuar estudando quando comprado", () => {
    mockUseCourseDetails.mockReturnValue({
      handleFavoriteToggle: jest.fn(),
      isFavorite: false,
      isPurchased: true,
    });

    render(<CourseDetails course={mockCourse} dateJoined="2024-01-01" />);

    const link = screen.getByRole("link", { name: /Continuar Estudando/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/courses/1/player");
    expect(screen.getByText("data da adesão: 01/01/2024")).toBeInTheDocument();
  });

  it("deve mostrar botão de compra quando não comprado", async () => {
    window.alert = jest.fn();
    render(<CourseDetails course={mockCourse} />);

    const button = screen.getByText("Comprar Curso");
    await userEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(window.alert).toHaveBeenCalledWith("compar curso");
  });

  it("não deve exibir data de adesão quando não informada", () => {
    mockUseCourseDetails.mockReturnValue({
      handleFavoriteToggle: jest.fn(),
      isFavorite: false,
      isPurchased: true,
    });

    render(<CourseDetails course={mockCourse} />);

    expect(screen.queryByText(/data da adesão:/i)).not.toBeInTheDocument();
  });
});
