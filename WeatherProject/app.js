const express= require("express");
const app= express();
const https= require("https");
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
    res.sendFile(__dirname +"/index.html");
});
app.post("/",function(req,res)
{
    
    const query = req.body.cityName;
    const app = "cbfa46912d90c64644333a52bd669e6f";

    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + ",uk&appid="+ app;
    https.get(url,function(response)
    {
        console.log(response.statusCode);

        response.on("data",function(data)
        {
            const d=JSON.parse(data);
            const w = d.main.temp
            res.write("The Weather in "+query+" is "+w+"degree celcius");
            res.send();
            
        });
    });
});
app.listen(3000,function()
{
    console.log("start");
});