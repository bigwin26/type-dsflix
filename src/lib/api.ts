import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: { api_key: "248a52d680518fd97f6e7be12c21157d", language: "ko" },
});

//language: "en-US"

export const movieApi = {
  nowPlaying: (page?: number) =>
    api.get("movie/now_playing", { params: { page } }),
  upcoming: (page?: number) => api.get("movie/upcoming", { params: { page } }),
  popular: (page?: number) => api.get("movie/popular", { params: { page } }),
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
  credits: (movie_id: number) => api.get(`/movie/${movie_id}/credits`),
  similar: (movie_id: number) => api.get(`/movie/${movie_id}/similar`),
};

export const tvApi = {
  topRated: (page?: number) => api.get("tv/top_rated", { params: { page } }),
  popular: (page?: number) => api.get("tv/popular", { params: { page } }),
  airingToday: (page?: number) =>
    api.get("tv/airing_today", { params: { page } }),
  tvDetail: (id: number) =>
    api.get(`tv/${id}`, { params: { append_to_response: "videos" } }),
  search: async (term: string) => {
    return await api.get("search/tv", {
      params: { query: encodeURIComponent(term) },
    });
  },
  season: (tv_id: number, season_number: number) =>
    api.get(`/tv/${tv_id}/season/${season_number}`),
  credits: (tv_id: number) => api.get(`/tv/${tv_id}/credits`),
  similar: (tv_id: number) => api.get(`/tv/${tv_id}/similar`),
};

export const actorApi = {
  actor: (actor_id: number) => api.get(`/person/${actor_id}`),
  movie_credits: (actor_id: number) =>
    api.get(`/person/${actor_id}/movie_credits`),
  tv_credits: (actor_id: number) => api.get(`/person/${actor_id}/tv_credits`),
};
