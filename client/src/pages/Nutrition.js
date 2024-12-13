import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { listResult } from '../actions/resultActions';
import PhenotypeReportNutrition_v2 from '../components/PhenotypeReportNutrition_v2';
import FirstChapterNutrition from '../components/FirstChapterNutrition';



const Nutrition = ()=>{
    const dispatch = useDispatch();
    const resultList = useSelector((state)=>state.resultList);
    const {loading, error, results} = resultList;
    const {Nutrition} = results;
    // console.log(Health.sign_and_symptoms, 's&s');
    

    useEffect(()=>{
        dispatch(listResult());
        
    }, [dispatch]);


    return (
        <>
            <FirstChapterNutrition/>
            {loading ? (
                <p>loading...</p>
            ) : error ? (
                <p> error...</p>
            ) : (
                Object.keys(Nutrition.sort((x, y)=>{return +x.priority - +y.priority})).map((x,index) => {return <PhenotypeReportNutrition_v2 index={index} key={x} details={Nutrition[x]}/>})
            )
            }
        </>
    )
};



export default Nutrition;