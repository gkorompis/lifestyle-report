import React from 'react';


const PhenotypeReportHealth_v1 = ({details}) => {
    const {category, phenotype, description, risk_category, sign_and_symptoms, recomm_test, gene_tested, do_action, do_not_action} = details;
    const name = "Gracia";
    let i = 0;
//    console.log(sign_and_symptomps, 'sign and symptomps')
    return (
        <div>
        <div className="PhenotypeReport phenotype_health d-flex flex-column justify-content-between">
            <div>
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
            <div id="" className="">
                <div className="d-flex flex-column align-items-end">
                    
                    

                    <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-column justify-content-between icon_box">
                            <img className="icon_img" src="helix.png" alt="paper and pencil"/>
                        </div>
                        <div className="boxes right_box">
                            <h2 className="title_desc_light">We checked for these genes</h2>

                                {
                                    <p className="body_desc_light gap_smal">{gene_tested.replace(/;/g,",")}</p>
                                }
                        </div>
                    </div>

                    <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-column justify-content-between icon_box">
                            <img className="icon_img" src="symptom.png" alt="cough"/>
                        </div>
                        <div className="boxes right_box">
                            <h2 className="title_desc_light">Sign and Symptomps</h2>
                            {
                                sign_and_symptoms.split('\n').map(x => {
                                    i+=1;
                                    return <p key={i} className="body_desc_light gap_small">{x.replace(/\)/g,".")}</p>
                                })
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
            </div>
            <div className="">
                <img src="./footer.png" className="footer" alt="rainbow mozaic"/>
            </div>
            
        </div>

        <div className="PhenotypeReport phenotype_health d-flex flex-column justify-content-between">
         <div>
         <div className="report_boxes">
                <div className="d-flex flex-column align-items-end">
                    <div className="d-flex  flex-row justify-content-between">
                        <div className="d-flex flex-column justify-content-between icon_box">
                            <img className="icon_img" src="test.png" alt="paper and pencil"/>
                        </div>
                        <div className="boxes right_box">
                            <h2 className="title_desc_light">Tests you can try</h2>
                            {
                                
                                recomm_test.split('\n').map(x => {
                                    i+=1;
                                    return <p key={i} className=" body_desc_light gap_small">{x.replace(/\)/g,".")}</p>})
                            }
                        </div>
                    </div>
                    <div className="d-flex  flex-row justify-content-between">
                        <div className="d-flex flex-column justify-content-between icon_box">
                            <img className="icon_img" src="checked.png" alt="paper and pencil"/>
                        </div>
                        <div className="boxes right_box">
                         <h2 className="title_desc_light">What you can do</h2>
                         {/* {console.log(do_action, "do_action-----", phenotype, "phenotype--", category, "category--")} */}
                        {
                           do_action.split('\n').map(x => {
                                i+=1;
                                return <p key={i} className="body_desc_light gap_small">{x.replace(/\)/g,".")}</p>
                            })
                             
                        }
                        </div>
                    </div>

                    <div className="d-flex  flex-row justify-content-between">
                        <div className="d-flex flex-column justify-content-between icon_box">
                            <img className="icon_img" src="warning.png" alt="paper and pencil"/>
                        </div>
                        <div className="boxes right_box">
                           <h2 className="title_desc_light">What you should avoid</h2>
                        {
                            do_not_action.split('\n').map(x => {
                                i+=1;
                                return <p key={i} className="body_desc_light gap_small">{x.replace(/\)/g,".")}</p>
                            })
                        }
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



export default PhenotypeReportHealth_v1;