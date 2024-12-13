import React, {Fragment} from 'react';

const ChunksTable=({data})=>{
    console.log("table rendered again")
    const columns_name = Object.keys(data[0]);
    return (
        <Fragment>
            <table>
                <thead>
                    <ChunksColumnsRow columns={columns_name}/>
                </thead>
                <tbody>
                    {data.map((row,index) => {
                        return (
                            <ChunksRow key={index} row={row} columns={columns_name}/>
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
            <tr style={{color: '#332D2D'}} >
                {columns.map((column_name, index)=>{
                    return <th key={index} className='chunks-row chunks-row-head'>{column_name}</th>
                })}
            </tr>
        </Fragment>
    )
}

const ChunksRow=({row, columns})=>{
    return (
        <Fragment>
            <tr className='chunks-row'>
                {Object.keys(row).map( (name, index) => {
                    return <td key={index} className='chunks-row chunks-row-body'>{row[columns[index]]}</td>
                } )}
            </tr>
        </Fragment>
    )
}

export default ChunksTable;