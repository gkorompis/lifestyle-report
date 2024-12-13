 console.log('------')
 
 const AWS = require('aws-sdk');

 let awsConfig = {}
AWS.config.update(awsConfig);

 var dynamoClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: "lifestyle-dictio",// give it your table name 
    Select: "ALL_ATTRIBUTES"
  };

  dynamoClient.scan(params, function(err, data) {
    if (err) {

       console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        const payload = data;
        // const payload = JSON.stringify(data, null, 2)
       console.log("GetItem succeeded:", payload.Items[0]);
    }
  });