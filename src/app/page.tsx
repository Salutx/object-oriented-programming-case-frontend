"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    push("/catalogo");
  }, [pathname, push]);

  return null;
}
