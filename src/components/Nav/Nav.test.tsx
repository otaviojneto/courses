import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nav from "./Nav";
import { useCourseStore } from "@/stores/CourseStore";

jest.mock("@/stores/CourseStore");
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", props),
}));
jest.mock("next/link", () => ({
  __esModule: true,
  default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    React.createElement("a", props),
}));

const mockUseCourseStore = useCourseStore as jest.MockedFunction<
  typeof useCourseStore
>;

describe("Nav Component", () => {
  const mockUser = { name: "John Doe", email: "john@example.com" };

  beforeEach(() => {
    mockUseCourseStore.mockReturnValue({
      user: mockUser,
      favorites: [],
      purchasedCourses: [],
      toggleFavorite: jest.fn(),
    });
  });

  it("renderiza corretamente o nome do usuário", () => {
    render(<Nav />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("exibe o menu dropdown ao clicar", async () => {
    render(<Nav />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Favoritos")).toBeInTheDocument();
  });
});
