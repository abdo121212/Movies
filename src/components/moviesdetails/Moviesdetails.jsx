import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Moviesdetails() {
  const [moviesdetails, setMoviesdetails] = useState({});

  let { id } = useParams();
  async function getMoviesdetails() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=12167db4c254ce58b1e292964f62a2cf&languag=en-US`
    );
    setMoviesdetails(data);
  }
  useEffect(() => {
    getMoviesdetails();
  });
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="myimage">

              <img
                className="w-100"
                src={`https://image.tmdb.org/t/p/original/${moviesdetails.poster_path}`}
                alt=""
              />
            </div>
          </div>
          <div className="col-md-8">
                <h3>{moviesdetails.original_title}</h3>
                <p>{moviesdetails.overview}</p>
                {moviesdetails.genres?.map((elem,idx)=><span key={idx} className="me-2 rounded-3 p-2 bg-info text-white">{elem.name}</span>)}

          </div>
        </div>
      </div>
    </>
  );
}
