var express = require('express');
var router = express.Router();
var ddb ='mongodb+srv://huyanh0109:FjdksLKD324k43JJ$@cluster0.g4sai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
var MongoClient = require('mongodb').MongoClient
const {ObjectID: ObjectId} = require("mongodb");
/* GET home page. */
var listproduct
var dbo
MongoClient.connect(ddb, function(err, db) {
  if (err) throw err;
  dbo = db.db("myFirstDatabase");
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/input',function (req,ress) {
  var id= req.body.id
  var email = req.body.email
  var address = req.body.address
  var key = req.body.key
  var myobj = {id:id,email:email,address:address,key:key}
  dbo.collection("test").insertOne(myobj, function(err, res) {
    if (err){
      throw err
      ress.redirect("/list")
    }else{
      console.log("1 document inserted");
    }
  })
})
router.post('/update', function(req, res, next) {
  var id = req.body.id
  var email = req.body.email
  var address = req.body.address
  var key = req.body.key
  const ObjectId = require('mongodb').ObjectID;
  var myobj ={$set: {id:id,email:email,address:address,key:key}}
  dbo.collection("test").updateOne({_id: ObjectId(req.body.idd)}, myobj, function(err,ress) {
    if (err) throw err;
    console.log("1 document updated");
    res.redirect("/list")
  })
})
router.get("/update/:id",function (req,res){
  dbo.collection("test").findOne({},function (err,char){
    if(err) throw  err
    else {
      console.log(req.params.id);
    }
  })
  res.render('update',{file: req.params.id});
})
router.get("/del/:id", function (req, res) {
  const ObjectId = require('mongodb').ObjectID;
  var id =req.params.id
  console.log(id)
  dbo.collection("test").deleteOne({_id: ObjectId(req.params.id)}, function (error,ress) {
    if (error) {
      console.log(error)
    }else {
      res.redirect("/list")
    }
  })
})
router.get('/list', function(req, res, next) {

  dbo.collection("test").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    listproduct = result

  });
  res.render('list', { title: 'Product', list:listproduct });
})

module.exports = router;
