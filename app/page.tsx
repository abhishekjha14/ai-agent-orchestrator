"use client";

import React, { useState, useEffect, useRef } from 'react';
import ReactFlow, { Background, Controls, Node, Edge, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { Terminal as TerminalIcon, Activity, DollarSign, Clock, Layers, RefreshCw } from 'lucide-react';

const initialNodes: Node[] = [
  { id: '1', position: { x: 20, y: 150 }, data: { label: '🌐 API Gateway Input' }, style: { background: '#1e293b', color: '#fff', border: '1px solid #3b82f6', borderRadius: '8px', padding: '8px', fontSize: '11px', width: '140px' } },
  { id: '2', position: { x: 200, y: 150 }, data: { label: '🤖 Routing Agent' }, style: { background: '#1e293b', color: '#fff', border: '1px solid #a855f7', borderRadius: '8px', padding: '8px', fontSize: '11px', width: '140px' } },
  { id: '3', position: { x: 380, y: 50 }, data: { label: '🛠️ MCP Web Search' }, style: { background: '#0f172a', color: '#94a3b8', border: '1px solid #eab308', borderRadius: '8px', padding: '8px', fontSize: '11px', width: '140px' } },
  { id: '4', position: { x: 380, y: 250 }, data: { label: '🛡️ Guardrails Validator' }, style: { background: '#0f172a', color: '#94a3b8', border: '1px solid #10b981', borderRadius: '8px', padding: '8px', fontSize: '11px', width: '140px' } },
  { id: '5', position: { x: 560, y: 150 }, data: { label: '🏁 Final Output' }, style: { background: '#1e293b', color: '#fff', border: '1px solid #ef4444', borderRadius: '8px', padding: '8px', fontSize: '11px', width: '140px' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#eab308' } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#10b981' } },
  { id: 'e3-5', source: '3', target: '5', style: { stroke: '#64748b' } },
  { id: 'e4-5', source: '4', target: '5', style: { stroke: '#64748b' } },
];

const mockLogPool = [
  "Incoming Request routed to LLM Gateway control plane...",
  "Cost policy validation passed: Available balance OK.",
  "Evaluating Guardrails: Checking input prompt for PII & Toxicity...",
  "Routing rule matched: Directing payload to OpenAI GPT-4o.",
  "Invoking Model Context Protocol (MCP) server for local tools execution...",
  "MCP Tool [web_search] triggered successfully. Fetching context...",
  "Context successfully injected into prompt framework.",
  "Evaluating multi-agent sync: Agent B acknowledging context routing.",
  "Output Guardrails verified: Zero safety leaks detected.",
  "Response payload token generation complete. Streaming back to client.",
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false); // 🔥 Hydration guard layer
  const [logs, setLogs] = useState<string[]>([
    "[16:42:00] Control Plane Gateway synchronized successfully.",
    "[16:42:01] Connected to 3 active MCP Servers."
  ]);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Set mounted to true only when client has fully loaded lifecycle
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const randomLog = mockLogPool[Math.floor(Math.random() * mockLogPool.length)];
      setLogs((prev) => [...prev, `[${timestamp}] ${randomLog}`]);
    }, 3000);
    return () => clearInterval(interval);
  }, [mounted]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Don't render complex canvas primitives until client-side hydration completes safely
  if (!mounted) {
    return (
      <div className="w-full min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center font-mono text-xs">
        Loading AgentFlow Control Plane UI...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6 bg-slate-950 text-slate-100 flex flex-col">
      {/* HEADER SECTION */}
      <header className="mb-6 flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Layers className="text-blue-500 h-5 w-5" /> AgentFlow UI
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Multi-Agent Infrastructure & Control Plane Monitor</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full bg-emerald-500 h-2 w-2"></span>
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800">
            CONTROL PLANE LIVE
          </span>
        </div>
      </header>

      {/* METRICS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-blue-950/50 border border-blue-800 text-blue-400 rounded-lg"><DollarSign className="h-4 w-4" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Total Cost</p>
            <h3 className="text-base font-mono font-bold text-white">$14.28</h3>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-purple-950/50 border border-purple-800 text-purple-400 rounded-lg"><Activity className="h-4 w-4" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Active Agents</p>
            <h3 className="text-base font-mono font-bold text-white">4 / 4</h3>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-amber-950/50 border border-amber-800 text-amber-400 rounded-lg"><Clock className="h-4 w-4" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Avg Latency</p>
            <h3 className="text-base font-mono font-bold text-white">340ms</h3>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-emerald-950/50 border border-emerald-800 text-emerald-400 rounded-lg"><TerminalIcon className="h-4 w-4" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Tokens / Sec</p>
            <h3 className="text-base font-mono font-bold text-white">124 t/s</h3>
          </div>
        </div>
      </div>

      {/* CORE TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[500px]">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-[500px]">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-400" /> Orchestration Topology Graph
            </h2>
            <span className="text-[10px] text-slate-500 font-mono">Zoom & Drag Enabled</span>
          </div>
          <div className="w-full flex-1 bg-slate-950 border border-slate-800/80 rounded-lg overflow-hidden relative">
            <ReactFlow 
              nodes={nodes} 
              edges={edges} 
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              fitView
            >
              <Background color="#334155" gap={12} />
              <Controls />
            </ReactFlow>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-[500px]">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <TerminalIcon className="h-4 w-4 text-emerald-400" /> Live Execution Stream
            </h2>
            <button 
              onClick={() => setLogs(["[Logs cleared manually]"])} 
              className="text-[10px] flex items-center gap-1 text-slate-500 hover:text-slate-300 border border-slate-800 bg-slate-950 px-2 py-0.5 rounded transition-all"
            >
              <RefreshCw className="h-2.5 w-2.5" /> Clear
            </button>
          </div>
          <div className="w-full flex-1 bg-slate-950 border border-slate-800 p-3 rounded-lg font-mono text-[11px] overflow-y-auto text-emerald-400 space-y-1.5 scrollbar-thin">
            {logs.map((log, index) => (
              <p key={index} className="leading-relaxed animate-fade-in break-words">
                <span className="text-slate-500 select-none">❯ </span>{log}
              </p>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}