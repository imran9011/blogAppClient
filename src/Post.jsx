import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({ _id, title, summary, content, cover, createdAt, author }) {
  return (
    <div className="post">
      <div className="image">
        <Link to={"/post/" + _id}>
          <img src={import.meta.env.VITE_HOME_URL + "/" + cover} alt="computer chip" />
        </Link>
      </div>
      <div className="texts">
        <Link to={"/post/" + _id}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <Link to={"/user/" + author._id} className="author">
            {author.username}
          </Link>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
