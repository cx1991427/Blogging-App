/**
 * Created by Xiang Cao on 7/11/2017.
 */
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");

var url = "mongodb://xiang:12345678@ds153412.mlab.com:53412/react-blogging-app";

module.exports = {
    signup: function(name, email, password){
        MongoClient.connect(url, function(err, db) {
            // console.log('connected')
            db.collection("user").insertOne({
                "name":name,
                "email":email,
                "password":password
            },function (err,result) {
                assert.equal(err,null);
                console.log("saved user sign up info!");
            })
        });
    },

    validateSignIn: function(username, password,callback){
        MongoClient.connect(url, function(err, db){
            db.collection('user').findOne( { email : username ,password: password
            },function(err, result){
                if(result==null){
                    console.log('not found')
                    callback(false)
                }
                else{
                    console.log('found it')
                    callback(true);
                }
            });
        });
    }
}