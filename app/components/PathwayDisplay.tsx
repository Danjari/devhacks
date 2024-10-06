


import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Node
} from '@xyflow/react';
import InterestForm from './InterestForm';
import '@xyflow/react/dist/style.css';

 
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '34' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [interest, setInterest] = useState('');
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Handle interest submission and dynamically add a new node
  const handleInterestSubmit = (submittedInterest: string) => {
    setInterest(submittedInterest);
  
    // Create a new node based on the submitted interest
    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      type: 'default',
      position: { x: 300, y: 250 + nodes.length * 50 },
      data: { label: `Topic: ${submittedInterest}` },
    };
  
    // Add the new node to the list of nodes
    setNodes((nds) => [...nds, newNode]);
  
    // Create an edge connecting the last node to the new node
    console.log('Nodes:', nodes.length);
    if (nodes.length > 0) {
      const newEdge = {
        id: `e${nodes.length}-${newNode.id}`,
        source: nodes[nodes.length - 1].id, // Connect from the last existing node
        target: newNode.id, // Connect to the newly created node
        
      };
      console.log('New Edge:', newEdge);
      
      // Add the new edge to the list of edges
      setEdges((eds) => [...eds, newEdge]);
      console.log('Edges:', edges);
    }
  };

 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
        <InterestForm onSubmit={handleInterestSubmit} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  );
}
