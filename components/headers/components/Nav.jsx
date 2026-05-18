"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Home", href: "/" },
  { title: "Quienes somos", href: "/about" },
  { title: "Marcas", href: "/#products" },
  { title: "Contacto", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      {menuItems.map((item) => (
        <li className="navigation__item" key={item.title}>
          <Link
            href={item.href}
            className={`navigation__link ${
              pathname === item.href ? "menu-active" : ""
            }`}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </>
  );
}
