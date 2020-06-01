import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import detail, { detailSaga } from "./detail";
import movie, { movieSaga } from "./movie";

const rootReducer = combineReducers({ detail, movie });

export function* rootSaga() {
  yield all([movieSaga(), detailSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
