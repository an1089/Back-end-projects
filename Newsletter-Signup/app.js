const express=require("express");
const bodyparser= require("body-parser");
const request=require("request");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res)
{
    var f1=req.body.firstname;
    var f2=req.body.secondname;
    var em=req.body.email;
    console.log(f1,f2,em);
})
app.listen(3000,function()
{
    console.log("Server in running");
});
//c0044d34b0d6da972f16cee07e21c4ec-us17