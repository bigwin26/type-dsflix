export type Detail = {
    id: number;
    title: string;
    name: string;
    backdrop_path: string;
    poster_path: string;
    homepage: string;
    release_date: string;
    first_air_date: string;
    runtime: number;
    episode_run_time: Array<number>;
    genres: Array<{ name: string }>;
    imdb_id: number;
    overview: string;
    vote_average: number;
    vote_count: number;
    created_by: Array<{ id: number; profile_path: string; name: string }>;
    belongs_to_collection: { id: number; poster_path: string; name: string };
    seasons: Array<{ id: number; poster_path: string; name: string, season_number:number }>;
    videos: {
      results: Array<{ key: string; src: string; title: string; name: string }>;
    };
    production_companies: Array<{
      id: number;
      logo_path: string;
      name: string;
    }>;
  };

export type Movie = {
    id: number;
    title: string;
    poster_path: string;
    vote_average?: number;
    release_date: string;
  }

export type TV = {
    id: number;
    poster_path: string;
    name: string;
    vote_average?: number;
    first_air_date: string;
}

export type Episode = {
  episode_number:number,
  id:number,
  name:string,
  overview:string,
  still_path:string,
  vote_average:number,
  air_date:string,
}

export type Season = {
  episodes:Array<Episode>,
  name:string,
  poster_path:string,
}

export type Actor = {
  birthday:string,
  name:string,
  popularity:number,
  place_of_birth:string,
  profile_path:string,
}