import {
  createRequestActionTypes,
  createInitRequestSaga,
} from "lib/createRequestSaga";
import { actorApi } from "../lib/api";
import { Actor, Movie, TV } from "lib/types";
import { takeLatest } from "redux-saga/effects";

const INIT = "actor/INIT" as const;
const INIT_FAILURE = "actor/INIT_FAILURE" as const;

const [GET_ACTOR, GET_ACTOR_SUCCESS] = createRequestActionTypes(
  "actor/GET_ACTOR" as const,
);
const [GET_MOVIE_CREDIT, GET_MOVIE_CREDIT_SUCCESS] = createRequestActionTypes(
  "actor/GET_MOVIE_CREDIT" as const,
);
const [GET_SHOW_CREDIT, GET_SHOW_CREDIT_SUCCESS] = createRequestActionTypes(
  "actor/GET_SHOW_CREDIT" as const,
);

export const init = (id: number) => ({
  type: INIT,
  payload: id,
});

const initSaga = createInitRequestSaga(
  INIT,
  GET_ACTOR,
  GET_MOVIE_CREDIT,
  GET_SHOW_CREDIT,
  actorApi.actor,
  actorApi.movie_credits,
  actorApi.tv_credits,
);

export function* actorSaga() {
  yield takeLatest(INIT, initSaga);
}

type ActorAction = ReturnType<typeof Object>;

type ActorState = {
  actor: Actor | null;
  movies: Array<Movie> | null;
  shows: Array<TV> | null;
  actorError: boolean;
};

const initialState: ActorState = {
  actor: null,
  movies: null,
  shows: null,
  actorError: false,
};

function actor(state: ActorState = initialState, action: ActorAction) {
  switch (action.type) {
    case GET_ACTOR_SUCCESS:
      return { ...state, actor: action.payload };
    case GET_MOVIE_CREDIT_SUCCESS:
      return { ...state, movies: action.payload.cast };
    case GET_SHOW_CREDIT_SUCCESS:
      return { ...state, shows: action.payload.cast };
    case INIT_FAILURE:
      return { ...state, actorError: action.error };
    default:
      return state;
  }
}

export default actor;
