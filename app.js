const express = require('express')
const app = express();
const ejs = require("ejs");
const e = require('express');
const https = require("https")
// 溫度轉換
function ktoC(k) {
    return (k - 273.15).toFixed(2);
}


app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs")
})


app.get("/:city", (req, res) => {
    let {
        city
    } = req.params;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;

    https.get(url, (response) => {
        console.log("statusCode", response.statusCode);
        console.log("headers", response.headers);

        response.on("data", (d) => {
            let djs = JSON.parse(d);
            let {temp} = djs.main;
            let newTemp = ktoC(temp)
            res.render("weather.ejs", {
                djs, newTemp
            })
        })
    }).on("error", e => {
        console.log(e);
    })

})


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})