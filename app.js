import express from "express";
import ejs from "ejs";
import dotenv from "dotenv";
import conn from "./db.js"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import {v2 as cloudinary } from "cloudinary"
 import MethodOverride from "method-override";
import pageRoute from "./routes/pageRoute.js"
import photoRoute from "./routes/photoRoute.js"
import userRoute from "./routes/userRoute.js"
import { checkUser } from "./middlewares/authMiddleware.js";




dotenv.config();



cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET,
})
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
app.use(fileUpload({useTempFiles:true}))
app.use(MethodOverride("_method",{
  methods:["POST","GET"]
}))

 
app.use("*",checkUser )
app.use("/",pageRoute);
app.use("/photos",photoRoute);
app.use("/users",userRoute);




app.listen(port, host, () => {
  console.log(`Port Dinleniyor http://${host}:${port}  `);
});
