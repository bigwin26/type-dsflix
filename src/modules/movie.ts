const GET_RESULT = "detail/GET_RESULT" as const;
const GET_CAST = "detail/GET_CAST" as const;
const GET_SIMILAR = "detail/GET_SIMILAR" as const;

export const getResult = (result: object) => ({
  type: GET_RESULT,
  payload: result,
});
export const getCast = (result: object) => ({
  type: GET_CAST,
  payload: result,
});
export const getSimilar = (result: object) => ({
  type: GET_SIMILAR,
  payload: result,
});

type CounterAction =
  | ReturnType<typeof getResult>
  | ReturnType<typeof getCast>
  | ReturnType<typeof getSimilar>;

type Result = {
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
  seasons: Array<{ id: number; poster_path: string; name: string }>;
  videos: {
    results: Array<{ key: string; src: string; title: string; name: string }>;
  };
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
  }>;
};

type DetailState = {
  result: Result | null;
  similar: Array<Result> | null;
  cast: Array<any> | null;
};

const initialState: DetailState = {
  result: null,
  cast: null,
  similar: null,
};

function detail(state: DetailState = initialState, action: CounterAction) {
  switch (action.type) {
    case GET_RESULT:
      return { ...state, result: action.payload };
    case GET_CAST:
      return { ...state, cast: action.payload };
    case GET_SIMILAR:
      return { ...state, similar: action.payload };
    default:
      return state;
  }
}

export default detail;
