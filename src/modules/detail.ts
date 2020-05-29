import { createRequestActionTypes } from "lib/createRequestSaga";
import { Detail } from "lib/types";

const [GET_RESULT,SUCCES_GET_RESULT,FAILURE_GET_RESULT] = createRequestActionTypes("detail/GET_RESULT" as const);
const GET_CAST = "detail/GET_CAST" as const;
const GET_SIMILAR = "detail/GET_SIMILAR" as const;
const CLEAN_UP = "detail/CLEAN_UP" as const;

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
export const cleanUp = () => ({
  type:CLEAN_UP,
});

type CounterAction =
  | ReturnType<typeof getResult>
  | ReturnType<typeof getCast>
  | ReturnType<typeof getSimilar>;

type DetailState = {
  result: Detail | null;
  similar: Array<Detail> | null;
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
    case CLEAN_UP:
      return initialState;
    default:
      return state;
  }
}

export default detail;
