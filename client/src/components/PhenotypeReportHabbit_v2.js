import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import detailPatient from '../actions/patientActions';
import {Card} from 'react-bootstrap';

const colorRisk=(risk_category)=>{
    let color_code;
    let risk = risk_category || "other"
    risk.toLowerCase() == "high"? (
        color_code = '#b80d57f3'
        // '#d30961'
    ) : risk.toLowerCase()== "low" ? (
        color_code = '#057067'
        // '#068e82'
    ) : (
        color_code = '#2c3131'
    )
    return color_code;
}
// const yourRisk=(risk_category)=>{
//     let your_risk;
//     let risk = risk_category || "other"
//     risk.toLowerCase() == "high"? (
//         your_risk = 'You have high likelihood'
//     ) : risk.toLowerCase()== "low" ? (
//         your_risk = 'You have less likelihood'
//     ) : (
//         your_risk = '#cf8d22'
//     )
//     return your_risk;
// }

const PhenotypeReportHabbit_v2 = ({details, index}) => {
    // const {CATEGORY, phenotype, description,  your_risk, sign_and_symptoms, recomm_test, gene_tested, do_action, do_not_action} = details;
     const {CATEGORIES, POSSIBLE_OUTCOME, PHENOTYPE, DESCRIPTION, RISK_CATEGORY, MEANING_OF_HIGH, GENE_TESTED, RECOMMENDATION_HIGH_RISK} = details;
   
    // const name = "Gracia";
    let i = 0;
    let bufferPage = 90;
    const dispatch = useDispatch();
    const state_content = useSelector(state => state.patient);
    const {loading, error, patientDetails} = state_content;
    useEffect(()=>{
        dispatch(detailPatient())
    }, [dispatch]);
    const first_name = patientDetails ? patientDetails["first_name"] : 'first'

  let name = loading  ? "loading.." :
  error ? "error" : first_name;
//    console.log(sign_and_symptomps, 'sign and symptomps')
    return (
       <>
       <div className="PhenotypeReportHabbit d-flex flex-column justify-content-between">
        <div className="d-flex flex-row ">
            <div className="title-bar d-flex flex-column "style={{backgroundColor: colorRisk(RISK_CATEGORY)}}>
                <div className="per-trait-bar trait-title">
                     <h2>{PHENOTYPE}</h2>
                     <p>{CATEGORIES}</p>
                </div>
                <div className="per-trait-bar score">
                     <h3>Hey {name},</h3>
                </div>
                <div className="per-trait-bar score">
                     <h3>{POSSIBLE_OUTCOME}</h3> 
                </div>
                <p>_________________</p>
                 <div className="per-trait-bar score" style={{fontSize: "10px"}}>
                     <h5>genes</h5>
                     <p>{GENE_TESTED.replace(/;/g,",")}</p>
                </div>
                 {/* <p>________________</p> */}
                {/* <div className="per-trait-bar score">
                     <h5>sign and symptomps</h5>
                       {
                                sign_and_symptoms.split('\n').map(x => {
                                    i+=1;
                                    return <p key={i} className="body_desc_light gap_small">{x.replace(/\)/g,".")}</p>
                                })
                            }
                </div> */}
            </div>
            <div className="d-flex flex-column justify-content-between" style={{height: "96%"}}>
                <div className="d-flex flex-column align-items-end" style={{ paddingTop: '0cm'}}>
                <div className="per-trait-title" >
                    {/* <Card bsStyle="pills" style={{ height: '6.5cm'}}>  */}
                    <div className="d-flex flex-row">
                        <Card.Img variant="top" src="helix.png" style={{ width: '1.7cm', height: '1.7cm', marginInline: '20px'}} />
                        <div>
                        <Card.Body>
                        <Card.Title>DESCRIPTION</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">_______________________________________</Card.Subtitle>
                        <Card.Text style={{fontSize: "10px"}}>
                            {DESCRIPTION}
                        </Card.Text>
                        </Card.Body>
                        </div>
                    </div>
                    {/* </Card> */}
                </div>
                <div className="per-trait-title" >
                    {/* <Card bsStyle="pills" style={{ height: '6.5cm'}}>  */}
                    <div className="d-flex flex-row">
                        <Card.Img variant="top" src="question-mark.png" style={{ width: '1.7cm', height: '1.7cm', marginInline: '20px'}} />
                        <div>
                        <Card.Body>
                        <Card.Title>WHAT DOES THIS MEAN?</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">_______________________________________</Card.Subtitle>
                        <Card.Text style={{fontSize: "10px"}}>
                            {MEANING_OF_HIGH}
                        </Card.Text>
                        </Card.Body>
                        </div>
                    </div>
                    {/* </Card> */}
                </div>
                <div className="per-trait-title">
                    {/* <Card bsStyle="pills" style={{ height: '6.5cm'}}>  */}
                    <div className="d-flex flex-row">
                        <Card.Img variant="top" src="checked.png" style={{ width: '1.7cm', height: '1.7cm', marginInline: '20px'}} />
                        <div>
                        <Card.Body>
                        <Card.Title>WHAT YOU CAN DO</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">_______________________________________</Card.Subtitle>
                        <Card.Text style={{fontSize: "10px"}}>
                              {
                            RECOMMENDATION_HIGH_RISK.split('\n').map(x => {
                                i+=1;
                                return <p key={i} className=" gap_small">{x.replace(/^(\d+)\)/, '$1.')}</p>
                            })
                        }
                        </Card.Text>
                        </Card.Body>
                        </div>
                    </div>
                    {/* </Card> */}
                </div> 
 
                
                </div> 
                <div className="page_number d-flex flex-row justify-content-end align-items-center" style={{width: "100%", height: "0cm", border: "", paddingRight: "15px"}}>
                    <p>{+index + bufferPage}</p>
                </div>

            </div>
            
            
        </div>
        
            
            
            
       </div>
            
       </>
    )

}
export default PhenotypeReportHabbit_v2;