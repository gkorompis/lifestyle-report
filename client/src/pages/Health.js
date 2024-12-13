import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { listResult } from '../actions/resultActions';
import PhenotypeReportHealth_v2 from '../components/PhenotypeReportHealth_v2';
import FirstChapterHealth from '../components/FirstChapterHealth';



const Health = ()=>{
    const dispatch = useDispatch();
    const resultList = useSelector((state)=>state.resultList);
    console.log(resultList, "--resultList");
    const {loading, error, results} = resultList;
    
    let {Health} = results ;
    console.log(Health, results, 'health test');
    
    useEffect(()=>{
        dispatch(listResult()); 
    }, [dispatch]);

    return (
        <>
            <FirstChapterHealth/>
            {loading ? (
                <p>loading...</p>
            ) : error ? (
                <p> error...</p>
            ) :  (
            //    (console.log('test', Health, results))
                Object.keys(Health.sort((x, y)=>{return +x.priority - +y.priority})).map((x,index) => {return <PhenotypeReportHealth_v2 index={index} key={x} details={Health[x]}/>})
            ) 
            }
        </>
    )
};



export default Health;