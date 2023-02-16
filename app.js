import express from "express";

const app = express();


const port=3000;
const host="127.0.0.1";



app.get("/",(req,res)=>{
    res.end("Se")

})


app.listen(port,host,()=>{
    console.log(`Port Dinleniyor http://${host}:${port}  `)
})
