import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(import.meta.env.VITE_HOME_URL + "/profile", {
      credentials: "include",
      method: "GET",
    }).then((response) => {
      response.json().then((user) => {
        if (!response.ok) {
          setUserInfo(null);
          return;
        }
        setUserInfo(user);
      });
    });
  }, []);

  function logout() {
    fetch(import.meta.env.VITE_HOME_URL + "/logout", {
      credentials: "include",
      method: "POST",
    }).then((response) => {
      response.json().then((user) => {
        setUserInfo(null);
      });
    });
  }

  const username = userInfo?.username;

  return (
    <div className="header-container">
      <header className="navigation">
        <div className="blog-logo">
          <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em">
            <path d="M192 32c0 17.7 14.3 32 32 32 123.7 0 224 100.3 224 224 0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32 70.7 0 128 57.3 128 128 0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192-17.7 0-32 14.3-32 32zm-96 16c0-26.5-21.5-48-48-48S0 117.5 0 144v224c0 79.5 64.5 144 144 144s144-64.5 144-144-64.5-144-144-144h-16v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48V144z" />
          </svg>
          <Link to="/">MyBlogs</Link>
        </div>
        <nav>
          {username ? (
            <>
              <Link to={"/user/" + userInfo.user_id}>
                <h4>Hello {username.split("@")[0]}</h4>
              </Link>
              <Link to="/create">Create new post</Link>
              <Link onClick={logout} to="/">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}
