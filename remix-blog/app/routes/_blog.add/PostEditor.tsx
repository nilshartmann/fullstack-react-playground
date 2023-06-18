import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { useState } from "react";
import PageHeader from "~/components/PageHeader";
import Message from "~/components/Message";
import LoadingIndicator from "~/components/LoadingIndicator";
import Post from "~/routes/_blog.post.$postId._index/Post";
import type { action } from "~/routes/_blog.add/route";

// Requirements:
//   - do not allow submiting the form when one of the input's is empty
//   - immediately(!) show info if a field is filled correclty (length>0) or error if not
//   - have a Clear button that clears both input fields
//
//  -> seems to be tricky with Remix naiv backend validation approach
//     without state in the form
//  -> "Hang in there. Once you really understand Remix, you're going to love web development again." 🤪
//     (https://github.com/remix-run/remix/discussions/3634#discussioncomment-3069631)
//

export default function PostEditor() {
  const navigate = useNavigate();
  const transition = useNavigation();
  const actionData = useActionData<typeof action>();
  const errors = actionData?.errors;

  const pending = transition.state === "submitting";

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const clearDisabled = (!title && !body) || pending;
  const saveButtonDisabled = !title || !body || pending;

  const handleClear = () => {
    setTitle("");
    setBody("");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <PageHeader>Add Post</PageHeader>
      <Form method="post" className={"Container"}>
        <label>
          Title
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </label>
        {title ? (
          <Message type="info" msg="Title correctly filled" />
        ) : (
          <Message type="error" msg="Please enter a title" />
        )}

        <label>
          Body
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.currentTarget.value)}
          />
        </label>
        {body ? (
          <Message type="info" msg="Body correctly filled" />
        ) : (
          <Message msg="Please enter a body" />
        )}

        <button disabled={clearDisabled} onClick={handleClear}>
          Clear
        </button>
        <button onClick={handleCancel}>Cancel</button>
        <button type="submit" disabled={saveButtonDisabled}>
          {pending ? <LoadingIndicator secondary /> : "Save Post"}
        </button>
        {!!errors && Object.keys(errors).length > 0 && (
          <>
            {Object.entries(errors).map((e) => {
              return (
                <Message
                  key={e[0]}
                  type="error"
                  msg={`Error in field ${e[0]}: ${e[1]}`}
                />
              );
            })}
          </>
        )}
      </Form>
      <div className={"Container PostEditorPreview"}>
        <h2>Preview: Your new Post</h2>
        <Post post={{ title, body }} />
      </div>
    </div>
  );
}
