import { createMistral } from '@ai-sdk/mistral';
import { streamText, convertToCoreMessages, embed } from 'ai';
import { getEmbedding } from '@/lib/utils';
import { MongoClient } from 'mongodb';
import { systemPrompt } from '@/lib/utils';
import { tool } from 'ai';
import { pathwaySchema } from '@/lib/utils';
import { createVectorDB } from '@/lib/utils';
import { VectorStore } from '@langchain/core/vectorstores';
import path from 'path';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { chunkTextByMultiParagraphs } from "@/lib/utils";
import { embedChunks } from '@/lib/utils';

import { Pinecone, RecordMetadata } from "@pinecone-database/pinecone";
import { DocumentQuestionAnsweringPipeline } from '@xenova/transformers';



export async function POST(req: Request) {

    try {
            const { messages } = await req.json()

            const lastMessage = messages[0].content
            const embeddedMessage = await getEmbedding(lastMessage);

            const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || '' })
            const index = pc.index('synapsed');

            const queryResponse = await index.query({
                vector: embeddedMessage,
                topK: 3,
                includeValues: true,
                includeMetadata: true,
            });

            const matches = queryResponse.matches

        // console.log(matches)
            let context = ''

            for (const match of matches){
                const text = match.metadata?.text
                context += text
            }
            const reinforcedMessage = `$Last Message: ${lastMessage}, context: ${context}`
            const mistral = createMistral({
                baseURL: 'https://api.mistral.ai/v1',
                apiKey: process.env.MISTRAL_API_KEY,
            });
            if(!mistral) return Response.json({message: 'Unable to connect to Mistral AI'})
            const model = mistral('mistral-large-latest');
            const response = await streamText({
                model: model,
                messages:convertToCoreMessages(messages),
                system: `${systemPrompt}. START OF CONTEXT | ${reinforcedMessage} | END OF CONTEXT`,
                tools: {
                    pathway: tool({
                    description: 'A function in order to create a pathway: a set of nodes that represent a roadmap to learning about a new topic step by step. For example, linear algebr.',
                    parameters: pathwaySchema,
                    execute: async () => ({
                       
                            id: 'generated-pathway-id',
                            title: `Learning Pathway for Topics`,
                            description: `A step-by-step guide to learn about ${reinforcedMessage}`,
                            nodes: [
                            {
                                id: 'node1',
                                data: {
                                    label: 'Node 1',
                                    type: 'Content',
                                    icon: '📚',
                                    description: 'This is the first node in the pathway'
                                },
                                parents: []
                            },
                            {
                                id: 'node2',
                                data: {
                                    label: 'Node 2',
                                    type: 'Assignment',
                                    icon: '📝',
                                    description: 'This is the second node in the pathway'
                                },
                                parents: ['node1']
                            },
                            {
                                id: 'node3',
                                data: {
                                    label: 'Node 3',
                                    type: 'Assessment',
                                    icon: '📊',
                                    description: 'This is the third node in the pathway'
                                },
                                parents: ['node2']
                            }
                            ]
                      
                    }),
                    }),
                },
                
            });
            return response.toDataStreamResponse()
        

       
    } catch (error){
        console.log(error)
        return Response.json({message: 'Something went wrong generating the pathway'})
    }
    // return response.toDataStreamResponse();
}

 // ;



        
        
        


        // const { messages } = await req.json();

        // const lastMessage = messages[0].content;

        // const embeddedMessage = await getEmbedding(lastMessage);
        // if (!Array.isArray(embeddedMessage) || !embeddedMessage.every(num => typeof num === 'number')) {
        //     return Response.json({ message: 'Invalid query vector format.' });
        // }

        // console.log(`This is the embedding: ${embeddedMessage}`)

        
        


        

        // const result = collection.aggregate(pipeline);
        // if (!result){
        //     return Response.json({message: 'Unable to generate results from the aggregation pipeline.'})
        // }
        // const resultArray = await result.toArray(); // Assuming result is a cursor
        // console.log(`The length of the array is ${resultArray.length}`)
        // // const responseData = resultArray.map(doc => {
        // //     return {
        // //         // Extract only the fields you need
        // //         field1: doc.field1,
        // //         field2: doc.field2,
        // //         // ... other fields ...
        // //     };
        // // });
        // return Response.json({result: resultArray[0]}); // Send only the relevant data

        // // doifjd

        // const contextArray = [];

        // // for (const doc of resultArray){
        // //     console.log(`This is one doc: ${doc}`)
        // //     contextArray.push(doc);
        // // }

        // // if(contextArray.length == 0){
        // //     return Response.json({message: 'Unable to generate context.'})
        // // }

  

