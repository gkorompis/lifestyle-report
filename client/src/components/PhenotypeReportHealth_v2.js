import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import detailPatient from '../actions/patientActions';
import {Card} from 'react-bootstrap';
//2c3131
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
        color_code = '#2c3131'
    )
    return color_code;
}
const meterRisk=(risk_category)=>{
    let meter_risk;
    let risk = risk_category || "other"
    risk.toLowerCase() == "high"? (
        meter_risk= './riskmeter-high.png'
    ) : risk.toLowerCase()== "low" ? (
        meter_risk= './riskmeter-low.png'
    ) : (
        meter_risk= './riskmeter-typical.png'
    )
    return meter_risk;
}
const predicateRisk=(risk_category)=>{
    let predicate_risk;
    let risk = risk_category || "other"
    risk.toLowerCase() == "high"? (
        predicate_risk= 'increased risk'
    ) : risk.toLowerCase()== "low" ? (
        predicate_risk= 'decreased risk'
    ) : risk.toLowerCase() == "na" ? (predicate_risk = 'not applicable') : (
        predicate_risk= 'typical risk'
    )
    return predicate_risk;
}

const PhenotypeReportHealth_v2 = ({details, index}) => {
    const {category, phenotype, description, risk_category, your_risk, sign_and_symptoms, recomm_test, gene_tested, do_action, do_not_action} = details;
    if(phenotype=="Prostate Cancer"){
        console.log("prostate_cancer", details)
    }
   
    let i = 0;
    let bufferPage = 10;
    let goodHdl = phenotype == "High HDL (Good) Cholesterol Levels" ? 1 : 0;
   const switchGoodHdl=(risk_category)=>{
        switch(risk_category.toLowerCase()){
            case "high":
                return "low"
            case "low":
                return "high"
            default:
                return risk_category
        };
   }

  const dispatch = useDispatch();
  const state_content = useSelector(state => state.patient);
  const {loading, error, patientDetails} = state_content;
  useEffect(()=>{
    dispatch(detailPatient());
  }, [dispatch])

  const first_name = patientDetails ? patientDetails["first_name"] : 'first'

  let name = loading  ? "loading.." :
  error ? "error" : first_name;
  
//    console.log(sign_and_symptomps, 'sign and symptomps')
    return (
       <>
       <div className="PhenotypeReport d-flex flex-column justify-content-between">
        <div className="d-flex flex-row ">
            <div className="title-bar d-flex flex-column "style={{backgroundColor: colorRisk(risk_category)}}>
                <div className="per-trait-bar trait-title">
                     <h3>{phenotype}</h3>
                     {/* {colorRisk(risk_category)} */}
                     <p>{category}</p>
                </div>
                <div className="per-trait-bar score d-flex flex-column">

                    <img className="risk-meter" src={meterRisk(risk_category)} style={{position: '', left: '0cm',marginBlock: '0cm', width: '7cm', height: '7cm', borderRadius: '10px', backgroundColor: ""}}/>
                     Hey {name}, you have <h3>{ goodHdl ? predicateRisk(switchGoodHdl(risk_category)) : predicateRisk(risk_category)}</h3> 
                </div>
                <div className="per-trait-bar score">
                     risk score: <h2>{your_risk == '0.0'? 0 : your_risk}</h2> 
                </div>
                <p>_________________</p>
                 <div className="per-trait-bar score" style={{fontSize: "10px"}}>
                     <h5>genes</h5>
                     <p>{gene_tested.replace(/;/g,",")}</p>
                </div>
                 {/* <p>________________</p> */}
                <div className="per-trait-bar score">
                     <h5>sign and symptomps</h5>
                       {/* {
                                sign_and_symptoms.split('\n').map(x => {
                                    i+=1;
                                    return <p key={i} className="body_desc_light gap_small">{x.replace(/\) /,".")}</p>
                                })
                            } */}
                            {
                                sign_and_symptoms.split('\n').map(x => {
                                    i+=1;
                                    return <p key={i} className="body_desc_light gap_small">{x.replace(/^(\d+)\)/, '$1.')}</p>
                                })
                            }
                </div> 
            </div>
            <div className="d-flex flex-column justify-content-between" style={{height: "96%"}}>
                <div className="d-flex flex-column align-items-end" style={{ padding: '0cm', backgroundColor: ''}}>
                <div className="per-trait-title" >
                    {/* <Card bsStyle="pills" style={{ height: '6.5cm'}}>  */}
                    <div className="d-flex flex-row">
                        <Card.Img variant="top" src="helix.png" style={{ width: '1.5cm', height: '1.5cm', marginInline: '20px', borderRadius: '5%'}} />
                        <div>
                        <Card.Body>
                        <Card.Title>DESCRIPTION</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">_______________________________________</Card.Subtitle>
                        <Card.Text style={{fontSize: "10px"}}>
                            {description}
                        </Card.Text>
                      </Card.Body>
                        </div>
                    </div>
                    {/* </Card> */}
                </div>
                <div className="per-trait-title">
                    {/* <Card bsStyle="pills" style={{ height: '6.5cm'}}>  */}
                    <div className="d-flex flex-row">
                        <Card.Img variant="top" src="checked.png" style={{ width: '1.5cm', height: '1.5cm', marginInline: '20px', borderRadius: '5%'}} />
                        <div>
                        <Card.Body>
                        <Card.Title>WHAT YOU CAN DO</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">_______________________________________</Card.Subtitle>
                        <Card.Text style={{fontSize: "10px"}}>
                              {
                                do_action.split('\n').map((x, index )=> {
                                    return <p key={index} className=" gap_small">{x}</p>
                                })
                            }
                        </Card.Text>
                        </Card.Body>
                        </div>
                    </div>
                    {/* </Card> */}
                </div> 
                <div className="per-trait-title">
                    {/* <Card bsStyle="pills" style={{ height: '6.5cm'}}>  */}
                    <div className="d-flex flex-row">
                        <Card.Img variant="top" src="warning.png" style={{ width: '1.5cm', height: '1.5cm', marginInline: '20px', borderRadius: '5%'}} />
                        <div>
                        <Card.Body>
                        <Card.Title>WHAT YOU SHOULD AVOID</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">_______________________________________</Card.Subtitle>
                        <Card.Text style={{fontSize: "10px"}}>
                              {
                            do_not_action.split('\n').map((x, index )=> {
                                    return <p key={index} className=" gap_small">{x}</p>
                                })
                        }
                        </Card.Text>
                        </Card.Body>
                        </div>
                    </div>
                    {/* </Card> */}
                </div> 
                <div className="per-trait-title">
                    {/* <Card bsStyle="pills" style={{ height: '6.9cm'}}>  */}
                    <div className="d-flex flex-row">
                        <Card.Img variant="top" src="test.png" style={{ width: '1.5cm', height: '1.5cm', marginInline: '20px', borderRadius: '5%'}} />
                        <div>
                        <Card.Body>
                        <Card.Title>TEST YOU CAN TRY</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">_______________________________________</Card.Subtitle>
                        <Card.Text style={{fontSize: "10px"}}>
                            
                            {/* {
                                recomm_test.split(/[0-9]\)/g).map((x, xindex )=> {
                                    return <p key={i} className=" gap_small">{!x? null :`${xindex}... ${x}`}</p>
                                })
                            } */}
                            {recomm_test.split('\n').map((x, index )=> {
                                    return <p key={index} className=" gap_small">{x}</p>
                                })}
                        </Card.Text>
                        </Card.Body>
                        </div>
                    </div>
                    {/* </Card> */}
                </div> 
                </div> 
                <div className="page_number d-flex flex-row justify-content-end align-items-center" style={{width: "100%", height: "", border: "", paddingRight: "15px"}}>
                    <p>{+index + bufferPage}</p>
                </div> 
            </div>
  
        </div>
        
            
            
            
       </div>
            
       </>
    )

}
export default PhenotypeReportHealth_v2;