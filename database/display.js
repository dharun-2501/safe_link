import { insertvalue,displayvalue,deletedata } from "./file.js";

import { randomUUID } from "crypto";




let idvalue=null; // before null it can be used later 


export function getrandomuuid(){


    return idvalue;

}

 export async function main2(encryptdata) {

    let  filename='filename.text';

    idvalue=randomUUID();

    
    console.log(idvalue);
    const expire_it= new Date(Date.now() + 5 * 60 * 1000);  

    await insertvalue(idvalue,filename,encryptdata,expire_it);


    const result=await displayvalue(filename);

    console.log(result)


    const deletedata_rows=await deletedata();

    console.log(deletedata_rows);

    return idvalue ;

    
}





