import cron from 'node-cron';
import path from 'path';
import fs from 'fs';

import express from 'express';

// file deleted automatically after a expire time exceeds 

const folder_Path='./uploads';
const expire_time=4*60*1000 ;


const app =express();


app.get('get1',(req,res)=>{
    console.log("the file was delete based on node cron")

    res.json({message:'it was delete for every 2 minutes'})
})



cron.schedule('*/2 * * * *',()=>{
    console.log("node cron job was setup");

    fs.readdir(folder_Path,(err,files)=>{
        if (err) return console.log("no folder found");


        files.forEach(file =>{
            const filepath=path.join(folder_Path,file)


            fs.stat(filepath,(err,stats)=>{
                if(err) return console.log("file  information was not founded")

                    const date=Date.now();
                    const fileage=date-stats.mtimeMs;

                    if(fileage>expire_time){
                        fs.unlink(filepath,()=>{
                            console.log(`file was deleted ${file}`)
                        })
                    }
            })
        })


    })
})


app.listen(3349,()=>{
    console.log("server is listening on the port 3349")
})


// first set the cron schedule and then chech the folder exists in readdir and if exists loop the each files and then add the folder path to file path 
// and then after add the path check the file stats through stats to calculate the modified time and then check fileage is it expire time greater means
// unlink the file from the folder (i.e) delete the file

// file deleted is done through the cron job after a scheduled time was expired 

// remember cron job schedule was run only on when server is initiated 
//rate limit is to analyse how many time user can visit and prevent if limits exceeds and then redis is used for store the data temporarily on ram 
// after a certain minutes it disappear from an ram and delete on server side 


// why the all files are deleted means these are older because the modified time is greater than to expire time that 's why this files  are deleted
// and i edit or change the content of this file modified time is lesser than expire time so this file remains not deleted




