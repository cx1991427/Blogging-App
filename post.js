/**
 * Created by Xiang Cao on 7/12/2017.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://xiang:12345678@ds153412.mlab.com:53412/react-blogging-app";

module.exports = {
    addPost: function(title, subject, callback){
        MongoClient.connect(url, function(err, db) {
            db.collection('post').insertOne( {
                "title": title,
                "subject": subject
            },function(err, result){
                assert.equal(err, null);
                console.log("Saved the blog post details.");
                if(err == null){
                    callback(true)
                }
                else{
                    callback(false)
                }
            });
        });
    },
    getPost: function(callback){
        MongoClient.connect(url, function(err, db){
            db.collection('post', function (err, collection) {
                collection.find().toArray(function (err, list) {
                    callback(list);
                });
            });
        })
    }
}