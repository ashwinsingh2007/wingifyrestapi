"use strict"
var db = require('./db');
var InsertItem = function(auth_key, postData, html) {
    try {
        var plain_auth = auth_key.toString();
        var username = plain_auth.split(':')[0];
        var password = plain_auth.split(':')[1];
        db.Authentication(username, password, function(result) {
            if (result) {
                console.log(!!postData);
                if ((!!postData) && (Object.keys(postData).length == 5) && (!!postData.Id) && (!!postData.Name) && (!!postData.Price) && (!!postData.Description) && (!!postData.Quantity)) {
                    db.insertItems(postData.Id, postData.Name, postData.Price, postData.Description, postData.Quantity, username, function(result) {
                        if (result) {
                            html.setHeader("Content-Type", "text/html");
                            html.end("Successfully Inserted !!");
                        } else {
                            html.writeHead(403, { 'Content-Type': 'text/plain' });
                            html.end("Wrong JSON Format !! OR Item with ID is already Present!!");
                        }
                    });
                } else {
                    html.writeHead(403, { 'Content-Type': 'text/plain' });
                    html.end("Wrong JSON Format");
                }
            } else {
                html.writeHead(403, { 'Content-Type': 'text/plain' });
                html.end("Authorization Failure");
            }
        });
    } catch (ex) {
        html.writeHead(500, { 'Content-Type': 'text/plain' });
        html.end("Oops! Something went wrong.Check your request :(");
    }
}
var selectItem = function(limit, where, html) {
    try {
        limit = eval(limit);
        if (typeof limit == 'number' || limit == null) {
            db.getItems(limit, where, function(data) {
                if (!!data && data.length > 0) {
                    html.setHeader("Content-Type", "text/json");
                    html.end(JSON.stringify(data));
                } else {
                    html.writeHead(403, { 'Content-Type': 'text/plain' });
                    html.end("No Items Available !!");
                }
            });
        } else {
            html.writeHead(403, { 'Content-Type': 'text/plain' });
            html.end("Invalid Parameter");
        }
    } catch (ex) {
        html.writeHead(500, { 'Content-Type': 'text/plain' });
        html.end("Oops! Something went wrong.Check your request :(");
    }
}

var UpdateItem = function(postData, auth_key, html) {
    try {
        var plain_auth = auth_key.toString();
        var username = plain_auth.split(':')[0];
        var password = plain_auth.split(':')[1];
        db.Authentication(username, password, function(result) {
            if (result) {
                console.log("Authorized Successfully !!");
                if ((!!postData) && (Object.keys(postData).length == 5) && (!!postData.Id) && (!!postData.Name) && (!!postData.Price) && (!!postData.Description) && (!!postData.Quantity)) {
                    db.updateItems(postData.Id, postData.Name, postData.Price, postData.Description, postData.Quantity, username, function(result) {
                        if (result) {
                            html.setHeader("Content-Type", "text/html");
                            html.end("Item Updated succesfully!!");
                        } else {
                            html.writeHead(403, { 'Content-Type': 'text/plain' });
                            html.end("Wrong JSON Format !! OR Item Id doesnot exist !! OR You are not authorize to update this item as it is not created by you");
                        }
                    })
                } else {
                    html.writeHead(403, { 'Content-Type': 'text/plain' });
                    html.end("Wrong JSON Format");
                }

            } else {
                html.writeHead(403, { 'Content-Type': 'text/plain' });
                html.end("Authorization Failure");
            }
        });
    } catch (ex) {
        html.writeHead(500, { 'Content-Type': 'text/plain' });
        html.end("Oops! Something went wrong.Check your request :(");
    }
}
var DeleteItem = function(Id, auth_key, html) {
    var plain_auth = auth_key.toString();
    var username = plain_auth.split(':')[0];
    var password = plain_auth.split(':')[1];
    try {
        Id = eval(Id);
        if (typeof Id == 'number') {
            db.Authentication(username, password, function(result) {
                if (result) {
                    console.log("Authorized Successfully !!");
                    db.deleteItem(Id, username, function(data) {
                        html.setHeader("Content-Type", "text/text");
                        if (data) {
                            html.end("Item deleted succesfully !!");
                        } else {
                            html.writeHead(403, { 'Content-Type': 'text/plain' });
                            html.end("Wrong JSON Format !! OR Item Id doesnot exist !! OR You are not authorize to delete this item as it is not created by you");
                        }
                    })
                } else {
                    html.writeHead(403, { 'Content-Type': 'text/plain' });
                    html.end("Authorization Failure");
                }
            });

        } else {
            html.writeHead(403, { 'Content-Type': 'text/plain' });
            html.end("Invalid Parameter");
        }
    } catch (ex) {
        html.writeHead(500, { 'Content-Type': 'text/plain' });
        html.end("Oops! Something went wrong.Check your request :(");
    }
}

var CreateUser = function(auth_key, html) {
    var plain_auth = auth_key.toString();
    var username = plain_auth.split(':')[0];
    var password = plain_auth.split(':')[1];
    try {
        db.CreateUser(username, password, function(result) {
            if (result) {
                console.log("SignUp Successfully !!");
                html.writeHead(403, { 'Content-Type': 'text/plain' });
                html.end("SignUp Successfully !.Now login on '/login'");
            } else {
                html.writeHead(403, { 'Content-Type': 'text/plain' });
                html.end("SignUp Failure");
            }
        });
    } catch (ex) {
        html.writeHead(500, { 'Content-Type': 'text/plain' });
        html.end("Oops! Something went wrong.Check your request :(");
    }
}
var AuthenticateUser = function(auth_key, html) {
    var plain_auth = auth_key.toString();
    var username = plain_auth.split(':')[0];
    var password = plain_auth.split(':')[1];
    try {
        db.Authentication(username, password, function(result) {
            if (result) {
                console.log("Login Successfully !!");
                html.writeHead(200, { 'Content-Type': 'text/plain' });
                html.end("Login Successfully !.");
            } else {
                html.writeHead(403, { 'Content-Type': 'text/plain' });
                html.end("Login Failure.May be invalid username or password");
            }
        });
    } catch (ex) {
        console.log(ex);
        html.writeHead(500, { 'Content-Type': 'text/plain' });
        html.end("Oops! Something went wrong.Check your request :(");
    }
}

exports.AuthenticateUser = AuthenticateUser;
exports.CreateUser = CreateUser;
exports.InsertItem = InsertItem;
exports.selectItem = selectItem;
exports.UpdateItem = UpdateItem;
exports.DeleteItem = DeleteItem;