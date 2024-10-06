import { MongoClient, ServerApiVersion } from 'mongodb'
    
export async function POST(req: Request, res: Response) {
    
    try{
        const database = 'synapsED';
        const collection = 'users'
        const client = new MongoClient(process.env.MONGODB_URI || '', {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      if (!client){
        return Response.json({message: 'failed to initialize the client'})
      }
        const userData = await req.json()
        console.log(userData)
        await client.connect();
        const db  = await client.db(database)
        const user = db.collection(collection).find({_id: userData?.id})

        if(!user){
            db.collection(collection).insertOne({
                _id: userData?.id,
                email: userData?.email,
                firstName: userData?.firstName,
                lastName: userData?.lastName,
            })
            return Response.json({message: 'successfully connected to mongoDB'})
        } else {
            return Response.json({message: "User is already in MongoDB"})
        }
        
    } catch(error){
        console.log(error);
        return Response.json({message: 'something went wrong connecting to the db'})
    }

}