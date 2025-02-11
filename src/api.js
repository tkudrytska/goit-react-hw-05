import axios from "axios";

const API_KEY = "770730697e7001aa957650370ea438ec";
const BASE_URL = "https://api.themoviedb.org/3";

const defaultParams = {
    api_key: API_KEY,
    language: "en-US",
};

const headers = {
    Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzA3MzA2OTdlNzAwMWFhOTU3NjUwMzcwZWE0MzhlYyIsIm5iZiI6MTczOTE0Njk5OC4xOTIsInN1YiI6IjY3YTk0NmY2MmZiYWM0MGI5MDkzNjc3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nszN4E38IkFTl1NJKf5JsyFiubCbgGbtj0dGnue3LGk',
    accept: 'application/json',
};

export const fetchTrendingMovies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
            params: defaultParams,
            headers: headers,
        });
        return response.data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};

export const fetchDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
            params: defaultParams,
            headers: headers,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};
