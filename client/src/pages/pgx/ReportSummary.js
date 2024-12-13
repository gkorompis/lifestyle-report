import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import listPgx from '../../actions/pgxActions';
import WebTable from '../../components/pgx/WebTable';



const ReportSummary = ()=>{
    const style_page = {
        padding: "",
        // paddingTop:"0cm",
        width:"21cm",
        height:"29.66cm",
        border: "solid 1px",
        // backgroundColor: "grey"
    };
    const style_page_webtable = {
        // backgroundColor: "grey",
        padding: "0.5cm",
        width: "21cm",
        height: "29.66cm",
        border: "",

    }
    const dispatch = useDispatch();
    const pgx = useSelector((state)=>state.pgxList);
    const {error, loading, pgxResults} = pgx; 
   
    console.log({pgx})
    useEffect(()=>{
        dispatch(listPgx());
    }, [dispatch]);

    //necessary arrays
    const catogery_list = ["CARDIOLOGY", "GASTROENTEROLOGY", "INFECTIOUS DISEASES", "NEUROLOGY", "ONCOLOGY", "ORGAN TRANSPLANTION", "PAIN MANAGEMENT", "PSYCHIATRY", "PULMONOLOGY", "ANESTHESIOLOGY"]


    return (
        <div className="each-page"  >
            
            {loading ? (
                <p>loading....</p>
            ) : error ? (
                <p> error...</p>
            ) :  (
            //    (console.log('test', Health, results))
                // pgxResults.map(x => <h1 key={`${x["CATOGERY"]}${x["DRUG_NAME"]}`}> {x["CATOGERY"]} </h1>)
                <div> 
                    {catogery_list.map((catogery, index) => {return pgxResults.filter(x=>x["CATOGERY"]==catogery)[0]?  <div className="catogery-table" style={style_page_webtable}><WebTable key={index} selector={pgx} data={pgxResults.filter(x=>x["CATOGERY"]==catogery)}/></div> : null})}
                    
                </div>
                
                
                // <h1>pgxResults</h1>
            ) 
            }
        </div>
            
        
    )
};




export default ReportSummary;

{/* <WebTable data={pgxResults.filter(x=>x["CATOGERY"]=="CARDIOLOGY")}/>
                     <WebTable data={pgxResults.filter(x=>x["CATOGERY"]=="GASTROENTEROLOGY")}/>   */}