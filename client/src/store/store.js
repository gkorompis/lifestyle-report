import {configureStore} from '@reduxjs/toolkit';
import { resultListReducer } from '../reducers/resultReducers';
import pgxListReducer from '../reducers/pgxReducers';
import patientReducer from '../reducers/patientReducers';
import variableReducer from '../reducers/variableReducers';
import thunk from 'redux-thunk';



const store = configureStore({
    reducer: {
        resultList: resultListReducer,
        pgxList: pgxListReducer,
        patient: patientReducer,
        variable: variableReducer
    },
    middleware: [thunk],

});

export default store;