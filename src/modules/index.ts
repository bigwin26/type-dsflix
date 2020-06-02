import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import detail, { detailSaga } from "./detail";
import movie, { movieSaga } from "./movie";
import show, { showSaga } from "./show";
import actor, { actorSaga } from "./actor";
import loading from "./loading";

const rootReducer = combineReducers({ detail, movie, show, actor, loading });

export function* rootSaga() {
  yield all([
    fork(movieSaga),
    fork(detailSaga),
    fork(showSaga),
    fork(actorSaga),
  ]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
