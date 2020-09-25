import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";



// base URL for fetching images
const base_url = "https://image.tmdb.org/t/p/original/";
const APIKEY = "51cfee481c6848eda2d2110705270907";


// Row with specific props:  title,fetchURl
function Row({ title, fetchUrl, isLargeRow }) {
  // State is a short term memory
  const [movies, setMovies] = useState([]);
  const [imdb, setimdb] = useState([]);

  // Snippet of code that runs based on specific condition/variable
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // MUST INCLUDE fetchURL as dependency
  //      because its an outside variable being used inside

  // ----------IMPORTANT---------------
  // any outside variable being used in useEffect
  // must be added as a dependency



  const handleClick = (movie) => {
    // const instance = axios.create({
    //   baseURL: `https://api.themoviedb.org/3/movie/${movie.id}`
    // });
    console.log(movie);
    const movie_title = movie.title || movie?.name || movie?.original_name;
    console.log(movie_title);

    const date = new Date(movie.first_air_date || movie.release_date);
    const year = date.getYear() + 1900;

    var url = `https://www.omdbapi.com/?t=${movie_title}&y=${year}&apikey=b9f8113e`;
    console.log(url);

    async function makeGetRequest() {

      let res = await axios.get(url);
      var imdb_id = res.data.imdbID;
      console.log(imdb_id);

      window.open(`https://www.imdb.com/title/${imdb_id}`);
    }
    makeGetRequest();
  }

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {/* several row posters */}
        {movies.map((movie) => (
          //poster path looks like "/3NTAbAiao4JLzFQw6YxP1YZppM8.jpg"

          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            /* if isLargeRow then className changes*/
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
              }
            `}
            alt={movie.name}
          />
          // Adding a key helps efficiency, it will render better

        ))}
      </div>

    </div>
  );
}

export default Row;
