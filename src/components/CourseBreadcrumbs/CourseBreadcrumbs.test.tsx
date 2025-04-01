import { render, screen } from "@testing-library/react";
import CourseBreadcrumbs from "./CourseBreadcrumbs";

jest.mock("@/components/Ui/breadcrumb", () => {
  const originalModule = jest.requireActual("@/components/Ui/breadcrumb");
  return {
    ...originalModule,
    BreadcrumbSeparator: () => <span data-testid="separator">/</span>,
  };
});

describe("CourseBreadcrumbs", () => {
  const mockItems = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Current" },
  ];

  it("Renderiza links para itens com href e páginas para outros", () => {
    render(<CourseBreadcrumbs items={mockItems} />);

    mockItems.forEach((item) => {
      if (item.href) {
        const link = screen.getByRole("link", { name: item.label });
        expect(link).toHaveAttribute("href", item.href);
      } else {
        const page = screen.getByText(item.label);
        expect(page).toBeInTheDocument();
        expect(page.tagName).not.toBe("A");
      }
    });
  });

  it("Exibe os labels corretamente", () => {
    render(<CourseBreadcrumbs items={mockItems} />);
    mockItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("Renderiza separadores apenas entre os itens", () => {
    render(<CourseBreadcrumbs items={mockItems} />);
    const separators = screen.getAllByTestId("separator");
    expect(separators).toHaveLength(mockItems.length - 1);
  });

  it("Caso extremo: array vazio", () => {
    render(<CourseBreadcrumbs items={[]} />);
    const items = screen.queryAllByRole("listitem");
    expect(items).toHaveLength(0);
  });

  it("Caso com um único item (sem separadores)", () => {
    const singleItem = [{ label: "Home" }];
    render(<CourseBreadcrumbs items={singleItem} />);
    const separators = screen.queryAllByTestId("separator");
    expect(separators).toHaveLength(0);
  });
});
