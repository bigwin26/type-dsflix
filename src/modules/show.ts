import createRequestSaga, {
  createRequestActionTypes,
  createInitRequestSaga,
} from "lib/createRequestSaga";
import { tvApi } from "../lib/api";
import { TV, Season } from "lib/types";
import { takeLatest } from "redux-saga/effects";

const INIT = "show/INIT" as const;
const INIT_FAILURE = "show/INIT_FAILURE" as const;
const [GET_TOPRATED, GET_TOPRATED_SUCCESS] = createRequestActionTypes(
  "show/GET_TOPRATED" as const,
);
const [GET_AIRINGTODAY, GET_AIRINGTODAY_SUCCESS] = createRequestActionTypes(
  "show/GET_AIRINGTODAY" as const,
);
const [GET_POPULAR, GET_POPULAR_SUCCESS] = createRequestActionTypes(
  "show/GET_POPULAR" as const,
);
const [
  GET_SEASON,
  GET_SEASON_SUCCESS,
  GET_SEASON_FAILURE,
] = createRequestActionTypes("show/GET_SEASON" as const);

export const init = () => ({
  type: INIT,
});

export const getSeason = (id: number, number: number) => ({
  type: GET_SEASON,
  payload: { id, number },
});

const initSaga = createInitRequestSaga(
  INIT,
  GET_TOPRATED,
  GET_AIRINGTODAY,
  GET_POPULAR,
  tvApi.topRated,
  tvApi.airingToday,
  tvApi.popular,
);

const seasonSaga = createRequestSaga(GET_SEASON, tvApi.season);

export function* showSaga() {
  yield takeLatest(INIT, initSaga);
  yield takeLatest(GET_SEASON, seasonSaga);
}

type ShowAction = ReturnType<typeof Object>;

type ShowState = {
  topRated: Array<TV> | null;
  airingToday: Array<TV> | null;
  popular: Array<TV> | null;
  season: Season | null;
  showError: boolean;
};

const initialState: ShowState = {
  topRated: null,
  airingToday: null,
  popular: null,
  season: null,
  showError: false,
};

function show(state: ShowState = initialState, action: ShowAction) {
  switch (action.type) {
    case GET_TOPRATED_SUCCESS:
      return { ...state, topRated: action.payload.results };
    case GET_AIRINGTODAY_SUCCESS:
      return { ...state, airingToday: action.payload.results };
    case GET_POPULAR_SUCCESS:
      return { ...state, popular: action.payload.results };
    case GET_SEASON_SUCCESS:
      return { ...state, season: action.payload };
    case GET_SEASON_FAILURE:
      return { ...state, showError: action.error };
    case INIT_FAILURE:
      return { ...state, showError: action.error };
    default:
      return state;
  }
}

export default show;
