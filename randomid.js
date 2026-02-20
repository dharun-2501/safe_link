import { randomUUID } from "crypto";

import express from "express";

import { getrandomuuid } from "./database/display.js";


const app=express();

app.use(express.json()); // parsing the data before converts json string into a object


const id=randomUUID();

console.log(id)

app.post('/getrandom',(req,res)=>{
    const msg= req.body ;

    const processed= getrandomuuid();


    console.log(processed);

   
    res.json({
        message:msg,
        idvalue:processed
    })
})

app.listen(3949,()=>{
    console.log("server is listening on the port 3949")
})
