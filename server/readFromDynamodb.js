const AWS = require("aws-sdk");
const { version } = require("xlsx");
console.log('read-collection')

let awsConfig = {}
AWS.config.update(awsConfig);

// let payload;
let docClient = new AWS.DynamoDB.DocumentClient();
let fetchOneDictioTable = async (collection_name, entry_id, version_id) => {
    console.log('fetching table:', collection_name, "using key:", entry_id);
    var params = {
        TableName: collection_name || 'lifestyle-dictio',
        Key: {'entry_id': entry_id || 'db1001', 'version': version_id || '1001'}
    };
    const payload = await docClient.get(params).promise();
    // console.log('payload--', payload)
    return payload
}
let fetchOneResultTable = async (collection_name, entry_id, version_id) => {
    console.log('fetching table:', collection_name, "using key:", entry_id);
    var params = {
        TableName: collection_name || 'lifestyle-dictio',
        Key: {'entry_id': entry_id || 'db1001', 'version': version_id || '1001'}
    };
    const payload = await docClient.get(params).promise();
    // console.log('payload--', payload)
    return payload
}

// console.log('fetch---')
// fetchOneByKey('lifestyle-dictio', 'db1001', '1001');

module.exports = {
    fetchOneDictioTable,
    fetchOneResultTable
}
