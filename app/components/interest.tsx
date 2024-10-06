// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';
// import { processDocuments, queryVectorStores } from '../../utils/documentProcessor';
// import path from 'path';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const DATA_DIR = path.join(process.cwd(), 'app', 'api', 'pathways', 'data');


// // We'll use this to store our indices
// let indices = null;

// const pathwaySchema = {
//   type: "object",
//   properties: {
//     id: { type: "string" },
//     title: { type: "string" },
//     description: { type: "string" },
//     nodes: {
//       type: "array",
//       items: {
//         type: "object",
//         properties: {
//           id: { type: "string" },
//           data: {
//             type: "object",
//             properties: {
//               label: { type: "string" },
//               type: { type: "string", enum: ["Content", "Assignment", "Assessment", "Resource", "Quiz"] },
//               icon: { type: "string" },
//               description: { type: "string" },
//               resources: {
//                 type: "array",
//                 items: {
//                   type: "object",
//                   properties: {
//                     title: { type: "string" },
//                     url: { type: "string" }
//                   }
//                 }
//               }
//             },
//             required: ["label", "type", "icon", "description"]
//           },
//           parents: {
//             type: "array",
//             items: { type: "string" }
//           }
//         },
//         required: ["id", "data", "parents"]
//       }
//     }
//   },
//   required: ["id", "title", "description", "nodes"]
// };

// export async function POST(req) {
//     try {
//       const { prompt } = await req.json();
  
//       if (!prompt) {
//         return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
//       }
  
//       if (!indices) {
//         indices = await processDocuments(DATA_DIR);
//       }
  
//       const customData = await queryVectorStores(prompt, indices);
  
//       const augmentedPrompt = `${prompt}\n\nAdditional context from custom data: ${customData}`;
  
//       const completion = await openai.chat.completions.create({
//         model: "gpt-4",
//         messages: [
//           {
//             role: "system",
//             content: `You are an AI assistant that generates learning pathways based on user prompts and custom data. 
//             Respond with a complete, valid JSON object representing the learning pathway. 
//             Each node should have a unique id, data (including label, type, icon, description, and optional resources), 
//             and an array of parent node ids to represent relationships. 
//             The first node should have an empty parents array. 
//             Use emojis for icons. Types can be: Content, Assignment, Assessment, Resource, or Quiz. 
//             Create a logical progression of topics, including branching paths if appropriate.
//             Incorporate insights from the custom data provided.`
//           },
//           { role: "user", content: augmentedPrompt }
//         ],
//         functions: [
//           {
//             name: "generate_pathway",
//             description: "Generate a learning pathway based on the user's prompt and custom data",
//             parameters: pathwaySchema
//           }
//         ],
//         function_call: { name: "generate_pathway" }
//       });
  
//       const generatedPathway = JSON.parse(completion.choices[0].message.function_call.arguments);
  
//       // Calculate node pos
//       generatedPathway.nodes = calculateNodePositions(generatedPathway.nodes);
  
//       // this generated edges
//       generatedPathway.edges = generateEdges(generatedPathway.nodes);
  
//       return NextResponse.json(generatedPathway, { status: 200 });
//     } catch (error) {
//       console.error("Error generating AI pathway:", error);
//       return NextResponse.json({ error: "Failed to generate AI pathway" }, { status: 500 });
//     }
//   }

// function calculateNodePositions(nodes) {
//   const levelMap = new Map();
//   const nodeMap = new Map(nodes.map(node => [node.id, node]));

//   function calculateLevel(nodeId, visited = new Set()) {
//     if (visited.has(nodeId)) return 0;
//     visited.add(nodeId);
//     const node = nodeMap.get(nodeId);
//     if (!node.parents || node.parents.length === 0) return 0;
//     const parentLevels = node.parents.map(parentId => calculateLevel(parentId, visited));
//     return Math.max(...parentLevels) + 1;
//   }

//   nodes.forEach(node => {
//     const level = calculateLevel(node.id);
//     if (!levelMap.has(level)) levelMap.set(level, []);
//     levelMap.get(level).push(node);
//   });

//   const VERTICAL_SPACING = 150;
//   const HORIZONTAL_SPACING = 250;
//   levelMap.forEach((nodesInLevel, level) => {
//     const levelWidth = nodesInLevel.length * HORIZONTAL_SPACING;
//     nodesInLevel.forEach((node, index) => {
//       node.type = 'custom';
//       node.dragHandle = '.custom-drag-handle';
//       node.position = {
//         x: (index * HORIZONTAL_SPACING) - (levelWidth / 2) + (HORIZONTAL_SPACING / 2),
//         y: level * VERTICAL_SPACING
//       };
//     });
//   });

//   return nodes;
// }

// function generateEdges(nodes) {
//   const edges = [];
//   nodes.forEach(node => {
//     if (node.parents) {
//       node.parents.forEach(parentId => {
//         edges.push({
//           id: `e${parentId}-${node.id}`,
//           source: parentId,
//           target: node.id,
//           type: 'floating',
//           style: { strokeWidth: 1.5 },
//           markerEnd: { type: 'arrowclosed' }
//         });
//       });
//     }
//   });
//   return edges;
// }