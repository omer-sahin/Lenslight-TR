import mongoose from "mongoose";
mongoose.set('strictQuery', false)
const conn = () => {
  mongoose.connect(process.env.DB_URL, {
    dbName: "Lenslight-TR",
    
  }).then(()=>{
    console.log("Connected to DB successfuly")

  }).catch((err)=>{
    console.log(`DB Connection error ${err}`);

  })

}

export default conn;