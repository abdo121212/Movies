import React, { useContext } from "react";

import { APIContext } from "../../Context/APIContext";

export default function Movies() {
  const { allMovies } = useContext(APIContext);
  return (
    <div>
      {allMovies ? (
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-md-4">
              <div className="trending">
                <div className="upper"></div>
                <h5>Trending movies to watch now</h5>
                <p className="text-muted ">
                  Lorem ipsum dolor sit amet consectetur adipisicing.
                </p>
                <div className="Lower"></div>
              </div>
            </div>
            {allMovies.map((movies, index) => (
              <div className="col-md-2">
                <div className="movies">
                  <img
                    className="w-100"
                    src={
                      "https://image.tmdb.org/t/p/w500/" + movies.poster_path
                    }
                    alt="moviesdb"
                  />
                  <h6 className="text-center">{movies.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-5x text-white fa-spin"></i>
        </div>
      )}
    </div>
  );
}
