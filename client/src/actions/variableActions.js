import data from '../data/ReportSummaryData';
import axios from 'axios'
import input_variable from './variable';

// const {specimen_id} = input_variable;

const variableInput = () => async(dispatch)=>{
    try { 
        dispatch({type: "INPUT_VARIABLE_LOADING"});
        input_variable["specimen_id"] = "1007";
        input_variable["language"] = "1001"; 
        dispatch({type: "INPUT_VARIABLE_SUCCESS", payload: input_variable});
    } catch (error) {
        dispatch({
            type: "INPUT_VARIABLE_ERROR",
            payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.messag
        })
    }
};

export default variableInput;