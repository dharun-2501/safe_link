import express from "express";
import path from "path";
import {fileURLToPath} from "url";// mostly the es module does not default give it so by use the url of current file to path



const app=express();

const file_name=fileURLToPath(import.meta.url); // just like import the information of current file url (meta information about that file)
const dir_name=path.dirname(file_name) // it actually separate the file from extract the folder where the file located 


app.use(express.static(path.join(dir_name,'public'))) // actually serve the all files under an directory public all files should be static


app.post('/post',(req,res)=>{
    console.log('now under this  directory all flies should be serve as a static files')
})

app.listen(3389,()=>{
    console.log("server is listen on the port 3389");
})


