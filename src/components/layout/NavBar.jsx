"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3, Calendar, Wallet } from "lucide-react";
import Hamburger from 'hamburger-react'
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Головна", icon: Home },
  { href: "/PriceAnalysis", label: "Аналіз цін", icon: BarChart3 },
  { href: "/PriceYears", label: "Ціни по роках", icon: Calendar },
  { href: "/PriceBudget", label: "Підбір за бюджетом", icon: Wallet },
];

export default function NavBar() {
  const pathname = usePathname();
  const [showWindow, setShowWindow] = useState(false);

  return (
    <div style={{background: showWindow ? 'white' : 'none'}} className={`${showWindow ? 'h-screen' : 'h-16'} flex z-10 w-full left-0 fixed top-0 overflow-auto justify-center md:relative md:justify-end md:bg-transparent md:h-16`}>
      <div className="fixed right-2 top-2 md:hidden">
        <Hamburger onToggle={() => setShowWindow((prev) => !prev)}/>
      </div>
      <nav className={`${showWindow ? 'flex' : 'hidden'} flex-col md:flex items-center justify-center gap-2 md:flex-row`}>
        {navLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setShowWindow(false)}
              aria-current={active ? "page" : undefined}
              className={[
                "flex items-center space-x-2 px-2 py-2 lg:px-3 rounded-xl text-sm font-large md:font-medium transition-all duration-200",
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
    </div>
  );
}
