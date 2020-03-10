const express = require("express");
const moment = require("moment");
const app = express();
const port = process.env.PORT || 8080; // default port to listen
const fs = require('fs');

startupTask = () => {

    if (!fs.existsSync("log.txt")) {

        fs.open('log.txt', 'w', function (err, file) {
            if (err) throw err;
            console.log('Saved!');
        });
    }

}

startupTask();

// define a route handler for the default home page
app.get("/", (req, res) => {

    fs.readFile('log.txt', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
    
});

const trackImg = new Buffer("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");
app.get("/track", (req, res) => {
    res.writeHead(200, {
        "Content-Length": trackImg.length,
        "Content-Type": "image/gif"
    });

    const address = req.connection.remoteAddress;
    const ip = req.ip;

    fs.appendFile("log.txt", `${address} ${ip} ${moment(Date.now()).format()}\n`, (err) => {

            console.log(err);
    });
    
    res.end(trackImg);


});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});