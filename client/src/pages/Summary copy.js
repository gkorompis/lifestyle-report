import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { listResult } from '../actions/resultActions';
import {Card} from 'react-bootstrap';

// import TableArray from "../components/TableArray";
const colorRisk=(risk_category)=>{
    let color_code;
    let risk = risk_category || "other"
    risk.toLowerCase() == "high"? (
        color_code = '#b80d57f3'
        // '#d30961'
    ) : risk.toLowerCase()== "low" || risk.toLowerCase()== "medium" ? (
        color_code = '#057067'
        // '#068e82'
    ) : (
        color_code = '#ae761d'
    )
    return color_code;
}
const chunk_array = (array, integer)=>{
    let temp_arr = array;
    console.log('chunks',array,'integer',integer);
    const array_of_chunks = [];
    const iteration_times = Math.ceil(+array.length/+integer);
    for (let i; i < iteration_times; i++ ){
        let temp_chunk = temp_arr.splice(6, array.length);
        array_of_chunks.push(temp_chunk); 
    };
    console.log("array_of_chunks", array_of_chunks,'chunks',array,'integer',integer);
    return array_of_chunks
}

const CellsPerRow = (document, colorCode)=>{
     <div className=' '>
            <div className="per-trait-cell" style={{margin: '2px'}}>
                {/* <Card bsStyle="pills" style={{ height: '1.3cm', width: "3cm", padding: "7px", fontSize:'10px', backgroundColor: colorCode, color: 'whitesmoke'}}>  */}
                    <div  style={{ 
                        height: '1.5cm', 
                        width: "2.9cm", 
                        padding: "7px", 
                        fontSize:'10px', 
                        backgroundColor: colorCode, 
                        color: 'whitesmoke', 
                        borderRadius:"5px"
                        }}> 
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        {/* <Card.Img variant="top" src="" style={{ width: '1.5cm', height: '1.5cm', marginInline: '20px', borderRadius: '5%'}} /> */}
                        <div className="d-flex flex-row justify-content-center align-items-center">
                        <p>{document.phenotype}</p>
                        </div>
                    </div>
                    </div>
                </div> 
        </div>
}


const TableArray = ({details, colorCode})=>{
    const document = details;
    
    console.log('table-array', document);
    // let risk_category = 
    return(
       <>
       <h1>Cell</h1>
       </>
    )
};

const Summary= () =>{
    const dispatch = useDispatch();
    const resultList = useSelector((state)=>state.resultList);
    console.log(resultList, "--resultList");
    const {loading, error, results} = resultList;
    
    let {Health} = results ;
    console.log(Health, results, 'test Health');
    let Health_chunk;
    if(!loading){
        
        Health_chunk = chunk_array(Health,6);
        console.log("Health_chunk", Health_chunk, Health);
    }
    useEffect(()=>{
        dispatch(listResult()); 
    }, [dispatch]);
    return(
        <div className="test FrontCover d-flex flex-row">
            {loading ? (
                <p>loading...</p>
            ) : error ? (
                <p> error...</p>
            ) :  (
            //    (console.log('test', Health, results))
               
                Object.keys(Health.sort((x, y)=>{return +x.priority - +y.priority})).map(x => {return <TableArray key={x} details={Health_chunk[x]}/>})
            ) 
            }
           
        </div>
    )
};

export default Summary;