import React from 'react';
import axios from 'axios'
// import { useSelector } from 'react-redux';
import store from '../store/store';
// import health_result from '../assets/Dummy';
import input_variable from './variable'; 
import {
    RESULT_LIST_REQUEST,
    RESULT_LIST_SUCCESS,
    RESULT_LIST_FAIL
} from '../constants/resultConstant'



export const listResult = () => async (dispatch) => {
    // const {input_variable} = useSelector(state => state.variable);
    // console.log('result actions selector', input_variable);
    // const {specimen_id} = input_variable;
    // const {input_variable}= store.getState().variable;
    const {specimen_id, language} = input_variable;
    // console.log({fromStore})
    // console.log({fromStore});
    try {
        console.log('list requestttt')
        dispatch({type: RESULT_LIST_REQUEST});

    const {data} = await axios.get(`http://localhost:5002/lifestyle-result-record/${specimen_id}?version=${language}`);
    // console.log(spec)
    // const {data} = await axios.get('http://localhost:5000/result-trial');
        // const data = health_result;
        // console.log(data, 'getResultActions')
        dispatch({
            type: RESULT_LIST_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: RESULT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    };
};


