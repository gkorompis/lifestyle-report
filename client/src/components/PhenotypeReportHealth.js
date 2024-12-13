import React from 'react';
// import {Row, Col, Badge} from 'react-bootstrap';


const PhenotypeReportHealth = ({details}) => {
    const {category, phenotype, description, risk_category, sign_and_symptoms, recomm_test, gene_tested } = details;
    const name = "Taylor";
    let i = 0;
//    console.log(sign_and_symptomps, 'sign and symptomps')
    return (
        <div className="PhenotypeReport">
            <div id="report_title" className="report_title">
                <h2 className="title_subchapter gap_small">{category}</h2>
                <h1 className="title_phenotype">{phenotype}</h1>
            </div>
            
            <div id="report_intro" className="report_intro">
                <h2 className="title_desc">Overview</h2>
                <p className="body_desc">{description}</p>
            </div>


            {
                risk_category.toLowerCase()=== 'high' ? (
                    <div id="report_result" className="report_result d-flex flex-column align-items-center">
                        <div className="result_oval result_desc bg_risk_high">
                            <p className="result_name gap_small">{name},</p>
                            <p>{`you have ${risk_category.toUpperCase()} risk of ${phenotype}`}</p>
                        </div> 
                    </div>
                ) : risk_category.toLowerCase()=== 'low'? (
                    <div id="report_result" className="report_result d-flex flex-column align-items-center">
                        <div className="result_oval result_desc bg_risk_low">
                            <p className="result_name gap_small">{name},</p>
                            <p>{`you have ${risk_category.toUpperCase()} risk of ${phenotype}`}</p>
                        </div> 
                    </div>
                ) : (
                    <div id="report_result" className="report_result d-flex flex-column align-items-center">
                        <div className="result_oval result_desc bg_risk_typical">
                            <p className="result_name gap_small">{name},</p>
                            <p>{`you have ${risk_category.toUpperCase()} risk of ${phenotype}`}</p>
                        </div> 
                    </div>
                )
            }
             

            <div id="report_boxes" className="">
                <div className="d-flex justify-content-between">
                     <div className="boxes left_box">
                         <h2 className="title_desc">Sign and Symptomps</h2>
                        {
                            sign_and_symptoms.split('\n').map(x => {
                                i+=1;
                                return <p key={i} className="body_desc gap_small">{x.replace(/\)/g,".")}</p>
                            })
                        }
                    </div>
                    <div className="boxes right_box">
                        <h2 className="title_desc">What can you do, {name}...</h2>
                        {
                            
                            recomm_test.split('\n').map(x => {
                                i+=1;
                                return <p key={i} className=" body_desc gap_small">{x.replace(/\)/g,".")}</p>})
                        }
                        
                        {/* <h2 className="title_desc">{name} your DNA was tested for this genes:</h2>
                        <p className="body_desc">{gene_tested}</p> */}
                    </div>
                    <div className="boxes right_box">
                        <h2 className="title_desc">What can you do, {name}...</h2>
                        {
                            
                            recomm_test.split('\n').map(x => {
                                i+=1;
                                return <p key={i} className=" body_desc gap_small">{x.replace(/\)/g,".")}</p>})
                        }
                        
                        {/* <h2 className="title_desc">{name} your DNA was tested for this genes:</h2>
                        <p className="body_desc">{gene_tested}</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PhenotypeReportHealth;