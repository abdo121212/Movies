import React from "react";
import { Link } from "react-router-dom";

function navbar({ crrUser, logOut }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container-fluid">
          <Link className="navbar-brand">NOXE</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            {crrUser ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                    to={"Home"}
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                    to={"movies"}
                  >
                    Movies
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                    to={"tv"}
                  >
                    TV shows
                  </Link>
                </li>
              </ul>
            ) : (
              " "
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-content-center ">
              <li className="nav-item d-flex align-items-center ">
                <i className="fa-brands fa-facebook me-3 fa-1x"></i>
                <i className="fa-brands fa-twitter me-3  fa-1x"></i>
                <i className="fa-brands fa-spotify me-3  fa-1x"></i>
                <i className="fa-brands fa-instagram me-3 fa-1x"></i>
              </li>

              {crrUser ? (
                <li className="nav-item">
                  <span className="nav-link active text-muted" onClick={logOut}>
                    logout
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                      to={"Login"}
                    >
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                      to={"Register"}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}

              <></>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default navbar;
