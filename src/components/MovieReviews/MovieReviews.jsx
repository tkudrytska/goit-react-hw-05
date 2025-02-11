import s from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchReviews } from "../../api";

const MovieReviews = () => {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchNewReviews = async () => {
            if (id) {
                try {
                    setLoading(true);
                    const data = await fetchReviews(id);
                    if (!data) {
                        return;
                    }
                    setReviews(data.results);
                } catch (error) {
                    console.error("Error fetching movie details:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchNewReviews();
    }, [id]);
    
    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (!reviews) {
        return <p>This movie has no reviews</p>;
    }
    
    return (
        <div>
            {reviews.length > 0 ? reviews.map((item) => (
                <div key={item.id}>
                    <p>Author: {item.author}</p>
                    <p>{item.content}</p>
                </div>
            )) : <p>This movie has no reviews</p>}
        </div>
    )
}

export default MovieReviews