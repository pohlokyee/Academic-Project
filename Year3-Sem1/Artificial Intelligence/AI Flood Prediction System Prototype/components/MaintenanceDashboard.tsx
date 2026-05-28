import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Navigation, Activity, BrainCircuit, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export function MaintenanceDashboard({ onLogout }: { onLogout: () => void }) {
  const [tasks] = useState([
    { id: 1, location: "Sector 4 - Klang River", status: "Critical", issue: "Severe Blockage", priority: "AI High" },
    { id: 2, location: "Taman Sentosa Drain", status: "Warning", issue: "Sediment Build-up", priority: "AI Medium" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-10">
      {/* Header */}
      <div className="bg-white p-6 shadow-sm border-b flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Maintenance Portal</h1>
          <p className="text-xs text-blue-600 font-semibold flex items-center gap-1">
            <BrainCircuit size={14} /> AI Optimization Active
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onLogout}>Logout</Button>
      </div>

      <div className="p-4 space-y-6">
        {/* AI Prediction Section */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase mb-3 px-1">AI Repair Priority</h2>
          <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <span className="bg-white/20 text-[10px] px-2 py-1 rounded-full border border-white/30">NEXT ACTION</span>
              <h3 className="text-lg font-bold mt-2">Clear Sector 4 Main Drain</h3>
              <p className="text-xs text-blue-100 mb-4">Predicted 85% flood risk reduction if solved within 2 hours.</p>
              <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50">View On Map</Button>
            </div>
            <Activity className="absolute right-[-10px] bottom-[-10px] size-24 text-white/10" />
          </div>
        </section>

        {/* Drainage Status Map Placeholder */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase mb-3 px-1">Infrastructure Map</h2>
          <div className="h-48 bg-slate-200 rounded-2xl relative flex items-center justify-center overflow-hidden border-2 border-white shadow-inner">
            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=3.1390,101.6869&zoom=13&size=400x200&sensor=false')] opacity-50 grayscale" />
            <div className="absolute top-10 left-20 animate-pulse"><AlertTriangle className="text-red-500" fill="currentColor" /></div>
            <div className="absolute bottom-10 right-32"><CheckCircle2 className="text-green-500" fill="white" /></div>
            <span className="relative z-10 text-xs font-bold text-slate-600 bg-white/80 px-3 py-1 rounded-full">Live Drainage Health Map</span>
          </div>
        </section>

        {/* Reports List */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase mb-3 px-1">Active Maintenance Reports</h2>
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${task.status === 'Critical' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'}`}>
                    <Droplets size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{task.location}</h4>
                    <p className="text-[11px] text-slate-500">{task.issue}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] px-2 py-1 rounded-md font-bold ${task.status === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}