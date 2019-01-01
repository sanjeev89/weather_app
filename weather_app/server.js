var express=require('express')

var app=express();

var request=require('request');

app.set('view engine', 'hbs');
app.set('views','views');
var weather_json;
var city="Delhi";
var url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4ff0d5586925d643e12f9c6b601f6936`;
var weather_data={};
app.get('/', function(req,res){
    request(url,function(err,response,body){
        if(err){
            console.log(err);
        }
        else{
           // console.log(response)
            weather_json=JSON.parse(body);
            //res.send(body);
            var d=new Date();
            var t=d.getTime();
             weather_data={
                city:city,
                temperature_cel:Math.round(weather_json.main.temp)-273+"° C",
                temperature_far:Math.round(((Math.round(weather_json.main.temp))-273)*1.8+32)+"° F",
                description:weather_json.weather[0].description,
                icon:weather_json.weather[0].icon,
                temp_min:Math.round(weather_json.main.temp_min)-273+"° C",
                temp_max:Math.round(weather_json.main.temp_max)-273+"° C",
                humidity:weather_json.main.humidity+"%",
                pressure:weather_json.main.pressure+"hPa",
                wind_speed:weather_json.wind.speed+"m/sec",
                wind_deg:weather_json.wind.deg+"°",
                dt_time:Unix_timestamp(t-weather_json.dt),
                sunset:Unix_timestamp(weather_json.sys.sunset),
                sunrise:Unix_timestamp(weather_json.sys.sunrise)    
            };
            console.log(weather_data);
            res.render('index',{weather_data});
        }
    })
    //res.send("hello")
})


app.get('/sanjeev',function(req,res){
    res.send(weather_json)
    console.log(Unix_timestamp(weather_data.dt_time));
})

app.listen(2001,function(){
    console.log("server started at localhost://2001");
})

function Unix_timestamp(t)
{
var dt = new Date(t*1000);
var hr = dt.getHours();
var m = "0" + dt.getMinutes();
var s = "0" + dt.getSeconds();
if(hr>=12)
{
   hr=hr%12;
   return hr+ ':' + m.substr(-2) + ':' + s.substr(-2)+" PM";  
}
else
return hr+ ':' + m.substr(-2) + ':' + s.substr(-2)+" AM";  
}
//console.log(weather_data.dt_time)
//console.log(Unix_timestamp(weather_data.dt_time));

