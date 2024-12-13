// const AWS = require("aws-sdk");
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const {updateDictioIna, updateDictioEng} = require("./ddbUpdateLifestyleDictionary");

// const app = express();
//middlewares
// app.use(bodyParser.json({limit: "30mb", extended: true}));
// app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
// app.use(cors());

// restartLifestyleEng();
updateDictioEng();



// // publish routes on port
// const PORT = 5000;
// app.listen(PORT, ()=> console.log(`server running on port: ${PORT}`));

