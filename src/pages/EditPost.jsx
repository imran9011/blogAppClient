import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor.jsx";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(import.meta.env.VITE_HOME_URL + "/post/" + id)
      .then((response) => response.json())
      .then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
  }, []);

  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (file) {
      data.set("file", file);
    }

    const response = await fetch(import.meta.env.VITE_HOME_URL + "/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form onSubmit={(e) => updatePost(e)} method="post" encType="multipart/form-data">
      <input type="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="summary" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
      <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Update Post</button>
    </form>
  );
}
