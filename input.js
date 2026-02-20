import express from 'express';
import bodyParser from 'body-parser';
// here actually body parser is nothing but it handles a before move to route convert them into json object from form data

import multer from 'multer';
// multer for file handling to store in a local file 
import path from 'path';

import fs, { link } from 'fs';

import {getdata} from './textencrypt.js';
import {main2} from './database/display.js';
import {getrandomuuid} from './database/display.js'

import rateLimit from 'express-rate-limit'; // for to maintain the views how many request as per certain minutes 

import { filedata } from './database/file.js';

import {fileURLToPath} from "url";
import cors from'cors';


const app= express();
// here it is server setup without using a http request 

const file_name=fileURLToPath(import.meta.url);
const dir_name=path.dirname(file_name)

console.log("STATIC PATH → ", path.join(dir_name,'public'));

app.use(express.static(path.join(dir_name,'public')))


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));


app.use(bodyParser.json());
// for convert the json strings to json object

app.use(bodyParser.urlencoded({extended:true}));


const limiter=rateLimit({
    windowMs:5*60*1000,
    limit:5,
    message:{error:"max requests so further after a limit time exceeds only"}
})


app.use('/fetch/',limiter);

let data=null;

// here url encoded are for safety when user send data through a form is really safe one and convert the characters or sybmols as + and xx

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        // here the req is from method of post and file user send it and cb is call back  called if it is done

        const upload="./uploads";

        if(!fs.existsSync(upload)){
            fs.mkdirSync(upload)

        }

        cb(null,upload)
    },

    filename:(req,file,cb)=>{
        const uniquename=Date.now()+"-"+file.fieldname+path.extname(file.originalname);
        cb(null,uniquename)
    }
})


const uploaded=multer({storage})



let stored_decrypt=null;


app.post('/send',uploaded.single('file2'),async(req,res)=>{
    



    const text=req.body.textinput;
    const file=req.file

    

    // here i just pass that parameter data to for encryption 
      
       let { ciphertext, iv, auth, key,decrypt_value } = getdata(req);


       console.log("the secure text is ",ciphertext)



       stored_decrypt=decrypt_value;
       
         const id =  await main2(ciphertext);
        const link=`http://localhost:3838/fetch/${id}`;
    
   

    if(text){
        console.log("the user entered input is ",text)
    }

    if(file){
        console.log("the file if received means ",file.filename);
    }


    res.json({
        message:"file received ",
        files:req.file.filename,
        userinput:text,
        link
    })
})


app.get('/fetch/:id',async(req,res)=>{
    console.log("here it serves")

    const userid=req.params.id;

    console.log("the user requested id is",userid);

    const file_data= await filedata(userid) ;

    console.log(file_data)
    
    res.json({
        message:"success..",
        user_file:file_data,
        current:req.rateLimit.current,
        limit:req.rateLimit.limit,
        remain:req.rateLimit.remaining,
        decrypted_value:stored_decrypt,
    })
})


app.listen(3000,()=>{
    console.log("server is listening on the port 3000")
})
// where i have to be done many thing i can need to 




// here are there only few tips i have to say one more thing that is need an alter focus for that your goal
// first need an how can i manage this kind of problems every thing looks difficult until you learn so make a proper strategy plan and develop your skills 

// 



// i can handle the app 
/*
 import express from 'express';

 const app =express();

 app.use(express.json());// middleware 


 app.get('/get',(req,res)=>{

    res.json({
    message:"success"})
    })


app.listen(3939,()=>{
    console.log("server is listen on the port")})
*/