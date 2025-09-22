import { headers } from "next/headers";
import { AppSidebar } from "@/components/app-sidebar";
import { NavActions } from "@/components/nav-actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = (await headersList).get("x-pathname") || "/";
  const pathnameSegments = pathname.split("/").filter(Boolean);
  const currentPage = pathnameSegments.at(-1) || "dashboard";

  // Create breadcrumb items with proper labels
  const breadcrumbItems = pathnameSegments.map((segment, index) => {
    const href = `/${pathnameSegments.slice(0, index + 1).join("/")}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { label, href };
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              className="mr-2 data-[orientation=vertical]:h-4"
              orientation="vertical"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.length > 0 ? (
                  breadcrumbItems.map((item, index) => (
                    <div className="flex items-center" key={item.href}>
                      {index > 0 && <BreadcrumbSeparator />}
                      {index === breadcrumbItems.length - 1 ? (
                        <BreadcrumbItem>
                          <BreadcrumbPage className="line-clamp-1">
                            {item.label}
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                      ) : (
                        <BreadcrumbItem>
                          <BreadcrumbLink href={item.href}>
                            {item.label}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                      )}
                    </div>
                  ))
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                      Dashboard
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
