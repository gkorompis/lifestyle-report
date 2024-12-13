const AWS = require("aws-sdk");
console.log('read-collection')

let awsConfig = {}
AWS.config.update(awsConfig);

// let payload;
let docClient = new AWS.DynamoDB.DocumentClient();
let fetchOneByKey = async (collection_name, entry_id) => {
    console.log('fetching table:', collection_name, "using key:", entry_id);
    var params = {
        TableName: collection_name || 'Lifestyle',
        Key: {"entry_id": entry_id}
    };
    
    // console.log('params', params)
   let payload = await docClient.get(params).promise();
   console.log('payload--', payload)
    // , (err, data)=> {
    // // console.log('parameters::payload -', params)
    //     if (err) {
    //         console.log("payload---", err)
    //         // console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
    //     }
    //     else {
    //         console.log("payload---")
    //         payload = data;
    //         // console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
    //     }
    // });
    return payload;
}
console.log('fetch---')
fetchOneByKey('lifestyle-dictionary', 'db1002');

// module.exports = fetchOneByKey;
