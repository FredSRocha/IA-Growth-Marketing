"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      {/* ESQUERDA */}
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" width={173} height={39} alt="Lex Assistant AI" />
        <Link
          href="/"
          className={
            currentPath === "/" ? "font-bold text-primary" : "text-muted-foreground"
          }
        >
          Principal
        </Link>
        <Link
          href="/campaigns"
          className={
            currentPath === "/campaigns"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Campanhas
        </Link>
        <Link
          href="/subscription"
          className={
            currentPath === "/subscription"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Assinatura
        </Link>
      </div>
      {/* DIREITA */}
      <UserButton showName />
    </nav>
  );
};

export default Navbar;
