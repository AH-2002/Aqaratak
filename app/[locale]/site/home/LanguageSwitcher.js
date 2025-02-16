"use client";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (locale) => {
    const newPath = `/${locale}${pathname.replace(/^\/(en|ar)/, "")}`;
    router.push(newPath);
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>🇺🇸 English</button>
      <button onClick={() => changeLanguage("ar")}>🇸🇦 Arabic</button>
    </div>
  );
}
