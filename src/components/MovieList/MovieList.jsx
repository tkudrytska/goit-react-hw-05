import { Link, useLocation } from "react-router-dom"
import s from "./MovieList.module.css"

const MovieList = ({ items }) => {
    const location = useLocation();
    return (
        <div className={s.container}>
            {items.map(({ id, title }) => (
                <Link key={id} to={`/movies/${id}`} state={location}>{title}</Link>
            ))}
        </div>
    )
}

export default MovieList