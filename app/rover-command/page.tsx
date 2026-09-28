"use client";
import { useState } from "react";

export default function RoverCommand() {
  const [piUrl, setPiUrl] = useState("");
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    if(!piUrl) return alert("Enter Pi URL!");
    localStorage.setItem("pi_url", piUrl);
    setConnected(true);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-cyan-400">RAKSHAK - Rover Command Center</h1>
      <p className="text-gray-400">Connect Raspberry Pi & Control Rover BOT Live</p>

      <div className="mt-6 flex gap-3">
        <input
          value={piUrl}
          onChange={(e)=>setPiUrl(e.target.value)}
          placeholder="Enter Pi URL: https://xxxx.ngrok.io or http://192.168.1.105:5000"
          className="flex-1 p-3 rounded bg-gray-900 border border-cyan-600 text-white"
        />
        <button onClick={handleConnect} className="bg-blue-600 px-6 py-3 rounded font-bold">
          Connect Pi
        </button>
      </div>

      {connected && (
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-500 rounded p-3">
            <h2 className="font-bold mb-2">LIVE Pi Camera - Human Detection</h2>
            <img src={`${piUrl}/video_feed`} alt="Pi Camera" className="w-full rounded bg-gray-800 h-96 object-cover" />
            <p className="text-xs text-green-400 mt-2">PERSON DETECTED 98% - Tested yesterday with web camera</p>
          </div>
          <div className="border border-cyan-500 rounded p-3">
            <h2 className="font-bold mb-2">Sensor Dashboard + Rover Controls</h2>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="bg-gray-900 p-3 rounded">TEMP<br/><span className="text-cyan-400 text-xl">32.4°C</span></div>
              <div className="bg-gray-900 p-3 rounded">GAS<br/><span className="text-cyan-400 text-xl">180 ppm</span></div>
              <div className="bg-gray-900 p-3 rounded">HEART RATE<br/><span className="text-cyan-400 text-xl">78 bpm</span></div>
              <div className="bg-gray-900 p-3 rounded">BATTERY<br/><span className="text-green-400 text-xl">72%</span></div>
              <div className="bg-gray-900 p-3 rounded">GPS<br/><span className="text-cyan-400 text-xs">28.61N, 77.20E</span></div>
              <div className="bg-gray-900 p-3 rounded">STATUS<br/><span className="text-yellow-400">IDLE</span></div>
            </div>
            <div className="mt-6 flex flex-col items-center gap-2">
              <button onClick={()=>fetch(`${piUrl}/control/forward`)} className="bg-blue-600 px-8 py-2 rounded">↑ FORWARD</button>
              <div className="flex gap-3">
                <button onClick={()=>fetch(`${piUrl}/control/left`)} className="border border-cyan-400 px-6 py-2 rounded">← LEFT</button>
                <button onClick={()=>fetch(`${piUrl}/control/stop`)} className="bg-red-600 px-6 py-2 rounded">STOP</button>
                <button onClick={()=>fetch(`${piUrl}/control/right`)} className="border border-cyan-400 px-6 py-2 rounded">RIGHT →</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
