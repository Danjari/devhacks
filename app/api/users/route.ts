import { MongoClient, ServerApiVersion } from 'mongodb'
    
export async function GET(req: Request, res: Response) {
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

    try{
        await client.connect();
        await client.db('sample_mflix').createCollection('newCollection');
        return Response.json({message: 'successfully connected to mongoDB'})
    } catch(error){
        console.log(error);
        return Response.json({message: 'something went wrong connecting to the db'})
    }

}