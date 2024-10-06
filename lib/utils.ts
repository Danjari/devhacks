import { pipeline } from '@xenova/transformers';
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { z } from 'zod';
import { MongoClient } from 'mongodb';
import { formatDocumentsAsString } from "langchain/util/document";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAI } from "@langchain/openai";
import type { PineconeRecord, RecordMetadata } from "@pinecone-database/pinecone"; // Use 'type' for type imports
import {
    Pinecone,
    type ScoredPineconeRecord,
  } from "@pinecone-database/pinecone";
export const dimension = 1536;
export const namespace = 'resumes';
export const embeddingModel = "text-embedding-3-small"
export const documentId = 1
export const indexName = 'hrai'
export type Metadata = {
    referenceURL: string;
    text: string;
  };

// Function to generate embeddings for a given data source

export async function upsertDocument(index: any, document: any, namespaceId: string) {
    // Adjust to use namespaces if you're organizing data that way

    try{

        const namespace = index.namespace(namespaceId);

        const vectors: PineconeRecord<RecordMetadata>[] = document.embeddings.map(
            (embedding: any) => ({
                id: embedding.id,
                values: embedding.values,
                metadata: {
                text: embedding.text,
                referenceURL: document.documentUrl,
                },
            })
            );
            // Batch the upsert operation
            const batchSize = 200;
            for (let i = 0; i < vectors.length; i += batchSize) {
            const batch = vectors.slice(i, i + batchSize);
            
            await namespace.upsert(batch);
            }

    } catch(error) {
        console.log(`An error occured upserting the information, ${error}`)
    }
    
}

export async function embedChunks(chunks: string[]): Promise<any[]> {
    // You can use any embedding model or service here.
    // In this example, we use OpenAI's text-embedding-3-large model.
    try {
        const embeds = [];
        const apiKey = process.env.OPENAI_API_KEY
        if (!apiKey) return ['Unable to read the api key'] 
        const embeddings = new OpenAIEmbeddings({
            apiKey: apiKey, // In Node.js defaults to process.env.OPENAI_API_KEY
            batchSize: dimension, // Default value if omitted is 512. Max is 2048
            model: embeddingModel,
        });
        for (let i=0; i<chunks.length; i += 1){
            const embeddedChunk = await embeddings.embedQuery(chunks[i])
            // console.log(embeddedChunk)
            embeds.push(embeddedChunk);
        }


        return embeds; //return the array of embedded chunks

    } catch (error){
        console.log('Error embedding the chunks.')
        return []
    }
}

export function chunkTextByMultiParagraphs(
    text: string,
    maxChunkSize = 300,
    minChunkSize = 100
    ): string[] {
    const chunks: string[] = [];
    let currentChunk = "";
    
    let startIndex = 0;
    while (startIndex < text.length) {
        let endIndex = startIndex + maxChunkSize;
        if (endIndex >= text.length) {
        endIndex = text.length;
        } else {
        // Just using this to find the nearest paragraph boundary
        const paragraphBoundary = text.indexOf("\n\n", endIndex);
        if (paragraphBoundary !== -1) {
            endIndex = paragraphBoundary;
        }
        }
    
        const chunk = text.slice(startIndex, endIndex).trim();
        if (chunk.length >= minChunkSize) {
        chunks.push(chunk);
        currentChunk = "";
        } else {
        currentChunk += chunk + "\n\n";
        }
    
        startIndex = endIndex + 1;
    }
    
    if (currentChunk.length >= minChunkSize) {
        chunks.push(currentChunk.trim());
    } else if (chunks.length > 0) {
        chunks[chunks.length - 1] += "\n\n" + currentChunk.trim();
    } else {
        chunks.push(currentChunk.trim());
    }
    
    return chunks;
    }

export async function getEmbedding(data: any) {
    // const embedder = await pipeline(
    //     'feature-extraction', 
    //     'Xenova/nomic-embed-text-v1');
    // const results = await embedder(data, { pooling: 'mean', normalize: true });
    // console.log(`The type of the embedding is ${Array.from(results.data)}`)
    // return Array.from(results.data);
    // const embeddings = new MistralAIEmbeddings({
    //     model: "mistral-embed", // Default value
    //     dimensions: 
    //   });
    // const singleVector = await embeddings.embedQuery(data);
    // console.log(`This is your message: ${data}, and its embedding: ${[]}`)
    // return Array.from(singleVector)

    const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    dimensions: 1536,
    model: "text-embedding-3-large",
    });
    const singleVector = await embeddings.embedQuery(data);
    // console.log(`This is your message: ${data}, and its embedding: ${singleVector}`);
    return singleVector



}
export async function createVectorDB () {
    const client = new MongoClient(process.env.MONGODB_URI || '');

    try{
        
        await client.connect()
        const db = client.db('synapsED');
        const collection = db.collection('linear_algebra');
        const dbConfig = {  
            collection: collection,
            indexName: "interactive_linear_algebra", // The name of the Atlas search index to use.
            textKey: "text", // Field name for the raw text content. Defaults to "text".
            embeddingKey: "embedding", // Field name for the vector embeddings. Defaults to "embedding".
          };
        const count = await collection.countDocuments();
        if (count > 0) {
        await collection.deleteMany({});
        }
        const loader = new PDFLoader(`/Users/boubalkaly/Desktop/devhacks/ila-1553.pdf`);
        const data = await loader.load();
        const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 200,
        chunkOverlap: 20,
        });
        const docs = await textSplitter.splitDocuments(data);
        // Instantiate Atlas as a vector store
        const vectorStore = await MongoDBAtlasVectorSearch.fromDocuments(docs, new OpenAIEmbeddings(), dbConfig);
        return vectorStore

    } catch(error){
        console.log(error)
    }
}

export const systemPrompt = 'You are an expert maths tutor with a deep understanding of various mathematical concepts and their applications. You are able to craft study roadmaps tailored to a student\'s specific needs, taking into account their current skill level and the subject they are studying. Please provide the subject and the skill level for the study roadmap, and any additional information that may be relevant. Every single time, you will be given a context to answer a given question from the prompt.'

export interface Node {

    id: number,
    parents: Node[],
    length: number,
    type: string,
    dragHandle: string,
    position: {
        x: number,
        y: number
    }
}

export function calculateNodePositions(nodes: Node[]) { 
    const levelMap = new Map(); 
    const nodeMap = new Map(nodes.map(node => [node.id, node])); 

    function calculateLevel(nodeId: number, visited = new Set()): number { 
        if (visited.has(nodeId)) return 0; 
        visited.add(nodeId); 
        const node = nodeMap.get(nodeId)
        if (!node?.parents || node.parents.length === 0) return 0; 
        const parentLevels = node.parents.map(parent => calculateLevel(parent.id, visited)); 
        return Math.max(...parentLevels) + 1; 
    } 
[]
    nodes.forEach((node: Node) => { 
        const level = calculateLevel(node.id); 
        if (!levelMap.has(level)) levelMap.set(level, []); 
        levelMap.get(level).push(node); 
    }); 
    const VERTICAL_SPACING = 150;
    const HORIZONTAL_SPACING = 250; 

    levelMap.forEach((nodesInLevel, level) => { 
        const levelWidth = nodesInLevel.length * HORIZONTAL_SPACING; 
        nodesInLevel.forEach((node: Node, index: number) => { 
            node.type = 'custom'; 
            node.dragHandle = '.custom-drag-handle'; 
            node.position = { 
                x: (index * HORIZONTAL_SPACING) - (levelWidth / 2) + (HORIZONTAL_SPACING / 2), 
                y: level * VERTICAL_SPACING 
            }; 
        }); 
    }); 

    return nodes; 
} 

export interface Edge {
    id: string,
    source: Node,
    target: number,
    type: string,
    style: { strokeWidth: number},
    markerEnd: { type: string},
}

export function generateEdges(nodes: Node[]) { 
    const edges: Edge[] = []; 
    nodes.forEach(node => { 
        if (node.parents) { 
            node.parents.forEach(parentId => { 
                edges.push({ 
                    id: `e${parentId}-${node.id}`, 
                    source: parentId, 
                    target: node.id, 
                    type: 'floating', 
                    style: { strokeWidth: 1.5 }, 
                    markerEnd: { type: 'arrowclosed' } 
                }); 
            }); 
        } 
    }); 
    return edges; 
}


export async function insertInIndex(){
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || ''})
        const index = pc.index("synapsed")
        const loader = new PDFLoader(`/Users/boubalkaly/Desktop/devhacks/Syl_London_MATH-UA9140L01_Roberts.pdf`);
        const data = await loader.load();
        const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 200,
        chunkOverlap: 20,
        });
        const docs = await textSplitter.splitDocuments(data);

        // const document =  {
        //     documentId: number; // Specify the type for documentId
        //     text: string; // Specify the type for text
        //     chunks: string[]; // Define chunks as string array
        //     embeddings: any[];
        //     documentUrl: string;
        // }

        const documents = docs.map(doc => ({
            text: doc.pageContent,
            chunks: [] as string [],
            embeddings: [] as number[]
        }))


        const allChunks: string[][] = []
        const allEmbeddings: number[][] = []
        // Change forEach to for...of for async handling
        for (const doc of documents) {
            const chunks: string[] = chunkTextByMultiParagraphs(doc.text)
            const embeds = await embedChunks(chunks)
            doc.chunks = chunks;
            doc.embeddings = embeds
        }

        for(const doc of documents){
            await index.upsert([{
                id: doc.text.length.toString(),
                values: doc.embeddings,
                metadata:{
                    text: doc.text
                }
            }])
            console.log(`Created record of id: ${doc.text.length.toString()}`)
        }
}


export const pathwaySchema = z.object({
    id: z.string().describe('this is the id of the set of nodes that we want to generate'),
    title: z.string().describe("This is the title of the set. For example, if all the nodes are related to linear algebra, the title could be 'Linear Algebra Roadmap'."),
    description: z.string().describe("A description of the entire set of nodes. For example: 'this deck is catered towards getting a better understanding of linear algebra'"),
    nodes: z.array(
        z.object({
            id: z.string(),
            data: z.object({
                label: z.string(),
                type: z.enum(["Content", "Assignment", "Assessment", "Resource", "Quiz"]),
                icon: z.string(),
                description: z.string(),
                resources: z.array(
                    z.object({
                        title: z.string(),
                        url: z.string()
                    }).describe("This represents addional learning materials about the given topic")
                )
            }),
            parents: z.array(z.object({})).describe("This is also an array of nodes that are the parents or the predecessors of the current node")
        }).describe("This would be a single node and every single data that is part of it as well")
    )
});