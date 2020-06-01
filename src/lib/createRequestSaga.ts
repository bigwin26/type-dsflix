import { put, call } from "redux-saga/effects";

export const createRequestActionTypes = (type: string) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type: string, request: any) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return function* (action: any) {
    //yield put(startLoading(type));
    try {
      console.log("action", action);
      const response = yield call(request, action.payload);
      console.log("response", response);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      yield put({
        type: FAILURE,
        payload: error,
        error: true,
      });
    }
    //yield put(finishLoading(type));
  };
}
