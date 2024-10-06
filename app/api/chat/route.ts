import { createMistral } from '@ai-sdk/mistral';
import { streamText, convertToCoreMessages } from 'ai';
import { getEmbedding } from '@/lib/utils';
import { MongoClient } from 'mongodb';
import { systemPrompt } from '@/lib/utils';

export async function POST(req: Request) {

    const client = new MongoClient(process.env.MONGODB_URI || '');


    const { messages } = await req.json();

    const lastMessage = messages[0].content;

    const embeddedMessage = getEmbedding(lastMessage);

    await client.connect();
    const db = client.db("rag_db");
    const collection = db.collection("test");
    const pipeline = [
        {
            $vectorSearch: {
                index: "linear_algebra",
                queryVector: embeddedMessage,
                path: "plot_embedding",
                exact: true,
                limit: 10
            }
        },
        {
            $project: {
                _id: 0,
                document: 1,
            }
        }
    ];
    const result = collection.aggregate(pipeline);

    const contextArray = [];

    for await (const doc of result){
        contextArray.push(doc);
    }

    const context = contextArray.join(" ");
    console.log(`This is the provided context ${context}`);

    const mistral = createMistral({
        baseURL: 'https://api.mistral.ai/v1',
        apiKey: process.env.MISTRAL_API_KEY,
      });
    const model = mistral('mistral-large-latest');
    const text  = await streamText({
        model: model,
        messages: convertToCoreMessages(messages),
        system: `${systemPrompt}. START OF CONTEXT | ${context} | END OF CONTEXT`
      });

    return text.toDataStreamResponse();
}

