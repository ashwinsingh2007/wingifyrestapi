"use strict"
/* 
*Declaring Litearls 
 
*/
var http = require('http');
var qs = require('querystring');
var url = require('url');
var fs = require('fs');
var db = require('./db')
var dbO = require('./DBOperations')
try {
    http.createServer(function(req, res) {
        var html = res;
        var urlParse = url.parse(req.url, true)
        var pathname = urlParse.pathname;
        var data = '';
        if (req.method == 'GET' && pathname == '/') {
            try {
                fs.createReadStream('index.html').on('data', function(chunk) {
                    data = data + chunk;
                }).on('end', function(chunk) {
                    html.end(data);
                });
            } catch (ex) {
                html.end("Internal server error!!")
            }


        } else if (req.method == 'POST' && pathname == '/signup') { //Sign Up
            var auth_key = new Buffer(req.headers.authorization.split(' ')[1], 'base64');
            dbO.CreateUser(auth_key, html);

        } else if (req.method == 'POST' && pathname == '/login') { //this login functionality was introduced for jwt and create client sessions
            var auth_key = new Buffer(req.headers.authorization.split(' ')[1], 'base64');
            dbO.AuthenticateUser(auth_key, html);

        } else if (req.method == 'POST' && pathname == '/onlinestore/products') {
            var postData = '';
            var auth_key = new Buffer(req.headers.authorization.split(' ')[1], 'base64');
            req.on('data', function(body) {
                postData = postData + body
            });
            req.on('end', function(body) {
                postData = JSON.parse(postData);
                console.log(postData);
                dbO.InsertItem(auth_key, postData, html);
            });
        } else if (req.method == 'GET' && pathname == '/onlinestore/products') {
            var auth_key = null;
            var plain_auth = null;
            var username = null;
            var param = urlParse.query;
            if (param.where == "*" && (!!req.headers.authorization)) {
                auth_key = new Buffer(req.headers.authorization.split(' ')[1], 'base64');
                plain_auth = auth_key.toString();
                username = plain_auth.split(':')[0];
                param = urlParse.query;
                param.where = "username = '" + username + "'";
                console.log(param.where);
            }
            console.log(param);
            if ((!!param.limit) && (!!param.where)) {
                dbO.selectItem(param.limit, param.where, html);
            } else if (!!param.limit) {
                dbO.selectItem(param.limit, null, html);
            } else if (!!param.where) {
                dbO.selectItem(null, param.where, html);
            } else {
                html.writeHead(404, { 'Content-Type': 'text/plain' });
                html.end("Invalid Request :(");
            }
        } else if (req.method == 'PUT' && pathname == '/onlinestore/products') {
            var postData = '';
            var auth_key = new Buffer(req.headers.authorization.split(' ')[1], 'base64');
            req.on('data', function(body) {
                postData = postData + body
            });
            req.on('end', function(body) {
                postData = JSON.parse(postData);
                console.log(postData)
                dbO.UpdateItem(postData, auth_key, html);
            });
        } else if (req.method == 'DELETE' && pathname == '/onlinestore/products/delete') {
            var param = urlParse.query;
            var auth_key = new Buffer(req.headers.authorization.split(' ')[1], 'base64');
            if (!!param.Id) {
                dbO.DeleteItem(param.Id, auth_key, html);
            } else {
                console.log(pathname);
                html.writeHead(404, { 'Content-Type': 'text/plain' });
                html.end("Invalid Request :(");
            }
        } else {
            html.writeHead(404, { 'Content-Type': 'text/plain' });
            html.end("Invalid Request :(");
        }
    }).listen(process.env.PORT || 5000);
} catch (ex) {
    html.writeHead(500, { 'Content-Type': 'text/plain' });
    html.end("Internal Server failure :(");
}