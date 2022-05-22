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
                        let url="https://openweathermap.org/img/wn/" + icon + ".png";
                        res.render("weather",{
                            city: city,
                            temp: temp,
                            url: url,
                            description: description,
                            windSpeed: windSpeed
                        })
                    })
                })
            });
        });
    })

module.exports = router;