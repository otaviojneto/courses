import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/Ui/breadcrumb";

type BreadcrumbItemType = {
  label: string;
  href?: string;
};

export type CourseBreadcrumbsProps = {
  items: BreadcrumbItemType[];
};

const CourseBreadcrumbs: React.FC<CourseBreadcrumbsProps> = ({ items }) => {
  return (
    <Breadcrumb className="mb-10">
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.href ? (
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CourseBreadcrumbs;
