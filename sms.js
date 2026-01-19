import { error } from "console"

export async function sms(to,body){


    return new Promise((resolve,reject)=>{
        try{
            console.log(` where the sms is send to ${to}:${body}`)

            resolve(true)
        }

        catch(err){
            console.log(`error occurs ${err}`)

            reject(err);
        }
    })
}