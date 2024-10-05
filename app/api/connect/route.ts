import { connectToDataBase } from "../../../db/db";

export const GET = async (request: Request) => { 
  try {
    await connectToDataBase();    
    return Response.json('Successfully connected to the database')
    //return logic here    
  } catch (error) {
    //return logic here
    return Response.json('Something went wrong connecting to the db')
  }
};