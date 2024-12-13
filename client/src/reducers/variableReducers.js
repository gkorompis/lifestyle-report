const variableReducer = (state={input_variable: {specimen_id: "", language: ""}}, action) =>{
    switch(action.type){
        case "INPUT_VARIABLE_LOADING":
            return {loading: true, input_variable: {}};
        case "INPUT_VARIABLE_SUCCESS":
            return {loading: false, input_variable: action.payload};
        case "INPUT_VARIABLE_ERROR":
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export default variableReducer;