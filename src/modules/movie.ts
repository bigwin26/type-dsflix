import {
  createRequestActionTypes,
  createInitRequestSaga,
} from "lib/createRequestSaga";
import { movieApi } from "../lib/api";
import { Movie } from "lib/types";
import { takeLatest } from "redux-saga/effects";

const INIT = "movie/INIT" as const;
const INIT_FAILURE = "movie/INIT_FAILURE" as const;
const [GET_NOWPLAYING, GET_NOWPLAYING_SUCCESS] = createRequestActionTypes(
  "movie/GET_NOWPLAYING" as const,
);
const [GET_POPULAR, GET_POPULAR_SUCCESS] = createRequestActionTypes(
  "movie/GET_POPULAR" as const,
);
const [GET_UPCOMING, GET_UPCOMING_SUCCESS] = createRequestActionTypes(
  "movie/GET_UPCOMING" as const,
);

const CLEAN_UP = "movie/CLEAN_UP" as const;

export const init = () => ({
  type: INIT,
});
export const cleanUp = () => ({
  type: CLEAN_UP,
});

const initSaga = createInitRequestSaga(
  INIT,
  GET_NOWPLAYING,
  GET_POPULAR,
  GET_UPCOMING,
  movieApi.nowPlaying,
  movieApi.popular,
  movieApi.upcoming,
);

export function* movieSaga() {
  yield takeLatest(INIT, initSaga);
}

type MovieAction = ReturnType<typeof Object>;

type MovieState = {
  nowPlaying: Array<Movie> | null;
  popular: Array<Movie> | null;
  upComing: Array<Movie> | null;
  movieError: boolean;
};

const initialState: MovieState = {
  nowPlaying: null,
  popular: null,
  upComing: null,
  movieError: false,
};

function movie(state: MovieState = initialState, action: MovieAction) {
  switch (action.type) {
    case GET_NOWPLAYING_SUCCESS:
      return { ...state, nowPlaying: action.payload.results };
    case GET_POPULAR_SUCCESS:
      return { ...state, popular: action.payload.results };
    case GET_UPCOMING_SUCCESS:
      return { ...state, upComing: action.payload.results };
    case INIT_FAILURE:
      return { ...state, movieError: action.error };
    case CLEAN_UP:
      return initialState;
    default:
      return state;
  }
}

export default movie;
