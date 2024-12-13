import React, {Fragment} from 'react';

const ChunksTable=({data})=>{
    
    console.log("table rendered again", data);
    const errorItem = {test:1}
    const tableInput = data;
    // tableInput[0] = tableInput[0] || errorItem; 
    const columns_name = ['Drug', 'Gene', 'Phenotype', 'Drug Response Int.', 'Recommendation'];
    const query = ["DRUG_NAME", "GENE", "PHENOTYPE", "DRUG_RESPONSE", "RECOMENDATION"];
    // const {CATOGERY} = tableInput[0]; 

    const style_title = {
        marginTop: "0cm"
    }
    const style_table = {
        width:"",
        backgroundColor: "",
        marginTop: ""
    }

    // const {loading} = selector;

    // if(!loading){
    //     const each_page_height =  document.getElementsByClassName("each-page")[0]["clientHeight"] ;
    // const chunks_row_height =  document.getElementsByClassName("chunks-row")[0]["clientHeight"];
    // console.log({each_page_height, chunks_row_height}, Math.ceil((+each_page_height/+chunks_row_height)));
    // }
    const data_keys = Object.keys(tableInput[0]);
    
   
    return (
        <Fragment>
           
            
            <table style={style_table}>
                
                <thead>
                    <ChunksColumnsRow columns={columns_name}/>
                </thead>
                <tbody>
                    {tableInput.map((row,index) => {
                        return (
                            <ChunksRow key={index} row={row} columns={data_keys} query={query}/>
                        )
                    })}
                </tbody>
            </table>
        </Fragment>
    )
};

const ChunksColumnsRow=({columns})=>{
    return (
        <Fragment>
            <tr style={{color: '#F6F1F1'}} >
                {columns.map((column_name, index)=>{
                    return <th key={index} className='chunks-row chunks-row-head'>{column_name}</th>
                })}
            </tr>
        </Fragment>
    )
}

const ChunksRow=({row, columns, query})=>{
    return (
        <Fragment>
            <tr className='chunks-row'>
                {Object.keys(query).map( (name, index) => {
                    return <td key={index} className='chunks-row chunks-row-body'>{row[query[index]]}</td>
                } )}
            </tr>
        </Fragment>
    )
}

export default ChunksTable;