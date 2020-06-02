import { put, call } from "redux-saga/effects";
import { startLoading, finishLoading } from "modules/loading";

export const createRequestActionTypes = (type: string) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type: string, request: any) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return function* (action: any) {
    yield put(startLoading(type));
    try {
      const response = yield call(
        request,
        action.payload.id,
        action.payload.number,
      );
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
    yield put(finishLoading(type));
  };
}

export function createInitRequestSaga(
  type: string,
  type1: string,
  type2: string,
  type3: string,
  request: any,
  request2: any,
  request3: any,
) {
  const SUCCESS = `${type1}_SUCCESS`;
  const SUCCESS2 = `${type2}_SUCCESS`;
  const SUCCESS3 = `${type3}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return function* (action: any) {
    yield put(startLoading(type));
    try {
      const response = yield call(request, action.payload);
      const response2 = yield call(request2, action.payload);
      const response3 = yield call(request3, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
      yield put({
        type: SUCCESS2,
        payload: response2.data,
      });
      yield put({
        type: SUCCESS3,
        payload: response3.data,
      });
    } catch (error) {
      yield put({
        type: FAILURE,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
