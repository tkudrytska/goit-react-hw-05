import s from "./MovieDetailsPage.module.css"
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom"
import { fetchDetails } from "../../api.js";

const MovieDetailsPage = ({key}) => {
    const { id } = useParams();
    const location = useLocation();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchMovie = async () => {
            if (id) {
                try {
                    setLoading(true);
                    const data = await fetchDetails(id);
                    setMovie(data);
                } catch (error) {
                    console.error("Error fetching movie details:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchMovie();
    }, [id]);

    const backLinkHref = location.state ?? '/movies';

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!movie) {
        return <p>Movie details not found</p>;

    return (
        <main>
            {loading && <p>Loading...</p>}
            <Link to={backLinkHref}>Back to products</Link>
            <section>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie.original_title" />
                <div>
                    <h2>{movie.original_title}</h2>
                    <p>{movie.vote_average}</p>
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                    <h3>Genres</h3>
                    <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
                </div>
            </section>
            <section>
                <Link></Link>
                <Link></Link>
            </section>
        </main>
    )
}

export default MovieDetailsPage