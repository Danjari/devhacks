// lib/store.ts
import { create } from 'zustand';
import { Node, Edge } from 'reactflow';

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes) => {
    console.log('Setting nodes in store:', nodes); // Debugging log
    set({ nodes });
  },
  setEdges: (edges) => {
    if(!Array.isArray(edges)){
      console.error('Edges is not an array:', edges);
      return;
    }
    console.log('Setting edges in store:', edges); // Debugging log
    set({ edges });
  },
  addNode: (node) => {
    console.log('Adding node to store:', node); // Debugging log
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
  },
}));