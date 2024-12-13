import React from "react";

const Cover = () =>{
    const style_page = {
        width:"21cm",
        height:"29.7cm",
        backgroundColor: "black"
    };
    const style_img = {
        width:"21cm",
        height:"29.65cm",
    };
    return(
        <div style={style_page}>
            <img style={style_img} src='./lifestyle-edition.png' alt="Front Page Report"/>
        </div>
    )
};

export default Cover;