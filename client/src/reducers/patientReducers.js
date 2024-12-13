const patientReducer = (state={patientDetails: {}}, action) =>{
    switch(action.type){
        case "PATIENT_DETAILS_LOADING":
            return {loading: true, patientDetails: {loading:"true"}};
        case "PATIENT_DETAILS_SUCCESS":
            return {loading: false, patientDetails: action.payload};
        case "PATIENT_DETAILS_ERROR":
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export default patientReducer;