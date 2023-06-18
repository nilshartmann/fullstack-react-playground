import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { delaySavePost } from "~/demo-config";
import { blogFetch } from "~/blog-fetch";
import { apiUrl } from "~/config";
import { componentLog } from "~/component-log";
import PostEditor from "~/routes/_blog.add/PostEditor";

type FormErrors = {
  errors: Record<string, string>;
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const body = formData.get("body");

  componentLog("PostEditor action", "formData", { body, title });

  if (!body) {
    throw new Error("No body!");
  }

  if (!title) {
    throw new Error("No title");
  }

  const response = await blogFetch(apiUrl(`/posts`, { slow: delaySavePost }), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ body, title }),
  });

  componentLog(
    "PostEditor action",
    "response from backend",
    response.status,
    response.statusText,
    response.ok
  );

  if (response.ok) {
    return redirect(`/`);
  }

  const errors = (await response.json()) as FormErrors;
  return json(errors);
};

export default function PostEditorPage() {
  return <PostEditor />;
}
