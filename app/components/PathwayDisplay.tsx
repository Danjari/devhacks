
// import React, { useCallback, useState } from 'react';
// import {
//   ReactFlow,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   Node
// } from '@xyflow/react';
// import InterestForm from './InterestForm';
// import NodePopup from './NodePopup';
// import '@xyflow/react/dist/style.css';

// const initialNodes = [
//   {
//     id: '1',
//     position: { x: 100, y: 100 },
//     data: {
//       label: 'Linear Algebra Basics',
//       title: 'Linear Algebra Basics',
//       description: `In this section, you will learn about basic linear algebra concepts like vectors, matrices, and scalars. Here's an example of a scalar equation: $a = b + c$`,
//       videoUrl: 'https://www.youtube.com/embed/xyz123',
//       assessment: [
//         {
//           question: 'What is a scalar?',
//           options: ['A vector', 'A single number', 'A matrix', 'None of the above'],
//           answer: 'A single number',
//         },
//       ],
//     },
//   },
//   {
//     id: '2',
//     position: { x: 300, y: 200 },
//     data: {
//       label: 'Vector Spaces',
//       title: 'Understanding Vector Spaces',
//       description: `Vector spaces are mathematical structures formed by vectors. A vector space must satisfy properties like associativity and distributivity.`,
//       videoUrl: 'https://www.youtube.com/embed/abc456',
//       assessment: [
//         {
//           question: 'Which of the following is a requirement for a vector space?',
//           options: ['Closure under addition', 'Existence of zero vector', 'Distributive property', 'All of the above'],
//           answer: 'All of the above',
//         },
//       ],
//     },
//   },
//   {
//     id: '3',
//     position: { x: 500, y: 300 },
//     data: {
//       label: 'Eigenvalues and Eigenvectors',
//       title: 'Eigenvalues and Eigenvectors',
//       description: `An eigenvector of a matrix is a non-zero vector that changes at most by a scalar factor when that linear transformation is applied.`,
//       videoUrl: 'https://www.youtube.com/embed/ijk789',
//       assessment: [
//         {
//           question: 'What is an eigenvector?',
//           options: ['A scalar value', 'A matrix', 'A non-zero vector', 'None of the above'],
//           answer: 'A non-zero vector',
//         },
//       ],
//     },
//   },
// ];

// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }, { id: 'e2-3', source: '2', target: '3' }];

// export default function App() {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   const [selectedNode, setSelectedNode] = useState<Node | null>(null);

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     [setEdges]
//   );

//   const handleInterestSubmit = (submittedInterest: string) => {
//     const newNode: Node = {
//       id: (nodes.length + 1).toString(),
//       type: 'default',
//       position: { x: 300, y: 250 + nodes.length * 50 },
//       data: {
//         label: `Topic: ${submittedInterest}`,
//         title: submittedInterest,
//         description: `Here is the detailed description for ${submittedInterest}.`,
//         videoUrl: 'https://youtu.be/_YkIivLaVJs?si=rmwYM4Ki_fW3aH_M',
//         assessment: [
//           {
//             question: 'Sample question?',
//             options: ['Option 1', 'Option 2', 'Option 3'],
//             answer: 'Option 1',
//           },
//         ],
//       },
//     };
//     setNodes((nds) => [...nds, newNode]);
//     if (nodes.length > 0) {
//       const newEdge = {
//         id: `e${nodes.length}-${newNode.id}`,
//         source: nodes[nodes.length - 1].id,
//         target: newNode.id,
//       };
//       setEdges((eds) => [...eds, newEdge]);
//     }
//   };

//   const onNodeClick = (event: React.MouseEvent, node: Node) => {
//     event.stopPropagation();
//     setSelectedNode(node);
//   };

//   const closePopup = () => {
//     setSelectedNode(null);
//   };

//   const handleNextNode = () => {
//     if (selectedNode) {
//       const currentNodeIndex = nodes.findIndex((node) => node.id === selectedNode.id);
//       if (currentNodeIndex < nodes.length - 1) {
//         setSelectedNode(nodes[currentNodeIndex + 1]); // Set the next node as selected
//       } else {
//         setSelectedNode(null); // Close the popup if it's the last node
//       }
//     }
//   };

//   return (
//     <div style={{ height: '100vh' }} onClick={closePopup}>
//       <InterestForm onSubmit={handleInterestSubmit} />
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onNodeClick={onNodeClick}
//       />
//       {selectedNode && (
//         <NodePopup selectedNode={selectedNode} onClose={closePopup} onNextNode={handleNextNode} />
//       )}
//     </div>
//   );
// }

import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
} from '@xyflow/react';
import InterestForm from './InterestForm';
import NodePopup from './NodePopup';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 100, y: 100 },
    data: {
      label: 'Linear Algebra Basics',
      title: 'Linear Algebra Basics',
      description: `In this section, you will learn about basic linear algebra concepts like vectors, matrices, and scalars.`,
      videoUrl: 'https://www.youtube.com/embed/xyz123',
      assessment: [
        {
          question: 'What is a scalar?',
          options: ['A vector', 'A single number', 'A matrix', 'None of the above'],
          answer: 'A single number',
        },
      ],
    },
    style: { backgroundColor: '#fff' }, // Default color
    completed: false, // Track completion status
  },
  {
    id: '2',
    position: { x: 300, y: 200 },
    data: {
      label: 'Vector Spaces',
      title: 'Understanding Vector Spaces',
      description: `Vector spaces are mathematical structures formed by vectors.`,
      videoUrl: 'https://www.youtube.com/embed/abc456',
      assessment: [
        {
          question: 'Which of the following is a requirement for a vector space?',
          options: ['Closure under addition', 'Existence of zero vector', 'Distributive property', 'All of the above'],
          answer: 'All of the above',
        },
      ],
    },
    style: { backgroundColor: '#fff' },
    completed: false,
  },
  {
    id: '3',
    position: { x: 500, y: 300 },
    data: {
      label: 'Eigenvalues and Eigenvectors',
      title: 'Eigenvalues and Eigenvectors',
      description: `An eigenvector of a matrix is a non-zero vector that changes at most by a scalar factor when that linear transformation is applied.`,
      videoUrl: 'https://www.youtube.com/embed/ijk789',
      assessment: [
        {
          question: 'What is an eigenvector?',
          options: ['A scalar value', 'A matrix', 'A non-zero vector', 'None of the above'],
          answer: 'A non-zero vector',
        },
      ],
    },
    style: { backgroundColor: '#fff' },
    completed: false,
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }, { id: 'e2-3', source: '2', target: '3' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeCompletion = (nodeId: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            completed: true,
            style: { ...node.style, backgroundColor: '#d3d3d3' }, // Change to grey color
          };
        }
        return node;
      })
    );
  };

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    event.stopPropagation();
    setSelectedNode(node);
  };

  const closePopup = () => {
    setSelectedNode(null);
  };

  const handleNextNode = () => {
    if (selectedNode) {
      handleNodeCompletion(selectedNode.id); // Mark current node as completed

      const currentNodeIndex = nodes.findIndex((node) => node.id === selectedNode.id);
      if (currentNodeIndex < nodes.length - 1) {
        setSelectedNode(nodes[currentNodeIndex + 1]); // Set the next node as selected
      } else {
        setSelectedNode(null); // Close the popup if it's the last node
      }
    }
  };

  return (
    <div style={{ height: '100vh' }} onClick={closePopup}>
      {/* <InterestForm onSubmit={handleInterestSubmit} /> */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
      />
      {selectedNode && (
        <NodePopup
          selectedNode={selectedNode}
          onClose={closePopup}
          onNextNode={handleNextNode}
        />
      )}
    </div>
  );
}

