import { Detail } from "lib/types";
import createRequestSaga, {
  createRequestActionTypes,
} from "lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import { movieApi, tvApi } from "../lib/api";

const [
  GET_MOVIE_DETAIL,
  GET_MOVIE_DETAIL_SUCCESS,
  GET_MOVIE_DETAIL_FAILURE,
] = createRequestActionTypes("detail/GET_MOVIE_DETAIL" as const);

const [
  GET_SHOW_DETAIL,
  GET_SHOW_DETAIL_SUCCESS,
  GET_SHOW_DETAIL_FAILURE,
] = createRequestActionTypes("detail/GET_SHOW_DETAIL" as const);

const [GET_CAST, GET_CAST_SUCCESS, GET_CAST_FAILURE] = createRequestActionTypes(
  "detail/GET_CAST" as const,
);
const [
  GET_SIMILAR,
  GET_SIMILAR_SUCCESS,
  GET_SIMILAR_FAILURE,
] = createRequestActionTypes("detail/GET_SIMILAR" as const);
const CLEAN_UP = "detail/CLEAN_UP" as const;

export const getMovieDetail = (id: any) => ({
  type: GET_MOVIE_DETAIL,
  payload: id,
});
export const getShowDetail = (id: number) => ({
  type: GET_SHOW_DETAIL,
  payload: id,
});
export const getCast = (id: number) => ({
  type: GET_CAST,
  payload: id,
});
export const getSimilar = (id: number) => ({
  type: GET_SIMILAR,
  payload: id,
});
export const cleanUp = () => ({
  type: CLEAN_UP,
});

const movieDetailSaga = createRequestSaga(
  GET_MOVIE_DETAIL,
  movieApi.movieDetail,
);
const showDetailSaga = createRequestSaga(GET_SHOW_DETAIL, tvApi.tvDetail);
const castSaga = createRequestSaga(GET_CAST, movieApi.credits);
const similarSaga = createRequestSaga(GET_SIMILAR, movieApi.similar);

export function* detailSaga() {
  yield takeLatest(GET_MOVIE_DETAIL, movieDetailSaga);
  yield takeLatest(GET_SHOW_DETAIL, showDetailSaga);
  yield takeLatest(GET_CAST, castSaga);
  yield takeLatest(GET_SIMILAR, similarSaga);
}

type DetailAction = ReturnType<typeof getMovieDetail>;

type DetailState = {
  result: Detail | null;
  similar: Array<Detail> | null;
  cast: Array<any> | null;
  error: string;
};

const initialState: DetailState = {
  result: null,
  cast: null,
  similar: null,
  error: "",
};

function detail(state: DetailState = initialState, action: DetailAction) {
  switch (action.type) {
    case GET_MOVIE_DETAIL_SUCCESS:
      return { ...state, result: action.payload };
    case GET_MOVIE_DETAIL_FAILURE:
      return { ...state, error: action.payload };
    case GET_SHOW_DETAIL_SUCCESS:
      return { ...state, result: action.payload };
    case GET_SHOW_DETAIL_FAILURE:
      return { ...state, error: action.payload };
    case GET_CAST_SUCCESS:
      console.log("cast", action.payload);
      return { ...state, cast: action.payload.cast };
    case GET_CAST_FAILURE:
      return { ...state, error: action.payload };
    case GET_SIMILAR_SUCCESS:
      return { ...state, similar: action.payload };
    case GET_SIMILAR_FAILURE:
      return { ...state, error: action.payload };
    case CLEAN_UP:
      return initialState;
    default:
      return state;
  }
}

export default detail;
