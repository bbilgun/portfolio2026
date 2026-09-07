"use client";

import { useLocale } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="max-w-md pb-16 text-sm text-faint lg:pb-24">
      <p>
        {t("footer.built")} · {t("footer.rights")}
      </p>
    </footer>
  );
}
