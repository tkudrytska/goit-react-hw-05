import axios from "axios";

const API_KEY = "770730697e7001aa957650370ea438ec";
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
    params: {
        api_key: API_KEY,
        language: "en-US",
    },
    headers: {
        Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzA3MzA2OTdlNzAwMWFhOTU3NjUwMzcwZWE0MzhlYyIsIm5iZiI6MTczOTE0Njk5OC4xOTIsInN1YiI6IjY3YTk0NmY2MmZiYWM0MGI5MDkzNjc3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nszN4E38IkFTl1NJKf5JsyFiubCbgGbtj0dGnue3LGk",
        Accept: "application/json",
    },
};

export const fetchTrendingMovies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        throw error;
    }
};

export const fetchDetails = async (id) => {
    if (!id) {
        console.error("Error: No movie ID provided");
        return null;
    }

    try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, options);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error.response?.data || error.message);
        return null;
    }
};
