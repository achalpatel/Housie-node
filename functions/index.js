const functions = require("firebase-functions");
const admin = require("firebase-admin");
const http = require("http");
const TAG = 'ACHAL';


admin.initializeApp();
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info(`${TAG} Hello logs!`, {structuredData: true});
  response.send("Hello from Firebase!");
  response.status(200);  
});

exports.getUserProfile = functions.https.onRequest((request, response) => {
    functions.logger.info(`${TAG} Get User Profile`, {structuredData: true});    
    let uid = request.query.uid;    
    let uri_path = `/users/userProfile/${uid}.json?ns=housieworld`;
    const options = {
        hostname : 'localhost',
        port : '9001',
        path : uri_path,
        method : 'GET'        
    }
    const req = http.request(options, res=>{
        functions.logger.info(`${TAG} status code: ${res.statusCode}`);
        res.on("data", d=>{            
            response.send(d);
            response.status(200);
        });       
    });
    req.on("error", error =>{
        functions.logger.info(`${TAG} Error ${error}`);
        response.status(404);
    });   
    functions.logger.info(`${TAG} Function ends`);
    req.end();           
})
