import { Detail } from "lib/types";
import {
  createRequestActionTypes,
  createInitRequestSaga,
} from "lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import { movieApi, tvApi } from "../lib/api";

const MOVIE_DETAIL_INIT = "detail/MOVIE_DETAIL_INIT" as const;
const MOVIE_DETAIL_INIT_FAILURE = "detail/MOVIE_DETAIL_INIT_FAILURE" as const;
const SHOW_DETAIL_INIT = "detail/SHOW_DETAIL_INIT" as const;
const SHOW_DETAIL_INIT_FAILURE = "detail/SHOW_DETAIL_INIT_FAILURE" as const;

const [GET_MOVIE_DETAIL, GET_MOVIE_DETAIL_SUCCESS] = createRequestActionTypes(
  "detail/GET_MOVIE_DETAIL" as const,
);
const [GET_MOVIE_CAST, GET_MOVIE_CAST_SUCCESS] = createRequestActionTypes(
  "detail/GET_MOVIE_CAST" as const,
);
const [GET_MOVIE_SIMILAR, GET_MOVIE_SIMILAR_SUCCESS] = createRequestActionTypes(
  "detail/GET_MOVIE_SIMILAR" as const,
);

const [GET_SHOW_DETAIL, GET_SHOW_DETAIL_SUCCESS] = createRequestActionTypes(
  "detail/GET_SHOW_DETAIL" as const,
);
const [GET_SHOW_CAST, GET_SHOW_CAST_SUCCESS] = createRequestActionTypes(
  "detail/GET_SHOW_CAST" as const,
);
const [GET_SHOW_SIMILAR, GET_SHOW_SIMILAR_SUCCESS] = createRequestActionTypes(
  "detail/GET_SHOW_SIMILAR" as const,
);

const CLEAN_UP = "detail/CLEAN_UP" as const;

export const movieDetailInit = (id: number) => ({
  type: MOVIE_DETAIL_INIT,
  payload: id,
});
export const showDetailInit = (id: number) => ({
  type: SHOW_DETAIL_INIT,
  payload: id,
});
export const cleanUp = () => ({
  type: CLEAN_UP,
});

const movieDetailSaga = createInitRequestSaga(
  MOVIE_DETAIL_INIT,
  GET_MOVIE_DETAIL,
  GET_MOVIE_CAST,
  GET_MOVIE_SIMILAR,
  movieApi.movieDetail,
  movieApi.credits,
  movieApi.similar,
);
const showDetailSaga = createInitRequestSaga(
  SHOW_DETAIL_INIT,
  GET_SHOW_DETAIL,
  GET_SHOW_CAST,
  GET_SHOW_SIMILAR,
  tvApi.tvDetail,
  tvApi.credits,
  tvApi.similar,
);

export function* detailSaga() {
  yield takeLatest(MOVIE_DETAIL_INIT, movieDetailSaga);
  yield takeLatest(SHOW_DETAIL_INIT, showDetailSaga);
}

type DetailAction = ReturnType<typeof Object>;

type DetailState = {
  result: Detail | null;
  similar: Array<Detail> | null;
  cast: Array<any> | null;
  detailError: boolean;
};

const initialState: DetailState = {
  result: null,
  cast: null,
  similar: null,
  detailError: false,
};

function detail(state: DetailState = initialState, action: DetailAction) {
  switch (action.type) {
    case GET_MOVIE_DETAIL_SUCCESS:
      return { ...state, result: action.payload };
    case GET_MOVIE_CAST_SUCCESS:
      return { ...state, cast: action.payload.cast };
    case GET_MOVIE_SIMILAR_SUCCESS:
      return { ...state, similar: action.payload.results };
    case GET_SHOW_DETAIL_SUCCESS:
      return { ...state, result: action.payload };
    case GET_SHOW_CAST_SUCCESS:
      return { ...state, cast: action.payload.cast };
    case GET_SHOW_SIMILAR_SUCCESS:
      return { ...state, similar: action.payload.results };
    case MOVIE_DETAIL_INIT_FAILURE:
      return { ...state, detailError: action.error };
    case SHOW_DETAIL_INIT_FAILURE:
      return { ...state, detailError: action.error };
    case CLEAN_UP:
      return initialState;
    default:
      return state;
  }
}

export default detail;
