var express=require('express')

var app=express();

var request=require('request');

app.set('view engine', 'hbs');
app.set('views','views');
var weather_json;
var city="new delhi";
var url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4ff0d5586925d643e12f9c6b601f6936`;

app.get('/', function(req,res){
    request(url,function(err,response,body){
        if(err){
            console.log(err);
        }
        else{
           // console.log(response)
            weather_json=JSON.parse(body);
            //res.send(body);
            var weather_data={
                city:city,
                temperature:Math.round(weather_json.main.temp),
                description:weather_json.weather[0].description,
                icon:weather_json.weather[0].icon
                
            };
            //res.send(weather_json)
            res.render('index',{weather_data});
        }
    })
    //res.send("hello")
})


app.get('/sanjeev',function(req,res){
    res.send(weather_json)
})

app.listen(2001,function(){
    console.log("server started at localhost://2001");
})
