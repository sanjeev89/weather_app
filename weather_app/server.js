var express=require('express');

var app=express();
var path=require('path');

var request=require('request');
app.use(express.static('views'));
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.set("view engine", "hbs");
app.set('views',path.join(__dirname,'views'));
//app.use(express.static('views'));
var weather_json;
var city="Delhi";

function show_data(){

}

var weather_data={};
app.get('/', function(req,res){
    
    res.render('index1');
    
})

app.post('/',function(req,res){
    console.log("gvhg")
      var city=req.body.city;
      console.log(city);
        var url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4ff0d5586925d643e12f9c6b601f6936`;
        
        request(url,function(err,response,body){
        if(err){
            console.log(err);
        }
        else{
           // console.log(response)
            weather_json=JSON.parse(body);
            console.log(weather_json.length);
            console.log(weather_json);
            if(weather_json.cod=='404')
            {
                res.send("Error! wrong input")
            }
            //res.send(body);
            //console.log((weather_json=='404'));
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
                sunrise:Unix_timestamp(weather_json.sys.sunrise),
                above:Unix_timestamp2()+", "+day(),
                below:dayn()+", "+month()+", "+year() 
            };
            console.log(weather_data);
            res.render('index',{weather_data});
        }
    })
})


app.get('/sanjeev',function(req,res){
    res.render('index',{weather_data});
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
function Unix_timestamp2()
{
    var t=new Date();
var dt = new Date();
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
//console.log(Unix_timestamp(weather_data.dt_time));()

function month(){
    var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var n = month[d.getMonth()];
return n;
}

function day(){
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    
    var n = weekday[d.getDay()];
    return n;
}

function year(){
    var d=new Date();
    var n=d.getFullYear();
    return n;
}

function dayn()
{
    var d=new Date();
    return d.getDate();
}


