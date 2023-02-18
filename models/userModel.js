import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username Alanı boş bırakılamaz"],
      lowercase: true,
      validate: [validator.isAlphanumeric,"Sadece Alfanumerik karakterler giriniz lütfen"]
    },
    email: {
      type: String,
      required: [true, "Email Alanı boş bırakılamaz"],
      unique: true,
      validate: [validator.isEmail, " Mail alanına mail girmek zorunludur  "],
    },
    password: {
      type: String,
      required: [true, "Password Alanı boş bırakılamaz"],
      minlength: [6, "En az 8 karakter girmelisiniz"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
 
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
  
    next();
  });
});

const User = mongoose.model("user", userSchema);

export default User;
