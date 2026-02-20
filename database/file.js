import { Pool } from "pg";
// for pool connection ensure the connection

// set the configuration read ans insert into process

// modular js look

// actually dotenv is nothing but an just like load the env files to the process and access through the object


const pool =new Pool(
    {
        connectionString:process.env.DATABASE_URL,
        
    }
)

export async function insertvalue(id,filename,message,expire_it) {

   const sql=` insert into safedata.encrypt(id,filename,message,expire_it)values($1,$2,$3,$4);`;

    await pool.query(sql,[id,filename,message,expire_it])
    
}


export async function displayvalue(filename) {

  const  sql=`select * from safedata.encrypt where filename=$1;`;
    const result=await pool.query(sql,[filename])
    return result.rows;


    
    
}



export async function deletedata(){

      const sql='delete from safedata.encrypt where expire_it < NOW() ;';

      const result=await pool.query(sql)

      return result.rows;


        
    }

export async function filedata(userid) {

    const sql= `select message from safedata.encrypt where id=$1;`;

    const name_of_file=await pool.query(sql,[userid])

    return name_of_file.rows;
    
}


export default pool;


// just now i really understand what is the programming language is how it works under any is all about a person mindset one who never control his
// own mind he actually cannot do anything useful and not make a great thing is all about a mindset how you think that is here needed as think why fail means 
// that fear as well as not a proper strategy to cover these kind of works till now i for my failures the one and only reason is me so i just need 
// to change myself just for the do the great stuff