import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { listResult } from '../actions/resultActions';
import PhenotypeReportHabbit_v2 from '../components/PhenotypeReportHabbit_v2';
import FirstChapterHabbit from '../components/FirstChapterHabbit';



const Nutrition = ()=>{
    const dispatch = useDispatch();
    const resultList = useSelector((state)=>state.resultList);
    const {loading, error, results} = resultList;
    const {Habbit} = results;
    // console.log(Habbit.sign_and_symptoms, 's&s');
    

    useEffect(()=>{
        dispatch(listResult());
        
    }, [dispatch]);


    return (
        <>
            <FirstChapterHabbit/>
            {loading ? (
                <p>loading...</p>
            ) : error ? (
                <p> error...</p>
            ) : (
                Object.keys(Habbit.sort((x, y)=>{return +x.priority - +y.priority})).map((x, index) => {return <PhenotypeReportHabbit_v2 index={index} key={x} details={Habbit[x]}/>})
            )
            }
        </>
    )
};



export default Nutrition;