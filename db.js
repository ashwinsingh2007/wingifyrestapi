"use strict"
const crypto = require('crypto');
var mysql = require('mysql');

//Enter the configuration for your sql here. 

var con = mysql.createPool({
    connectionLimit: 10,
    host: "",
    user: "",
    password: "",
    database: ""
});
var CreateUser = function(username, password, callback) {
    var query = "select username, password from StubUser where username like '" + username + "'";
    console.log(query);
    con.query(query, function(err, result) {
        console.log(result);
        if (!!result && result.length > 0) {
            callback(false);
        } else {
            const cipher = crypto.createCipher('aes192', 'password');
            var encryptedPassword = cipher.update(password, 'utf8', 'hex');
            encryptedPassword += cipher.final('hex');
            query = "insert into StubUser values ('" + username + "','" + encryptedPassword + "')";
            console.log(query);
            con.query(query, function(err, result) {
                if (err) {
                    console.log(err);
                    callback(false);
                } else {
                    callback(true);
                }
            });
        }
    });
}
var AuthenticateUser = function(username, password, callback) {
    var query = "select username, password from StubUser where username like '" + username + "'";
    console.log(query);
    con.query(query, function(err, result) {
        if (!!result && result.length == 1) {
            const decipher = crypto.createDecipher('aes192', 'password');
            var encrypted = result[0].password;
            var decryptedPassword = decipher.update(encrypted, 'hex', 'utf8');
            decryptedPassword += decipher.final('utf8');
            if (decryptedPassword == password) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });
}

var getItems = function(limit, where, callback) {
    var query = null;
    console.log(limit, where)
    if (!!limit && !!where) {
        query = "select * from ITEMS  where " + where + " limit " + limit;
    } else if (!!limit) {
        query = "select * from ITEMS limit " + limit;
    } else if (!!where) {
        query = "select * from ITEMS where " + where;
    } else {
        query = "select * from ITEMS";
    }
    console.log(query);
    con.query(query, function(err, result) {
        if (err) {
            callback("Invalid Query Request :(");
        } else {
            callback(result);
        }

    });
}
var createItems = function(Id, Name, Price, Description, Quantity, username, callback) {
    var query = "insert into ITEMS values ('" + Id + "','" + Name + "'," + Price + ",'" + Description + "'," + Quantity + ",'" + username + "');"
    console.log(query);
    con.query(query, function(err, result) {
        if (err) {
            console.log("Wrong JSON format Status:404");
            callback(false);
        } else {
            callback(true);
        }
    })
}
var deleteItem = function(itemToBeDeleted, username, callback) {
    var query = "delete from ITEMS where Id = '" + itemToBeDeleted + "' and username = '" + username + "'"; //no need to check password as it is already verifed in previous callback
    console.log(query);
    con.query(query, function(err, result) {
        if (err) {
            console.log("Wrong JSON format or Item Not Present");
            callback(false);
        } else {
            console.log(result);
            (result.affectedRows > 0) ? callback(true): callback(false)
        }
    })
}
var UpdateItem = function(Id, Name, Price, Description, Quantity, username, callback) {
    var query = "UPDATE ITEMS SET ? WHERE id = ? and username = ?"; //no need to check password as it is already verifed in previous callback
    console.log(query);
    con.query(query, [{ 'Name': Name, 'Price': Price, 'Description': Description, 'Quantity': Quantity }, Id, username], function(err, result) {
        if (err) {
            console.log("Wrong JSON format or Item Not Present");
            callback(false);
        } else {
            console.log(result);
            (result.affectedRows > 0) ? callback(true): callback(false)
        }
    })
}

exports.Authentication = AuthenticateUser;
exports.CreateUser = CreateUser;
exports.getItems = getItems;
exports.insertItems = createItems;
exports.updateItems = UpdateItem;
exports.deleteItem = deleteItem;
