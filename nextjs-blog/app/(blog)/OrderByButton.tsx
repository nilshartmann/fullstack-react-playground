"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ORDER_BY_SEARCH_PARAM, PostsOrderBy } from "@/types";

type OrderByButtonProps = {
  orderBy: PostsOrderBy;
};
export default function OrderByButton({ orderBy }: OrderByButtonProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // const { openHome, currentLocation } = useBlogNavigation();
  const currentOrderBy = searchParams.get(ORDER_BY_SEARCH_PARAM) || "date_desc";

  const label = orderBy === "date_desc" ? "Desc" : "Asc";

  function reorder() {
    const params = new URLSearchParams({ order_by: orderBy });
    router.push(`?${params.toString()}`);
  }

  return (
    <button disabled={currentOrderBy === orderBy} onClick={reorder}>
      Order by date {label}
    </button>
  );
}
