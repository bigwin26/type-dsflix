const START_LOADING = "loading/START_LOADING" as const;
const FINISH_LOADING = "loading/FINISH_LOADING" as const;

export const startLoading = () => ({
  type: START_LOADING,
});
export const finishLoading = () => ({
  type: FINISH_LOADING,
});

type LoadAction =
  | ReturnType<typeof startLoading>
  | ReturnType<typeof finishLoading>;

const initialState = {
  loading: false,
};

function loading(state = initialState, action: LoadAction) {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };
    case FINISH_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
}

export default loading;
