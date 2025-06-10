const http = require("http"); // http built in module in node.js
const url = require("url");  //The url package in npm is used to parse, construct, normalize, and resolve URLs. It provides utility functions to handle URLs efficiently within Node.js applications.

const fs = require("fs");

const myServer = http.createServer((req, res) => {
    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()} : ${req.url} New req recieved\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile("log.txt", log, (err, data) => {
       switch(myUrl.pathname){
        case '/': res.end("HomePage");
        break;

        case '/about': 
        const username = myUrl.query.myname;
        res.end(`hii, ${username}`);
        // res.end("I am Divya");
        break;

        default:
            res.end("404 not found");
       }
    }) 
    // console.log(req);
    // console.log("New Req recieved!!");
    // res.end("Hello From Server");

}); // will create a web server take a callBack function
//when any req came to server it runs to this callback function and send a res.



myServer.listen(8000, () => console.log("server Started"));
