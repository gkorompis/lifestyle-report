const axios = require('axios');
// const  XMLHttpRequest = require('xhr2');
const {processResult} = require('./processResult');

const test =async()=>{
    // const {data} = await axios.get('http://localhost:5000/lifestyle-result-record/1006');
    // // console.log(data)
    // console.log(data["Health"].filter(x=>x["phenotype"]=="Prostate Cancer")[0]);
    const payload = await processResult('1006');
    return payload
}

console.log(test());


// function httpGet(theUrl)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
//     xmlHttp.send( null );
//     return xmlHttp.responseText;
// }

// console.log(httpGet('http://localhost:5000/lifestyle-result-record/1006'));