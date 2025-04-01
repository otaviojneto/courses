import { render, screen, fireEvent } from "@testing-library/react";
import FavoriteButton from "./FavoriteButton"; // Ajuste o caminho conforme necessário
import favorireHeart from "../../../public/icons/heartFavorite.svg";
import favorireHeartOutlined from "../../../public/icons/heartFavoriteOutlined.svg";

// Mock do next/image para simplificar o teste
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: {
    src: { src: string };
    width: number;
    height: number;
    alt: string;
    className?: string;
  }) => (
    <img
      src={props.src.src}
      width={props.width}
      height={props.height}
      alt={props.alt}
      className={props.className}
    />
  ),
}));

describe("FavoriteButton", () => {
  const mockOnToggle = jest.fn();

  it("Renderiza o ícone preenchido quando isFavorite é true", () => {
    render(<FavoriteButton isFavorite={true} onToggle={mockOnToggle} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", favorireHeart.src);
  });

  it("Renderiza o ícone outlined quando isFavorite é false", () => {
    render(<FavoriteButton isFavorite={false} onToggle={mockOnToggle} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", favorireHeartOutlined.src);
  });

  it("Chama onToggle ao clicar no botão", () => {
    render(<FavoriteButton isFavorite={false} onToggle={mockOnToggle} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it("Verifica o texto alternativo da imagem", () => {
    render(<FavoriteButton isFavorite={true} onToggle={mockOnToggle} />);
    const image = screen.getByAltText("favorite");
    expect(image).toBeInTheDocument();
  });

  it("aplica classes CSS corretas", () => {
    render(<FavoriteButton isFavorite={false} onToggle={mockOnToggle} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("p-1");
    expect(button).toHaveClass("hover:bg-gray-100");
    expect(button).toHaveClass("rounded-full");
    expect(button).toHaveClass("transition-colors");
  });

  it("renderiza a imagem com as dimensões corretas", () => {
    render(<FavoriteButton isFavorite={true} onToggle={mockOnToggle} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("width", "24");
    expect(image).toHaveAttribute("height", "24");
  });
});
