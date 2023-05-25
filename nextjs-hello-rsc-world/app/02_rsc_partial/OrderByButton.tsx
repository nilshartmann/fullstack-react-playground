"use client";

import { OrderBy } from "@/app/articles";
import { usePathname, useRouter } from "next/navigation";
import { componentLog } from "@/app/logger";

export default function OrderByButton({
  currentOrder,
}: {
  currentOrder: OrderBy;
}) {
  const pathname = usePathname();
  const { replace } = useRouter();

  const onToggleClick = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("orderBy", currentOrder === "asc" ? "desc" : "asc");
    const newUrl = `${pathname}?${searchParams.toString()}`;

    componentLog("OrderByButton", { newUrl });
    replace(newUrl);
  };

  return (
    <button
      className="mt-2 border-2 p-2 border-amber-700 rounded hover:bg-amber-50"
      onClick={onToggleClick}
    >
      Toggle Sort (current: {currentOrder})
    </button>
  );
}
