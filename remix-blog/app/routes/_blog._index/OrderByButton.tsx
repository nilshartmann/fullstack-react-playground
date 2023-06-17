"use client";

import { ORDER_BY_SEARCH_PARAM, PostsOrderBy } from "~/types";
import { useSearchParams } from "@remix-run/react";

type OrderByButtonProps = {
  orderBy: PostsOrderBy;
};
export default function OrderByButton({ orderBy }: OrderByButtonProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // const { openHome, currentLocation } = useBlogNavigation();
  const currentOrderBy =
    searchParams?.get(ORDER_BY_SEARCH_PARAM) || "date_desc";

  const label = orderBy === "date_desc" ? "Desc" : "Asc";

  function reorder() {
    const params = new URLSearchParams({ order_by: orderBy });
    setSearchParams(params);
  }

  return (
    <button disabled={currentOrderBy === orderBy} onClick={reorder}>
      Order by date {label}
    </button>
  );
}
