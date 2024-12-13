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


const Summary = ()=>{
    const dispatch = useDispatch();
    const resultList = useSelector((state)=>state.resultList);
    console.log(resultList, "--resultList");
    const {loading, error, results} = resultList;
    const {Fitness, Habbit} = results;
    const style_div = { 
        paddingTop: '1cm',
        paddingLeft: '0.5cm',
        color: "#1A1A1B",
        backgroundColor: ""
    };
    useEffect(()=>{
        dispatch(listResult()); 
    }, [dispatch]);
    return( 
        <div style={style_div} className="SummaryPt2 PhenotypeReport">
            <div>
                <h4>Summary</h4>
            </div>
            {loading ? (
                <p>loading...</p>
            ) : error ? (
                <p> error...</p>
            ) : (
                <div> 
                    <TableSummary panel_name={'Fitness'} details = {Fitness}/> 
                    <TableSummary panel_name={'Habbit'} details = {Habbit}/> 
                </div>
                
            )
            }
        </div>
    )
};

const TableSummary = ({panel_name, details}) =>{
    const style_cell = {
        // border: "1px solid black", 
        borderRadius: "",
        height: "2.5cm", 
        width: "3.9cm",
        fontSize: "10px",
        margin: "0.75px",
        color: "whitesmoke",
        padding: "1px",
        backgroundColor: ""
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
        color_code ="#D30961"||'#b80d57f3'
        // '#d30961'
    ) : risk.toLowerCase()== "low" ? (
        color_code = "#068E82"||'#057067'
        // '#068e82'
    ) : (
        color_code ='rgba(187, 142, 70, 0.909)' || '#2c3131'
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

    const splitHalf = (sentence)=>{
        let halves = [];
        halves.push(sentence.slice(0, +sentence.length/2).join().replace(/,/g, " "));
        halves.push(sentence.slice(+sentence.length/2, +sentence.length).join().replace(/,/g, " "));
        return halves
    };

    console.log({details})
    const spliced = spliceArray(details, 5)
    console.log(spliced)
    return(
        
        <div className="d-flex flex-column justify-content-center align-items-start" style={style_table}>
                <div style={{width: "100%",paddingLeft: "5px" ,padding: "1px" ,marginBottom: "0cm", backgroundColor: "", color: "#2c3131", borderRadius: ""}}>
                    <h1 style={{borderBottom: "2px solid #2c3131"}}>{panel_name=="Habbit"?"Habit":panel_name}</h1>
                </div>
                <div>
                    {spliced.map(
                        x=><div className="d-flex flex-row align-items-start" style={style_row}>{x.map(
                                y=><div className="d-flex flex-column justify-content-center align-items-center" style={{...style_cell, backgroundColor: colorRisk(y["risk_category"]|| y["RISK_CATEGORY"])}}>
                                        {splitHalf((y["phenotype"] || y["PHENOTYPE"]).split(" ")).map(z => <p style={{margin: "0"}}>{z}</p>)}
                                    </div>
                            )}</div>
                        )}
                </div>
        </div>
    )
};



export default Summary;