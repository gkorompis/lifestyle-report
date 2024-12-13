import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import variableInput from '../actions/variableActions';
import {Button, Form} from 'react-bootstrap';
import axios from 'axios';

const WebFormSubmit = () =>{

    const dispatch = useDispatch();
    
    const state_content = useSelector(state => state.variable);
    const {loading,error, input_variable} = state_content
    console.log({state_content});
    const [inputVariable, setInputVariable] = useState(input_variable);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const specimen_id_input = event.target[0].value
        console.log(specimen_id_input)
        const setNow = await setInputVariable({specimen_id: specimen_id_input, language: '1002'});
        alert(`specimend id ${specimen_id_input} has been recorded. Proceed to report!`);
        event.target.reset();
  }

  

  const variableInput = () => async(dispatch)=>{
    try { 
        dispatch({type: "INPUT_VARIABLE_LOADING"});
        const input_payload = await inputVariable;
        dispatch({type: "INPUT_VARIABLE_SUCCESS", payload: input_payload});
    } catch (error) {
        dispatch({
            type: "INPUT_VARIABLE_ERROR",
            payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.messag
        })
    }
};

useEffect(()=>{
    dispatch(variableInput())
}, [dispatch, inputVariable]);

    const style_form = {
        width: "100%",
        backgroundColor: ""
    }
    const style_children = {
        backgroundColor: "",
        color: "#2C3333",
        width: "8cm",
        marginTop: "1cm"
    }
    const style_submit = {backgroundColor: "#8D7B68", color: "#CBE4DE"}
    return (
        <Form onSubmit={handleSubmit} style={style_form}>
        <Form.Group className="mb-3" controlId="" style={style_children}>
            <Form.Label style={style_children}>specimen_id</Form.Label>
            <Form.Control type="text" placeholder="Enter specimen id to return"  />
        </Form.Group>
        <Button variant="" type="submit" style={style_submit}>
            Submit
        </Button>
        </Form>
    
  );
}

export default WebFormSubmit;