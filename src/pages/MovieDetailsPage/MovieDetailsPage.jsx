import s from "./MovieDetailsPage.module.css"
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom"
import { fetchDetails } from "../../api.js";

const MovieDetailsPage = () => {
    const { id } = useParams();

console.log(fetchDetails(id).then(data => console.log(data)));

    const location = useLocation();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchMovie = async () => {
            if (id) {
                try {
                    setLoading(true);
                    const data = await fetchDetails(id);
                    if (!data) {
                        return;
                    }
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

    console.log(movie);
    

    if (!movie) {
        return <p>Movie details not found</p>;
    }

    return (
        <main>
            {loading && <p>Loading...</p>}
            <Link to={backLinkHref}>Back to products</Link>
            <section>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie.original_title" />
                <div>
                    <h2>{movie.original_title}</h2>
                    <p>User score: {movie.vote_average}</p>
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                    <h3>Genres</h3>
                    <p>{movie.genres?.map((genre) => genre.name).join(", ") || "No genres available"}</p>
                </div>
            </section>
            <section>
                <Link></Link>
                <Link></Link>
            </section>
                <Outlet/>
        </main>
    )
}

export default MovieDetailsPage