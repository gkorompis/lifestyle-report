const AWS = require("aws-sdk");

let awsConfig = {}
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let updateDocument = function (collection_name, key, update_expression, expression_attr) {
    var params = {
        TableName: collection_name,
        Key: key,
        UpdateExpression: update_expression,
        ExpressionAttributeValues: expression_attr,
        ReturnValues: "UPDATED_NEW"

    };
    docClient.update(params, function (err, data) {

        if (err) {
            console.log("users::update::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("users::update::success " );
        }
    });
}

module.exports = updateDocument;
        