import React from 'react'; 
const RowArray=()=>{
    
    return(
        <div>
            <h1>Row Array</h1>
        </div>
    )
}; 
const chunk_array = (list, integer)=>{
     
        let temp_arr = list;
        console.log('chunks',list,'integer',integer);
        const list_of_chunks = [];
        const iteration = Math.ceil(+list.length/+integer);
        // list.map(x => {console.log(x,"map")})
        for (let i;i< iteration ;i++ ){
            console.log(i);
            let temp_chunk = temp_arr.splice(6, temp_arr.length);
            list_of_chunks.push(temp_chunk); 
        }; 
        return list_of_chunks;
}

const TableArray=({details})=>{
    const data = chunk_array(details);
    console.log('data', data);
    return(
        <div className="d-flex flex-row">
            <RowArray/>
        </div>
    )
};

export default TableArray;
