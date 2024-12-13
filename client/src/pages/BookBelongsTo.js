import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import detailPatient from "../actions/patientActions";
import {Card} from 'react-bootstrap';



const BookBelongsTo = () =>{
    
    const dispatch = useDispatch();
    const state_content = useSelector(state => state.patient);
    const {loading, error, patientDetails} = state_content;
    console.log("bookbelongsto",{patientDetails});

    const first_name = patientDetails ? patientDetails["first_name"]: 'first';
    const last_name = patientDetails ?  patientDetails["last_name"] : 'last';
    const dob = patientDetails ?  patientDetails["dob"] : 'dob';
    const gender = patientDetails ? patientDetails["gender"] : 'gender';
    const age = patientDetails ? patientDetails["age"] : 'age';
    const specimenid = patientDetails ? patientDetails["specimen_id"] : 'specimenid';


    useEffect(()=>{dispatch(detailPatient())}, [dispatch])

    return(
    
        <div className="FrontCover BookBelongsTo"> 
            
            <div className=" d-flex flex-row  align-items-center" style={{width: '100%', height: '10cm'}} >
                    {/* <Card bsStyle="pills" style={{ height: '6.5cm'}}>  */}
                    <div className="d-flex flex-column">
                        {/* <Card.Img variant="top" src="helix.png" style={{ width: '1.5cm', height: '1.5cm', marginInline: '20px', borderRadius: '5%'}} /> */}
                        <div style={{margin: '30px', padding: "15px", backgroundColor: "#2A4E77", width: "14cm", height:"8.89cm", color: "#E9E8E8"}}>
                        <Card.Body>
                        <Card.Title><h1>This book belongs to:</h1></Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">_______________________________________</Card.Subtitle>
                        <div style={{fontSize: "17px"}}>
                            <div className="d-flex flex-row">
                                <div style={{width: "5cm"}}>
                                <p style={{marginRight: "0px", borderBottom: "1px black"}}>Name:</p>
                                </div>
                                <div style={{width: "5cm"}}>
                                <p style={{marginRight: "0px", borderBottom: "1px black"}}>{loading? <p>loading...</p> :
                                error? <p>error</p> : first_name + " "+ last_name}
                                </p>
                                </div>
                            </div>
                            <div className="d-flex flex-row">
                                <div style={{width: "5cm"}}>
                                <p style={{marginRight: "0px", borderBottom: "1px black"}}>Date of Birth:</p>
                                </div>
                                <div style={{width: "5cm"}}>
                                <p style={{marginRight: "0px", borderBottom: "1px black"}}>{
                                    loading? <p>loading...</p> :
                                    error? <p>error</p> : 
                                    dob}
                                </p>
                                </div>
                            </div>
                            <div className="d-flex flex-row">
                                <div style={{width: "5cm"}}>
                                <p style={{marginRight: "0px", borderBottom: "1px black"}}>Sex:</p>
                                </div>
                                <div style={{width: "5cm"}}>
                                <p style={{marginRight: "0px", borderBottom: "1px black"}}>{
                                    loading? <p>loading...</p> :
                                    error? <p>error</p> : 
                                    gender}
                                </p>
                                </div>
                            </div>
                            <div className="d-flex flex-row">
                                <div style={{width: "5cm"}}>
                                <p style={{marginRight: "0px", borderBottom: "1px black"}}>Age:</p>
                                </div>
                                <div style={{width: "5cm"}}>
                                <p style={{marginRight: "0px", borderBottom: "1px black"}}>{
                                    loading? <p>loading...</p> :
                                    error? <p>error</p> : 
                                    age}
                                </p>
                                </div>
                            </div>
                            <div className="d-flex flex-row">
                                <div style={{width: "5cm"}}>
                                <p style={{marginRight: "0px", borderBottom: "1px black"}}>Specimen ID:</p>
                                </div>
                                <div style={{width: "5cm"}}>
                                <p style={{marginRight: "0px", borderBottom: "1px black"}}>{
                                    loading? <p>loading...</p> :
                                    error? <p>error</p> : 
                                    specimenid}
                                </p>
                                </div>
                            </div>
                        </div>
                      </Card.Body>
                        </div>
                    </div>
                    {/* </Card> */}
                </div>
        </div>
        
    )
};

export default BookBelongsTo;