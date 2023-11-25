import { useEffect, useState } from "react";
import Post from "../Post";
import { useParams } from "react-router-dom";

export default function UserPost() {
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(import.meta.env.VITE_HOME_URL + "/user/" + id)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data?.posts);
        setUserName(data?.userName?.username);
      });
  }, [id]);

  return (
    <div>
      <h1 className="my-posts">Posts by {userName}</h1>
      {posts.length > 0 ? posts.map((post) => <Post key={post._id} {...post} />) : null}
    </div>
  );
}
