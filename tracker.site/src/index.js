const express = require( "express" );
const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

const trackImg = new Buffer("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");
app.get( "/track", ( req, res ) => {
    res.writeHead(200, {
        "Content-Length": trackImg.length,
        "Content-Type": "image/gif"
    });

const address = req.connection.remoteAddress;
const ip = req.ip;

res.end(trackImg);
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );