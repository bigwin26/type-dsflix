import { takeLatest } from "redux-saga/effects";

const MODAL_STATE = "modal/MODAL_STATE";
const CHECK = "modal/CHECK";

export const modalState = (state: boolean) => ({ type: MODAL_STATE, state });
export const languageCheck = (language: string) => ({ type: CHECK, language });

function languageSaga(action: any) {
  try {
    const language = action.language;
    if (language === "ko" || language === "en-US") {
      return;
    } else {
      localStorage.setItem("language", "ko");
    }
  } catch (error) {
    console.log(error);
  }
}

export function* modalSaga() {
  yield takeLatest(CHECK, languageSaga);
}

type ModalAction = ReturnType<typeof Object>;

const initialState = {
  modal_state: false,
};

//reducer
const modal = (state = initialState, action: ModalAction) => {
  switch (action.type) {
    case MODAL_STATE:
      return {
        ...state,
        modal_state: action.state,
      };
    default:
      return state;
  }
};

export default modal;
