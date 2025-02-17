const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");

});

app.post("/", function(req, res){

     const query = req.body.CityName;
     const apikey = "bcf27b5d956b03f9456e9c0faecb6dba";
     const unit = "metric";
    
     const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
     https.get(url, function(response){
         console.log(response.statusCode);

         response.on("data", function(data){
             const WeatherData = JSON.parse(data)
             const temp = WeatherData.main.temp
             const weatherDescription = WeatherData.weather[0].description
             const icon = WeatherData.weather[0].icon
             const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            

             res.write("<p>The weahter is currently "+weatherDescription+".</p><br><h1>The temperature in "+query+" is "+temp+" degrees Celcius.</h1>");
             res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celcius.</h1>");
             res.write("<img src = "+imgurl+">");
             res.send();


         });
     });

});





app.listen(3000, function(){
    console.log("Server is running on 3000.");
})