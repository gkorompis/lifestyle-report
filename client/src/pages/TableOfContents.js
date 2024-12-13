import React from "react";
// import WebTable from "../components/life/WebTable";

const TableOfContents = () =>{

    const style_div={
        height: "29.7cm",
        width: "21cm"
    }
    const data = [{aa: 1, bb: 2}, {aa: 1, bb: 2}, {aa: 1, bb: 2}];
    return(
        <div className="TableOfContents table-of-content d-flex flex flex-row justify-content-center align-items-center" style={style_div}>
            {/* <img className="FrontCoverImg" src='./table_of_contents.png' alt="Report page 3"/>
             */}
             <div>
                <div className="d-flex flex-row">
                    <p style={{marginRight: "40px", borderBottom: "1px dotted black"}}>This Book Belongs to</p>
                    <p style={{marginRight: "40px"}}>2</p>
                </div>
                <div className="d-flex flex-row">
                    <p style={{marginRight: "40px", borderBottom: "1px dotted black"}}>Table of Contents</p>
                    <p style={{marginRight: "40px"}}>3</p>
                </div>
                <div className="d-flex flex-row">
                    <p style={{marginRight: "40px", borderBottom: "1px dotted black"}}>Get to Know Yourself</p>
                    <p style={{marginRight: "40px"}}>4</p>
                </div>
                <div className="d-flex flex-row">
                    <p style={{marginRight: "40px", borderBottom: "1px dotted black"}}>How to Understand Your Report</p>
                    <p style={{marginRight: "40px"}}>5</p>
                </div>
                <div className="d-flex flex-row">
                    <p style={{marginRight: "40px", borderBottom: "1px dotted black" }}>Summary</p>
                    <p style={{marginRight: "40px"}}>6</p>
                </div>
                <div className="d-flex flex-row">
                    <p style={{marginRight: "40px", borderBottom: "1px dotted black"}}>Health Chapter</p>
                    <p style={{marginRight: "40px"}}>9</p>
                </div>
                <div className="d-flex flex-row">
                    <p style={{marginRight: "40px", borderBottom: "1px dotted black"}}>Nutrition Chapter</p><p style={{marginRight: "40px"}}>43</p>
                    
                </div>
                <div className="d-flex flex-row" >
                    <p style={{marginRight: "40px", borderBottom: "1px dotted black"}}>Fitness Chapter</p>
                    <p style={{marginRight: "40px"}}>75</p>
                </div>
                <div className="d-flex flex-row" >
                    <p style={{marginRight: "40px", borderBottom: "1px dotted black"}}>Habits Chapter</p>
                    <p>89</p>
                </div>
                
            </div>
        </div>
    )
};

export default TableOfContents;