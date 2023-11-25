import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [clickDelete, setClickDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(import.meta.env.VITE_HOME_URL + "/post/" + id)
      .then((response) => response.json())
      .then((post) => setPostInfo(post));
  }, []);

  async function deletePost() {
    try {
      const response = await fetch(import.meta.env.VITE_HOME_URL + "/post/" + id, {
        method: "delete",
        credentials: "include",
      });
      if (response.status === 200) {
        setConfirmDelete(true);
      }
    } catch (error) {
      return;
    }
  }

  if (confirmDelete) return <Navigate to={"/user/" + userInfo.user_id} />;
  if (!postInfo) return "";

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by {postInfo.author.username}</div>
      {userInfo?.user_id === postInfo?.author?._id ? (
        <div className="edit-row">
          <Link to={"/edit/" + postInfo._id} className="edit-button">
            Edit this post
          </Link>
          <button onClick={() => setClickDelete(true)} className="delete-button">
            Delete this post
          </button>
        </div>
      ) : null}
      {clickDelete && (
        <div className="popup-delete">
          <h1>Are you sure you want to delete this blog?</h1>
          <div className="popup-buttons">
            <button onClick={deletePost} className="confirm-delete">
              Yes
            </button>
            <button onClick={() => setClickDelete(false)}>No</button>
          </div>
        </div>
      )}
      <div className="image">
        <img src={import.meta.env.VITE_HOME_URL + "/" + postInfo.cover} />
      </div>
      <br />
      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
}
