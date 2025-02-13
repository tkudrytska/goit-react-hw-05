import s from "./MovieDetailsPage.module.css"
import { useState, useEffect, useRef, Suspense } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom"
import { fetchDetails } from "../../api.js";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const backLinkHref = useRef(location.state ?? '/movies');

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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!movie || Object.keys(movie).length === 0) {
        return <p>Movie details not found</p>;
    }

    return (
        <main>
            {loading && <p>Loading...</p>}
            <Link to={backLinkHref.current}>Go back</Link>
            <section className={s.info}>
                <img className={s.img} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} />
                <div>
                    <h2>{movie.original_title}</h2>
                    <p>User score: {movie.vote_average}</p>
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                    <h3>Genres</h3>
                    <p>{movie.genres?.map((genre) => genre.name).join(", ") || "No genres available"}</p>
                </div>
            </section>
            <section className={s.container}>
                <h2>Additional information</h2>
                <Link to="cast">Cast</Link>
                <Link to="reviews">Reviews</Link>
            </section>
            <Suspense>
                <Outlet />
            </Suspense>
        </main>
    )
}

export default MovieDetailsPage