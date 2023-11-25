import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout.jsx";
import Homepage from "./pages/Homepage.jsx";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import { UserContextProvider } from "./UserContext";
import EditPost from "./pages/EditPost";
import UserPost from "./pages/UserPost";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          <Route path={"/create"} element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/user/:id" element={<UserPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
