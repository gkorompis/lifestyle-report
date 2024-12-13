import React from 'react'

const ChapterIconCategory = ({category_name}) =>{
    console.log(category_name, "cat_name")
    return(
        <div className="d-flex flex-row justify-content-center align-items-center chapter_icon_cat">
            {category_name.replace(/and/g,"&").toUpperCase()}
        </div>
    )
}

export default ChapterIconCategory;