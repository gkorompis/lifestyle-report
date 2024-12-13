import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { listResult } from '../actions/resultActions';
import ChapterIconCategory from './ChapterIconCategory'



const FirstChapterNutrition = () =>{
    const dispatch = useDispatch();
    const resultList = useSelector((state)=>state.resultList);
    const {loading, error, results} = resultList;
    const {Nutrition} = results;
    const listCategories = []
    

    useEffect(()=>{
        dispatch(listResult());
        
    }, [dispatch]);
    return(
        <div className="FrontCover FrontCoverImgNutrition">
            <div className=" report_cover d-flex flex-row ">
                
                   
                        <div className=" report_cover_title d-flex flex-row ">
                            <div className="cover_title_box whitecover align-self-end">
                                <p>Nutrition</p>
                            </div>
                        </div>
                  
                        <div className=" report_cover_list">
                           
                            <div className="cover_list_box">
                                
                                {loading ? (
                                    <p>loading...</p>
                                ) : error ? (
                                    <p> error...</p>
                                ) : (
                                    Nutrition.map(x => {listCategories.push(x["CATEGORIES"])})
                                )
                                }
                              
                                {[... new Set(listCategories)].map(x =>{return <ChapterIconCategory category_name={x}/>})}
                            </div>
                        </div>
                  
               
            </div>
        </div>
    )
};

export default FirstChapterNutrition;