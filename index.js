const express = require('express');
const app = express();
const cors = require("cors");
require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
app.use(cors());
app.use(express.json());
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
app.get("/", (req, res) => {
    res.send("Backend Github AI")
})
app.get("/getToken", async (req, res) => {
    console.log(req.query.code);
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;
    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((res) => res.json()).then((data) => {
        res.json(data)
    })
})
app.listen(8080, () => {
    console.log("started")
})