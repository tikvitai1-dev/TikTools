import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ws } from '../lib/api';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!user) return;

    const socket = ws.connect(user.id);

    socket.onopen = () => {
      setConnected(true);
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setEvents((prev) => [data, ...prev].slice(0, 50));
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      setConnected(false);
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">IndoFinity Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-slate-400">{connected ? 'Connected' : 'Disconnected'}</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard title="Total Events" value="0" />
            <StatCard title="Donations" value="Rp 0" />
            <StatCard title="Viewers" value="0" />
            <StatCard title="Followers" value="0" />
          </div>

          {/* Control Panel */}
          <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Kontrol Overlay</h2>
            <div className="space-y-4">
              <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">
                Aktifkan TikTok Overlay
              </button>
              <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                Connect Minecraft
              </button>
              <button className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
                Hubungkan Platform Donasi
              </button>
            </div>
          </div>

          {/* Live Events Feed */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Live Events</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {events.length === 0 ? (
                <p className="text-slate-400 text-sm">Belum ada event...</p>
              ) : (
                events.map((event, idx) => (
                  <div key={idx} className="bg-slate-700 p-3 rounded-lg text-sm">
                    <p className="text-white font-medium">{event.type}</p>
                    <p className="text-slate-400">{JSON.stringify(event.data)}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <p className="text-slate-400 text-sm">{title}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}
