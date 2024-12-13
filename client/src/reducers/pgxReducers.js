const pgxListReducer = (state={pgxResults: []}, action) =>{
    switch(action.type){
        case "PGX_LIST_LOADING":
            return {loading: true, pgxResults: []};
        case "PGX_LIST_SUCCESS":
            return {loading: false, pgxResults: action.payload};
        case "PGX_LIST_ERROR":
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export default pgxListReducer;