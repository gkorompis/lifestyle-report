import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { listResult } from '../actions/resultActions';
import PhenotypeReportFitness_v2 from '../components/PhenotypeReportFitness_v2';
import FirstChapterFitness from '../components/FirstChapterFitness';



const Nutrition = ()=>{
    const dispatch = useDispatch();
    const resultList = useSelector((state)=>state.resultList);
    const {loading, error, results} = resultList;
    const {Fitness} = results;
    // console.log(Fitness.sign_and_symptoms, 's&s');
    

    useEffect(()=>{
        dispatch(listResult());
        
    }, [dispatch]);


    return (
        <>
            <FirstChapterFitness/>
            {loading ? (
                <p>loading...</p>
            ) : error ? (
                <p> error...</p>
            ) : (
                Object.keys(Fitness.sort((x, y)=>{return +x.priority - +y.priority})).map((x,index) => {return <PhenotypeReportFitness_v2 index={index} key={x} details={Fitness[x]}/>})
            )
            }
        </>
    )
};



export default Nutrition;