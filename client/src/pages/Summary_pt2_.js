import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { listResult } from '../actions/resultActions'; 

import TableArray from "../components/TableArray";
// const colorRisk=(risk_category)=>{
//     let color_code;
//     let risk = risk_category || "other"
//     risk.toLowerCase() == "high"? (
//         color_code = '#b80d57f3'
//         // '#d30961'
//     ) : risk.toLowerCase()== "low" || risk.toLowerCase()== "medium" ? (
//         color_code = '#057067'
//         // '#068e82'
//     ) : (
//         color_code = '#ae761d'
//     )
//     return color_code;
// };

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]


const Summary2 = ()=>{
    const dispatch = useDispatch();
    const resultList = useSelector((state)=>state.resultList);
    console.log(resultList, "--resultList");
    const {loading, error, results} = resultList;
    const {Fitness, Habbit} = results;
    const style_div = { 
        marginTop: '1cm',
        marginLeft: '0.5cm',
        color: "#1A1A1B"
    };
    useEffect(()=>{
        dispatch(listResult()); 
    }, [dispatch]);
    return( 
        <div style={style_div} className="FrontCover">
            <p>REPORT SUMMARY</p>
            {loading ? (
                <p>loading...</p>
            ) : error ? (
                <p> error...</p>
            ) : (
                <>
                    <TableSummary panel_name={'Fitness'} details = {Fitness}/>
                    <TableSummary panel_name={'Habbit'} details = {Habbit}/>
                </>
                
            )
            }
        </div>
    )
};

const TableSummary = ({panel_name, details}) =>{
    const style_cell = {
        border: "1px solid black", 
        borderRadius: "5px",
        height: "1.7cm", 
        width: "3.4cm",
        fontSize: "12px",
        margin: "0.75px",
        color: "whitesmoke"
    };
    const style_row = {
        backgroundColor: '',
    }
    const style_table = {
        marginTop: "0.9cm",
        marginLeft: "",
        backgroundColor: ""
    }
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
        color_code ='#ae761d' || '#2c3131'
    )
    return color_code;
}
    const spliceArray = (inputArray, n)=>{
        let copy = [...inputArray]
        let chunks = [];
        let iterations = +Math.ceil(+copy.length/n);
        for(let i = 0; i < iterations; i++ ){
            let splice = copy.splice(0,n);
            chunks.push(splice);
        };
        return chunks
    };
    console.log({details})
    const spliced = spliceArray(details, 5)
    console.log(spliced)
    return(
        
        <div className="d-flex flex-column justify-content align-items-center" style={style_table}>
                <div style={{width: "100%",paddingLeft: "5px" ,padding: "1px" ,marginBottom: "0.3cm", backgroundColor: "#2c3131", color: "whitesmoke", borderRadius: "5px"}}>
                    <h1>{panel_name}</h1>
                </div>
                
                <div>
                    {spliced.map(x=><div className="d-flex flex-row" style={style_row}>{x.map(y=><div className="d-flex flex-row justify-content-center align-items-center" style={{...style_cell, backgroundColor: colorRisk(y["risk_category"]|| y["RISK_CATEGORY"])}}><p>{y["phenotype"] || y["PHENOTYPE"]}</p></div>)}</div>)}
                </div>
        </div>
    )
};



export default Summary2;