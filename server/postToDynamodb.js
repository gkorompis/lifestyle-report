const AWS = require("aws-sdk");

let awsConfig = {};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let postNewCollection = async function (collection_name, new_insert) {
    var params = {
        TableName: collection_name,
        Item: new_insert,
    };
    docClient.put(params, function (err, data) {
        if (err) {
            console.log("users::postNewCollection::error - " + JSON.stringify(err, null, 2));                      
        } else {
            console.log("users::postNewCollection::success" );                      
        }
    });
}

module.exports = postNewCollection;