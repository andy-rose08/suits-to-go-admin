"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.store_id}/settings`,
      label: "Settings",
      active: pathname === `/${params.store_id}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-[#ADD8E6]",
            route.active ? "text-[#9370DB] dark:text-[#1ABC9C]" : "text-[#FFD700]"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
