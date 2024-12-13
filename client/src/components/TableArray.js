import React from 'react';



const RowArray=()=>{
    
    return(
        <div>
            <h1>Row Array</h1>
        </div>
    )
};

 const chunk_array = (list, integer)=>{
        let index = Object.keys(list);
        const iteration_times = Math.ceil(+index.length/+integer);
        let temp = index.splice(iteration_times+1, +index.length);
       console.log({temp, index, iteration_times, index_length: index.length});
        let list_of_chunks = [];
        Object.keys(index).map(x =>{
            list_of_chunks.push(x);
        })


        // console.log('chunking', list, integer)
        let temp_arr = list;
        // console.log('chunks',list,'integer',integer);
        // const list_of_chunks = [];
        
        // list.map(x => {console.log(x,"map")})
        
        // [1,2,3,4].map(x =>{console.log(x)});
        // console.log("list_of_chunks", list_of_chunks,'chunks',list,'integer',integer);
        return index;
}



const TableArray=({details})=>{
    console.log({details});
    let chunk = chunk_array(details);
    console.log({chunk});
    // const data = chunk_array(details, 6);
    // console.log('data', data);
    return(
        <div className="d-flex flex-row">
            <RowArray/>
        </div>
    )
};

export default TableArray;
