"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import LoadingIndicator from "@/app/components/LoadingIndicator";

export default function AddCommentButton() {
  const { pending } = useFormStatus();
  return (
    <button type={"submit"} disabled={pending}>
      {pending ? <LoadingIndicator secondary={true}></LoadingIndicator> : "Add"}
    </button>
  );
}
