const START_LOADING = "loading/START_LOADING" as const;
const FINISH_LOADING = "loading/FINISH_LOADING" as const;

export const startLoading = (requestType: string) => ({
  type: START_LOADING,
  payload: requestType,
});
export const finishLoading = (requestType: string) => ({
  type: FINISH_LOADING,
  payload: requestType,
});

type LoadAction =
  | ReturnType<typeof startLoading>
  | ReturnType<typeof finishLoading>;

const initialState = {};

function loading(state: any = initialState, action: LoadAction) {
  switch (action.type) {
    case START_LOADING:
      return { ...state, [action.payload]: true };
    case FINISH_LOADING:
      return { ...state, [action.payload]: false };
    default:
      return state;
  }
}

export default loading;
