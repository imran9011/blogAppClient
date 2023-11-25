import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor.jsx";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", file);

    const response = await fetch(import.meta.env.VITE_HOME_URL + "/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="create-post-form" onSubmit={(e) => createNewPost(e)} method="post" encType="multipart/form-data">
      <input type="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="summary" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
      <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}
