export const createRequestActionTypes = (type:object) =>{
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type,SUCCESS,FAILURE]
}