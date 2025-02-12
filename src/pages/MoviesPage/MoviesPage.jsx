import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchMovies } from "../../api.js";

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const query = searchParams.get("query") || "";

    useEffect(() => {
        if (!query) return;

        const fetchMovies = async () => {
            try {
                setLoading(true);
                const data = await fetchSearchMovies(query);
                if (!data || data.length === 0) {
                    setMovies([]);
                    return;
                }
                setMovies(data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const titleMovie = e.target.query.value.trim();

        if (!titleMovie) {
            return alert("Please enter a search term.");
        }

        setSearchParams({ query: titleMovie });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="query"
                    defaultValue={query}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search movie"
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {!loading && query && movies.length === 0 && <p>No movies found.</p>}
            {movies.length > 0 && <MovieList items={movies} />}
        </div>
    );
};

export default MoviesPage;
