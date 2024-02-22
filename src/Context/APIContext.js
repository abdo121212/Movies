import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const APIContext = createContext();

export function APIContextProvider(props) {
  const [allMovies, setAllMovies] = useState(null);
  const [allTv, setAllTv] = useState(null);

  async function getTrendingMovies() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=12167db4c254ce58b1e292964f62a2cf"
    );
    setAllMovies(data.results);
  }

  async function getTrendingTv() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=12167db4c254ce58b1e292964f62a2cf"
    );
    setAllTv(data.results);
  }

  useEffect(() => {
    getTrendingMovies();
    getTrendingTv();
  }, []);

  return (
    <APIContext.Provider value={{ allMovies, allTv }}>
      {props.children}
    </APIContext.Provider>
  );
}
