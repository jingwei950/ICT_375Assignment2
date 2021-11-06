"use strict";

//Route
function route(pathName, request, response, handle){
    console.log("Routing a request for: " + pathName);

    if(handle[pathName]){
        handle[pathName](response, request, pathName);
    }
    else{
        handle['/error'](response, request, pathName);
    }
}

exports.route = route;