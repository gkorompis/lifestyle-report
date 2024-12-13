import data from '../data/ReportSummaryData';
import axios from 'axios'
import input_variable from './variable';
import store from '../store/store';


// const {input_variable}= store.getState().variable;
const {specimen_id} = input_variable;
console.log('specimen_id', specimen_id)

const detailPatient = () => async(dispatch)=>{
    try { 
        dispatch({type: "PATIENT_DETAILS_LOADING"});
        const {data} = await axios.get(`http://localhost:5002/lifestyle-administration/${specimen_id}`);
        console.log("patient details axios",{data})
        const {Item} = data;
        console.log('axios item', Item)
        dispatch({type: "PATIENT_DETAILS_SUCCESS", payload: Item});
    } catch (error) {
        dispatch({
            type: "PATIENT_DETAILS_ERROR",
            payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.messag
        })
    }
};

export default detailPatient;