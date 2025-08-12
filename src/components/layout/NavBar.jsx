"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3, Calendar, Wallet } from "lucide-react";

const navLinks = [
  { href: "/", label: "Головна", icon: Home },
  { href: "/PriceAnalysis", label: "Аналіз цін", icon: BarChart3 },
  { href: "/PriceYears", label: "Ціни по роках", icon: Calendar },
  { href: "/PriceBudget", label: "Підбір за бюджетом", icon: Wallet },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
      {navLinks.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={[
              "flex items-center space-x-2 px-2 py-2 lg:px-3 rounded-xl text-sm font-medium transition-all duration-200",
              "hover:bg-blue-100 hover:text-blue-700",
              "aria-[current=page]:bg-blue-100 aria-[current=page]:text-blue-700 aria-[current=page]:shadow-sm",
            ].join(" ")}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
