import express from "express";
import ejs from "ejs";
import dotenv from "dotenv";
import conn from "./db.js"
import cookieParser from "cookie-parser";

import pageRoute from "./routes/pageRoute.js"
import photoRoute from "./routes/photoRoute.js"
import userRoute from "./routes/userRoute.js"
import { checkUser } from "./middlewares/authMiddleware.js";




dotenv.config();
//! Connection to hte DB 
conn();
const app = express();
const port = process.env.PORT
const host = "127.0.0.1";

app.set("view engine", "ejs");



  
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.get("*",checkUser )
app.use("/",pageRoute);
app.use("/photos",photoRoute);
app.use("/users",userRoute);




app.listen(port, host, () => {
  console.log(`Port Dinleniyor http://${host}:${port}  `);
});
