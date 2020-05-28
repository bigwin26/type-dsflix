const START_LOADING = 'loading/START_LOADING' as const;
const FINISH_LOADING = 'loading/FINISH_LOADING' as const;

export const startLoading = (requestType:any) => ({
  type: START_LOADING,
  payload:requestType,
});
export const finishLoading = (requestType:any) => ({
    type: FINISH_LOADING,
    payload:requestType,
  });

type CounterAction =
  | ReturnType<typeof startLoading>
  | ReturnType<typeof finishLoading>;

const initialState = {
};

function detail(state = initialState, action: CounterAction) {
  switch (action.type) {
    case START_LOADING:
      return { ...state, [action.payload]:true };
    case FINISH_LOADING:
      return { ...state, [action.payload]:false  };
    default:
      return state;
  }
}

export default detail;
