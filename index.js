"use strict";
const server = require("./js/server");
const router = require("./js/router");
const requestHandler = require("./js/requestHandlers");

//Handler object
var handle = {
    "/"              : requestHandler.reqStart,
    "/reqXml"        : requestHandler.reqXml,
    "/reqJson"       : requestHandler.reqJson,
    "/js/app.js"  : requestHandler.reqJs,
    "/css/styles.css": requestHandler.reqCss,
    "/error"         : requestHandler.reqError,
};

//Start server
server.startServer(router.route, handle);