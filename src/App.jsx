import "./App.css";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import "./index.css";
import Movies from "./components/Movies/Movies";
import Tv from "./components/Tv/Tv";
import Moviesdetails from "./components/moviesdetails/Moviesdetails";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { APIContextProvider } from "./Context/APIContext";
function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  function getUserToken() {
    let token = localStorage.getItem("token");
    let deCode = jwtDecode(token);
    setLoggedInUser(deCode);
  }

  function logOut() {
    localStorage.removeItem("token");
    setLoggedInUser(null);
  }

  function checkUserILoggedIn() {
    if (localStorage.getItem("token") != null) {
      getUserToken();
    }
  }

  function ProtectedRoute(props) {
    if (loggedInUser !== null) {
      return <> {props.children}</>;
    } else {
      return (
        <>
          <Navigate to="/Register" />
        </>
      );
    }
  }

  useEffect(function () {
    checkUserILoggedIn();
  });
  return (
    <>
      <Navbar crrUser={loggedInUser} logOut={logOut} />

      <APIContextProvider>
        <Routes>
          <Route path="login" element={<Login getUserToken={getUserToken} />} />
          <Route path="register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="tv"
            element={
              <ProtectedRoute>
                <Tv />
              </ProtectedRoute>
            }
          />
          <Route
            path="moviesdetails"
            element={
              <ProtectedRoute>
                <Moviesdetails />
              </ProtectedRoute>
            }
          >
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <Moviesdetails />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <div className="vh-100 d-flex justify-content-center align-items-center">
                <h1>4 0 4</h1>
              </div>
            }
          />
        </Routes>
      </APIContextProvider>
    </>
  );
}
export default App;
