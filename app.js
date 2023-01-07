const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const md5 = require("md5");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
// mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://mangesh:QYTLPQdNOFoTwxuz@cluster0.6hhshhc.mongodb.net/studentDB?retryWrites=true&w=majority").then(()=>{
    console.log("mongo connection successfully !");

}).catch((e)=>{
    console.log("Error in Conecction !"+e);
})


const studentSchema = new mongoose.Schema({
    sname: {
      type: String,
      required: true,
      default:""
    },
  
    semail: {
      type: String,
      required: true,
      unique: true,
      default:""
    },
  
    sid: {
      type: String,
      required: true,
      default:""
    },
    sroll: {
      type: String,
      required: true,
      default:""
    },
    syear: {
      type: String,
      required: true,
      default:""
    },
    sbranch: {
      type: String,
      required: true,
      default:""
    },
    spresent: {
      type: Number,
      default: 0,
    },
    stoday: {
      type: Number,
      default: 0,
    },
    simg: {
      data: Buffer,
      contentType: String,
      default:""
    }
  
    // seq: { type: Number, default: 0 }
  });
  Student = new mongoose.model("Student", studentSchema);
app.use(express.static(__dirname));
//setup for storing images 

// ==============================================
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/",(req,res)=>{
    res.sendFile('index.html', { root: __dirname });
  
})
app.get("already_submitted",(req,res)=>{
    res.sendFile("already.html")
})

app.get("/qr_attend",(req,res)=>{
    const user_email = req.query.semail;
    const user_password = req.query.sid;
    Student.findOne({
      semail: user_email,
      sid: user_password,
      
    }).then((userExist) => {
      if (userExist) {
        res.sendFile('index2.html', { root: __dirname });
      

        string = userExist._id
        console.log(userExist._id)
        string2 = string.toString()
        console.log(string2)
        Student.findByIdAndUpdate(
            { _id: string2 },
            { $inc: { spresent: 1 ,stoday:1} }
          ).exec();
      


      } else{
        res.redirect("/error");
      }
      
    });

   
  
  });


     
        





      

    
  
  

const port = process.env.PORT || 8000;

app.listen(port,(req,res)=>{
    console.log(`server running successfully on ${port}`);
})