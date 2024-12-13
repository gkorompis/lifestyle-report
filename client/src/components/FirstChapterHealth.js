import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { listResult } from '../actions/resultActions';
import ChapterIconCategory from './ChapterIconCategory'



const FirstChapterHealth = () =>{
    const dispatch = useDispatch();
    const resultList = useSelector((state)=>state.resultList);
    const {loading, error, results} = resultList;
    const {Health} = results;
    const listCategories = []
    

    useEffect(()=>{
        dispatch(listResult());
        
    }, [dispatch]);
    return(
        <div className="FrontCover FrontCoverImgHealth">
            <div className=" report_cover d-flex flex-row ">
                
                   
                        <div className=" report_cover_title d-flex flex-row ">
                            <div className="cover_title_box align-self-end">
                                <p>Health</p>
                            </div>
                        </div>
                  
                        <div className=" report_cover_list">
                           
                            <div className="cover_list_box">
                                
                                {loading ? (
                                    <p>loading...</p>
                                ) : error ? (
                                    <p> error...</p>
                                ) : (
                                    Health.map(x => {listCategories.push(x["category"])})
                                )
                                }
                              
                                {[... new Set(listCategories)].map(x =>{return <ChapterIconCategory category_name={x}/>})}
                            </div>
                        </div>
                  
               
            </div>
        </div>
    )
};

export default FirstChapterHealth;