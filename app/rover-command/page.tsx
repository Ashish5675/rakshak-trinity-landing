"use client";
import { useState } from "react";

export default function RoverCommand() {
  const [piUrl, setPiUrl] = useState("http://192.168.1.105:5000");
  const [connected, setConnected] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a1a2a] text-white">
      {/* HEADER */}
      <div className="bg-[#0d2136] border-b border-cyan-900 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black text-cyan-400 leading-none">RAKSHAK<br/><span className="text-[11px] text-gray-400 font-normal">— MVA Robotics Innovation Org</span></h1>
          <div className="ml-4 flex items-center gap-2">
            <span className="text-xs text-gray-300">Raspberry Pi URL:</span>
            <input value={piUrl} onChange={e=>setPiUrl(e.target.value)} className="bg-black/60 border border-gray-600 rounded-lg px-3 py-1.5 w-[260px] text-cyan-300 text-xs" />
            <button onClick={()=>setConnected(true)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold text-xs">↗ Connect Pi</button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <a href="/" className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200">← Back to Home</a>
          <span className="text-green-400">● SECURE</span>
          <span className="bg-gray-700 px-2 py-0.5 rounded">v2.1.3</span>
        </div>
      </div>

      <div className="p-3 grid lg:grid-cols-5 gap-3">
        {/* LEFT - CAMERA 3/5 */}
        <div className="lg:col-span-3 bg-[#0f253d] border border-cyan-800/50 rounded-xl overflow-hidden">
          <div className="flex justify-between items-center px-4 py-2 bg-black/20">
            <h2 className="text-cyan-300 font-bold text-xs">— LIVE PI CAMERA FEED — YOLOv8 DETECTION</h2>
            <span className="text-green-400 text-[11px]">● LIVE • 30 FPS</span>
          </div>
          <div className="relative bg-black">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900" alt="disaster" className="w-full h-[520px] object-cover opacity-80" />
            <div className="absolute top-[18%] left-[15%] w-[55%] h-[62%] border-2 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)]">
              <div className="absolute -top-5 left-0 bg-yellow-400 text-black font-black px-2 text-[13px]">PERSON DETECTED 98%</div>
            </div>
            <div className="absolute bottom-10 left-2 right-2 flex justify-between text-[10px] text-green-300 bg-black/70 px-2 py-1">
              <span>OBJECT: person | CONF: 0.98 | CLASS: human | DIST: ~4.2 m</span>
            </div>
            {connected && <img src={`${piUrl}/video_feed`} alt="Pi Live" className="absolute inset-0 w-full h-full object-cover" />}
          </div>
          <div className="px-3 py-2 bg-black/50 text-[10px] text-gray-400">Timestamp: 2024-11-21 22:14:37 UTC | Camera: pi-cam-001 | Exposure: auto</div>
        </div>

        {/* RIGHT - SENSORS 2/5 */}
        <div className="lg:col-span-2 bg-[#0f253d] border border-cyan-800/50 rounded-xl p-3">
          <h2 className="text-cyan-300 font-bold text-xs text-center">◉ SENSOR DASHBOARD & ROVER CONTROLS</h2>
          <p className="text-center text-[10px] text-gray-400 mt-1 mb-3">ENVIRONMENT & VITAL SENSORS</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              {icon:"🌡️", label:"TEMPERATURE", val:"32.4°C", sub:"Ambient • Nominal"},
              {icon:"☁️", label:"GAS (MQ-2)", val:"180 ppm", sub:"Air Quality: NORMAL"},
              {icon:"❤️", label:"HEART RATE", val:"78 bpm", sub:"Crew • Stable"},
              {icon:"🔋", label:"BATTERY", val:"72%", sub:"Charging • 3.2h remaining"},
              {icon:"🛰️", label:"GPS LOCATION", val:"28.6139°N, 77.2090°E", sub:"Fix: 12 sats • HDOP 0.9"},
              {icon:"🧭", label:"ROVER STATUS", val:"IDLE", sub:"Mode: MANUAL", color:"text-yellow-400"},
            ].map((s,i)=>(
              <div key={i} className="bg-black/40 border border-gray-700/50 rounded-lg p-2 text-center">
                <div className="text-lg">{s.icon}</div>
                <div className="text-[8px] text-gray-400 mt-1">{s.label}</div>
                <div className={`text-[13px] font-bold ${s.color||'text-cyan-300'}`}>{s.val}</div>
                <div className="text-[8px] text-gray-400">{s.sub}</div>
              </div>
            ))}
          </div>
          <h3 className="text-center text-cyan-300 text-xs mt-4 mb-2">ROVER CONTROLS</h3>
          <div className="flex flex-col items-center gap-2">
            <button onClick={()=>connected && fetch(`${piUrl}/control/forward`).catch(()=>{})} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-bold text-xs">↑ FORWARD</button>
            <div className="flex gap-2">
              <button onClick={()=>connected && fetch(`${piUrl}/control/left`).catch(()=>{})} className="border border-cyan-400/50 px-4 py-2 rounded-lg text-xs">← LEFT</button>
              <button onClick={()=>connected && fetch(`${piUrl}/control/stop`).catch(()=>{})} className="bg-red-600 px-5 py-2 rounded-lg font-bold text-xs">◫ STOP</button>
              <button onClick={()=>connected && fetch(`${piUrl}/control/right`).catch(()=>{})} className="border border-cyan-400/50 px-4 py-2 rounded-lg text-xs">RIGHT →</button>
            </div>
            <div className="w-full mt-2">
              <div className="flex items-center gap-2 text-[11px]"><span>SPEED: 45%</span><div className="flex-1 bg-gray-700 h-1 rounded"><div className="bg-cyan-400 h-1 w-[45%] rounded"></div></div></div>
            </div>
            <div className="flex gap-2 mt-2 w-full">
              <button className="flex-1 border border-gray-600 py-1.5 rounded text-[10px]">📷 ARM CAMERA</button>
              <button className="flex-1 border border-red-900 bg-red-900/20 py-1.5 rounded text-[10px] text-red-300">⚠️ EMERGENCY STOP</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-3 mb-3 bg-[#0d2136] border border-cyan-700/50 rounded-lg px-4 py-2 flex flex-wrap justify-between text-[11px]">
        <div className="flex gap-3 text-gray-400">
          <span className="text-green-400">● Rover BOT online</span>
          <span>| Latency: 34ms</span>
          <span>| System Uptime: 01:12:47</span>
          <span className="text-green-400">| Log: Nominal — No faults detected</span>
        </div>
        <div className="text-right">
          <div className="text-cyan-300">CONNECTED TO: {piUrl}</div>
        </div>
      </div>
    </div>
  );
}
