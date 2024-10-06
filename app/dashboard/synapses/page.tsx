"use client"
import PathwayDisplay from "@/app/components/PathwayDisplay";
import Sidebar from "@/app/components/SideBar";


export default function StudentWithSynapses() {
    return (
        <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64">
          <Sidebar />
        </div>
  
        {/* Pathway Display */}
        <div className="flex-grow" style={{ height: '100vh' }}>
          <PathwayDisplay />
        </div>
      </div>
    )
}