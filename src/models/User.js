import bcrypt from "bcrypt"
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    socialOnly:{type:Boolean, default:false},
    avatarURL:String,
    username:{type:String, requeired:true,unique:true},
    password:{type:String},
    name:{type:String, requried:true},
    location:String,
    videos:[{type:mongoose.Schema.Types.ObjectId, ref:"Video"}],
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}]
})

UserSchema.pre('save',async function(){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,5);
    }
})

const User = mongoose.model('User',UserSchema)
export default User;