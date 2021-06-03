import bcrypt from "bcrypt"
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    username:{type:String, requeired:true,unique:true},
    password:{type:String, required:true},
    name:{type:String, requried:true},
    location:String
})

UserSchema.pre('save',async function(){
    console.log("User Password : ",this.password);
    this.password = await bcrypt.hash(this.password,5);
    console.log("Hash Password :",this.password);
})

const User = mongoose.model('User',UserSchema)
export default User;