const AWS = require("aws-sdk");
const { version } = require("xlsx");
console.log('read-collection')

let awsConfig = {}
AWS.config.update(awsConfig);

// let payload;
let docClient = new AWS.DynamoDB.DocumentClient();
let getOneItem = async (input_params) => {
    console.log('processing...', input_params)
    // console.log('fetching table:', collection_name, "using key:", entry_id);
    var params = input_params;
    const payload = await docClient.get(params).promise(); 
    return payload
}
 

module.exports = {
    getOneItem,
}

// //test
// const test_input={
//     TableName: 'lifestyle-administration',
//     Key: {specimen_id: '100-130-4568'}
// }
// const testAsync = async () =>{
//     const test_output = await getOneItem(test_input);
//     console.log(test_output);
// };
// testAsync();
