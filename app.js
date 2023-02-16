import express from "express";
import ejs from "ejs";
import dotenv from "dotenv";

import conn from "./db.js"





dotenv.config();
//! Connection to hte DB 
conn();
const app = express();
const port = process.env.PORT
const host = "127.0.0.1";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, host, () => {
  console.log(`Port Dinleniyor http://${host}:${port}  `);
});
