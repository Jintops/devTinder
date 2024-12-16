const mongoose = require('mongoose');
const validator=require('validator')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:25,
       
    },
    lastName:{
        type:String,
        minLength:1,
        maxLength:15,
    },
    emailId:{
        type:String,
        required:true,
        unique: true,
        trim:true, 
     validate(value){
        if(!validator.isEmail(value)){
            throw new Error('email is not validd....'+value)
        }
     }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('password is not validd....'+value)
            }
         }
        
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String, 
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.iconfinder.com/icons/1988458/dummy_human_mannequin_user_account_blank_face_profile_icon"
    },
    about:{
        type:String,
        default:"This is a default about of the userrrr.."
    },
    skills:{
        type:[String],
    }
},{timestamps: true});
   
userSchema.methods.getJWT = async function (){
    const user=this;
    const token=await jwt.sign({_id:user._id},"DEV@Tinder$790", { expiresIn: '1h' });
   return token;
}

userSchema.methods.validatePassword= async function(passwordInputByUser) {
     const user=this;
     const passwordHash=user.password;
     const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
     
     return isPasswordValid;
}
module.exports = mongoose.model("User", userSchema);