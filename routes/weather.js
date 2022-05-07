const express = require("express");
const https = require("https");
const {response} = require("express");
const router = express.Router();

router
    .route("/")
    .post((req,res) => {
        let url1="https://ipwhois.app/json/";
        https.get(url1,(response)=>{
            response.on('data', (d) => {
                let json=JSON.parse(d);
                let city=json.city;
                let apikey="bc136c5bd5a26acd2e1119f092ce88ca"
                let url2="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+apikey;
                https.get(url2,(response2)=>{
                    response2.on('data',(d2)=>{
                        let json2=JSON.parse(d2);
                        let main=json2.weather[0].main;
                        let description=json2.weather[0].description;
                        let icon=json2.weather[0].icon;
                        let windSpeed=json2.wind.speed;
                        let temp=json2.main.temp;
                        let head="<!DOCTYPE html>\n" +
                            "<html>\n" +
                            "<head>\n" +
                            "    <script src=\"https://kit.fontawesome.com/a11c966e05.js\" crossorigin=\"anonymous\"></script>\n" +
                            "    <meta charset=\"utf-8\">\n" +
                            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
                            "    <title>Weather</title>\n" +
                            "    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n" +
                            "    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n" +
                            "</head>";
                        let ans=head+"<body style='margin: 0;'>\n<div style='background-color: black;color: white;width: 100vw;height: 100vh;padding: 10px;'>\n";
                        ans+="<h1>Weather in "+city+"</h1>";
                        ans+="<h2>"+temp+"°C</h2>";
                        let url3="https://openweathermap.org/img/wn/" + icon + ".png";
                        ans+="<div style='display: flex;flex-direction: row;'>\n<img src=\""+url3+"\"> <div style='line-height: 50px;text-transform: capitalize;'>"+description+"</div></div><br>";
                        ans+="<div>Wind speed: "+windSpeed+" km/h <i class=\"fa-solid fa-wind\"></i></div></div>\n</div>\n</body>";
                        res.send(ans);
                    })
                })
            });
        });
    })

module.exports = router;