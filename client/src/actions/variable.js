import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import variableInput from './variableActions';

// const input_variable = useSelector(state=>state.variable)
const input_variable = {
    specimen_id: '1007',
    language: '1001'
}
//1001 bahasa inggris (english)
//1002 bahasa indonesia (indonesian)
export default input_variable;