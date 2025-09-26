import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Body from "./pages/Body";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
import Post from "./pages/Post";

export default function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route  element={<Body />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/" element={<Post />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            {/* Inline 404 for nested routes */}
            <Route
              path="*"
              element={<h1 style={{ textAlign: "center" }}>404 - Page Not Found</h1>}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          {/* Inline 404 for non-Body routes */}
          <Route
            path="*"
            element={<h1 style={{ textAlign: "center" }}>404 - Page Not Found</h1>}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
