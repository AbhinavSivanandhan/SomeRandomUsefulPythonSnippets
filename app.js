//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const date=require(__dirname+"/date.js");
const _ = require("lodash");

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true})); // Can be true or false, but have to set a value
app.use(express.static("public"));

//mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true }); //start mongod to use this

//autogenerate admin password 
//Consider using mobile hotspot to avoid wifi denying access for security reasons
const itemsSchema={
  name: String
};

const Item=mongoose.model("Item", itemsSchema); //we call it item since we want the model to be called items automatically by mongoose

const item1=new Item({
  name: "Welcome to your todolist!"
});

const item2=new Item({
  name: "Hit the + button to add a new item."
});

const item3=new Item({
  name: "<--- Hit this to delete an item"
});

const defaultItems=[item1,item2,item3];

const listSchema={
  name: String,
  items: [itemsSchema]
};

const List=mongoose.model("List",listSchema);

app.get("/", function(req, res){
  
  Item.find({},function(err, foundItems){
  if(foundItems.length===0){
    Item.insertMany(defaultItems, function(err){
      if(err){
      console.log("Error");
      }else{
      console.log("Sucessfully added items");
      }
      });
      res.redirect("/");//so that we not just insert, but also find
  }else{
    res.render("list", {ListTitle: "Today", newListItems: foundItems}); //goes to list.ejs in views 
  }
    //console.log(foundItems);//can call it anything, finditems founditems, it's only a formal parameter remember?
});
});

app.get("/about",function(req,res){
  res.render("about");
});

app.get("/:customListName",function(req,res){
// console.log(req.params.customListName);
const customListName=_.capitalize(req.params.customListName);

List.findOne({name: customListName},function(err, foundList){
if(!err){
  if(!foundList){

    // console.log("Nothing found");
    const list=new List({
      name: customListName,
      items: defaultItems
    });
    list.save();
    res.redirect("/"+customListName);
  }else{
    // console.log("exists");
    res.render("list", {ListTitle: foundList.name, newListItems: foundList.items});
  }
}
});//note that foundItems is formal parameter


});


app.post("/",function(req,res){
  const itemName = req.body.newItem;
  const listName = req.body.list; //list is from the submit button listtitle value
  
  const item=new Item({ //create item no matter what list
    name: itemName 
  });
  if (listName=="Today"){
    item.save(); //Note: shortcut instead of using any of the insert methods
    res.redirect("/");
  } else{
    List.findOne({name: listName},function(err,foundList){//the formal parameter again, foundList, can be any name
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName); //send to the correct get route
    });
  }
  
});

app.post("/delete",function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName=req.body.listName;//listName is the name of input hidden tag
  
  if(listName==="Today"){
  
  Item.findByIdAndRemove(checkedItemId, function(err){ //callback is necessary to even run the function, even if we don't care for errors

    if(!err){
      console.log("Successfully deleted the checked item");
      res.redirect("/");
    }
  })
}else{
  //little more tricky because unlike main list, these list items are inside another document/item
  List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
    if(!err){
      res.redirect("/"+listName);
    }

  });
}

});


let port=process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}


app.listen(process.env.PORT || 3000, function(){ //process object is defined by heroku
  // adding or 3000 allows us to run locally as well as heroku
  console.log("Server is up and running!");
});