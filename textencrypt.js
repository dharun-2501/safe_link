import crypto from 'crypto';



function encryptionwork(data,key){

    const iv=crypto.randomBytes(12); // initialization vector

    const cipher=crypto.createCipheriv('aes-256-gcm',key,iv);

    const ciphertext=Buffer.concat([cipher.update(data),cipher.final()]); // here it pass the data to that instance and then here final it flushes until any data remaining

  const auth=  cipher.getAuthTag();

  return {auth,ciphertext,iv}

}


function decryptionwork({auth,ciphertext,iv},key){

    const decipher=crypto.createDecipheriv('aes-256-gcm',key,iv);

    decipher.setAuthTag(auth); // verify the data could not be modified 

    const value=Buffer.concat([decipher.update(ciphertext),decipher.final()]) // just like that parsing the encrypted into buffer

    return value ;
}



 export function getdata(req){


const text=req.body.textinput;

const textdata=Buffer.from(text,'utf-8');// utf 8 is nothing but is a for all kind of language it supports it easily encode the characters 

// gcm is galio counter mode is one kind of algorithm for encrypting the data


const key=crypto.randomBytes(32);
//here create key for encryted data with intialzation vector for make unique even if same text repeat it create a unique iv 

console.log("the encrypted text should be use aes 256 gcm....");

const{auth,ciphertext,iv}=encryptionwork(Buffer.from(textdata),key);

console.log("after encrypted....",ciphertext.toString('hex'));
const plain = decryptionwork({auth,ciphertext,iv},key)


console.log(" the original value is ",plain.toString());




return {
  ciphertext: ciphertext.toString("hex"),
  iv: iv.toString("hex"),
  auth: auth.toString("hex"),
  key: key.toString("hex"),
  decrypt_value:plain.toString()
};


 }


 


 


 //actually encryption is here starts when use the algorithm and then with random key and iv 




