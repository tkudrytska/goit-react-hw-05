import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css";
import { useEffect, useState } from "react";
import { fetchCast } from "../../api";

const MovieCast = () => {
    const { id } = useParams();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
            const fetchNewCast = async () => {
                if (id) {
                    try {
                        setLoading(true);
                        const data = await fetchCast(id);
                        if (!data) {
                            return;
                        }
                        setCast(data.cast);
                    } catch (error) {
                        console.error("Error fetching movie details:", error);
                    } finally {
                        setLoading(false);
                    }
                }
            };
            fetchNewCast();
        }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!cast) {
        return <p>No information about the cast</p>;
    }

    return (
        <div>
            {cast.map((actor) => (
                <div key={actor.id}>
                    <img className={s.img} src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} />
                    <p>{actor.name}</p>
                    <p>Character: {actor.character}</p>
                </div>
            ))}
        </div>
    )
}

export default MovieCast