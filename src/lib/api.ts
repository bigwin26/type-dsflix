import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: { api_key: "248a52d680518fd97f6e7be12c21157d", language: "ko" },
});

//language: "en-US"

export const movieApi = {
  nowPlaying: (page?:number) => api.get("movie/now_playing",{params:{page}}),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: async (id: number) => {
    return await api.get(`movie/${id}`, {
      params: { append_to_response: "videos" },
    });
  },
  search: async (term: string) => {
    return await api.get("search/movie", {
      params: { query: encodeURIComponent(term) },
    });
  },
  credits: (movie_id:number) => api.get(`/movie/${movie_id}/credits`),
  similar: (movie_id:number) => api.get(`/movie/${movie_id}/similar`),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  tvDetail: (id: number) =>
    api.get(`tv/${id}`, { params: { append_to_response: "videos" } }),
  search: async (term: string) => {
    return await api.get("search/tv", {
      params: { query: encodeURIComponent(term) },
    });
  },
};
