//jshint eversion:6
const express= require("express");
const bodyparser=require("body-parser");
const mongoose= require("mongoose");
const date = require(__dirname+"/date.js");
console.log(date);
const app= express();
const ejs = require("ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewurlParser :true});
const itemSchema=
{
  name:String
};
const Item=mongoose.model("Item",itemSchema);
const Item1=new Item({
  name:"Welcome"
});
const Item2=new Item({
  name:"Add"
});
const Item3=new Item({
  name:"Delete"
});
const defaultitems= [Item1 ,Item2 ,Item3];


var items=["BUY FOOD", "EAT FOOD", "SERVE LUNCH"];

app.set('view engine', 'ejs');
app.get("/",function(req,res)
{
  Item.find({},function(err,founditem)
  {
    if(founditem.length==0)
    {
      Item.insertMany(defaultitems,function(err)
      {
        if(err)
        {
          console.log("error");
        }
        else
        {
           console.log("saved");
        }
      });
      res.redirect("/");
    }
    else
  {
    res.render("list",
    {
     ListTitle: "Today", newListItems:founditem
    });
  }
});
});
app.get("/work",function(req,res)
{

  res.render("list",
{
  ListTitle:"Listitems", newListItems:items
});
});
app.post("/",function(req,res)
{
const itemName = req.body.list;
const item = new Item({
  name:itemName
});
  item.save();
  res.redirect("/");
});
app.listen(3000,function()
{
    console.log("server staterd");
});
