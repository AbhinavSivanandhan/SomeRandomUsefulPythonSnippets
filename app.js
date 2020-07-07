//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date=require(__dirname+"/date.js");
// console.log(date); wont run function
//console.log(date()); //this will
let items=["Buy Food", "Cook Food", "Eat Food"];//avoid var's for security purposes wrt scope
//note even though items will change, can have const here because const doesn't apply to items in the array, only to the array assignment itself
let workItems=[];

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true})); // Can be true or false, but have to set a value
app.use(express.static("public"));
app.get("/", function(req, res){
  // res.write("<p>Hello</p><p>how are><br></p> you<p> kf</p?");
  // res.write("<p>Hello</p><p>how are><br></p> you<p> kf</p?")
  // res.send();
  
  // var currentDay=today.getDay();
  let day=date.getDate();

  // if(currentDay === 6 || currentDay === 0) {//saturday or sunday
  

  res.render("list", {ListTitle: day, newListItems: items}); //goes to list.ejs in views
});

app.post("/",function(req,res){
  let item=req.body.newItem;
  if(req.body.list == "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work",function(req,res){
  res.render("list",{ListTitle: "Work", newListItems: workItems});
})
app.get("/about",function(req,res){
  res.render("about");
})

app.post("/work",function(req,res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.listen(8080, function(){
  console.log("Server started on port 8080.");
});
