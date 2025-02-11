import { fetchTrendingMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";
import { useState, useEffect } from 'react';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        async function fetchMovies() {
            try {
                const data = await fetchTrendingMovies();
                setMovies(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMovies();
    }, [])

    return (
        <div>
            <h2>Trending today</h2>
            {movies.length > 0 && <MovieList items={movies} />}
        </div>
    )
}

export default HomePage