"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

type SectionNavProps = {
  items: NavItem[];
};

export function SectionNav({ items }: SectionNavProps) {
  const pathname = usePathname();
  const firstSectionHref = items.find((item) => item.href.startsWith("#"))?.href ?? "";
  const [activeId, setActiveId] = useState(firstSectionHref);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = items
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.querySelector(item.href))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topEntry = visibleEntries[0];
        if (topEntry?.target instanceof HTMLElement) {
          setActiveId(`#${topEntry.target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items, pathname]);

  return (
    <nav className="section-nav">
      {items.map((item) => {
        const isRouteLink = !item.href.startsWith("#");
        const isActive = isRouteLink
          ? pathname === item.href
          : pathname === "/" && item.href === activeId;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`section-nav-pill ${isActive ? "is-active" : ""}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
