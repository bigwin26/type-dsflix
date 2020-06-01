import createRequestSaga, {
  createRequestActionTypes,
} from "lib/createRequestSaga";
import { movieApi } from "../lib/api";
import { Movie } from "lib/types";
import { takeLatest, put } from "redux-saga/effects";

const INIT = "movie/INIT" as const;
const [
  GET_NOWPLAYING,
  GET_NOWPLAYING_SUCCESS,
  GET_NOWPLAYING_FAILURE,
] = createRequestActionTypes("movie/GET_NOWPLAYING" as const);
const [
  GET_POPULAR,
  GET_POPULAR_SUCCESS,
  GET_POPULAR_FAILURE,
] = createRequestActionTypes("movie/GET_POPULAR" as const);
const [
  GET_UPCOMING,
  GET_UPCOMING_SUCCESS,
  GET_UPCOMING_FAILURE,
] = createRequestActionTypes("movie/GET_UPCOMING" as const);

export const getNowPlaying = () => ({
  type: GET_NOWPLAYING,
});
export const getPopular = () => ({
  type: GET_POPULAR,
});
export const getUpcoming = () => ({
  type: GET_UPCOMING,
});
export const init = () => ({
  type: INIT,
});

const nowPlayingSaga = createRequestSaga(GET_NOWPLAYING, movieApi.nowPlaying);
const popularSaga = createRequestSaga(GET_POPULAR, movieApi.popular);
const upcomingSaga = createRequestSaga(GET_UPCOMING, movieApi.upcoming);

function* initialAction() {
  yield put(getNowPlaying());
  yield put(getPopular());
  yield put(getUpcoming());
}

export function* movieSaga() {
  yield takeLatest(INIT, initialAction);
  yield takeLatest(GET_NOWPLAYING, nowPlayingSaga);
  yield takeLatest(GET_POPULAR, popularSaga);
  yield takeLatest(GET_UPCOMING, upcomingSaga);
}

type MovieAction =
  | ReturnType<typeof getNowPlaying>
  | ReturnType<typeof getPopular>
  | ReturnType<typeof getUpcoming>
  | ReturnType<typeof Object>;

type MovieState = {
  nowPlaying: Array<Movie> | null;
  popular: Array<Movie> | null;
  upComing: Array<Movie> | null;
  error: string | null;
};

const initialState: MovieState = {
  nowPlaying: null,
  popular: null,
  upComing: null,
  error: null,
};

function movie(state: MovieState = initialState, action: MovieAction) {
  switch (action.type) {
    case GET_NOWPLAYING_SUCCESS:
      console.log("1", action);
      return { ...state, nowPlaying: action.payload.results };
    case GET_NOWPLAYING_FAILURE:
      console.log("2", action);
      return { ...state, error: action };
    case GET_POPULAR_SUCCESS:
      console.log("3", action);
      return { ...state, popular: action.payload.results };
    case GET_POPULAR_FAILURE:
      console.log("4", action);
      return { ...state, error: action };
    case GET_UPCOMING_SUCCESS:
      console.log("5", action);
      return { ...state, upComing: action.payload.results };
    case GET_UPCOMING_FAILURE:
      console.log("6", action);
      return { ...state, error: action };
    default:
      return state;
  }
}

export default movie;
