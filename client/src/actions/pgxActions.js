import data from '../data/ReportSummaryData';
import axios from 'axios';
import input_variable from './variable';

const {specimen_id} = input_variable;


const listPgx = () => async(dispatch)=>{
    try {

        dispatch({type: "PGX_LIST_LOADING"});
        const {data} = await axios.get(`http://localhost:5002/pgx-result-record/${specimen_id}?version=1002`);
        console.log("axios pgx actions",{data})
        const {PGX_ID} = data;
        const pgxResults = PGX_ID || [{phenotype_name: "test"}]

        dispatch({type: "PGX_LIST_SUCCESS", payload: pgxResults});

    } catch (error) {
        dispatch({
            type: "PGX_LIST_ERROR",
            payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.messag
        })
    }
};

export default listPgx;