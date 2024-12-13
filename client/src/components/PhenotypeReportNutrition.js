import React from 'react';
import {Row, Col, Badge} from 'react-bootstrap';


const PhenotypeReportNutrition = ({details}) => {
    const {CATEGORIES, POSSIBLE_OUTCOME, PHENOTYPE, DESCRIPTION, RISK_CATEGORY, MEANING_OF_HIGH, GENE_TESTED, RECOMMENDATION_HIGH_RISK} = details;
    const name = "Gracia";
    let i = 0;
//    console.log(sign_and_symptomps, 'sign and symptomps')
    return (
        <div>
        <div className="PhenotypeReport phenotype_nutri d-flex flex-column justify-content-between">
            <div>
            <div id="report_title" className="report_title">
                <h2 className="title_subchapter gap_small">{CATEGORIES}</h2>
                <h1 className="title_phenotype">{PHENOTYPE}</h1>
            </div>
            
            <div id="report_intro" className="report_intro">
                <h2 className="title_desc">Overview</h2>
                <p className="body_desc">{DESCRIPTION}</p>
            </div>
            {/* {console.log("PHENOTYPE:",PHENOTYPE, "POS_OUT:", POSSIBLE_OUTCOME )} */}
            {
                RISK_CATEGORY.toLowerCase()=== 'high' ? (
                    <div id="report_result" className="report_result d-flex flex-column align-items-center">
                        <div className="result_oval result_desc bg_risk_high">
                            <p className="result_name gap_small">{name},</p>
                            <p>{` ${POSSIBLE_OUTCOME.toLowerCase()}`}</p>
                        </div> 
                    </div>
                ) : RISK_CATEGORY.toLowerCase()=== 'low'? (
                    <div id="report_result" className="report_result d-flex flex-column align-items-center">
                        <div className="result_oval result_desc bg_risk_low">
                            <p className="result_name gap_small">{name},</p>
                            <p>{` ${POSSIBLE_OUTCOME.toLowerCase()}`}</p>
                        </div> 
                    </div>
                ) : (
                    <div id="report_result" className="report_result d-flex flex-column align-items-center">
                        <div className="result_oval result_desc bg_risk_typical">
                            <p className="result_name gap_small">{name},</p>
                            <p>{` ${POSSIBLE_OUTCOME.toLowerCase()}`}</p>
                        </div> 
                    </div>
                )
            }
            <div id="" className="">
                <div className="d-flex flex-column align-items-end">
                    
                    

                    <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-column justify-content-between icon_box">
                            <img className="icon_img" src="helix.png" alt="paper and pencil"/>
                        </div>
                        <div className="boxes right_box">
                            <h2 className="title_desc_light">We checked for these genes</h2>

                                {
                                    <p className="body_desc_light gap_smal">{GENE_TESTED.replace(/;/g,",")}</p>
                                }
                        </div>
                    </div>

                    <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-column justify-content-between icon_box">
                            <img className="icon_img" src="symptom.png" alt="cough"/>
                        </div>
                        <div className="boxes right_box">
                            <h2 className="title_desc_light">What does it mean?</h2>
                            
                                <p className="body_desc_light gap_small">{MEANING_OF_HIGH}</p>
                            
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-column justify-content-between icon_box">
                            <img className="icon_img" src="checked.png" alt="cough"/>
                        </div>
                        <div className="boxes right_box">
                            <h2 className="title_desc_light">What you can do about</h2>
                                <p className="body_desc_light gap_small">{MEANING_OF_HIGH}</p>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
            </div>
            <div className="">
                <img src="./footer.png" className="footer" alt="rainbow mozaic"/>
            </div>
            
        </div>

      
        </div>
        
    )
};



export default PhenotypeReportNutrition;