import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid'

const {Schema }= mongoose;

const userSchema = new Schema({
  id:{
    type: String,
    default: () => uuidv4(), 
  },
  first_name:{
    type:String,
    required:true
  },
  last_name:{
  type:String,
  required:true
  },
  password:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  role:{
    type:String,
    required:true,
    enum:['admin','user'],
    default:'user'
  },
 
})

const User = mongoose.model('User', userSchema)
export {User}