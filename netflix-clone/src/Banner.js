import React, { useState, useEffect } from 'react'
import axios from './axios';
import requests from './requests';
import './Banner.css';
import handleClick from './Row';

function Banner() {

    const [movie, setMovie] = useState([]);

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

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            // We need to randomly select one of hte movies
            const all_movies = request.data.results;
            const rand_num = Math.floor(Math.random() * all_movies.length - 1);
            const random_movie = all_movies[rand_num];

            setMovie(random_movie);
            return request;

        }
        fetchData();
    }, []);

    // truncate after n characters
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition: "center center"

            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button onClick={() => handleClick(movie)} className="banner__button">Check it out</button>
                </div>

                <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>

                {/* title */}
                {/* div with 2 buttons */}
                {/* description */}
            </div>
            <div className="banner--fadeBottom"></div>


        </header>
    )
}

export default Banner
