import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import detail from "./detail";

const rootReducer = combineReducers({ detail });

export function* rootSaga(){
    yield all([]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
