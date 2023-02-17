import express from "express";
import ejs from "ejs";
import dotenv from "dotenv";
import conn from "./db.js"
import pageRoute from "./routes/pageRoute.js"




dotenv.config();
//! Connection to hte DB 
conn();
const app = express();
const port = process.env.PORT
const host = "127.0.0.1";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/",pageRoute);


app.listen(port, host, () => {
  console.log(`Port Dinleniyor http://${host}:${port}  `);
});
