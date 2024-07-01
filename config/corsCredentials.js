const allowedOrigins = require("./allowedOrigins")

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }

    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', origin); // Set CORS headers for preflight response
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.sendStatus(200); // Preflight request successful
    } else {
        next();
    }
};

module.exports = credentials;
